import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { Chat, Message } from "./type";
import useSocket from "./useSocket";

const MainChat: React.FC = () => {
  const currentUser = Cookies.get("token");
  console.log("Current user token from cookies:", currentUser);

  const { socket, isLoading } = useSocket(currentUser as string);

  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);

  useEffect(() => {
    console.log("Running socket connection effect");
    console.log("socket", socket);

    // Add connection status listeners
    if (!isLoading) return;
    if (!socket) return;

    console.log("socket", socket);

    console.log("Socket is available, setting up event listeners");

    console.log("Emitted 'getAllChatMembers' event");

    socket.emit("test", { user: currentUser });

    //   --------------------------------
    // console.log("entering allchat members", socket);
    // socket.on("allChatMembers", (chats: Chat[]) => {
    //   console.log("Received 'allChatMembers' event with data:", chats);
    //   setChats(chats);
    // });
    // console.log("cross all chat");
    //   --------------------------------

    socket.on("receiveMessage", (message: Message) => {
      console.log("Received new message:", message);
      if (message.chatId === selectedChat) {
        console.log("Message belongs to current chat, adding to messages");
        setMessages((prev) => [...prev, message]);
      }
      console.log("Updating chats with new message");
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === message.chatId
            ? {
                ...chat,
                lastMessage: message,
                unreadCount:
                  message.senderId !== currentUser ? chat.unreadCount + 1 : 0,
              }
            : chat
        )
      );
    });

    socket.on("messageHistory", (messages: Message[]) => {
      console.log("Received message history:", messages);
      setMessages(messages || []);
    });

    socket.on("typing", (data: { userId: string; isTyping: boolean }) => {
      console.log("Received typing event:", data);
      if (data.userId !== currentUser && selectedChat) {
        console.log("Typing event is from another user in current chat");
        setIsTyping(data.isTyping);
        setTypingUser(data.userId);
      }
    });

    socket.on("messageRead", ({ messageId }: { messageId: string }) => {
      console.log("Message marked as read:", messageId);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, isRead: true } : msg
        )
      );
    });

    console.log(socket);
    return () => {
      console.log("Cleaning up socket event listeners");
      // socket.off("allChatMembers");
      // socket.off("receiveMessage");
      // socket.off("messageHistory");
      // socket.off("typing");
      // socket.off("messageRead");
    };
  }, [socket, selectedChat, currentUser, isLoading]);

  const handleSelectChat = (chatId: string) => {
    console.log("Chat selected:", chatId);
    setSelectedChat(chatId);
    socket?.emit("joinChat", { chatId });
    console.log("Emitted 'joinChat' event for chat:", chatId);
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      )
    );
  };

  const handleSendMessage = (content: string) => {
    console.log("Sending message:", content);
    if (selectedChat) {
      console.log("Emitting 'sendMessage' event for chat:", selectedChat);
      socket?.emit("sendMessage", { chatId: selectedChat, content });
    }
  };

  const handleTyping = (isTyping: boolean) => {
    console.log("Typing status changed:", isTyping);
    if (selectedChat) {
      console.log("Emitting 'typing' event for chat:", selectedChat);
      socket?.emit("typing", { chatroomId: selectedChat, isTyping });
    }
  };

  const selectedChatData =
    chats.find((chat) => chat.id === selectedChat) || null;
  console.log("Selected chat data:", selectedChatData);
  console.log("Current messages:", messages);
  console.log("Typing status - isTyping:", isTyping, "typingUser:", typingUser);

  return (
    <div className="app-container">
      <div className="sidebar">
        <ChatList
          chats={chats}
          onSelectChat={handleSelectChat}
          currentUser={currentUser!}
        />
      </div>
      <div className="main-content">
        <ChatWindow
          chat={selectedChatData}
          messages={messages}
          onSendMessage={handleSendMessage}
          onTyping={handleTyping}
          currentUser={currentUser!}
          isTyping={isTyping}
          typingUser={typingUser}
        />
      </div>
    </div>
  );
};

export default MainChat;

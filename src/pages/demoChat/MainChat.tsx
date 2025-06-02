import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { Chat, Message } from "./type";


const MainChat: React.FC = () => {
    const currentUser = Cookies.get('token')


    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [typingUser, setTypingUser] = useState<string | null>(null);

    const socketRef = useRef<Socket | null>(null);
    const socket = socketRef.current;


    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io(`http://localhost:5000?token=${currentUser}`, {
                withCredentials: true,
            });
        }
        if (socket) {
            socket.emit("getAllChatMembers");

            socket.on("allChatMembers", (chats: Chat[]) => {
                console.log(chats);
                setChats(chats);
            });

            socket.on("receiveMessage", (message: Message) => {
                if (message.chatId === selectedChat) {
                    setMessages((prev) => [...prev, message]);
                }
                setChats(prev =>
                    prev.map(chat =>
                        chat.id === message.chatId
                            ? { ...chat, lastMessage: message, unreadCount: message.senderId !== currentUser ? chat.unreadCount + 1 : 0 }
                            : chat
                    )
                );
            });

            socket.on("messageHistory", (messages: Message[]) => {
                setMessages(messages || []);
            });

            socket.on("typing", (data: { userId: string; isTyping: boolean }) => {
                if (data.userId !== currentUser && selectedChat) {
                    setIsTyping(data.isTyping);
                    setTypingUser(data.userId);
                }
            });

            socket.on("messageRead", ({ messageId }: { messageId: string }) => {
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === messageId ? { ...msg, isRead: true } : msg
                    )
                );
            });

            return () => {
                socket.off("allChatMembers");
                socket.off("receiveMessage");
                socket.off("messageHistory");
                socket.off("typing");
                socket.off("messageRead");
            };
        }
    }, [socket, selectedChat, currentUser]);

    const handleSelectChat = (chatId: string) => {
        setSelectedChat(chatId);
        socket?.emit("joinChat", { chatId });
        setChats(prev =>
            prev.map(chat =>
                chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
            )
        );
    };


    const handleSendMessage = (content: string) => {
        if (selectedChat) {
            socket?.emit("sendMessage", { chatId: selectedChat, content });
        }
    };

    const handleTyping = (isTyping: boolean) => {
        if (selectedChat) {
            socket?.emit("typing", { chatroomId: selectedChat, isTyping });
        }
    };

    const selectedChatData = chats.find(chat => chat.id === selectedChat) || null;

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
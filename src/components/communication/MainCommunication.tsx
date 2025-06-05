/* eslint-disable @typescript-eslint/no-explicit-any */

import { DialogTitle } from "@radix-ui/react-dialog";
import Cookies from "js-cookie";
import { Dot, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import useAuthUser from "../../hooks/useGetMe";
import { Message } from "../../pages/demoChat/type";
import useSocket from "../../pages/demoChat/useSocket";
import {
  MessageMember,
  useGetMessageByIdQuery,
  useGetMessageMembersQuery,
} from "../../redux/apis/chat/chatApi";
import Loading from "../others/Loading";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Communication from "./Communication";

export default function CommunicationComponent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const currentUser = Cookies.get("token");
  const [message, setMessage] = useState<string>("");
  const [id, setId] = useState("");
  const { user } = useAuthUser();
  const { data, isLoading } = useGetMessageMembersQuery();
  //   isLoading: messagesLoading
  const { data: AllMessages } = useGetMessageByIdQuery(id, {
    skip: !id,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const { socket } = useSocket(currentUser as string);

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
      if (message.chatId === id) {
        console.log("Message belongs to current chat, adding to messages");
        setMessages((prev) => [...prev, message]);
      }
      console.log("Updating chats with new message");
      // setChats((prev) =>
      //   prev.map((chat) =>
      //     chat.id === message.chatId
      //       ? {
      //           ...chat,
      //           lastMessage: message,
      //           unreadCount:
      //             message.senderId !== currentUser ? chat.unreadCount + 1 : 0,
      //         }
      //       : chat
      //   )
      // );
    });

    socket.on("messageHistory", (messages: Message[]) => {
      console.log("Received message history:", messages);
      setMessages(messages || []);
    });

    // socket.on("typing", (data: { userId: string; isTyping: boolean }) => {
    //   console.log("Received typing event:", data);
    //   if (data.userId !== currentUser && selectedChat) {
    //     console.log("Typing event is from another user in current chat");
    //     setIsTyping(data.isTyping);
    //     setTypingUser(data.userId);
    //   }
    // });

    // socket.on("messageRead", ({ messageId }: { messageId: string }) => {
    //   console.log("Message marked as read:", messageId);
    //   setMessages((prev) =>
    //     prev.map((msg) =>
    //       msg.id === messageId ? { ...msg, isRead: true } : msg
    //     )
    //   );
    // });

    console.log(socket);
    return () => {
      console.log("Cleaning up socket event listeners");
      socket.off("allChatMembers");
      socket.off("receiveMessage");
      socket.off("messageHistory");
      socket.off("typing");
      socket.off("messageRead");
    };
  }, [socket, currentUser, isLoading, id]);

  // id
  const [selectedUser, setSelectedUser] = useState<any>(null);

  console.log("messages", messages);

  // Demo Data
  const handelUserId = (id: any) => {
    setId(id);
    setSelectedUser(id);
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleSendMessage = () => {
    console.log("Sending message:", message);
    if (id) {
      console.log("Emitting 'sendMessage' event for chat:", id);
      socket?.emit("sendMessage", { chatId: id, content: message });
    }
  };

  const ConversationList = () => (
    <div className="w-full h-full bg-[#1B1B1B]">
      <div>
        <p className="font-semibold py-[22px] text-primary text-xl shadow-sm bg-section rounded-lr-md text-start flex items-center">
          {" "}
          <Dot className="text-green-500 min-w-10 min-h-10" /> Messages
        </p>
      </div>
      <ScrollArea
        style={{
          border: "none",
        }}
        className="md:h-[calc(79vh-8rem)] h-full"
      >
        {data?.data.map((chat: MessageMember, index) => (
          <div
            onClick={() => handelUserId(chat?.id)}
            key={index}
            className="flex items-center justify-between hover:bg-slate-700 p-4 cursor-pointer  rounded-md mx-2 my-2 transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  chat.logo ??
                  "https://cdn-icons-png.freepik.com/256/8661/8661530.png?ga=GA1.1.603131680.1747477038&semt=ais_incoming"
                }
                alt={chat?.name ?? "User"}
                className="rounded-full object-cover w-10 h-10"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm xl:text-lg font-semibold text-white">
                  {chat?.name ?? "Unknown User"}
                </p>
                <p className="text-sm truncate text-white font-thin">
                  last message: {chat?.lastMessage?.content}
                </p>
              </div>
            </div>
            <div className="text-primary_highlighted">
              {chat?.lastMessage?.createdAt &&
                new Date(chat?.lastMessage?.createdAt).toDateString()}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );

  return (
    <div className="max-h-[90vh] container">
      <div className="bg-[#1B1B1B] rounded-lg mb-10">
        <div className="flex flex-col lg:flex-row rounded-lg md:mt-10 mt-5">
          <div className="lg:hidden mb-4 bg-black">
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button className="mb-3">
                  <Menu className="mr-2 h-4 w-4" />
                  View Conversations
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] bg-[#1B1B1B]"
              >
                <DialogTitle />
                <ConversationList />
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden w-1/3 lg:block ">
            <ConversationList />
          </div>

          <div className="flex-1">
            {selectedUser ? (
              <div>
                <header className="flex items-center justify-between px-4 py-[16px]">
                  <div className="flex items-center gap-3 ">
                    <img
                      src={selectedUser?.profileImage}
                      alt={selectedUser?.fullName ?? "User"}
                      className="rounded-full w-14 h-14 object-cover"
                    />
                    <div>
                      <h1 className="font-semibold">
                        {selectedUser?.fullName}
                      </h1>
                    </div>
                  </div>
                </header>
                <div className="bg-black">
                  <Communication
                    message={message}
                    messages={AllMessages?.data.messages as any}
                    setMessages={setMessage}
                    handelSend={handleSendMessage}
                    userRole={user.id}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full min-h-[60vh] flex items-center justify-center text-primary_highlighted"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

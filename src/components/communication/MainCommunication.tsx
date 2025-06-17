/* eslint-disable @typescript-eslint/no-explicit-any */

import { DialogTitle } from "@radix-ui/react-dialog";
import { Dot, Menu } from "lucide-react";
import { useState } from "react";
import { useChat } from "../../hooks/useChat";
import useAuthUser from "../../hooks/useGetMe";
import {
  MessageMember,
  useGetMessageMembersQuery,
} from "../../redux/apis/chat/chatApi";
import Loading from "../others/Loading";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Communication from "./Communication";
export default function CommunicationComponent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  console.log(selectedUser, "ss");
  const { user } = useAuthUser();
  const { data, isLoading } = useGetMessageMembersQuery();

  // const {socket}= useSocket()
  const { joinChat } = useChat();

  // useEffect(() => {
  // getAllChatMembers();
  // }, [socket]);

  // console.log(chatMembers, 'chatMembers');
  // Demo Data
  const handelUser = (chat: MessageMember) => {
    setSelectedUser(chat);
    joinChat(chat.id);
  };

  if (isLoading) {
    return <Loading />;
  }

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
            onClick={() => handelUser(chat)}
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
                {chat?.lastMessage?.isRead === false && (
                  <p className="text-sm truncate text-white font-thin">
                    last message: {chat?.lastMessage?.content}
                  </p>
                )}
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
                      src={
                        selectedUser?.logo ??
                        "https://cdn-icons-png.freepik.com/256/8661/8661530.png?ga=GA1.1.603131680.1747477038&semt=ais_incoming"
                      }
                      alt={selectedUser?.name ?? "User"}
                      className="rounded-full w-14 h-14 object-cover"
                    />
                    <div>
                      <h1 className="font-semibold text-white">
                        {selectedUser?.name ?? "Unknown User"}
                      </h1>
                    </div>
                  </div>
                </header>
                <div className="bg-black">
                  <Communication userId={user.id} chatId={selectedUser?.id} />
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

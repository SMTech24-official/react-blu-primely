import { Send } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CommunicationProps } from "../../types/types";
import { Messages } from "../../redux/apis/chat/chatApi";

const Communication: React.FC<CommunicationProps> = ({
  message,
  messages,
  userRole,
  setMessages,
  handelSend,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  console.log(userRole);

  return (
    <div className="flex flex-col ">
      <div className="h-full">
        <div
          ref={containerRef}
          className="p-4 h-[65vh] md:h-[60vh] overflow-y-auto bg-scroll"
        >
          {messages?.map((msg: Messages) => (
            <MessageBubble
              key={msg.id}
              message={msg?.content}
              role={msg.senderId}
              colorScheme={
                msg.senderId !== userRole
                  ? "bg-[#1B1B1B] text-white msg-two ms-2 p-1"
                  : "bg-primary_highlighted text-white me-2 msg p-1"
              }
              userRole={userRole}
            />
          ))}
        </div>

        <div className="p-4 bg-[#1B1B1B] ">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessages(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handelSend()}
              className="flex-1 border-none"
            />
            <Button onClick={handelSend} className="bg-primary text-white">
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MessageBubbleProps {
  message: string;
  role?: string; // This should match the message sender
  colorScheme?: string;
  userRole: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  role,
  colorScheme,
  userRole,
}) => {
  const isSender = role === userRole;
  // Determine if the message is from the sender or receiver

  return (
    <div
      className={`flex relative ${
        isSender ? "justify-end " : "justify-start"
      } mb-4`}
    >
      <div
        className={`flex items-start max-w-[70%] ${
          isSender ? "flex-row-reverse " : "flex-row"
        }`}
      >
        <img
          className="w-10 h-10 rounded-full object-cover"
          src="https://img.freepik.com/free-photo/cartoon-man-wearing-glasses_23-2151136892.jpg?t=st=1738241888~exp=1738245488~hmac=53a101aae8483060e1456033a794e2e67f594075a577df2c4a42313470a52736&w=1380"
          alt=""
        />
        <div className={`mx-2 ${isSender ? "text-right" : "text-left"}`}>
          <div>
            <p className="text-slate-500 text-xs mx-4 mt-1">17:20</p>
          </div>
          <div className={`p-3 rounded-lg inline-block ${colorScheme}`}>
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;

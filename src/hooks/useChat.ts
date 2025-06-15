/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

export const useChat = () => {
    const { socket } = useSocket();
    const [messages, setMessages] = useState<any[]>([]);
    const [typingStatus, setTypingStatus] = useState<{
        userId: string;
        isTyping: boolean;
    } | null>(null);
    const [chatMembers, setChatMembers] = useState<any[]>([]);

    // Initialize all socket listeners
    useEffect(() => {
        if (!socket) return;

        // Chat members list
        socket.on("allChatMembers", (sortedChats: any[]) => {
            setChatMembers(sortedChats);
            console.log("useChat: chatMembers", sortedChats);
        });

        // Message history when joining
        socket.on("messageHistory", (messages: any[]) => {
            setMessages(messages);
        });
        

        // Message received
        socket.on("receiveMessage", (message: any) => {
            console.log(message, 'receiveMessage');
            setMessages((prev) => [...prev, message]);
        });
  

        // Typing indicator
        socket.on("typing", (data: { userId: string; isTyping: boolean }) => {
            setTypingStatus(data);
        });

        // Message read receipt
        socket.on("messageRead", ({ messageId }: { messageId: string }) => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === messageId ? { ...msg, isRead: true } : msg
                )
            );
        });

        // Error handling
        socket.on("chatError", (error: any) => {
            console.error("Chat error:", error);
        });

        return () => {
            socket.off("allChatMembers");
            socket.off("messageHistory");
            socket.off("receiveMessage");
            socket.off("typing");
            socket.off("messageRead");
            socket.off("chatError");
        };
    }, [socket]);

    // Helper functions

    const getAllChatMembers = () => {
        socket?.emit("getAllChatMembers");
    };

    const joinChat = (chatId: string) => {
        socket?.emit("joinChat", { chatId });
    };

    const sendMessage = (
        chatId: string,
        content: string,
        callback: (response: any) => void
    ) => {
        socket?.emit("sendMessage", { chatId, content }, callback);
    };

    const setTyping = (chatroomId: string, isTyping: boolean) => {
        socket?.emit("typing", { chatroomId, isTyping });
    };

    const markAsRead = (messageId: string, chatroomId: string) => {
        socket?.emit("markAsRead", { messageId, chatroomId });
    };

   

    return {
        messages,
        typingStatus,
        chatMembers,
        getAllChatMembers,
        joinChat,
        sendMessage,
        setTyping,
        markAsRead,
    };
};

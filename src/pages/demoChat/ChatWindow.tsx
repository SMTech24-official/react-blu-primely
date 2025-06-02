import React, { useState, useRef, useEffect } from "react";
import TypingIndicator from "./TypingIndicator";
import { Chat, Message } from "./type";
import MessageBubble from "./MessageBuble";

interface ChatWindowProps {
    chat: Chat | null;
    messages: Message[];
    onSendMessage: (content: string) => void;
    onTyping: (isTyping: boolean) => void;
    currentUser: string;
    isTyping: boolean;
    typingUser: string | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
    chat,
    messages,
    onSendMessage,
    onTyping,
    currentUser,
    isTyping,
    typingUser,
}) => {
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
            onTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    if (!chat) {
        return (
            <div className="empty-chat">
                <p>Select a chat to start messaging</p>
            </div>
        );
    }

    return (
        <div className="chat-window">
            {/* Chat header */}
            <div className="chat-header">
                <img
                    src={chat.lastMessage?.sender.profilePicture || ''}
                    alt={chat.lastMessage?.sender.fullName || 'Unknown'}
                    className="header-avatar"
                />
                <div className="header-info">
                    <h3>{chat.lastMessage?.sender.fullName || "New Chat"}</h3>
                    <p>{typingUser && isTyping ? "typing..." : "Online"}</p>
                </div>
            </div>

            {/* Messages area */}
            <div className="messages-container">
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        isCurrentUser={msg.senderId === currentUser}
                    />
                ))}
                <div ref={messagesEndRef} />
                <TypingIndicator
                    isTyping={isTyping}
                    userName={typingUser || ""}
                />
            </div>

            {/* Message input */}
            <div className="message-input-container">
                <textarea
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        onTyping(e.target.value.length > 0);
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows={1}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
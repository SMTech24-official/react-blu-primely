import React from "react";
import { Message } from "./type";


interface MessageBubbleProps {
    message: Message;
    isCurrentUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isCurrentUser }) => {
    return (
        <div className={`message-bubble ${isCurrentUser ? 'current-user' : 'other-user'}`}>
            {!isCurrentUser && (
                <img
                    src={message.sender.profilePicture}
                    alt={message.sender.fullName}
                    className="message-avatar"
                />
            )}
            <div className="message-content">
                <div className="message-text">{message.content}</div>
                <div className="message-meta">
                    <span className="message-time">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                    {isCurrentUser && (
                        <span className="message-status">
                            {message.isRead ? "✓✓" : "✓"}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
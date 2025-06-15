import React from "react";
import { Chat } from "./type";


interface ChatListProps {
    chats: Chat[];
    onSelectChat: (chatId: string) => void;
    currentUser: string;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat }) => {

    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="chat-list">
            {chats.map((chat) => (
                <div
                    key={chat.id}
                    className="chat-list-item"
                    onClick={() => onSelectChat(chat.id)}
                >
                    <div className="chat-avatar">
                        <img
                            src={chat.logo || 'https://img.freepik.com/free-vector/human-group-connecting-topology-concept-background-design_1017-53324.jpg?uid=R110243807&ga=GA1.1.1263961191.1744328790&semt=ais_hybrid&w=740'}
                            alt={chat.lastMessage?.sender.fullName || 'Unknown'}
                        />
                        {chat.unreadCount > 0 && (
                            <span className="unread-badge">{chat.unreadCount}</span>
                        )}
                    </div>
                    
                    <div className="chat-info">
                        <div className="chat-name">
                            {chat.lastMessage?.sender?.fullName || 'New Chat'}
                        </div>
                        <div className="chat-preview">
                            <span className="chat-message">
                                {chat.lastMessage?.content || 'No messages yet'}
                            </span>
                            {chat.lastMessage && (
                                <span className="chat-time">
                                    {formatDate(chat.lastMessage.createdAt)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
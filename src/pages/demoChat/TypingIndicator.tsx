import React from "react";

interface TypingIndicatorProps {
    isTyping: boolean;
    userName: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isTyping, userName }) => {
    if (!isTyping) return null;

    return (
        <div className="typing-indicator">
            <span>{userName} is typing</span>
            <div className="typing-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    );
};

export default TypingIndicator;
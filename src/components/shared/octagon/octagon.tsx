import React from "react";

interface OctagonCardProps {
  prize: number;
  description?: string;
  className?: string;
}

const OctagonCard: React.FC<OctagonCardProps> = ({
  prize,
  description = "Winning prize",
  className = "",
}) => {
  return (
    <div
      className={`css_octagon aspect-square  css_bg px-4 py-6 text-lg font-semibold ${className} `}
    >
      <div className="flex flex-col items-center justify-center  gap-1">
        <span className="text-[28px] font-extrabold">${prize}</span>
        <span className="text-xs">{description}</span>
      </div>
    </div>
  );
};

export default OctagonCard;

import React from "react";

interface StatIndicatorProps {
  value: string | number;
  label: string;
  className?: string;
}

const StatIndicator: React.FC<StatIndicatorProps> = ({
  value,
  label,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative flex items-center justify-center mb-4">
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-md"></div>

        {/* Circle border with glow */}
        <div
          className="w-24 h-24 rounded-full border border-indigo-500/50 flex items-center justify-center
                      bg-black bg-opacity-50 backdrop-blur-sm
                      transition-all duration-300 hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
        >
          <span className="text-white font-bold text-xl">{value}</span>
        </div>
      </div>
      <p className="text-white text-sm text-center">{label}</p>
    </div>
  );
};

export default StatIndicator;

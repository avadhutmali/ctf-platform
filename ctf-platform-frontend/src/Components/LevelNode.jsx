import React from 'react';

// --- Level Node Component ---
const LevelNode = ({ level, status, onClick }) => {
  const isClickable = status === 'unlocked';
  const baseClasses = "w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl shadow-lg transition-transform duration-200";

  const statusClasses = {
    solved: "bg-green-500 text-white transform hover:scale-105 cursor-pointer",
    unlocked: "bg-blue-500 text-white animate-pulse transform hover:scale-110 cursor-pointer",
    locked: "bg-gray-700 text-gray-500 cursor-not-allowed",
  };

  const icons = {
    solved: '✔',
    unlocked: level,
    locked: '🔒',
  }

  return (
    <div
      className={`${baseClasses} ${statusClasses[status]}`}
      onClick={() => isClickable && onClick(level)}
    >
      {icons[status]}
    </div>
  );
};

export default LevelNode;

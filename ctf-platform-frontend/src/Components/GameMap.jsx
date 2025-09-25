import React from 'react';
import LevelNode from './LevelNode';
import CountdownTimer from './CountdownTimer';

const GameMap = ({ username, score, solvedLevels, challenges, isFrozen, endTime, onLevelClick, onLogout, onShowLeaderboard }) => {
  const levelStatus = (level) => {
    if (solvedLevels.includes(level)) {
      return 'solved';
    }
    if (level === 1) {
        return 'unlocked';
    }
    if (solvedLevels.includes(level - 1)) {
      return 'unlocked';
    }
    return 'locked';
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome, {username}!</h1>
        <div className="flex items-center space-x-4">
          <p className="text-xl font-semibold">Score: <span className="text-yellow-400">{score}</span></p>
          <button onClick={onShowLeaderboard} className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">
            Leaderboard
          </button>
          <button onClick={onLogout} className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700">
            Logout
          </button>
        </div>
      </header>
      
      <div className="flex justify-center items-center mb-12 text-center">
        {isFrozen && <h2 className="text-2xl font-bold text-cyan-400 mr-8">LEADERBOARD IS FROZEN</h2>}
        <CountdownTimer endTime={endTime} />
      </div>

      <div className="flex flex-col items-center space-y-8">
        {challenges.map(challenge => (
          <LevelNode 
            key={challenge.level}
            level={challenge.level}
            status={levelStatus(challenge.level)}
            onClick={onLevelClick}
          />
        ))}
      </div>
    </div>
  );
};

export default GameMap;
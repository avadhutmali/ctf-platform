import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const Leaderboard = ({ currentUser, onClose }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/leaderboard`);
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data.');
        }
        const data = await response.json();
        setLeaderboard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 text-white p-4 sm:p-8 z-50 flex flex-col">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-400">Leaderboard</h1>
        <button onClick={onClose} className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">
          &larr; Back
        </button>
      </header>
      
      <div className="flex-grow overflow-y-auto">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}
        {!loading && !error && (
          <div className="w-full max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg">
            <ul className="divide-y divide-gray-700">
              {leaderboard.map((user, index) => {
                const isCurrentUser = currentUser && user.username === currentUser.username;
                const rowClasses = isCurrentUser
                  ? "bg-yellow-500/20 ring-2 ring-yellow-400"
                  : "hover:bg-gray-700/50";

                return (
                  <li key={user.id} className={`flex items-center p-4 transition-colors duration-200 ${rowClasses}`}>
                    <span className="text-2xl font-bold w-16 text-center text-gray-400">{index + 1}</span>
                    <div className="flex-grow">
                      <p className="text-xl font-semibold">{user.username}</p>
                    </div>
                    <span className="text-2xl font-bold text-yellow-400">{user.score} pts</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
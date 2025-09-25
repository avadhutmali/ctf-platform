import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import GameMap from './components/GameMap';
import FlagSubmissionModal from './components/FlagSubmissionModal';
import Leaderboard from './components/Leaderboard';
import { API_BASE_URL } from './config';

// App now correctly receives contestStatus from its parent (ContestWrapper)
function App({ contestStatus }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [viewingLeaderboard, setViewingLeaderboard] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('ctfUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      handleLogin(parsedUser.username, parsedUser.password, () => {});
    }
  }, []);
  
  const handleLogin = async (username, password, setError) => {
    try {
      const leaderboardResponse = await fetch(`${API_BASE_URL}/api/leaderboard`);
      if (!leaderboardResponse.ok) throw new Error("Could not connect to the server.");
      
      const users = await leaderboardResponse.json();
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        const challengesResponse = await fetch(`${API_BASE_URL}/api/challenges`);
        if (!challengesResponse.ok) throw new Error("Could not fetch challenges.");
        
        const challengesData = await challengesResponse.json();
        setChallenges(challengesData);

        const userData = {
          ...user,
          solvedLevels: user.solvedLevels ? user.solvedLevels.split(',').filter(Boolean).map(Number) : []
        };
        setCurrentUser(userData);
        localStorage.setItem('ctfUser', JSON.stringify(userData));
      } else {
        setError("Invalid Username or Password.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (username, password, setError) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const resultText = await response.text();
        if (!response.ok) {
            throw new Error(resultText || "Registration failed.");
        }
        alert("Registration successful! Please log in.");

    } catch (err) {
        setError(err.message);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setChallenges([]);
    localStorage.removeItem('ctfUser');
  };

  const handleShowLeaderboard = () => setViewingLeaderboard(true);
  const handleHideLeaderboard = () => setViewingLeaderboard(false);

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
  };
  
  const handleFlagSubmit = async (level, flag) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: currentUser.id,
                password: currentUser.password,
                level,
                flag,
            }),
        });

        const resultText = await response.text();
        
        if (!response.ok) {
            return { success: false, message: resultText };
        }
        
        if (resultText.includes('Correct')) {
            const challenge = challenges.find(c => c.level === level);
            const updatedUser = {
                ...currentUser,
                score: currentUser.score + (challenge ? challenge.points : 0),
                solvedLevels: [...currentUser.solvedLevels, level],
            };
            setCurrentUser(updatedUser);
            localStorage.setItem('ctfUser', JSON.stringify(updatedUser));
    
            return { success: true, message: resultText };
        } else {
            return { success: false, message: resultText };
        }

    } catch (error) {
        return { success: false, message: 'An error occurred while submitting.' };
    }
  };

  return (
    <>
      {viewingLeaderboard ? (
        <Leaderboard 
          currentUser={currentUser} 
          onClose={handleHideLeaderboard} 
          // This is the critical line that passes the frozen status down.
          isFrozen={contestStatus.isFrozen}
        />
      ) : !currentUser ? (
        <LoginScreen 
          onLogin={handleLogin} 
          onRegister={handleRegister} 
          onShowLeaderboard={handleShowLeaderboard}
        />
      ) : (
        <GameMap 
          username={currentUser.username}
          score={currentUser.score}
          solvedLevels={currentUser.solvedLevels}
          challenges={challenges}
          isFrozen={contestStatus.isFrozen}
          endTime={contestStatus.endTime}
          onLevelClick={handleLevelClick}
          onLogout={handleLogout}
          onShowLeaderboard={handleShowLeaderboard}
        />
      )}

      {selectedLevel && (
        <FlagSubmissionModal 
            level={selectedLevel}
            onClose={() => setSelectedLevel(null)}
            onSubmit={handleFlagSubmit}
        />
      )}
    </>
  );
}

export default App;
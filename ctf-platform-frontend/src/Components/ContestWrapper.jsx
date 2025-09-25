import React, { useState, useEffect } from 'react';
import App from '../App'; // We will render the main App component from here
import { API_BASE_URL } from '../config';

// A simple component to show while waiting for the server
const LoadingScreen = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-2xl">
        Connecting to the contest server...
    </div>
);

// A simple component to show before the contest starts
const PreContestScreen = ({ startTime }) => {
    const [timeRemaining, setTimeRemaining] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const start = new Date(startTime);
            const diff = start - now;

            if (diff <= 0) {
                setTimeRemaining("The contest is about to begin!");
                // Optionally, force a page reload to enter the contest
                setTimeout(() => window.location.reload(), 2000);
                clearInterval(timer);
                return;
            }

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeRemaining(`${d}d ${h}h ${m}m ${s}s`);
        }, 1000);

        return () => clearInterval(timer);
    }, [startTime]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-4">Contest Has Not Started</h1>
            <p className="text-2xl">Time remaining until start:</p>
            <p className="text-6xl font-mono mt-4">{timeRemaining}</p>
        </div>
    );
};

// A simple component for when the contest is over
const PostContestScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-5xl font-bold">The Contest is Over!</h1>
        <p className="text-2xl mt-4">Thank you for participating.</p>
    </div>
);


const ContestWrapper = () => {
    const [contestStatus, setContestStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch(`https://ctf-platform-production-4683.up.railway.app/api/contest/status`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    mode: 'cors', // explicitly enable CORS
                });
                console.log("here is the error")
                if (!response.ok) {
                    throw new Error('Could not fetch contest status.');
                }
                const data = await response.json();
                setContestStatus(data);
            } catch (err) {
                setError(err.message);
                // Stop polling on error
                return true; 
            }
            return false;
        };

        // Fetch immediately on load
        fetchStatus();

        // Then, poll every 30 seconds to keep the time synced
        const interval = setInterval(async () => {
            const hasError = await fetchStatus();
            if (hasError) {
                clearInterval(interval);
            }
        }, 30000);
        
        setLoading(false);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    if (loading || !contestStatus) {
        return <LoadingScreen />;
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-screen bg-red-900 text-white text-xl">{error}</div>;
    }

    // Conditional rendering based on the status from the backend
    switch (contestStatus.status) {
        case 'PENDING':
            return <PreContestScreen startTime={contestStatus.startTime} />;
        case 'RUNNING':
        case 'FROZEN':
            // If the contest is live, render the main app and pass the status down
            return <App contestStatus={contestStatus} />;
        case 'FINISHED':
            return <PostContestScreen />;
        default:
            return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">Unknown contest state.</div>;
    }
};

export default ContestWrapper;
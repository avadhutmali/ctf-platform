import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ endTime }) => {
    const calculateTimeLeft = () => {
        const difference = new Date(endTime) - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60))),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const formatTime = (time) => String(time).padStart(2, '0');

    const timerComponents = [];
    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) {
            return;
        }
        timerComponents.push(
            <span key={interval}>
                {formatTime(timeLeft[interval])}{interval !== 'seconds' ? ':' : ''}
            </span>
        );
    });

    return (
        <div className="text-xl font-semibold bg-gray-700 px-4 py-2 rounded-lg">
            <span>Time Remaining: </span>
            <span className="font-mono text-yellow-400">
                {timerComponents.length ? timerComponents : "Time's Up!"}
            </span>
        </div>
    );
};

export default CountdownTimer;
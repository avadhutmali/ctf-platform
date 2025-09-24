import React, { useState } from 'react';

const FlagSubmissionModal = ({ level, onClose, onSubmit }) => {
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      const result = await onSubmit(level, flag);
      setMessage(result.message);
      if (result.success) {
          setTimeout(() => {
              onClose();
          }, 1500);
      }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md text-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Challenge Level {level}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter flag: flag{...}"
                />
                <div className="mt-6 flex justify-between items-center">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700">
                        Close
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">
                        Submit Flag
                    </button>
                </div>
            </form>
            {message && (
                <p className={`mt-4 text-center ${message.includes('Correct') ? 'text-green-400' : 'text-red-400'}`}>
                    {message}
                </p>
            )}
        </div>
    </div>
  );
};

export default FlagSubmissionModal;

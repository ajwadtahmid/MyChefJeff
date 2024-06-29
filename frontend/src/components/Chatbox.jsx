import React, {useState} from 'react';

const Chatbox = ({onSendMessage}) => {
    const [message,
        setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            onSendMessage(message);
            setMessage('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-0 w-full bg-primary-600 p-2 sm:p-4 z-50">
            <div className="flex">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow p-1 sm:p-2 rounded-l text-text bg-white"
                    placeholder="Ask Chef Jeff!"/>
                <button
                    onClick={handleSendMessage}
                    className="bg-accent-500 text-text p-2 sm:p-3 rounded-r">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbox;

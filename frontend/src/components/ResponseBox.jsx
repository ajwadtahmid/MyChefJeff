import React from 'react';

const ResponseBox = ({messages, isTyping}) => {
    return (
        <div
            className="fixed top-0 right-0 w-full sm:w-1/4 h-full p-2 sm:p-4 bg-customGray overflow-y-auto shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-white">Responses</h2>
            <div className="max-h-full overflow-y-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded-lg mb-2 ${msg.type === 'received'
                        ? 'bg-gray-300 text-black'
                        : 'bg-blue-500 text-white self-end'}`}>
                        {msg.text}
                    </div>
                ))}
                {isTyping && (
                    <div className="p-2 rounded-lg mb-2 bg-gray-300 text-black">
                        <span className="animate-pulse">Chef Jeff is typing...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResponseBox;

import React, {useRef, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';

const ResponseBox = ({messages, isTyping}) => {
    const containerRef = useRef(null);

    // Scroll to the bottom of the container when new messages are added
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div
            className="fixed top-0 right-0 w-full sm:w-1/4 h-1/2 p-2 sm:p-4 bg-customGray shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-white">Chef's Response</h2>
            <div ref={containerRef} className="flex-col sm:max-h-full overflow-y-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded-lg mb-2 ${msg.type === 'received'
                        ? 'bg-gray-300 text-black'
                        : 'bg-blue-500 text-white self-end'}`}>
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
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

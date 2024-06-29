import React, {useState} from 'react';
import Chatbox from "./Chatbox";
import ChefJeff from './ChefJeff';
import ResponseBox from './ResponseBox';

const Hero = () => {
    const [animationState,
        setAnimationState] = useState('closed');
    const [messages,
        setMessages] = useState([]);
    const [isTyping,
        setIsTyping] = useState(false);

    const handleSendMessage = (message) => {
        setAnimationState('loading');
        const newMessage = {
            text: message,
            type: 'sent'
        };
        const newMessages = [
            ...messages,
            newMessage
        ];
        setMessages(newMessages);

        // Simulate typing indicator
        setTimeout(() => {
            setIsTyping(true);

            // Simulate loading response
            setTimeout(() => {
                const response = "This is a response message.";
                setAnimationState('talking');
                setIsTyping(false);
                setMessages(prevMessages => [
                    ...newMessages, {
                        text: response,
                        type: 'received'
                    }
                ]);

                // Simulate end of talking
                setTimeout(() => {
                    setAnimationState('closed');
                }, 3000); // Talk for 3 seconds
            }, 2000); // Load for 2 seconds
        }, 1000); // Typing indicator delay
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-start bg-customGray relative p-4 pt-16 sm:pt-24 md:pt-32">
            <div className="flex items-center justify-center w-full mb-8">
                <ChefJeff animationState={animationState}/>
            </div>
            {animationState === 'closed' && <Chatbox onSendMessage={handleSendMessage}/>}
            <ResponseBox messages={messages} isTyping={isTyping}/>
        </div>
    );
};

export default Hero;

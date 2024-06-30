import React, { useState } from 'react';
import axios from 'axios';

import Chatbox from './Chatbox';
import ChefJeff from './ChefJeff';
import ResponseBox from './ResponseBox';
import Prompt from './Prompt';

const Hero = () => {
    const [animationState, setAnimationState] = useState('smiling');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [selectedButton, setSelectedButton] = useState(null);

    const handleSendMessage = async (message) => {
        setAnimationState('loading');
        const newMessage = {
            text: message,
            type: 'sent'
        };
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);

        // Simulate typing indicator
        setTimeout(() => {
            setIsTyping(true);
        }, 1000); // Typing indicator delay

        try {
            const response = await axios.post('http://localhost:5000/api/message', {
                message,
                type: selectedButton.toLowerCase()
            });

            const apiResponse = response.data.response; // Assuming your API response structure

            setAnimationState('talking');
            setIsTyping(false);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: apiResponse,
                    type: 'received'
                }
            ]);

            // Simulate end of talking
            setTimeout(() => {
                setAnimationState('smiling');
            }, 3000); // Talk for 3 seconds
        } catch (error) {
            console.error('Error fetching API:', error);
            setIsTyping(false);
            setAnimationState('smiling');
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: 'Sorry, something went wrong.',
                    type: 'received'
                }
            ]);
        }
    };

    const handleButtonClick = (buttonLabel) => {
        setSelectedButton(buttonLabel);
        console.log(`${buttonLabel} clicked`);

        let responseMessage;
        switch (buttonLabel) {
            case 'Budget':
                responseMessage = "Great! Let's find some good ongoing deals, what kind of food do you want to eat?";
                break;
            case 'Plan':
                responseMessage = "Awesome! Let's plan your meals. Do you have any dietary preferences?";
                break;
            case 'Recipie':
                responseMessage = "Sure! Let's find a recipe for you. What ingredients do you have?";
                break;
            default:
                responseMessage = "How can I assist you today?";
        }

        const newMessages = [
            ...messages,
            {
                text: responseMessage,
                type: 'received'
            }
        ];
        setMessages(newMessages);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-customGray relative p-4 pt-16">
            <div className="flex flex-col items-center justify-center w-full mb-8">
                <ChefJeff animationState={animationState} />
                <div className="p-1">
                    <Prompt onButtonClick={handleButtonClick} />
                </div>
            </div>
            {selectedButton && (
                <>
                    <Chatbox onSendMessage={handleSendMessage} />
                    <ResponseBox messages={messages} isTyping={isTyping} />
                </>
            )}
        </div>
    );
};

export default Hero;

import React, {useState} from 'react';
import Chatbox from './Chatbox';
import ChefJeff from './ChefJeff';
import ResponseBox from './ResponseBox';
import Prompt from './Prompt';

const Hero = () => {
    const [animationState,
        setAnimationState] = useState('smiling');
    const [messages,
        setMessages] = useState([]);
    const [isTyping,
        setIsTyping] = useState(false);
    const [selectedButton,
        setSelectedButton] = useState(null);

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
                const response = 'This is a response message.';
                setAnimationState('talking');
                setIsTyping(false);
                setMessages((prevMessages) => [
                    ...newMessages, {
                        text: response,
                        type: 'received'
                    }
                ]);

                // Simulate end of talking
                setTimeout(() => {
                    setAnimationState('smiling');
                }, 3000); // Talk for 3 seconds
            }, 2000); // Load for 2 seconds
        }, 1000); // Typing indicator delay
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
            ...messages, {
                text: responseMessage,
                type: 'received'
            }
        ];
        setMessages(newMessages);
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-start bg-customGray relative p-4 pt-16">
            <div className="flex flex-col items-center justify-center w-full mb-8">
                <ChefJeff animationState={animationState}/>
                <div className="p-1">
                    <Prompt onButtonClick={handleButtonClick}/>
                </div>
            </div>
            {selectedButton && (<> <Chatbox onSendMessage={handleSendMessage}/> < ResponseBox messages = {
                messages
            }
            isTyping = {
                isTyping
            } /> </>)}
        </div>
    );
};

export default Hero;

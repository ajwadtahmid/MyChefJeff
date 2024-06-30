/**
 * Hero Component
 *
 * This component serves as the main interface for the AI chatbot, handling user interactions
 * and communicating with the backend API. It maintains the state of the chat, including messages,
 * typing indicators, and animation states. It uses various child components to provide a
 * responsive and interactive chat experience.
 *
 *
 * Functions:
 * - handleSendMessage: Sends a message to the backend API and updates the state.
 * - handleButtonClick: Handles button clicks and updates the chat messages.
 * - handleReset: Resets the chat and sends a reset request to the backend API.
 */

import React, {useState} from 'react';
import axios from 'axios';
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

    const handleSendMessage = async(message, reset = false) => {
        setAnimationState('loading');

        const newMessage = {
            text: message,
            type: 'sent'
        };
        const newMessages = reset
            ? [newMessage]
            : [
                ...messages,
                newMessage
            ];
        setMessages(newMessages);

        if (!reset) {
            setTimeout(() => {
                setIsTyping(true);
            }, 500);
        } else {
            setIsTyping(false);
        }

        try {
            const response = await axios.post('https://chefjeff.pythonanywhere.com/api/message', {
                message,
                type: selectedButton
                    ? selectedButton.toLowerCase()
                    : 'general',
                reset
            });

            const apiResponse = response.data.response;

            setAnimationState('talking');
            setMessages((prevMessages) => [
                ...prevMessages, {
                    text: apiResponse,
                    type: 'received'
                }
            ]);
        } catch (error) {
            console.error('Error fetching API:', error);
            setMessages((prevMessages) => [
                ...prevMessages, {
                    text: 'Sorry, something went wrong.',
                    type: 'received'
                }
            ]);
        } finally {
            setIsTyping(false);
            setTimeout(() => {
                setAnimationState('smiling');
            }, 3000); // Talk for 3 seconds
        }
    };

    const handleButtonClick = (buttonLabel) => {
        setSelectedButton(buttonLabel);
        console.log(`${buttonLabel} clicked`);

        let responseMessage;
        switch (buttonLabel) {
            case 'Budget':
                responseMessage = "Great! Let's find something in your budget, how much do you want to spend?";
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

    const handleReset = async() => {
        try {
            await axios.post('http://localhost:8000/api/message', {
                message: '',
                type: 'reset',
                reset: true
            });
        } catch (error) {
            console.error('Error resetting AI:', error);
        }

        // Reset all states to initial values
        setSelectedButton(null);
        setMessages([]);
        setIsTyping(false);
        setAnimationState('smiling');
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-start bg-customGray relative p-4 pt-16">
            <div className="flex flex-col items-center justify-center w-full mb-8">
                <ChefJeff animationState={animationState}/>
                <div className="p-1">
                    <Prompt onButtonClick={handleButtonClick} selectedButton={selectedButton}/>
                </div>
            </div>
            {selectedButton && (<> <Chatbox onSendMessage={handleSendMessage}/> < ResponseBox messages = {
                messages
            }
            isTyping = {
                isTyping
            }
            handleReset = {
                handleReset
            } /> </>)}
        </div>
    );
};

export default Hero;

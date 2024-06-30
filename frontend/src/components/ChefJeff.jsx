/**
 * ChefJeff Component
 *
 * This component displays an animated character, Chef Jeff, whose appearance changes based
 * on the provided animation state. It supports different animations such as smiling and talking,
 * and includes a 3D effect that follows the user's mouse movement.
 *
 * Functions:
 * - useEffect (Mouse Move): Adds a mouse move listener to create the 3D rotation effect.
 * - useEffect (Animation State): Changes the image based on the animation state.
 * - useEffect (Talking Animation): Handles the talking animation by toggling between open and closed mouth images.
 */

import React, {useState, useEffect} from 'react';
import chefJeffSmile from "../assets/chef_smile.svg";
import chefJeffTalkingOpen from "../assets/chef_jeff_talking_open.svg";
import chefJeffTalkingClosed from "../assets/chef_jeff_talking_closed.svg";

const ChefJeff = ({animationState}) => {
    const [currentImage,
        setCurrentImage] = useState(chefJeffSmile);
    const [talkingIndex,
        setTalkingIndex] = useState(0);
    const [rotation,
        setRotation] = useState({x: 0, y: 0});

    const images = {
        smiling: chefJeffSmile,
        talking: [chefJeffTalkingOpen, chefJeffTalkingClosed]
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            const {clientX, clientY} = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;
            setRotation({
                x: deltaY / centerY * 15,
                y: deltaX / centerX * 15
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        let interval;
        if (animationState === 'talking') {
            interval = setInterval(() => {
                setTalkingIndex((prevIndex) => (prevIndex + 1) % images.talking.length);
            }, 500); // Change image every 500ms for talking effect
        } else if (animationState !== 'loading') {
            setCurrentImage(images.smiling);
        }

        return () => clearInterval(interval);
    }, [animationState]);

    useEffect(() => {
        if (animationState === 'talking') {
            setCurrentImage(images.talking[talkingIndex]);
        }
    }, [talkingIndex, animationState]);

    return (<img
        src={currentImage}
        alt="Chef Jeff Animation"
        className={`w-48 h-auto sm:w-72 sm:h-auto md:w-96 md:h-auto ${animationState === 'loading'
        ? 'loading-animation'
        : ''}`}
        style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
    }}/>);
};

export default ChefJeff;

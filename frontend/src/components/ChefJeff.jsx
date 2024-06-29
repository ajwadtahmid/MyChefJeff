import React, {useState, useEffect} from 'react';
import chefJeffClosed from "../assets/chef_jeff_closed.svg";
import chefJeffSmile from "../assets/chef_smile.svg";
import chefJeffTalkingOpen from "../assets/chef_jeff_talking_open.svg";
import chefJeffTalkingClosed from "../assets/chef_jeff_talking_closed.svg";

const ChefJeff = ({animationState}) => {
    const [currentImage,
        setCurrentImage] = useState(chefJeffClosed);
    const [talkingIndex,
        setTalkingIndex] = useState(0);

    const images = {
        closed: chefJeffClosed,
        smiling: chefJeffSmile,
        talking: [
            chefJeffTalkingOpen, chefJeffTalkingClosed
        ],
        loading: chefJeffSmile, // Use a loading image if available
    };

    useEffect(() => {
        let interval;
        if (animationState === 'talking') {
            interval = setInterval(() => {
                setTalkingIndex((prevIndex) => (prevIndex + 1) % images.talking.length);
            }, 500); // Change image every 500ms for talking effect
        } else {
            setCurrentImage(images[animationState]);
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
        className={`w-48 h-auto sm:w-72 sm:h-auto md:w-96 md:h-auto ${animationState === 'smiling'
        ? 'smile'
        : ''} ${animationState === 'talking'
            ? 'talk'
            : ''}`}/>);
};

export default ChefJeff;

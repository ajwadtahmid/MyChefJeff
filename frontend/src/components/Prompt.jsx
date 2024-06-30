import React from 'react';

import Budget from '../assets/buttons/budget.svg';
import Plan from '../assets/buttons/plan.svg';
import Recipie from '../assets/buttons/recipie.svg';

const Prompt = ({onButtonClick, selectedButton}) => {
    const handleButtonClick = (buttonLabel) => {
        onButtonClick(buttonLabel);
    };

    const getButtonStyle = (buttonLabel) => {
        return selectedButton === buttonLabel
            ? 'w-50 h-50 cursor-pointer filter brightness-50' // Selected style
            : 'w-50 h-50 cursor-pointer'; // Default style
    };

    return (
        <div className="flex space-x-4 mt-4">
            <img
                src={Budget}
                alt="Budget"
                className={getButtonStyle('Budget')}
                onClick={() => handleButtonClick('Budget')}/>
            <img
                src={Plan}
                alt="Plan"
                className={getButtonStyle('Plan')}
                onClick={() => handleButtonClick('Plan')}/>
            <img src={Recipie} alt="Recipie" // Ensure this matches the case in handleButtonClick switch statement
                className={getButtonStyle('Recipie')} onClick={() => handleButtonClick('Recipie')}/>
        </div>
    );
};

export default Prompt;

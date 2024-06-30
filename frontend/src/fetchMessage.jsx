import { useState } from "react";

const useFetchMessage = () => {
    const [response, setResponse] = useState('');

    const fetchMessage = async (message) => {
        try {
            const res = await fetch('/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await res.json();
            setResponse(data.response);
        } catch (error) {
            console.error('Error fetching message:', error);
        }
    };

    return [response, fetchMessage];
};

export default useFetchMessage;

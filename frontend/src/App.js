import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  const fetchAPI = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/message');
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      {message ? message : 'Loading...'}
    </div>
  );
}

export default App;

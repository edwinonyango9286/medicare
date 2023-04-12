import React, { useState } from 'react';
import axios from 'axios';


function Gpt () {
  const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  const API_KEY = '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';

  const generateResponse = async (inputText) => {
    const response = await axios.post(API_URL, {
      prompt: inputText,
      max_tokens: 2048,
      temperature: 0.7,
      n: 1,
      stop: '\n'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    return response.data.choices[0].text;
  };

  const [userText, setUserText] = useState('');
  const [botText, setBotText] = useState('');

  const handleUserTextChange = (event) => {
    setUserText(event.target.value);
  };

  const handleUserTextSubmit = async () => {
    const response = await generateResponse(userText);
    setBotText(response);
    setUserText('');
  };

  return (
    <div>
      <div>
        <label htmlFor="user-text">Your message:</label>
        <input id="user-text" value={userText} onChange={handleUserTextChange} />
        <button onClick={handleUserTextSubmit}>Send</button>
      </div>
      {botText && (
        <div>
          <strong>Bot says:</strong> {botText}
        </div>
      )}
    </div>
  );
};

export default Gpt;

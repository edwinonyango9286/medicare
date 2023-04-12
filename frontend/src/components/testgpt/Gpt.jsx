import React from 'react'
import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/engine/davinci-codex/completions';

const apiKey = 'YOUR_API_KEY_HERE';

const generateResponse = async (inputText) => {
  const response = await axios.post(API_URL, {
    prompt: inputText,
    max_tokens: 60,
    temperature: 0.7,
    n: 1,
    stop: '\n'
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  });

  return response.data.choices[0].text;
};

// Example usage:
generateResponse('Hello, ChatGPT!').then(response => {
  console.log(response);
});

const Gpt = () => {
  return (
    <div>Gpt</div>
  )
}

export default Gpt
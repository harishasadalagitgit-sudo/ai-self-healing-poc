import axios from 'axios';

export async function queryPhi(prompt: string) {
  const response = await axios.post(
    'http://127.0.0.1:11434/api/generate',
    {
      model: 'phi3',
      prompt,
      stream: false
    }
  );

  return response.data.response;
}

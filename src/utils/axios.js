import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',  // Set your backend server URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
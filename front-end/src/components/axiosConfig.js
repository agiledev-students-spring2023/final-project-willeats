import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/', // Replace with your base URL
});

export default instance;

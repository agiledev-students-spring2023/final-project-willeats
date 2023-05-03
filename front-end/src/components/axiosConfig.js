import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://orca-app-p3any.ondigitalocean.app/final-project-willeats-back-end/', // Replace with your base URL
  baseURL: 'http://localhost:3001/'
});

export default instance;

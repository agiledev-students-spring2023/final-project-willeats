import axios from 'axios';

const instance = axios.create({
  baseURL: 'http:///final-project-willeats-back-end:8081/', // Replace with your base URL
});

export default instance;

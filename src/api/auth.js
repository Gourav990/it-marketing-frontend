import axios from 'axios';

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
//   withCredentials: true,
// });

const instance = axios.create({
  baseURL: "/api", // 🔥 Use relative path because Vite will proxy this
  axios.defaults.withCredentials = true;
});



export default instance;

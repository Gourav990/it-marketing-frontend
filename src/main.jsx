import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { UserProvider } from "./context/UserContext"; // ✅ Add this

// AOS: Animate On Scroll
import AOS from 'aos'
import 'aos/dist/aos.css'

// Initialize AOS once before rendering
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <UserProvider>
      <App />
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)

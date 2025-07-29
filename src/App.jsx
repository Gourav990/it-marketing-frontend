import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Toaster } from 'react-hot-toast';
import ScrollToTop from "./components/ScrollToTop";


// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ViewProfile from "./pages/ViewProfile";
import Settings from "./pages/Settings";

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminExternal from "./pages/Admin";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/admin" element={<AdminExternal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ViewProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-center" />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default App

import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "/it-logo.svg";
import axios from "axios";
import { useUser } from "../context/UserContext"; 
import { useLocation } from "react-router-dom";


import { ChevronDown } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000";

export default function Navbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { avatar, setAvatar } = useUser(); // ✅ Use this
  const location = useLocation();

useEffect(() => {
  const skipPaths = ["/login", "/register"];
  if (skipPaths.includes(location.pathname)) return;

  axios
    .get(`${BACKEND_URL}/api/me`, { withCredentials: true })
    .then((res) => {
      const user = res.data.user;
      setUserName(user.name);
      setUserEmail(user.email);
      setUserId(user._id);
      setIsLoggedIn(true);
      setIsAdmin(user.role === "admin");

      const savedAvatar = localStorage.getItem(`avatar-${user._id}`);
      if (savedAvatar) setAvatar(savedAvatar);
    })
     .catch(() => {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setAvatar(null);
    });
}, [location.pathname]);


 const handleLogout = async () => {
  try {
    await axios.post(`${BACKEND_URL}/api/logout`, {}, { withCredentials: true });
    setAvatar(null);
    localStorage.removeItem(`avatar-${userId}`);
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/");
    window.location.reload(); // optional force clear UI
  } catch (err) {
    console.error("Logout failed:", err);
  }
};



  const getInitials = (name) =>
    name
      ? name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setShadow(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1 font-medium ${
      isActive
        ? "text-violet-600 border-b-2 border-violet-600"
        : "text-gray-700 hover:text-violet-600"
    }`;

  return (
    <>
      <nav
        className={`bg-white sticky top-0 z-50 px-4 py-3 flex justify-between items-center transition-shadow ${
          shadow ? "shadow-md" : ""
        }`}
      >
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 rounded-full border border-violet-600" />
          <span className="text-xl font-bold text-violet-600">ITMarketing</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/services" className={navLinkClass}>Services</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          {isLoggedIn && <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>}

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition"
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-sm font-semibold">
                    {getInitials(userName)}
                  </div>
                )}
                <ChevronDown size={16} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl backdrop-blur-md border border-gray-100 z-50 animate-fadeIn overflow-hidden">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-800 truncate">{userName}</p>
                    <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                  </div>
                  <div className="flex flex-col py-2">
                    <Link to="/profile" onClick={() => setDropdownOpen(false)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-violet-600 transition">👤 View Profile</Link>
                    <Link to="/settings" onClick={() => setDropdownOpen(false)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-violet-600 transition">⚙️ Settings</Link>
                    <button onClick={() => setShowModal(true)} className="px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 hover:text-red-700 transition">🚪 Logout</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>

        <div className="md:hidden" ref={hamburgerRef}>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div ref={mobileMenuRef} className="absolute top-16 left-0 w-full bg-white shadow-md z-40 flex flex-col items-center py-4 gap-2 md:hidden animate-slideDown">
            <NavLink to="/" onClick={() => setMobileOpen(false)} className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" onClick={() => setMobileOpen(false)} className={navLinkClass}>About</NavLink>
            <NavLink to="/services" onClick={() => setMobileOpen(false)} className={navLinkClass}>Services</NavLink>
            <NavLink to="/contact" onClick={() => setMobileOpen(false)} className={navLinkClass}>Contact</NavLink>
            {isLoggedIn && <NavLink to="/admin" onClick={() => setMobileOpen(false)} className={navLinkClass}>Admin</NavLink>}
            {isLoggedIn ? (
              <div className="w-full text-center border-t pt-3">
                <p className="text-sm text-gray-600">{userName}</p>
                <p className="text-xs text-gray-500 mb-2">{userEmail}</p>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="text-sm text-gray-700 hover:text-violet-600">👤 View Profile</Link>
                <Link to="/settings" onClick={() => setMobileOpen(false)} className="text-sm text-gray-700 hover:text-violet-600 block">⚙️ Settings</Link>
                <button onClick={() => { setShowModal(true); setMobileOpen(false); }} className="btn btn-outline mt-2 w-3/4">Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn btn-outline w-3/4">Login</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="btn btn-primary w-3/4">Register</Link>
              </>
            )}
          </div>
        )}
      </nav>

      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="relative bg-white dark:bg-gray-900 border border-purple-300 dark:border-gray-700 rounded-3xl shadow-2xl w-[90%] max-w-md p-6 sm:p-8 animate-fadeIn scale-100">
      {/* Glowing Border Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-30 blur-2xl animate-pulse z-[-1]" />

      <div className="text-center">
        <div className="text-5xl mb-2 animate-bounce">🚪</div>
        <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-2">Ready to Logout?</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
          You’re about to leave your dashboard. Are you sure you want to log out?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-5 py-2 font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full transition hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2 font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 rounded-full shadow-lg transition hover:cursor-pointer"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </>
  );
}

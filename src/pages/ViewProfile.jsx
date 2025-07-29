import { useEffect, useState } from "react";
import axios from "axios";
import { Mail, UserCircle, Building2 } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function ViewProfile() {
  const [user, setUser] = useState(null);
const { avatar, setAvatar } = useUser();

  // Fetch user and their avatar from localStorage
  useEffect(() => {
    axios
      .get("/api/me", { withCredentials: true })
      .then((res) => {
        const userData = res.data.user;
        setUser(userData);

        const savedAvatar = localStorage.getItem(`avatar-${userData._id}`);
        if (savedAvatar) {
          setAvatar(savedAvatar);
        } else {
          setAvatar(null);
        }
      })
      .catch(() => setUser(null));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Max file size is 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      localStorage.setItem(`avatar-${user._id}`, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    if (!user) return;
    setAvatar(null);
    localStorage.removeItem(`avatar-${user._id}`);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-base text-gray-600 animate-pulse bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200">
        Loading profile...
      </div>
    );
  }

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#fceff9] via-[#e0e7ff] to-[#f5f7ff] dark:from-gray-800 dark:via-gray-900 dark:to-black relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300 dark:bg-pink-800 rounded-full blur-3xl opacity-30 animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-300 dark:bg-indigo-800 rounded-full blur-3xl opacity-30 animate-pulse z-0" />

      <main className="relative z-10 flex-grow flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-purple-200 dark:border-gray-700 p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 transition-all">

          {/* Avatar Section */}
          <div className="relative">
            <label className="cursor-pointer group block">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-white dark:bg-gray-700 border-[3px] border-purple-400 shadow-xl flex items-center justify-center">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    onError={handleRemoveAvatar}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 text-white flex items-center justify-center text-2xl sm:text-4xl font-extrabold tracking-wide shadow-inner">
                    {initials}
                  </div>
                )}
              </div>
              <span className="text-xs text-center text-purple-600 dark:text-purple-300 mt-2 block opacity-0 group-hover:opacity-100 transition">
                Click to upload avatar
              </span>
            </label>

            {/* Show remove only if avatar exists */}
            {avatar && (
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="mt-2 text-xs text-red-500 underline hover:text-red-700 text-center block mx-auto"
              >
                Remove Avatar
              </button>
            )}
          </div>

          {/* User Info */}
          <div className="w-full text-center sm:text-left space-y-4 break-words">
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white flex items-center justify-center sm:justify-start gap-2">
              <UserCircle className="text-violet-600 dark:text-violet-400" />
              <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                {user.name}
              </span>
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center justify-center sm:justify-start gap-2">
              <Mail size={16} className="text-pink-500" />
              {user.email}
            </p>

            <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center justify-center sm:justify-start gap-2">
              <Building2 size={16} className="text-purple-600" />
              {user.company || "Company Not Provided"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

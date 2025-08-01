import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Settings() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [initialName, setInitialName] = useState("");
  const [initialCompany, setInitialCompany] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  axios.get("/api/me", { withCredentials: true })
    .then((res) => {
      const user = res.data.user;
      setUserId(user._id);
      setName(user.name);
      setEmail(user.email);
      setCompany(user.company || "");
      setInitialName(user.name);
      setInitialCompany(user.company || "");
    })
    .catch((err) => {
      console.error("⚠️ Failed to load user in Settings:", err);
      toast.error("Failed to load user");
    });
}, []);


  const hasChanges = () =>
    name !== initialName ||
    company !== initialCompany ||
    password.trim() !== "";

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!hasChanges()) return;

    if (password && !oldPassword) {
      toast.error("Please enter your current password to change it.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `/api/users/${userId}`,
        {
          name,
          company,
          password: password.trim() ? password : undefined,
          oldPassword: oldPassword.trim() ? oldPassword : undefined,
        },
        { withCredentials: true }
      );

      toast.success("Profile updated successfully");
      // 👇 Navigate instead of reload, so toast shows
      setTimeout(() => navigate("/profile"), 1000);
      
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your account?")) return;
    try {
      await axios.delete(`/api/users/${userId}`, { withCredentials: true });
      await axios.post("/api/logout", {}, { withCredentials: true });
      toast.success("Account deleted");
      window.location.href = "/"; 
    } catch {
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-black py-12 px-4">
      <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-purple-300 dark:border-gray-700">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-pink-500 to-rose-500 text-center mb-8">
          Account Settings
        </h2>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2 border bg-gray-100 text-gray-400 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Required to change password"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              New Password <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={!hasChanges() || loading}
              className={`w-full sm:w-auto px-6 py-2 font-bold rounded-lg shadow-lg transition ${
                hasChanges()
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-full sm:w-auto px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-lg transition"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import axios from "../api/auth"; 

export default function Login() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
    }
  }, [setValue]);


//   try {
//     const response = await axios.post(
//       "/api/login",
//       {
//         email: data.email,
//         password: data.password,
//       },
//       {
//         withCredentials: true,
//       }
//     );

//     toast.success(response.data.message);

//     // ✅ Save user info in localStorage
//     localStorage.setItem("isLoggedIn", "true");
//     localStorage.setItem("userName", response.data.user.name);

//     // ✅ Optional: save token
//     // localStorage.setItem("token", response.data.token);

//     // ✅ Navigate and reload so navbar updates
//     navigate("/");
//     window.location.reload();

//   } catch (error) {
//     toast.error(error.response?.data?.message || "Invalid email or password");
//   }
// };

  const onSubmit = async (data) => {
  try {
    const response = await axios.post(
      "/api/login",
      {
        email: data.email,
        password: data.password,
      },
      {
        withCredentials: true, // ✅ Keep this
      }
    );

    toast.success(response.data.message);

    // ✅ ONLY store userName for UI (not login status)
    localStorage.setItem("userName", response.data.user.name);

    // ✅ Redirect and refresh to trigger auth check
    navigate("/");
    window.location.reload();

  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  }
};


  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-28 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-800">Welcome Back</h2>
        <p className="text-center text-sm text-gray-500">Login to access your account</p>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...register("email", { required: "Email is required" })}
            className={`w-full mt-1 p-3 rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-purple-400`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              className={`w-full mt-1 p-3 pr-10 rounded-md border ${errors.password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-purple-400`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("remember")} className="accent-purple-600" />
            Remember me
          </label>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-purple-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-full transition duration-300 shadow-lg"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-purple-700 font-semibold cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
}

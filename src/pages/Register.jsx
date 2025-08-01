import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { X } from "lucide-react"
import axios from "../api/auth"; // ✅ use correct axios instance

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

const onSubmit = async (data) => {
  if (data.password !== data.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  if (!data.terms) {
    toast.error("Please agree to Terms & Conditions");
    return;
  }

  try {
    const response = await axios.post("/api/register", {
      name: data.name,
      company: data.company,
      email: data.email,
      password: data.password,
    });

    toast.success(response.data.message);
    navigate("/login");
    window.scrollTo(0, 0);
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something went wrong during registration"
    );
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] to-[#ffe4e6] px-4 py-28 relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg space-y-5 border border-gray-200 z-10"
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Create Your Account</h2>

        <div>
          <label className="label">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Full name is required" })}
            placeholder="John Doe"
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="label">Company <span className="text-gray-400">(Optional)</span></label>
          <input
            type="text"
            {...register("company")}
            placeholder="Your Company"
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+(com|in|org)$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="you@example.com"
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="relative">
          <label className="label">
            Password
            <span
              className="tooltip tooltip-top text-sm ml-1 cursor-pointer"
              data-tip="Min 6 characters, 1 uppercase, 1 lowercase, 1 number, 1 special"
            >
              ⓘ
            </span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{6,}$/,
                message: "Weak password. Try a stronger one.",
              },
            })}
            placeholder="Abc@12"
            className="input input-bordered w-full pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div
            className="absolute right-3 top-10 cursor-pointer text-xl text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div className="relative">
          <label className="label">Confirm Password</label>
          <input
            type={showConfirm ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Confirm your password",
            })}
            placeholder="••••••"
            className="input input-bordered w-full pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div
            className="absolute right-3 top-10 cursor-pointer text-xl text-gray-500"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>

       <div className="flex items-start gap-2">
      <input
       id="terms"
       type="checkbox"
        {...register("terms", { required: true })}
      className="checkbox checkbox-sm mt-1"
     />
    <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
      I agree to the{" "}
       <span
       className="text-primary underline"
        onClick={(e) => {
          e.stopPropagation(); // prevent toggling checkbox
          setShowTerms(true);  // open modal
        }}
      >
        Terms & Conditions
       </span>
        </label>
      </div>

        {errors.terms && <p className="text-red-500 text-sm">You must accept the terms</p>}

        <button type="submit" className="btn btn-primary w-full text-white text-base">
          Register Now
        </button>
      </form>

      {/* Modal with blurred background */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-xl shadow-xl animate-fadeIn relative">
            <button
              onClick={() => setShowTerms(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-2">Terms & Conditions</h3>
            <div className="text-sm text-gray-700 space-y-2 max-h-[300px] overflow-y-auto pr-2">
              <p>By registering, you agree to our platform's terms and policies.</p>
              <p>You must be 18 years or older to use this service.</p>
              <p>Your data will be stored securely and used only for account purposes.</p>
              <p>You agree not to share your login credentials with others.</p>
              <p>Violating these terms may result in account suspension.</p>
              <p>We reserve the right to modify these terms at any time.</p>
              <p>Please read our privacy policy for more details on data use.</p>
              <p>Thank you for trusting us with your information.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

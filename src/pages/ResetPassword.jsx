import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/auth';
import { Lock } from 'lucide-react';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | done
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setDisabled(true);

    try {
      const response = await axios.post('/reset-password', {
        token,
        newPassword: password,
      });
      setMessage(response.data.message);
      setStatus('done');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
      setStatus('idle');
      setDisabled(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 px-4 py-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-md relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-30 animate-pulse z-0" />
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-pink-400 rounded-full filter blur-3xl opacity-30 animate-pulse z-0" />

        <h2 className="text-3xl font-extrabold text-center text-purple-800 z-10 relative">
          Reset Your Password
        </h2>
        <p className="text-sm text-gray-600 text-center mt-2 z-10 relative">
          Enter a new secure password
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6 z-10 relative">
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-purple-500" size={20} />
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              disabled={status === 'done'}
            />
          </div>

          <button
            type="submit"
            disabled={disabled}
            className={`w-full text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 ${
              disabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 hover:shadow-lg'
            }`}
          >
            {status === 'submitting'
              ? 'Resetting...'
              : status === 'done'
              ? 'Password Reset ✅'
              : 'Reset Password'}
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm font-medium text-purple-700 bg-purple-100 border border-purple-300 p-3 rounded-md z-10 relative shadow-sm animate-fadeIn">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

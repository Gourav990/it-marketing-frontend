import React, { useState } from 'react';
import axios from '../api/auth'; // ✅ axios instance with correct baseURL
import { Mail } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [disableButton, setDisableButton] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('sending');
    setDisableButton(true);

    try {
      const response = await axios.post('/forgot-password', { email });
      setMessage(response.data.message);
      setStatus('sent');

      // Optional: Reset button after 30 seconds
      setTimeout(() => {
        setStatus('idle');
        setDisableButton(false);
      }, 30000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
      setStatus('idle');
      setDisableButton(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 px-4 py-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-md relative overflow-hidden">
        {/* floating blur bubbles */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-pink-400 rounded-full filter blur-3xl opacity-30 animate-pulse z-0" />
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-30 animate-pulse z-0" />

        <h2 className="text-3xl font-extrabold text-center text-purple-800 z-10 relative">Forgot Password</h2>
        <p className="text-sm text-gray-600 text-center mt-2 z-10 relative">
          Enter your email to receive a reset link
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6 z-10 relative">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-purple-500" size={20} />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              disabled={status === 'sent'}
            />
          </div>

          <button
            type="submit"
            disabled={disableButton}
            className={`w-full text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 ${
              disableButton
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-lg'
            }`}
          >
            {status === 'sending'
              ? 'Sending...'
              : status === 'sent'
              ? 'Link Sent ✅'
              : 'Send Reset Link'}
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

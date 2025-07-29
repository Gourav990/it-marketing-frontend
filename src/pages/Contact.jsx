import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Mail, User, MessageSquare, Phone, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast'; // ✅ Toast import
import { useNavigate } from 'react-router-dom'; // ✅ Added

export default function Contact() {
   const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!form.name || !form.phone || !form.message) {
    setError('⚠️ Name, Mobile Number, and Message are required.');
    setSuccess('');
    toast.error('⚠️ Please fill in required fields.');
    return;
  }

  setError('');

  emailjs
    .send(
      import.meta.env.VITE_service_id,     // ✅ Correct usage in Vite
      import.meta.env.VITE_template_id,
      form,
      import.meta.env.VITE_public_key
    )
    .then(
      (result) => {
        console.log(result.text);
        toast.success('Message sent successfully!');
        setForm({ name: '', email: '', phone: '', message: '' });

        sessionStorage.setItem('scrollToContact', 'true');
        navigate('/');
        window.scrollTo(0, 0);
      },
      (error) => {
        console.error(error.text);
        setError('❌ Failed to send message. Please try again later.');
        toast.error('❌ Failed to send message. Try again.');
      }
    );
};


  return (
    // 👇 Your existing JSX (unchanged)
    <section className="relative min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 py-24 px-6 md:px-20 overflow-hidden">
      {/* Top Wave */}
      <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 320">
        <path fill="#e0e7ff" fillOpacity="0.5" d="M0,64L60,90.7C120,117,240,171,360,165.3C480,160,600,96,720,85.3C840,75,960,117,1080,117.3C1200,117,1320,149,1380,165.3L1440,192V0H0Z" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-2 text-gray-900">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            Get in Touch With Us
          </span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We'd love to hear from you. Whether you have a question about services, pricing, or anything else—our team is ready to answer all your questions.
        </p>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Contact Form */}
          <div className="w-full lg:w-2/3 bg-white/90 backdrop-blur-xl shadow-2xl border border-purple-200 rounded-3xl px-8 py-10 md:px-16 md:py-14 transition hover:shadow-purple-300">
            {error && <p className="text-red-600 text-center font-semibold mb-4">{error}</p>}
            {success && <p className="text-green-600 text-center font-semibold mb-4">{success}</p>}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email (optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Gmail (optional)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@gmail.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 text-purple-500" />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows="5"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
                >
                  ✉️ Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white shadow-xl rounded-2xl p-6 border border-purple-100">
              <h3 className="text-xl font-bold mb-2 text-purple-700">📞 Contact Info</h3>
              <p className="text-sm text-gray-600 mb-2">Feel free to reach us through:</p>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="text-purple-500" size={20} />
                +91 9536 844 144
              </div>
              <div className="flex items-center gap-2 text-gray-700 mt-2">
                <Mail className="text-purple-500" size={20} />
                ithriveindia@gmail.com
              </div>
              <div className="flex items-center gap-2 text-gray-700 mt-2">
                <MapPin className="text-purple-500" size={20} />
                Shahdara, Delhi, India
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320">
        <path fill="#fcd3e1" fillOpacity="0.35" d="M0,192L60,170.7C120,149,240,107,360,117.3C480,128,600,192,720,213.3C840,235,960,213,1080,202.7C1200,192,1320,192,1380,192L1440,192V320H0Z" />
      </svg>
    </section>
  );
}

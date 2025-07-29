import { Link } from "react-router-dom";
import { FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-12 px-6 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-600 rounded-full blur-3xl opacity-30 z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-blue-600 rounded-full blur-3xl opacity-30 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
     {/* Left: Google Map */}
     <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-purple-500 relative group shadow-lg hover:shadow-purple-500/50 transition-all duration-500">
       <iframe
         title="M.B.O. (Bhola Garments) Location"
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7000.062302111639!2d77.2891921!3d28.689644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb88cec6b505%3A0x14cdba9cacb9e65a!2sM.B.O.%20(Bhola%20Garments)!5e0!3m2!1sen!2sin!4v1717359200000!5m2!1sen!2sin"
         width="100%"
         height="100%"
         allowFullScreen=""
         loading="lazy"
         referrerPolicy="no-referrer-when-downgrade"
         className="border-none scale-100 group-hover:scale-[1.02] transition-transform duration-500"
        ></iframe>

       {/* Animated glow border using pseudo-elements */}
       <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-purple-500 animate-pulse opacity-20 blur-sm group-hover:opacity-40 group-hover:blur-md transition-all duration-500"></div>
     </div>



        {/* Center: Info */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-purple-400 mb-2">ITMarketing</h2>
          <p className="text-gray-300 mb-4">
            We help IT companies stand out with powerful digital marketing and design solutions.
          </p>
          <div className="space-y-2">
            <Link to="/" className="block text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">About</Link>
            <Link to="/services" className="block text-gray-400 hover:text-white transition-colors">Services</Link>
            <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

        {/* Right: Contact & Socials */}
        <div className="text-center md:text-right">
          <h3 className="text-xl font-semibold text-purple-300 mb-2">Contact Us</h3>
          <p className="text-gray-300">Email: <a href="mailto:info@itmarketpro.com" className="hover:text-white">ithriveindia@gmail.com</a></p>
          <p className="text-gray-300">Phone: <a href="tel:+919876543210" className="hover:text-white">+91 9536 844 144</a></p>
          
          <div className="mt-4 flex justify-center md:justify-end gap-5 text-2xl">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-transform hover:scale-125">
              <FaYoutube />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-transform hover:scale-125">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-transform hover:scale-125">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Notes with Creator Name */}
      <div className="relative z-10 mt-10 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} ITMarketing. All rights reserved.</p>

        <p className="mt-1 text-purple-400 font-semibold transition duration-300 hover:scale-105 hover:text-pink-400">
          Created with <span className="animate-pulse text-red-500">❤️</span> by{" "}
          <a
            href="https://www.linkedin.com/in/gourav-tandan-2174a927a/?originalSubdomain=in"
            className="underline decoration-transparent hover:decoration-pink-500 hover:text-white transition-all duration-300"
          >
            Gourav Tandan
          </a>
        </p>
      </div>
    </footer>
  );
}

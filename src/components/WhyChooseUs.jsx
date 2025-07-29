// components/WhyChooseUs.jsx
import { FaRocket, FaLock, FaMagic } from 'react-icons/fa';

export default function WhyChooseUs() {
  return (
    <section
      className="relative overflow-hidden py-24 px-6 sm:px-10 bg-gradient-to-br from-white via-indigo-50 to-purple-100"
      data-aos="fade-up"
    >
      {/* Blurred animated background blobs */}
      <div className="absolute top-[-50px] left-[-60px] w-[180px] h-[180px] bg-purple-300 rounded-full opacity-20 blur-3xl animate-blob"></div>
      <div className="absolute bottom-[-60px] right-[-40px] w-[140px] h-[140px] bg-pink-300 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
          🚀 Why Choose Us?
        </h2>
        <p className="text-gray-600 text-lg md:text-xl mb-16 max-w-3xl mx-auto">
          We blend data-driven strategy with bold creativity to deliver growth, engagement, and brand loyalty.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-white shadow-xl hover:shadow-2xl rounded-2xl p-8 transition transform hover:-translate-y-2 duration-300">
            <FaRocket className="text-purple-600 text-5xl mb-4 mx-auto animate-float" />
            <h3 className="font-bold text-xl mb-2 text-gray-800">Performance Driven</h3>
            <p className="text-gray-600 text-sm">
              Higher conversions, lower CPCs, and stronger ROI — all backed by data and experience.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-xl hover:shadow-2xl rounded-2xl p-8 transition transform hover:-translate-y-2 duration-300">
            <FaLock className="text-blue-600 text-5xl mb-4 mx-auto animate-float-slow" />
            <h3 className="font-bold text-xl mb-2 text-gray-800">Secure & Trusted</h3>
            <p className="text-gray-600 text-sm">
              We ensure privacy and compliance across platforms with reliable analytics and secure practices.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-xl hover:shadow-2xl rounded-2xl p-8 transition transform hover:-translate-y-2 duration-300">
            <FaMagic className="text-pink-500 text-5xl mb-4 mx-auto animate-float-slow2" />
            <h3 className="font-bold text-xl mb-2 text-gray-800">Creative Innovation</h3>
            <p className="text-gray-600 text-sm">
              Bold visuals and unique campaigns that turn attention into lasting impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

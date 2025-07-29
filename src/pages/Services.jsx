import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Image Imports (make sure these images are added in your /src/assets/ folder)
import strategy from '../assets/marketing-strategy.png';
import branding from '../assets/branding.png';
import email from '../assets/email-campaign.png';
import analytics from '../assets/analytics.png';
import ppc from '../assets/ppc-ads.png';
import automation from '../assets/marketing-automation.png';

export default function Services() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

 const services = [
  {
    title: 'Digital Marketing Strategy',
    desc: 'Create a customized roadmap to grow your online presence and reach your audience effectively.',
    image: strategy,
  },
  {
    title: 'Brand Identity Design',
    desc: 'Develop a cohesive brand image that connects with your audience and builds trust.',
    image: branding,
  },
  {
    title: 'Email Campaign Management',
    desc: 'Engage your audience with targeted and personalized email marketing campaigns.',
    image: email,
  },
  {
    title: 'Marketing Analytics',
    desc: 'Track campaign performance and make data-driven decisions to improve results.',
    image: analytics,
  },
  {
    title: 'PPC Advertising',
    desc: 'Boost traffic and conversions with optimized pay-per-click advertising strategies.',
    image: ppc,
  },
  {
    title: 'Marketing Automation',
    desc: 'Automate repetitive marketing tasks to increase efficiency and ROI.',
    image: automation,
  },
];

  return (
    <div className="py-24 px-6 md:px-12 bg-gradient-to-b from-white to-purple-50 min-h-screen">
      <div className="text-left mb-6">
        <button
          onClick={() => navigate('/')}
          className="bg-white px-4 py-2 rounded-full text-purple-600 font-semibold border border-purple-200 shadow hover:bg-purple-50 transition"
        >
          ← Back to Home
        </button>
      </div>

      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16">
        🚀 Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Professional Services</span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="group relative bg-white rounded-3xl p-8 flex flex-col items-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] border border-purple-100 min-h-[420px] max-h-[420px]"
          >
            <div className="w-28 h-28 mb-6 relative shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse z-0" />
              <img
                src={service.image}
                alt={service.title}
                className="relative w-28 h-28 object-contain z-10 transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{service.title}</h3>
            <p className="text-sm text-gray-600 text-center flex-grow mb-4">{service.desc}</p>
            <button
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:scale-105 transition duration-300 mt-auto"
            >
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

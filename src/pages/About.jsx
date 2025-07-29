import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Briefcase, Users, Lightbulb, CalendarCheck } from 'lucide-react';

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const team = [
    {
      name: 'Ananya Sharma',
      role: 'Marketing Strategist',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Raj Mehta',
      role: 'UI/UX Designer',
      image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Ishaan Patel',
      role: 'Frontend Developer',
      image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
  ];

  const journey = [
    { year: '2021', event: 'Founded with a mission to help IT startups' },
    { year: '2022', event: 'Served 50+ tech clients globally' },
    { year: '2023', event: 'Launched proprietary SEO & ad tools' },
    { year: '2024', event: 'Recognized as top IT marketing agency in India' },
  ];

  const counters = [
    { label: 'Clients Served', value: '100+' },
    { label: 'Years of Experience', value: '5+' },
    { label: 'Projects Delivered', value: '200+' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-24 px-6 md:px-12">
      {/* Background blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-300 rounded-full opacity-20 filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-300 rounded-full opacity-20 filter blur-2xl"></div>

      {/* About */}
      <div className="relative z-10 max-w-4xl mx-auto text-center" data-aos="fade-up">
        <h2 className="text-5xl font-extrabold mb-6 text-gray-900">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">ITMarketing</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          We help IT companies grow with smart, modern, and innovative marketing. Our team of experts in design, development, and digital strategy works together to build high-impact experiences for your business.
        </p>
      </div>

      {/* Features */}
      <div className="mt-16 grid gap-8 md:grid-cols-3" data-aos="fade-up" data-aos-delay="200">
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center border border-purple-100">
          <Briefcase className="mx-auto text-purple-500" size={36} />
          <h3 className="text-xl font-semibold mt-4">Tech Expertise</h3>
          <p className="text-gray-600 mt-2">Deep understanding of IT industries, tools, and trends.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center border border-purple-100">
          <Users className="mx-auto text-pink-500" size={36} />
          <h3 className="text-xl font-semibold mt-4">Client-Centered</h3>
          <p className="text-gray-600 mt-2">Strategies tailored to your audience, goals, and growth.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center border border-purple-100">
          <Lightbulb className="mx-auto text-yellow-500" size={36} />
          <h3 className="text-xl font-semibold mt-4">Creative Innovation</h3>
          <p className="text-gray-600 mt-2">Unique branding and campaigns that make you stand out.</p>
        </div>
      </div>

      {/* Meet the Team */}
      <div className="relative z-10 mt-24 max-w-5xl mx-auto" data-aos="fade-up">
        <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">Meet the Team</h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-purple-100 mb-4"
              />
              <h4 className="text-xl font-semibold">{member.name}</h4>
              <p className="text-gray-600 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Journey */}
      <div className="relative z-10 mt-24 max-w-3xl mx-auto" data-aos="fade-up">
        <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">Our Journey</h3>
        <div className="space-y-6">
          {journey.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 border-l-4 border-purple-500 pl-4 py-2"
            >
              <CalendarCheck className="text-purple-500 mt-1" />
              <div>
                <h4 className="text-lg font-semibold">{item.year}</h4>
                <p className="text-gray-600">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Counters */}
      <div className="relative z-10 mt-24 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center" data-aos="fade-up">
        {counters.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl border border-gray-100">
            <h4 className="text-4xl font-bold text-purple-600">{item.value}</h4>
            <p className="text-gray-700 mt-2 font-medium">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

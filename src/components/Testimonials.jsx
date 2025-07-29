// components/Testimonials.jsx
export default function Testimonials() {
  const testimonials = [
    {
      quote: "Working with IT Marketing transformed our online presence.",
      name: "Ravi Sharma",
      company: "StartupX",
      img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "They delivered beyond expectations—creative, strategic, and fast!",
      name: "Priya Mehta",
      company: "TechNest",
      img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "Our conversion rate doubled in two months!",
      name: "Amit Soni",
      company: "QuickWeb",
      img: "https://randomuser.me/api/portraits/men/65.jpg"
    }
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-12" data-aos="fade-up">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-xl shadow text-left">
              <p className="text-gray-700 italic mb-4">“{item.quote}”</p>
              <div className="flex items-center gap-4">
                <img src={item.img} alt={item.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

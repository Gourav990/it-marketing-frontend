import b1 from '../assets/blog-1.jpg'
import b2 from '../assets/blog-2.jpg'
import b3 from '../assets/blog-3.jpg'

export default function OurWork() {
  const work = [
    {
      image: b3,
      title: "GREAT MULTI-LEVEL MARKETING",
      desc: "Multi-Level, or Network marketing is an excellent second income opportunity. Millions of people, all over america and throughout the world are taking advantage of the opportunity multi-level marketing offers to start and build a successful business, quickly and expensively."
    },
    {
      image: b1,
      title: "Network Marketing",
      desc: "Everyone who wants to be an entrepreneur should take a look at a network marketing business. Some of the biggest fortune 500 companies, such as citibank, avon, levis, and smith barney, distribute their products through a network marketing or direct sales system."
    },
    {
      image: b2,
      title: "MARKET RESEARCH STUDIES",
      desc: "Network marketing gives you the opportunity to face your fears, deal with them, overcome them, and bring out the winner that you have living inside you. "
    }
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12" data-aos="fade-up">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">Our Recent Work</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {work.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-purple-700 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

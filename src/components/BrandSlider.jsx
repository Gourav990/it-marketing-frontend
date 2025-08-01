import CountUp from "react-countup";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

import brand1 from "../assets/brand1.jpg";
import brand2 from "../assets/brand2.jpg";
import brand3 from "../assets/brand3.avif";
import brand4 from "../assets/brand4.avif";
import brand5 from "../assets/brand5.jpg";

const stats = [
  { value: 200, label: "Campaigns Delivered", suffix: "+" },
  { value: 95, label: "Client ROI Boost", suffix: "%" },
  { value: 150, label: "Active Clients", suffix: "+" },
  { value: 30, label: "Industries Served", suffix: "+" },
];

const images = [
  { src: brand1, label: "Amazon" },
  { src: brand2, label: "Flipkart" },
  { src: brand3, label: "Zomato" },
  { src: brand4, label: "Swiggy" },
  { src: brand5, label: "Paytm" },
];

export default function BrandSlider() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white via-purple-50 to-blue-50 text-center">
      {/* Animated Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto mb-20">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-3xl p-8 border border-purple-100 shadow-xl hover:shadow-purple-300 transition-all duration-300"
            whileHover={{ scale: 1.07 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              <CountUp end={stat.value} duration={2} />{stat.suffix}
            </h3>
            <p className="mt-3 text-gray-700 font-medium text-lg">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Brand Strip */}
      <div className="overflow-hidden py-6">
        <Marquee gradient={false} speed={50} pauseOnHover>
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              className="relative mx-6 w-[200px] h-[120px] group hover:scale-105 transition-transform duration-500"
              initial={{ y: 0 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: idx * 0.2 }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-purple-100 shadow-md hover:shadow-purple-300">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-300" />
              </div>
              <motion.div
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white text-purple-700 text-xs font-semibold px-3 py-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {img.label}
              </motion.div>
            </motion.div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

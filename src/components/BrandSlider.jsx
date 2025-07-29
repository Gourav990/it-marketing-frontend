// src/components/HeroSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import brand1 from "../assets/brand1.jpg";
import brand2 from "../assets/brand2.jpg";
import brand3 from "../assets/brand3.avif";
import brand4 from "../assets/brand4.avif";
import brand5 from "../assets/brand5.jpg";

const slides = [
  {
    image: brand1,
    title: "Innovative Analytics",
    subtitle: "Turning data into smart business decisions",
  },
  {
    image: brand2,
    title: "Real Estate Promotions",
    subtitle: "Boosting visibility of top Delhi properties",
  },
  {
    image: brand3,
    title: "Creative Campaigns",
    subtitle: "Designs that convert and inspire",
  },
  {
    image: brand4,
    title: "Team Synergy",
    subtitle: "Collaboration that fuels success",
  },
  {
    image: brand5,
    title: "Digital Presence",
    subtitle: "Making your brand shine online",
  },
];

export default function HeroSlider() {
  return (
    <div className="relative w-full h-screen max-h-[800px] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        loop
        effect="fade"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {/* ✅ Fix: Use object-cover on all devices */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center z-0"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 z-10" />

              {/* Text Content */}
              <motion.div
                className="relative z-20 text-center px-4 sm:px-8 max-w-[90%] sm:max-w-[80%]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-xl sm:text-3xl md:text-5xl font-bold text-white leading-tight mb-2 sm:mb-4">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-xl text-white mb-4 sm:mb-6">
                  {slide.subtitle}
                </p>
                <Link to="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-black font-semibold rounded-full shadow-md hover:bg-black hover:text-white transition-all"
                  >
                    Explore Services
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll Down Icon */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 animate-bounce text-white">
        <ChevronDown size={28} />
      </div>
    </div>
  );
}

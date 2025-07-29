import { useEffect } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import AOS from "aos";
import "aos/dist/aos.css";

import heroImage from "../assets/hero-illustration.svg";
import BrandSlider from "../components/BrandSlider";
import WhyChooseUs from "../components/WhyChooseUs";
import OurWork from "../components/OurWork";
import Testimonials from "../components/Testimonials";

import {
  FaChartLine,
  FaRobot,
  FaBullhorn,
  FaUsers,
  FaMobileAlt,
} from "react-icons/fa";

export default function Home() {
  useEffect(() => {
    AOS.init({ once: true, duration: 1000 });

    const typed = new Typed("#typed-text", {
      strings: [
        "Intelligent Ad Targeting",
        "Conversion-Driven Design",
        "Real-Time Analytics",
        "Growth Hacking Tactics",
        "AI-Fueled Optimization",
      ],
      typeSpeed: 55,
      backSpeed: 25,
      backDelay: 1500,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-16 px-4 sm:px-6 lg:px-8">
        {/* Background Blobs */}
        <div className="absolute w-[300px] h-[300px] bg-purple-300 opacity-40 rounded-full top-[-80px] left-[-80px] animate-blob blur-3xl"></div>
        <div className="absolute w-[200px] h-[200px] bg-pink-300 opacity-30 rounded-full top-[60%] right-[-100px] animate-blob animation-delay-2000 blur-3xl"></div>
        <div className="absolute w-[200px] h-[200px] bg-blue-300 opacity-30 rounded-full bottom-[-80px] left-[40%] animate-blob animation-delay-4000 blur-3xl"></div>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <canvas id="particle-canvas" className="w-full h-full"></canvas>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl flex flex-col-reverse lg:flex-row items-center justify-between w-full gap-12">
          
          {/* Text Section */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left" data-aos="fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              🎯 We Craft <span className="text-purple-600">Digital Campaigns</span><br />
              That <span className="text-blue-600">Convert</span>
            </h1>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl">
              <span id="typed-text" className="font-medium text-gray-800"></span>
            </p>
            <Link
              to="/contact"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-xl hover:opacity-90 transition inline-flex items-center gap-2"
            >
              🚀 Get a Free Strategy Call
            </Link>
          </div>

          {/* Hero Image + Floating Icons */}
          <div className="w-full lg:w-1/2 flex justify-center relative" data-aos="fade-left">
            <img
              src={heroImage}
              alt="Digital Marketing Illustration"
              className="w-48 sm:w-64 md:w-80 lg:w-[450px] animate-float z-10"
            />

            {/* Floating Icons - Responsive Positions */}
            <FaChartLine className="text-green-600 text-xl sm:text-2xl md:text-3xl absolute top-[5%] left-[58%] md:left-[63%] lg:left-[68%] animate-float-slow" />
            <FaRobot className="text-blue-500 text-xl sm:text-2xl md:text-3xl absolute top-[36%] left-[4%] md:left-[3%] lg:left-[2%] animate-float-slow2" />
            <FaBullhorn className="text-pink-500 text-xl sm:text-2xl md:text-3xl absolute bottom-[4%] right-[38%] md:right-[42%] lg:right-[44%] animate-float-slow3" />
            <FaUsers className="text-yellow-500 text-xl sm:text-2xl md:text-3xl absolute bottom-[14%] right-[6%] md:right-[4%] lg:right-[2%] animate-float-slow" />
            <FaMobileAlt className="text-blue-700 text-xl sm:text-2xl md:text-3xl absolute top-[26%] right-[9%] md:right-[6%] lg:right-[5%] animate-float-slow2" />
          </div>
        </div>
      </div>

      {/* Sections */}
      <BrandSlider />
      <WhyChooseUs />
      <OurWork />
      <Testimonials />
    </>
  );
}

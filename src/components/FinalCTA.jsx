import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 px-6 text-white text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Boost Your Brand Online?</h2>
      <p className="text-lg sm:text-xl mb-8">Let our team of experts take your digital marketing to the next level.</p>
      <Link
        to="/contact"
        className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-200 transition"
      >
        🚀 Let’s Work Together
      </Link>
    </section>
  );
}

import { useRef } from "react";
import { motion } from "framer-motion";
import { Utensils, HandHeart, Leaf, Search } from "lucide-react";

function Home() {
  const contentRef = useRef(null);

  const quotes = [
    { text: "Share is care, for when we give, we grow together.", author: "Unknown" },
    { text: "Food is our common ground, a universal experience.", author: "James Beard" },
    { text: "Sharing food with another human being is an intimate act that should not be indulged in lightly.", author: "M.F.K. Fisher" },
    { text: "The act of sharing food blesses both the giver and the receiver.", author: "Indian Proverb" },
  ];

  const howItWorks = [
    { step: 1, title: "Donors List Food", description: "Donors can easily list surplus food items with all necessary details.", icon: Utensils },
    { step: 2, title: "Receivers Request", description: "Receivers browse available donations and send requests to donors.", icon: HandHeart },
    { step: 3, title: "Share & Reduce Waste", description: "Donors approve requests, share food, and reduce waste.", icon: Leaf },
  ];

  const impactStats = [
    { title: "Food Waste", stat: "67M tonnes reduced yearly", description: "India wastes 67 million tonnes of food annually, harming the environment." },
    { title: "Hunger", stat: "190M meals shared", description: "Over 190 million people in India go hungry every day." },
    { title: "Community", stat: "Thousands connected", description: "Food sharing supports both rural and urban communities." },
    { title: "Sustainability", stat: "Reduced emissions", description: "Sharing food fights climate change by lowering greenhouse gases." },
  ];

  return (
    <div ref={contentRef} className="bg-milk-white font-sans">
      {/* Hero Section with Parallax and Search */}
      <section className="relative bg-hero-bg bg-cover bg-center bg-fixed text-white py-40" style={{ minHeight: "600px" }}>
        <div className="absolute inset-0 bg-primary-green opacity-60"></div>
        <div className="relative container mx-auto px-4 text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, duration: 1 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-wide leading-tight mb-6"
          >
            Share Food, Harvest Hope
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2, duration: 1 }}
            className="text-lg md:text-xl text-white max-w-4xl mx-auto mb-8"
          >
            Connect donors and receivers across India to reduce food waste, empower communities, and cultivate a sustainable future.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4, duration: 1 }}
            className="flex justify-center mb-8"
          >
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search for food donations or requests..."
                className="w-full p-4 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-light-yellow shadow-md"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-light-yellow">
                <Search className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
          <motion.a
            href="/register"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.6, duration: 1 }}
            className="inline-flex items-center px-10 py-4 bg-light-yellow text-soil-brown font-semibold rounded-full shadow-lg hover:bg-yellow-200 transition-all duration-300"
            aria-label="Get Started"
          >
            Get Started
          </motion.a>
        </div>
      </section>

      {/* Inspirational Quotes */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-soil-brown text-center mb-16"
          >
            Words of Wisdom
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {quotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 200, damping: 10 } }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.2, duration: 0.8 }}
                className="p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl border border-gray-100 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-light-yellow/20 to-transparent rounded-xl -z-10"></div>
                <p className="text-gray-700 italic text-lg leading-relaxed">" {quote.text} "</p>
                <p className="mt-6 text-right text-soil-brown font-medium">- {quote.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How ShareHarvest Works */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-soil-brown mb-8"
          >
            How ShareHarvest Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2, duration: 1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
          >
            A seamless process to connect food donors with receivers and reduce waste effectively.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 200, damping: 10 } }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.2, duration: 0.8 }}
                className="p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl border border-light-yellow/20 text-center"
              >
                <div className="w-20 h-20 mx-auto bg-light-yellow text-soil-brown rounded-full flex items-center justify-center mb-6">
                  <item.icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold text-soil-brown mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Sharing Impact */}
      <section className="py-24 bg-food-bg bg-cover bg-center relative">
        <div className="absolute inset-0 bg-soil-brown opacity-70"></div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-8"
          >
            Food Sharing Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2, duration: 1 }}
            className="text-lg text-gray-200 max-w-3xl mx-auto mb-12"
          >
            Discover the transformative power of food sharing in India.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {impactStats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 200, damping: 10 } }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.2, duration: 0.8 }}
                className="p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl border border-light-yellow/20 text-center"
              >
                <h3 className="text-xl font-semibold text-soil-brown mb-2">{item.title}</h3>
                <p className="text-2xl font-bold text-light-yellow mb-4">{item.stat}</p>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with Impact Highlights */}
      <footer className="py-12 bg-soil-brown text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-6">Our Commitment</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <p className="text-xl font-semibold">Mission</p>
              <p>Reducing food waste with every share.</p>
            </div>
            <div>
              <p className="text-xl font-semibold">Vision</p>
              <p>A hunger-free, sustainable India.</p>
            </div>
            <div>
              <p className="text-xl font-semibold">Impact</p>
              <p>Empowering communities daily.</p>
            </div>
            <div>
              <p className="text-xl font-semibold">Join Us</p>
              <p>Be part of the change today.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
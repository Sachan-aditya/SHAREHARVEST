import { useRef } from "react";
import { motion } from "framer-motion";
import { Utensils, HandHeart, Leaf, Quote } from "lucide-react";

function Home() {
  const contentRef = useRef(null);

  const howItWorks = [
    { step: 1, title: "Donors List Food", description: "List surplus food with ease.", icon: Utensils },
    { step: 2, title: "Receivers Request", description: "Browse and request donations.", icon: HandHeart },
    { step: 3, title: "Share & Reduce", description: "Share food and cut waste.", icon: Leaf },
  ];

  const impactStats = [
    { title: "Food Waste", stat: "67M tonnes", desc: "Reduced yearly in India." },
    { title: "Hunger", stat: "190M meals", desc: "Shared to fight hunger." },
    { title: "Community", stat: "Thousands", desc: "Connected daily." },
    { title: "Sustainability", stat: "Lowered", desc: "Emissions impact." },
  ];

  const customerReviews = [
    {
      text: "This platform transformed our NGO’s outreach!",
      author: "Anita D.",
      rating: 5,
    },
    {
      text: "Easy to use and impactful for my restaurant.",
      author: "Vikram S.",
      rating: 4,
    },
    {
      text: "Connected us to donors seamlessly.",
      author: "Meena R.",
      rating: 5,
    },
  ];

  const singleQuote = {
    text: "Together, we nourish and sustain.",
    author: "ShareHarvest Vision",
  };

  return (
    <div ref={contentRef} className="bg-light-green font-sans">
      {/* Hero Section */}
      <section className="relative bg-hero-bg bg-cover bg-center h-screen flex items-center">
        <div className="absolute inset-0 bg-deep-green opacity-60"></div>
        <div className="relative container mx-auto px-6 text-center z-10">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-bold text-white mb-6"
          >
            Share Food, <span className="text-yellow">Grow Together</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl text-white mb-10 max-w-4xl mx-auto"
          >
            Unite to reduce waste and feed communities across India.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            href="/register"
            className="inline-block bg-yellow text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-400 transition-colors duration-300"
          >
            Get Started
          </motion.a>
          <motion.div
           href="/register"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            
            className="mt-12 flex justify-center items-center text-white"
          >
           
            <Quote className="h-8 w-8 mr-4" />
            <p className="text-lg italic">{`"${singleQuote.text}" — ${singleQuote.author}`}</p>
            href="/register
          </motion.div>
        </div>
      </section>

      {/* Leaderboard Coming Soon */}
      <section className="py-16 bg-medium-green">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-12"
          >
            Leaderboard Coming Soon
          </motion.h2>
          <div className="bg-off-white p-6 rounded-xl shadow-md text-gray-800 mb-12">
            <p className="text-lg">Our leaderboard is under development! Stay tuned for updates and track your contributions.</p>
          </div>
        </div>
      </section>

      {/* How ShareHarvest Works */}
      <section className="py-16 bg-off-white">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-deep-green text-center mb-12"
          >
            How ShareHarvest Works
          </motion.h2>
          <div className="relative">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="mb-12 flex items-start"
              >
                <div className="w-10 h-10 bg-medium-green rounded-full flex items-center justify-center mr-6">
                  <item.icon className="h-6 w-6 text-yellow" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-deep-green mb-2">Step {item.step}: {item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </motion.div>
            ))}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-medium-green"></div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-medium-green">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-12"
          >
            What Our Community Says
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customerReviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-off-white p-6 rounded-xl shadow-md text-left"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-800 italic mb-4">{`"${review.text}"`}</p>
                <p className="text-deep-green font-medium flex items-center">
                  <span className="w-10 h-10 bg-medium-green rounded-full flex items-center justify-center mr-2 text-white">
                    {review.author.charAt(0)}
                  </span>
                  {review.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Sharing Impact */}
      <section className="py-16 relative bg-food-bg bg-cover bg-center">
        <div className="absolute inset-0 bg-deep-green opacity-60"></div>
        <div className="relative container mx-auto px-6 text-center z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-yellow mb-12"
          >
            Food Sharing Impact
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-off-white p-6 rounded-xl shadow-md text-center"
              >
                <h3 className="text-2xl font-bold text-deep-green mb-4">{stat.stat}</h3>
                <p className="text-lg font-medium text-gray-700">{stat.title}</p>
                <p className="text-gray-500">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

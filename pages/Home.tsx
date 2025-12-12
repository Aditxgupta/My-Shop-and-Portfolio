import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="w-full relative">
      {/* Hero Section */}
      <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        {/* Background - Simulating a dark artsy background */}
        <div className="absolute inset-0 z-0 bg-zinc-900">
             <img 
                src="https://picsum.photos/id/1015/2000/1200" 
                alt="Hero Art" 
                className="w-full h-full object-cover opacity-60 mix-blend-overlay grayscale"
             />
             <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-9xl font-thin tracking-tighter text-zinc-100 mb-6"
          >
            ADITYA GUPTA
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8"
          >
             <Link to="/gallery" className="group flex items-center space-x-2 text-zinc-300 hover:text-white transition-colors tracking-widest text-sm uppercase">
                <span>View Paintings</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </Link>
             <Link to="/shop" className="group flex items-center space-x-2 text-zinc-300 hover:text-white transition-colors tracking-widest text-sm uppercase">
                <span>Visit Shop</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </motion.div>
        </div>
      </section>

      {/* Brief Intro */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-xl md:text-2xl font-light text-zinc-600 leading-relaxed"
          >
            "Art is not just a reflection of reality, but a distortion of it to reveal a hidden truth. My work explores the human condition through texture, shadow, and silence."
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default Home;
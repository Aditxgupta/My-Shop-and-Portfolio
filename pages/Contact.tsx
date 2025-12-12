import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { submitContactForm } from '../services/mockBackend';

const Contact: React.FC = () => {
  const location = useLocation();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if we have navigation state from Product Details
    if (location.state && location.state.message) {
        setFormState(prev => ({
            ...prev,
            message: location.state.message
        }));
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitContactForm(formState);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-thin tracking-tight text-zinc-900 mb-6">contact</h1>
          <p className="text-zinc-500 font-light tracking-wide text-sm leading-relaxed">
            For commissions, inquiries regarding original works, or just to say hello.
          </p>
        </header>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-zinc-50 p-12 text-center border border-zinc-100"
          >
            <h3 className="text-xl font-light text-zinc-900 mb-2">Message Sent</h3>
            <p className="text-zinc-500 font-light text-sm">Thank you. I will get back to you shortly.</p>
            <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs uppercase tracking-widest border-b border-zinc-900 pb-1 hover:text-zinc-600 hover:border-zinc-400 transition-all"
            >
                Send another
            </button>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit} 
            className="space-y-8"
          >
            <div className="space-y-1">
              <label htmlFor="name" className="text-xs uppercase tracking-widest text-zinc-400">Name</label>
              <input
                required
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full border-b border-zinc-200 py-3 text-zinc-800 focus:outline-none focus:border-zinc-900 transition-colors font-light bg-transparent"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-xs uppercase tracking-widest text-zinc-400">Email</label>
              <input
                required
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full border-b border-zinc-200 py-3 text-zinc-800 focus:outline-none focus:border-zinc-900 transition-colors font-light bg-transparent"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="text-xs uppercase tracking-widest text-zinc-400">Message</label>
              <textarea
                required
                id="message"
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full border-b border-zinc-200 py-3 text-zinc-800 focus:outline-none focus:border-zinc-900 transition-colors font-light bg-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-zinc-900 text-white py-4 text-xs tracking-[0.2em] uppercase hover:bg-zinc-700 transition-colors disabled:opacity-50 mt-8"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        )}
        
        <div className="mt-16 text-center space-y-2">
            <p className="text-zinc-400 text-xs font-light">aditxgupta@gmail.com</p>
            <p className="text-zinc-400 text-xs font-light">Banglore, IN</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
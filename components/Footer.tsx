import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-6 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-zinc-400 text-xs font-light tracking-widest uppercase">
        <p>&copy; {new Date().getFullYear()} Aditya Gupta.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <button className="hover:text-zinc-900 transition-colors">Privacy</button>
          <button className="hover:text-zinc-900 transition-colors">Terms</button>
          <Link to="/admin" className="hover:text-zinc-900 transition-colors opacity-50">Admin</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
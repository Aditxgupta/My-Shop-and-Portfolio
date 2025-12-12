import React from 'react';
import { motion } from 'framer-motion';
import { Artwork } from '../types';

interface Props {
  artwork: Artwork;
  index: number;
}

const ArtworkCard: React.FC<Props> = ({ artwork, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative cursor-pointer"
    >
      <div className="relative overflow-hidden bg-zinc-100 aspect-[3/4]">
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title} 
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 filter group-hover:contrast-110"
        />
        <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-colors duration-500" />
      </div>
      
      <div className="mt-4 text-center">
        <h3 className="text-zinc-800 text-sm font-normal tracking-wider uppercase group-hover:text-zinc-500 transition-colors">
          {artwork.title}
        </h3>
        <p className="text-zinc-400 text-xs font-light mt-1 uppercase tracking-widest">
          {artwork.category} &mdash; {artwork.year}
        </p>
      </div>
    </motion.div>
  );
};

export default ArtworkCard;
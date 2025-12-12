import React, { useEffect, useState, useCallback } from 'react';
import { getArtworks } from '../services/mockBackend';
import { Artwork } from '../types';
import ArtworkCard from '../components/ArtworkCard';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getArtworks();
      setArtworks(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null && prev < artworks.length - 1 ? prev + 1 : 0));
  }, [artworks.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : artworks.length - 1));
  }, [artworks.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-thin tracking-tight text-zinc-900 mb-4">paintings</h1>
          <div className="w-12 h-0.5 bg-zinc-900 mx-auto opacity-20"></div>
        </header>

        {loading ? (
          <div className="h-64 w-full flex items-center justify-center text-zinc-300 tracking-widest animate-pulse">
            LOADING COLLECTION...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {artworks.map((art, idx) => (
              <div key={art.id} onClick={() => setSelectedIndex(idx)}>
                <ArtworkCard artwork={art} index={idx} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && artworks[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-white/30 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-zinc-800 hover:text-zinc-500 transition-colors z-50 p-2"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={32} strokeWidth={1} />
            </button>

            {/* Navigation Buttons */}
            <button 
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-zinc-800 hover:text-zinc-500 transition-colors z-50 p-4"
              onClick={handlePrev}
            >
              <ChevronLeft size={48} strokeWidth={0.5} />
            </button>
            <button 
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-zinc-800 hover:text-zinc-500 transition-colors z-50 p-4"
              onClick={handleNext}
            >
              <ChevronRight size={48} strokeWidth={0.5} />
            </button>

            {/* Image Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center pointer-events-none"
            >
              {/* Prevent click propagation on image to avoid closing */}
              <div className="pointer-events-auto shadow-2xl bg-white p-2 md:p-4">
                  <img 
                    src={artworks[selectedIndex].imageUrl} 
                    alt={artworks[selectedIndex].title} 
                    className="max-h-[70vh] md:max-h-[75vh] w-auto object-contain mx-auto"
                  />
                  <div className="mt-4 text-center">
                    <h2 className="text-zinc-900 text-xl font-light tracking-wide">{artworks[selectedIndex].title}</h2>
                    <p className="text-zinc-500 text-xs tracking-widest uppercase mt-1">
                        {artworks[selectedIndex].category} &bull; {artworks[selectedIndex].dimensions} &bull; {artworks[selectedIndex].year}
                    </p>
                  </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
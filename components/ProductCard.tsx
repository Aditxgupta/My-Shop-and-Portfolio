import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface Props {
  product: Product;
  index: number;
}

const ProductCard: React.FC<Props> = ({ product, index }) => {
  return (
    <Link to={`/shop/${product.id}`}>
        <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex flex-col items-center group cursor-pointer"
        >
        <div className="relative w-full aspect-square bg-zinc-50 overflow-hidden mb-6">
            <img 
            src={product.imageUrl} 
            alt={product.title} 
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${product.isSoldOut ? 'grayscale opacity-70' : 'group-hover:scale-105'}`}
            />
            {product.isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white/90 px-4 py-2 text-red-500 text-xs font-bold tracking-widest uppercase border border-red-200">
                Sold Out
                </span>
            </div>
            )}
            {!product.isSoldOut && (
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-zinc-900 px-6 py-2 text-xs tracking-widest uppercase hover:bg-zinc-900 hover:text-white transition-colors">
                        View Details
                    </span>
                </div>
            )}
        </div>

        <h3 className="text-zinc-800 text-lg font-light tracking-wide text-center group-hover:text-zinc-500 transition-colors">
            {product.title}
        </h3>
        
        <div className="mt-2 flex items-center space-x-2">
            <span className={`text-sm tracking-widest ${product.isSoldOut ? 'text-zinc-400 line-through' : 'text-zinc-600'}`}>
            ${product.price.toFixed(2)}
            </span>
        </div>
        </motion.div>
    </Link>
  );
};

export default ProductCard;
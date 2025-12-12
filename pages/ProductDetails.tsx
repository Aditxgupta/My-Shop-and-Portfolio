import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProducts } from '../services/mockBackend';
import { Product } from '../types';
import { ArrowLeft, Mail } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const allProducts = await getProducts();
      const found = allProducts.find((p) => p.id === id);
      setProduct(found || null);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-zinc-300 tracking-widest animate-pulse">LOADING...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center space-y-4">
        <div className="text-zinc-400 tracking-widest">PRODUCT NOT FOUND</div>
        <Link to="/shop" className="text-xs uppercase border-b border-zinc-900 pb-1">Return to Shop</Link>
      </div>
    );
  }

  const handlePurchaseClick = () => {
    // Navigate to contact with pre-filled state
    navigate('/contact', { 
        state: { 
            subject: `Inquiry: ${product.title}`,
            message: `Hi, I am interested in purchasing "${product.title}". Is it still available?` 
        } 
    });
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <Link to="/shop" className="inline-flex items-center space-x-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-12 text-xs uppercase tracking-widest">
          <ArrowLeft size={14} />
          <span>Back to Shop</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-zinc-50 aspect-square md:aspect-[4/5] overflow-hidden relative"
          >
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className={`w-full h-full object-cover ${product.isSoldOut ? 'grayscale opacity-80' : ''}`}
            />
            {product.isSoldOut && (
                 <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[2px]">
                    <span className="bg-white/90 px-6 py-3 text-red-500 text-sm font-bold tracking-[0.2em] uppercase border border-red-200">
                      Sold Out
                    </span>
                 </div>
            )}
          </motion.div>

          {/* Details Section */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="flex flex-col justify-center"
          >
            <span className="text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">{product.type}</span>
            <h1 className="text-3xl md:text-5xl font-thin text-zinc-900 mb-6">{product.title}</h1>
            <p className="text-2xl text-zinc-600 font-light mb-8">${product.price.toFixed(2)}</p>
            
            <div className="w-12 h-px bg-zinc-200 mb-8" />
            
            <p className="text-zinc-500 font-light leading-relaxed mb-12 max-w-md">
              {product.description || "No description available."}
            </p>

            <div className="space-y-4">
                {product.isSoldOut ? (
                    <button disabled className="w-full md:w-auto px-12 py-4 bg-zinc-100 text-zinc-400 cursor-not-allowed text-xs uppercase tracking-[0.2em]">
                        Not Available
                    </button>
                ) : (
                    <button 
                        onClick={handlePurchaseClick}
                        className="w-full md:w-auto px-12 py-4 bg-zinc-900 text-white hover:bg-zinc-700 transition-colors text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-3"
                    >
                        <Mail size={16} />
                        <span>Inquire to Purchase</span>
                    </button>
                )}
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-4">
                    Worldwide shipping available &bull; Authenticity guaranteed
                </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
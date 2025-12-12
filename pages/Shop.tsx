import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/mockBackend';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<'all' | 'original' | 'print' | 'merch'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.type === filter));
    }
  }, [filter, products]);

  const filters = ['all', 'original', 'print', 'merch'];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-thin tracking-tight text-zinc-900 mb-8">shop</h1>
          
          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
                  filter === f ? 'text-zinc-900 border-b border-zinc-900' : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </header>

        {loading ? (
          <div className="h-64 w-full flex items-center justify-center text-zinc-300 tracking-widest animate-pulse">
            LOADING SHOP...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}
        
        {filteredProducts.length === 0 && !loading && (
             <div className="text-center text-zinc-400 tracking-widest py-20">No products found in this category.</div>
        )}
      </div>
    </div>
  );
};

export default Shop;
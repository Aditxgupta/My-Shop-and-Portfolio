import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getArtworks, getProducts, getMessages, saveArtwork, saveProduct, deleteArtwork, deleteProduct, deleteMessage } from '../services/mockBackend';
import { Artwork, Product, ContactMessage } from '../types';
import { Plus, Trash2, Edit2, LogOut, Package, Palette, MessageSquare, Mail, Calendar } from 'lucide-react';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'artworks' | 'products' | 'messages'>('artworks');
  
  // Data State
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  // Edit/Create State
  const [editingArtwork, setEditingArtwork] = useState<Partial<Artwork> | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  useEffect(() => {
    const isAuth = localStorage.getItem('isAdminAuthenticated');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const a = await getArtworks();
    const p = await getProducts();
    const m = await getMessages();
    setArtworks(a);
    setProducts(p);
    setMessages(m);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'artist123') {
      setIsAuthenticated(true);
      localStorage.setItem('isAdminAuthenticated', 'true');
      fetchData();
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdminAuthenticated');
  };

  // --- Handlers for Artwork ---
  const handleSaveArtwork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArtwork) return;
    const newArtwork = {
      ...editingArtwork,
      id: editingArtwork.id || Date.now().toString(),
    } as Artwork;
    
    await saveArtwork(newArtwork);
    setEditingArtwork(null);
    fetchData();
  };

  const handleDeleteArtwork = async (id: string) => {
    if (confirm('Are you sure you want to delete this artwork?')) {
      await deleteArtwork(id);
      fetchData();
    }
  };

  // --- Handlers for Products ---
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    const newProduct = {
      ...editingProduct,
      id: editingProduct.id || Date.now().toString(),
      price: Number(editingProduct.price),
    } as Product;

    await saveProduct(newProduct);
    setEditingProduct(null);
    fetchData();
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      fetchData();
    }
  };

  // --- Handlers for Messages ---
  const handleDeleteMessage = async (id: string) => {
      if (confirm('Delete this message?')) {
          await deleteMessage(id);
          fetchData();
      }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-sm p-8 space-y-4">
          <h1 className="text-2xl font-light text-center tracking-widest text-zinc-900 mb-8">ADMIN ACCESS</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-zinc-300 py-2 focus:outline-none focus:border-zinc-900 font-light text-center"
          />
          <button type="submit" className="w-full bg-zinc-900 text-white py-3 text-xs tracking-widest hover:bg-zinc-700 transition-colors">
            ENTER
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-light tracking-tight text-zinc-900">Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center space-x-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-red-500 transition-colors">
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </header>

        {/* Tabs */}
        <div className="flex space-x-8 border-b border-zinc-200 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('artworks')}
            className={`pb-4 text-sm tracking-widest uppercase transition-colors flex items-center space-x-2 ${activeTab === 'artworks' ? 'border-b border-zinc-900 text-zinc-900' : 'text-zinc-400'}`}
          >
            <Palette size={16} />
            <span>Paintings</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-4 text-sm tracking-widest uppercase transition-colors flex items-center space-x-2 ${activeTab === 'products' ? 'border-b border-zinc-900 text-zinc-900' : 'text-zinc-400'}`}
          >
            <Package size={16} />
            <span>Shop Items</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-4 text-sm tracking-widest uppercase transition-colors flex items-center space-x-2 ${activeTab === 'messages' ? 'border-b border-zinc-900 text-zinc-900' : 'text-zinc-400'}`}
          >
            <MessageSquare size={16} />
            <span>Messages</span>
            {messages.length > 0 && <span className="bg-zinc-900 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1">{messages.length}</span>}
          </button>
        </div>

        {/* ARTWORKS SECTION */}
        {activeTab === 'artworks' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => setEditingArtwork({ category: 'oil', year: new Date().getFullYear() })}
                className="bg-zinc-900 text-white px-6 py-3 text-xs tracking-widest flex items-center space-x-2 hover:bg-zinc-700"
              >
                <Plus size={14} />
                <span>Add Painting</span>
              </button>
            </div>

            <div className="bg-white border border-zinc-100 shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-50 text-zinc-400 uppercase tracking-wider text-xs font-light">
                  <tr>
                    <th className="px-6 py-4">Image</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Year</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {artworks.map((art) => (
                    <tr key={art.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="px-6 py-4">
                        <img src={art.imageUrl} alt={art.title} className="w-12 h-12 object-cover bg-zinc-100" />
                      </td>
                      <td className="px-6 py-4 font-medium text-zinc-800">{art.title}</td>
                      <td className="px-6 py-4 text-zinc-500 uppercase text-xs">{art.category}</td>
                      <td className="px-6 py-4 text-zinc-500">{art.year}</td>
                      <td className="px-6 py-4 text-right space-x-4">
                        <button onClick={() => setEditingArtwork(art)} className="text-zinc-400 hover:text-zinc-900"><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteArtwork(art.id)} className="text-zinc-400 hover:text-red-500"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* PRODUCTS SECTION */}
        {activeTab === 'products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <div className="flex justify-end mb-6">
              <button 
                onClick={() => setEditingProduct({ type: 'print', isSoldOut: false, price: 0 })}
                className="bg-zinc-900 text-white px-6 py-3 text-xs tracking-widest flex items-center space-x-2 hover:bg-zinc-700"
              >
                <Plus size={14} />
                <span>Add Product</span>
              </button>
            </div>

            <div className="bg-white border border-zinc-100 shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-50 text-zinc-400 uppercase tracking-wider text-xs font-light">
                  <tr>
                    <th className="px-6 py-4">Image</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="px-6 py-4">
                        <img src={prod.imageUrl} alt={prod.title} className="w-12 h-12 object-cover bg-zinc-100" />
                      </td>
                      <td className="px-6 py-4 font-medium text-zinc-800">{prod.title}</td>
                      <td className="px-6 py-4 text-zinc-500 uppercase text-xs">{prod.type}</td>
                      <td className="px-6 py-4 text-zinc-600">${prod.price}</td>
                      <td className="px-6 py-4">
                        {prod.isSoldOut ? (
                            <span className="text-red-500 text-xs font-bold uppercase">Sold Out</span>
                        ) : (
                            <span className="text-green-500 text-xs font-bold uppercase">In Stock</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-4">
                        <button onClick={() => setEditingProduct(prod)} className="text-zinc-400 hover:text-zinc-900"><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteProduct(prod.id)} className="text-zinc-400 hover:text-red-500"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* MESSAGES SECTION */}
        {activeTab === 'messages' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 gap-4">
                {messages.length === 0 ? (
                    <div className="text-center py-20 text-zinc-400 font-light">No new messages</div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="bg-white border border-zinc-100 p-6 shadow-sm hover:shadow-md transition-shadow relative">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-medium text-zinc-800">{msg.name}</h3>
                                    <div className="flex items-center text-zinc-500 text-xs mt-1 space-x-3">
                                        <div className="flex items-center space-x-1">
                                            <Mail size={12} />
                                            <span>{msg.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Calendar size={12} />
                                            <span>{new Date(msg.date).toLocaleDateString()} at {new Date(msg.date).toLocaleTimeString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => handleDeleteMessage(msg.id)} className="text-zinc-300 hover:text-red-500 transition-colors p-2">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="bg-zinc-50 p-4 text-sm text-zinc-700 font-light leading-relaxed whitespace-pre-wrap">
                                {msg.message}
                            </div>
                        </div>
                    ))
                )}
            </div>
          </motion.div>
        )}

        {/* EDIT ARTWORK MODAL */}
        {editingArtwork && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg p-8 shadow-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-light mb-6 uppercase tracking-widest">{editingArtwork.id ? 'Edit Painting' : 'New Painting'}</h2>
              <form onSubmit={handleSaveArtwork} className="space-y-4">
                <input required placeholder="Title" value={editingArtwork.title || ''} onChange={e => setEditingArtwork({...editingArtwork, title: e.target.value})} className="w-full border p-2 text-sm" />
                <input required placeholder="Image URL" value={editingArtwork.imageUrl || ''} onChange={e => setEditingArtwork({...editingArtwork, imageUrl: e.target.value})} className="w-full border p-2 text-sm" />
                <div className="grid grid-cols-2 gap-4">
                   <select value={editingArtwork.category || 'oil'} onChange={e => setEditingArtwork({...editingArtwork, category: e.target.value as any})} className="w-full border p-2 text-sm">
                     <option value="oil">Oil</option>
                     <option value="sketch">Sketch</option>
                     <option value="digital">Digital</option>
                   </select>
                   <input required type="number" placeholder="Year" value={editingArtwork.year || ''} onChange={e => setEditingArtwork({...editingArtwork, year: parseInt(e.target.value)})} className="w-full border p-2 text-sm" />
                </div>
                <input placeholder="Dimensions" value={editingArtwork.dimensions || ''} onChange={e => setEditingArtwork({...editingArtwork, dimensions: e.target.value})} className="w-full border p-2 text-sm" />
                
                <div className="flex space-x-4 pt-4">
                  <button type="button" onClick={() => setEditingArtwork(null)} className="flex-1 py-3 text-xs uppercase tracking-widest border border-zinc-200 hover:bg-zinc-50">Cancel</button>
                  <button type="submit" className="flex-1 py-3 text-xs uppercase tracking-widest bg-zinc-900 text-white hover:bg-zinc-700">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* EDIT PRODUCT MODAL */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg p-8 shadow-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-light mb-6 uppercase tracking-widest">{editingProduct.id ? 'Edit Product' : 'New Product'}</h2>
              <form onSubmit={handleSaveProduct} className="space-y-4">
                <input required placeholder="Title" value={editingProduct.title || ''} onChange={e => setEditingProduct({...editingProduct, title: e.target.value})} className="w-full border p-2 text-sm" />
                <input required placeholder="Image URL" value={editingProduct.imageUrl || ''} onChange={e => setEditingProduct({...editingProduct, imageUrl: e.target.value})} className="w-full border p-2 text-sm" />
                <div className="grid grid-cols-2 gap-4">
                   <select value={editingProduct.type || 'print'} onChange={e => setEditingProduct({...editingProduct, type: e.target.value as any})} className="w-full border p-2 text-sm">
                     <option value="original">Original</option>
                     <option value="print">Print</option>
                     <option value="merch">Merch</option>
                   </select>
                   <input required type="number" step="0.01" placeholder="Price" value={editingProduct.price || ''} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} className="w-full border p-2 text-sm" />
                </div>
                <textarea placeholder="Description" value={editingProduct.description || ''} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full border p-2 text-sm" rows={3} />
                <label className="flex items-center space-x-2 text-sm text-zinc-600">
                  <input type="checkbox" checked={editingProduct.isSoldOut || false} onChange={e => setEditingProduct({...editingProduct, isSoldOut: e.target.checked})} />
                  <span>Mark as Sold Out</span>
                </label>
                
                <div className="flex space-x-4 pt-4">
                  <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 py-3 text-xs uppercase tracking-widest border border-zinc-200 hover:bg-zinc-50">Cancel</button>
                  <button type="submit" className="flex-1 py-3 text-xs uppercase tracking-widest bg-zinc-900 text-white hover:bg-zinc-700">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;
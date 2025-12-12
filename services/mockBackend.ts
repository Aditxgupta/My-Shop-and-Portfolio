import { Artwork, Product, ContactMessage } from '../types';

// Initial Data (Seeds)
const INITIAL_ARTWORKS: Artwork[] = [
  { id: '1', title: 'Eternal Sleep', category: 'oil', year: 2023, imageUrl: 'https://picsum.photos/id/1015/800/1000', dimensions: '24x36"' },
  { id: '2', title: 'The Gaze', category: 'oil', year: 2024, imageUrl: 'https://picsum.photos/id/1016/800/800', dimensions: '18x18"' },
  { id: '3', title: 'Fractured Self', category: 'digital', year: 2023, imageUrl: 'https://picsum.photos/id/1025/800/1000', dimensions: 'Digital' },
  { id: '4', title: 'Morning Light', category: 'sketch', year: 2022, imageUrl: 'https://picsum.photos/id/1024/800/600', dimensions: 'A3 Paper' },
  { id: '5', title: 'Chaos Theory', category: 'oil', year: 2024, imageUrl: 'https://picsum.photos/id/1042/800/1000', dimensions: '30x40"' },
  { id: '6', title: 'Stillness', category: 'oil', year: 2023, imageUrl: 'https://picsum.photos/id/1050/900/1200', dimensions: '24x36"' },
];

const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', title: 'Eternal Sleep - Print', type: 'print', price: 50, imageUrl: 'https://picsum.photos/id/1015/600/600', isSoldOut: false, description: 'High quality giclee print.' },
  { id: 'p2', title: 'The Gaze - Original', type: 'original', price: 1200, imageUrl: 'https://picsum.photos/id/1016/600/600', isSoldOut: true, description: 'Original oil on canvas.' },
  { id: 'p3', title: 'Chaos Theory - Hoodie', type: 'merch', price: 85, imageUrl: 'https://picsum.photos/id/1042/600/600', isSoldOut: false, description: 'Heavyweight cotton hoodie.' },
  { id: 'p4', title: 'Fractured Self - Print', type: 'print', price: 45, imageUrl: 'https://picsum.photos/id/1025/600/600', isSoldOut: false, description: 'Limited edition print.' },
];

// Helper to initialize storage
const initStorage = () => {
  if (!localStorage.getItem('artworks')) {
    localStorage.setItem('artworks', JSON.stringify(INITIAL_ARTWORKS));
  }
  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem('messages')) {
    localStorage.setItem('messages', JSON.stringify([]));
  }
};

// Initialize on load
initStorage();

// READ
export const getArtworks = async (): Promise<Artwork[]> => {
  const data = localStorage.getItem('artworks');
  return data ? JSON.parse(data) : INITIAL_ARTWORKS;
};

export const getProducts = async (): Promise<Product[]> => {
  const data = localStorage.getItem('products');
  return data ? JSON.parse(data) : INITIAL_PRODUCTS;
};

export const getMessages = async (): Promise<ContactMessage[]> => {
  const data = localStorage.getItem('messages');
  return data ? JSON.parse(data) : [];
};

// CREATE / UPDATE
export const saveArtwork = async (artwork: Artwork): Promise<void> => {
  const artworks = await getArtworks();
  const index = artworks.findIndex(a => a.id === artwork.id);
  if (index >= 0) {
    artworks[index] = artwork;
  } else {
    artworks.push(artwork);
  }
  localStorage.setItem('artworks', JSON.stringify(artworks));
};

export const saveProduct = async (product: Product): Promise<void> => {
  const products = await getProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index >= 0) {
    products[index] = product;
  } else {
    products.push(product);
  }
  localStorage.setItem('products', JSON.stringify(products));
};

export const submitContactForm = async (data: any): Promise<boolean> => {
  // Simulate network delay then save
  return new Promise(async (resolve) => {
    const messages = await getMessages();
    const newMessage: ContactMessage = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      read: false
    };
    messages.unshift(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
    
    setTimeout(() => resolve(true), 1000);
  });
};

// DELETE
export const deleteArtwork = async (id: string): Promise<void> => {
  const artworks = await getArtworks();
  const filtered = artworks.filter(a => a.id !== id);
  localStorage.setItem('artworks', JSON.stringify(filtered));
};

export const deleteProduct = async (id: string): Promise<void> => {
  const products = await getProducts();
  const filtered = products.filter(p => p.id !== id);
  localStorage.setItem('products', JSON.stringify(filtered));
};

export const deleteMessage = async (id: string): Promise<void> => {
  const messages = await getMessages();
  const filtered = messages.filter(m => m.id !== id);
  localStorage.setItem('messages', JSON.stringify(filtered));
};
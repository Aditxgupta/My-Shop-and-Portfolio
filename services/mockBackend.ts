import { Artwork, Product, ContactMessage } from '../types';

// Initial Data (Seeds)
const INITIAL_ARTWORKS: Artwork[] = [
  { id: '1', title: 'Pooja Hegde', category: 'Sketch', year: 2025, imageUrl: 'https://i.postimg.cc/TPx8hN64/1000050385.jpg', dimensions: 'A4' }
];

const INITIAL_PRODUCTS: Product[] = []
 

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

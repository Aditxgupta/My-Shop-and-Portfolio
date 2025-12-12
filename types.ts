export interface Artwork {
  id: string;
  title: string;
  category: 'oil' | 'sketch' | 'digital';
  imageUrl: string;
  year: number;
  dimensions?: string;
}

export interface Product {
  id: string;
  title: string;
  type: 'original' | 'print' | 'merch';
  price: number;
  imageUrl: string;
  isSoldOut: boolean;
  description: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface ContactMessage extends ContactForm {
  id: string;
  date: string;
  read?: boolean;
}
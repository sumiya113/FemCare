export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  reviews: { name: string; rating: number; comment: string; date: string }[];
  image: string;
  category: 'Menstrual Care' | 'PCOS Support' | 'Hormonal Wellness' | 'Nutrition & Fitness' | 'Self Care';
  inStock: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Women\'s Health' | 'PCOS' | 'Nutrition' | 'Lifestyle' | 'Mental Health' | 'Fitness';
  author: string;
  date: string;
  image: string;
  tags: string[];
  readTime: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: { text: string; score: number }[];
  category: 'sleep' | 'menstrual' | 'lifestyle' | 'stress' | 'exercise';
}

export interface SymptomLog {
  date: string; // YYYY-MM-DD
  waterIntake: number; // in ml
  sleepHours: number;
  mood: 'Energetic' | 'Balanced' | 'Tired' | 'Anxious' | 'Irritated' | 'Crampy';
  symptoms: string[]; // e.g. ["Acne", "Bloating"]
  stressLevel: number; // 1-10
  isPeriodDay: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: { product: Product; quantity: number }[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  savedArticles: string[]; // ids
  wishlist: string[]; // product ids
  quizResults?: {
    date: string;
    score: number;
    wellnessLevel: string;
    tips: string[];
  };
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  replied: boolean;
}

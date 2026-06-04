import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  slug: string;
  name_uz: string;
  name_ru: string;
  name_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  category: string;
  sae_grade: string | null;
  api_spec: string | null;
  volumes: string[];
  price_uzs: number;
  image_url: string | null;
  properties_uz: string[];
  properties_ru: string[];
  properties_en: string[];
  in_stock: boolean;
  featured: boolean;
  created_at: string;
};

export type Order = {
  id: string;
  product_id: string;
  product_name: string;
  telegram_user_id: string;
  telegram_username: string;
  volume: string;
  quantity: number;
  status: string;
  note: string;
  created_at: string;
};

export type Locale = 'uz' | 'ru' | 'en';

export const CATEGORIES = [
  { key: 'ULTRA', label_uz: 'Yengil Avtomobil Moylari', label_ru: 'Масла для Легковых', label_en: 'Passenger Car Oils', color: '#3B82F6', icon: '🚗', bgImage: '/cat_ultra.jpg' },
  { key: 'POWER', label_uz: 'Yuk Mashina Moylari', label_ru: 'Масла для Грузовых', label_en: 'Truck & Bus Oils', color: '#EF4444', icon: '🚛', bgImage: '/cat_power.jpg' },
  { key: 'MOTA', label_uz: 'Mototsikl Moylari', label_ru: 'Мотоциклетные Масла', label_en: 'Motorcycle Oils', color: '#22C55E', icon: '🏍️', bgImage: '/cat_mota.jpg' },
  { key: 'GEARA', label_uz: 'Uzatma Moylari', label_ru: 'Трансмиссионные Масла', label_en: 'Gear Oils', color: '#F59E0B', icon: '⚙️', bgImage: '/cat_geara.jpg' },
  { key: 'FREEZA', label_uz: 'Antifriz & Sovutuvchi', label_ru: 'Антифриз & Охлаждающие', label_en: 'Antifreeze & Coolants', color: '#06B6D4', icon: '❄️', bgImage: '/cat_freeza.jpg' },
  { key: 'FORSA', label_uz: 'Tormoz Suyuqliklari', label_ru: 'Тормозные Жидкости', label_en: 'Brake Fluids', color: '#A855F7', icon: '🛑', bgImage: '/cat_forsa.jpg' },
  { key: 'HYDRA', label_uz: 'Gidravlik Moylar', label_ru: 'Гидравлические Масла', label_en: 'Hydraulic Oils', color: '#F97316', icon: '🔧', bgImage: '/cat_hydra.jpg' },
  { key: 'SMOOTHE', label_uz: 'Surtmalar', label_ru: 'Смазки', label_en: 'Greases', color: '#EAB308', icon: '🧴', bgImage: '/cat_smoothe.jpg' },
  { key: 'ADDIT', label_uz: 'Qo\'shimchalar', label_ru: 'Присадки', label_en: 'Additives', color: '#F43F5E', icon: '⚡', bgImage: '/cat_addit.jpg' },
] as const;

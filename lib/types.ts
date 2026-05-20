export interface Product {
  id: string;
  slug: string;
  name_uz: string;
  name_ru: string;
  name_en: string;
  description_uz: string | null;
  description_ru: string | null;
  description_en: string | null;
  category: Category;
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
}

export interface Order {
  id: string;
  product_id: string | null;
  product_name: string | null;
  telegram_user_id: string | null;
  telegram_username: string | null;
  volume: string | null;
  quantity: number;
  status: 'new' | 'confirmed' | 'delivered' | 'cancelled';
  note: string | null;
  created_at: string;
}

export type Category =
  | 'ULTRA'
  | 'POWER'
  | 'MOTA'
  | 'GEARA'
  | 'FREEZA'
  | 'FORSA'
  | 'HYDRA'
  | 'SMOOTHE'
  | 'ADDIT';

export type Locale = 'en' | 'ru' | 'uz';

export interface CategoryInfo {
  code: Category;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  color: string;
  icon: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    code: 'ULTRA',
    name: { en: 'Passenger Cars', ru: 'Легковые автомобили', uz: 'Yengil avtomobillar' },
    description: {
      en: 'Premium engine oils for modern passenger vehicles',
      ru: 'Премиальные моторные масла для современных легковых автомобилей',
      uz: 'Zamonaviy yengil avtomobillar uchun premium motor moylari',
    },
    color: '#3B82F6',
    icon: '🚗',
  },
  {
    code: 'POWER',
    name: { en: 'Trucks & Buses', ru: 'Грузовики и автобусы', uz: 'Yuk mashinalari va avtobuslar' },
    description: {
      en: 'Heavy-duty diesel engine oils for commercial vehicles',
      ru: 'Масла для дизельных двигателей коммерческого транспорта',
      uz: 'Tijorat transporti dizel dvigatellar uchun moylar',
    },
    color: '#EF4444',
    icon: '🚛',
  },
  {
    code: 'MOTA',
    name: { en: 'Motorcycles', ru: 'Мотоциклы', uz: 'Mototsikllar' },
    description: {
      en: 'High-performance oils for 2 & 4-stroke motorcycles',
      ru: 'Высокопроизводительные масла для 2- и 4-тактных мотоциклов',
      uz: '2 va 4 taktli mototsikllar uchun yuqori samarali moylar',
    },
    color: '#22C55E',
    icon: '🏍️',
  },
  {
    code: 'GEARA',
    name: { en: 'Gear & Transmission', ru: 'Трансмиссия', uz: 'Uzatma' },
    description: {
      en: 'Gear oils and ATF for maximum wear protection',
      ru: 'Трансмиссионные масла и ATF для максимальной защиты',
      uz: 'Maksimal himoya uchun uzatma moylari va ATF',
    },
    color: '#F59E0B',
    icon: '⚙️',
  },
  {
    code: 'FREEZA',
    name: { en: 'Coolants', ru: 'Антифризы', uz: 'Antifrizlar' },
    description: {
      en: 'Antifreeze and coolants for all vehicle types',
      ru: 'Антифриз и охлаждающие жидкости для всех типов транспорта',
      uz: 'Barcha transport turlari uchun antifriz va sovutish suyuqliklari',
    },
    color: '#06B6D4',
    icon: '❄️',
  },
  {
    code: 'FORSA',
    name: { en: 'Brake Fluids', ru: 'Тормозные жидкости', uz: 'Tormoz suyuqliklari' },
    description: {
      en: 'High-performance brake fluids for safety',
      ru: 'Высокопроизводительные тормозные жидкости для безопасности',
      uz: 'Xavfsizlik uchun yuqori samarali tormoz suyuqliklari',
    },
    color: '#A855F7',
    icon: '🛑',
  },
  {
    code: 'HYDRA',
    name: { en: 'Hydraulic Oils', ru: 'Гидравлические масла', uz: 'Gidravlik moylar' },
    description: {
      en: 'Hydraulic oils for industrial and mobile equipment',
      ru: 'Гидравлические масла для промышленного и мобильного оборудования',
      uz: 'Sanoat va mobil uskunalar uchun gidravlik moylar',
    },
    color: '#F97316',
    icon: '🔧',
  },
  {
    code: 'SMOOTHE',
    name: { en: 'Greases', ru: 'Смазки', uz: 'Smazka moylari' },
    description: {
      en: 'Lithium-based greases for extreme conditions',
      ru: 'Литиевые смазки для экстремальных условий',
      uz: 'Ekstremal sharoitlar uchun litiy smazka moylari',
    },
    color: '#EAB308',
    icon: '🧴',
  },
  {
    code: 'ADDIT',
    name: { en: 'Additives', ru: 'Присадки', uz: "Qo'shimchalar" },
    description: {
      en: 'Engine and fuel system cleaners and treatments',
      ru: 'Очистители и присадки для двигателя и топливной системы',
      uz: "Dvigatel va yoqilg'i tizimi tozalagichlari",
    },
    color: '#F43F5E',
    icon: '🧪',
  },
];

/** Get the localized product name */
export function getProductName(product: Product, locale: Locale): string {
  return product[`name_${locale}`];
}

/** Get the localized product description */
export function getProductDescription(product: Product, locale: Locale): string | null {
  return product[`description_${locale}`];
}

/** Get the localized product properties */
export function getProductProperties(product: Product, locale: Locale): string[] {
  return product[`properties_${locale}`] || [];
}

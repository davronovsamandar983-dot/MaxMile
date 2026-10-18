import type { Locale } from '@/lib/translations';
import { PRODUCTS_BASE, type ProductBase, type LineKey } from './products.base';
import en from './i18n/products.en.json';
import uz from './i18n/products.uz.json';
import ru from './i18n/products.ru.json';

export type { LineKey, BaseOil, ProductBase } from './products.base';

export type ProductText = {
  tagline: string;
  description: string;
  properties: string[];
};

type TextMap = Record<string, ProductText>;
const TEXTS: Record<Locale, TextMap> = { en: en as TextMap, uz: uz as TextMap, ru: ru as TextMap };

export type Product = ProductBase & { text: Record<Locale, ProductText> };

export const PRODUCTS: Product[] = PRODUCTS_BASE.map((base) => ({
  ...base,
  text: {
    en: TEXTS.en[base.slug],
    uz: TEXTS.uz[base.slug] ?? TEXTS.en[base.slug],
    ru: TEXTS.ru[base.slug] ?? TEXTS.en[base.slug],
  },
}));

export type Line = {
  key: LineKey;
  color: string;
  image: string;
  name: Record<Locale, string>;
  desc: Record<Locale, string>;
};

export const LINES: Line[] = [
  {
    key: 'ULTRA', color: '#3B82F6', image: '/lines/ultra.jpg',
    name: { uz: 'Yengil avtomobil moylari', ru: 'Масла для легковых автомобилей', en: 'Passenger car oils' },
    desc: {
      uz: "ULTRA — zamonaviy yengil avtomobil dvigatellari uchun yuqori sifatli motor moylari: kundalik shahar harakatidan tortib uzoq safarlargacha ishonchli himoya.",
      ru: 'ULTRA — высококачественные моторные масла для современных двигателей легковых автомобилей: надежная защита от ежедневных городских поездок до дальних путешествий.',
      en: 'ULTRA is our high-quality passenger car engine oil range, which effortlessly masters the balancing act of modern everyday engine life.',
    },
  },
  {
    key: 'POWER', color: '#EF4444', image: '/lines/power.jpg',
    name: { uz: 'Yuk mashinasi va avtobus moylari', ru: 'Масла для грузовиков и автобусов', en: 'Truck & bus oils' },
    desc: {
      uz: "POWER — uzoq masofalarda tejamkorlik va ishonchlilik muhim bo'lgan tijorat transporti uchun, uzaytirilgan moy almashtirish oraliqlariga mo'ljallangan.",
      ru: 'POWER — для коммерческого транспорта, где важны экономичность и надежность на дальних дистанциях, с увеличенными интервалами замены масла.',
      en: 'POWER is specially developed for commercial vehicles that cover long distances with extended service intervals, where economy and reliability count above all.',
    },
  },
  {
    key: 'MOTA', color: '#22C55E', image: '/lines/mota.jpg',
    name: { uz: 'Mototsikl moylari', ru: 'Мотоциклетные масла', en: 'Motorcycle oils' },
    desc: {
      uz: "MOTA — yuqori aylanishli yengil dvigatellar uchun: ekstremal sharoitda ham optimal moylash, ho'l debriyaj va uzatmalar qutisi uchun mos.",
      ru: 'MOTA — для высокооборотистых легких двигателей: оптимальная смазка даже в экстремальных условиях, совместимость с мокрым сцеплением и КПП.',
      en: 'MOTA motorcycle oils are developed with a focus on the forces in high-revving, light engines to ensure optimum lubrication even under extreme conditions.',
    },
  },
  {
    key: 'GEARA', color: '#F59E0B', image: '/lines/geara.jpg',
    name: { uz: 'Uzatma va ATF moylari', ru: 'Трансмиссионные масла и ATF', en: 'Gear & transmission oils' },
    desc: {
      uz: "GEARA — mexanik va avtomat uzatmalar qutilari, differensiallar va CVT uchun: maksimal yeyilishdan himoya va barqaror kuch uzatish.",
      ru: 'GEARA — для механических и автоматических коробок передач, дифференциалов и CVT: максимальная защита от износа и стабильная передача мощности.',
      en: 'GEARA gear and ATF oils are specially formulated for maximum wear protection and extreme ageing stability with optimum power transmission.',
    },
  },
  {
    key: 'FREEZA', color: '#06B6D4', image: '/lines/freeza.jpg',
    name: { uz: 'Antifriz va sovutish suyuqliklari', ru: 'Антифризы и охлаждающие жидкости', en: 'Antifreeze & coolants' },
    desc: {
      uz: "FREEZA — barcha transport turlari uchun ko'p funksiyali sovutish suyuqliklari: muzlash, qaynash va korroziyadan ishonchli himoya.",
      ru: 'FREEZA — многофункциональные охлаждающие жидкости для всех типов транспорта: надежная защита от замерзания, закипания и коррозии.',
      en: 'FREEZA is our multifunctional coolant for all vehicle types. Optimum physical properties and high material compatibility ensure maximum protection of the cooling system.',
    },
  },
  {
    key: 'FORSA', color: '#A855F7', image: '/lines/forsa.jpg',
    name: { uz: 'Tormoz suyuqliklari', ru: 'Тормозные жидкости', en: 'Brake fluids' },
    desc: {
      uz: "FORSA — disk va baraban tormoz tizimlari, shu jumladan ABS va gidravlik debriyaj uchun yuqori barqarorlikka ega tormoz suyuqliklari.",
      ru: 'FORSA — тормозные жидкости с высокой стабильностью для дисковых и барабанных тормозов, включая системы с ABS и гидроприводом сцепления.',
      en: 'FORSA high-performance brake fluids with high stability and resistance to ageing for disc and drum brake systems — also with ABS and clutch systems.',
    },
  },
  {
    key: 'HYDRA', color: '#F97316', image: '/lines/hydra.jpg',
    name: { uz: 'Gidravlik moylar', ru: 'Гидравлические масла', en: 'Hydraulic oils' },
    desc: {
      uz: "HYDRA — gidravlik tizimlarda kuchni yo'qotishsiz uzatish va tizimni optimal himoya qilish uchun ishlab chiqilgan.",
      ru: 'HYDRA — разработаны для передачи усилия в гидравлических системах без потери производительности и с оптимальной защитой системы.',
      en: 'HYDRA has been developed to transport the forces in the hydraulic system without loss of performance while optimally protecting the system.',
    },
  },
  {
    key: 'SMOOTHE', color: '#EAB308', image: '/lines/smoothe.jpg',
    name: { uz: 'Surkov moylari', ru: 'Пластичные смазки', en: 'Greases' },
    desc: {
      uz: "SMOOTHE — podshipniklar, shassi va sanoat uskunalari uchun litiyli EP surkov moylari: yuqori yuk, suv va zangdan himoya.",
      ru: 'SMOOTHE — литиевые EP-смазки для подшипников, шасси и промышленного оборудования: высокая нагрузка, защита от воды и ржавчины.',
      en: 'SMOOTHE lithium EP greases for bearings, chassis and industrial equipment: high load-carrying capacity, water and rust resistance.',
    },
  },
  {
    key: 'ADDIT', color: '#F43F5E', image: '/lines/addit.jpg',
    name: { uz: "Qo'shimchalar", ru: 'Присадки', en: 'Additives' },
    desc: {
      uz: "ADDIT — dvigatel, uzatma va yoqilg'i tizimini tozalovchi hamda moy xususiyatlarini kuchaytiruvchi qo'shimchalar.",
      ru: 'ADDIT — присадки для очистки двигателя, трансмиссии и топливной системы, а также для усиления свойств масла.',
      en: 'ADDIT additives clean the engine, transmission and fuel system and boost the properties of the oil.',
    },
  },
];

export const LINE_MAP: Record<LineKey, Line> = Object.fromEntries(LINES.map((l) => [l.key, l])) as Record<LineKey, Line>;

export const getProduct = (slug: string): Product | undefined => PRODUCTS.find((p) => p.slug === slug);
export const productsByLine = (key: LineKey): Product[] => PRODUCTS.filter((p) => p.line === key);
export const FEATURED: Product[] = PRODUCTS.filter((p) => p.featured);
export const isLineKey = (v: string | null | undefined): v is LineKey => !!v && v in LINE_MAP;

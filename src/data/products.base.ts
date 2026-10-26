// Mahsulotlar — tilga bog'liq bo'lmagan asosiy ma'lumotlar.
// Matnlar (tagline, tavsif, xususiyatlar) src/data/i18n/products.{uz,ru,en}.json da.
// Manba: maxmilesoil.com va MAX Oil and Lubricant FZ-LLC (UAE) rasmiy katalogi (PDF, 2025). Qadoqlar katalogdagi "Plastic / Drum" yorliqlaridan olingan.

export type LineKey =
  | 'ULTRA' | 'POWER' | 'MOTA' | 'GEARA' | 'FREEZA' | 'FORSA' | 'HYDRA' | 'SMOOTHE' | 'ADDIT';

export type BaseOil = 'synthetic' | 'semi' | 'mineral';

export type ProductBase = {
  slug: string;
  line: LineKey;
  /** Mahsulot nomi — barcha tillarda bir xil texnik belgi */
  name: string;
  /** Yopishqoqlik / sinf (SAE, ISO, DOT, NLGI...) */
  grade?: string;
  /** Standartlar (API, ACEA, JASO...) */
  spec?: string;
  base?: BaseOil;
  packs: string[];
  image: string;
  /** Bosh sahifadagi tanlangan mahsulotlar */
  featured?: boolean;
  /** Rasm turi: kesilgan (contain) yoki foto (cover) */
  imageFit?: 'contain' | 'cover';
};

const OIL_PACKS = ['1 L', '4 L', '5 L', '20 L', '208 L'];
const BRAKE_PACKS = ['250 ml', '500 ml', '4 L', '20 L', '208 L'];
const GREASE_PACKS = ['1 kg', '25 kg'];
const ADDIT_PACKS = ['300 ml'];

export const PRODUCTS_BASE: ProductBase[] = [
  // ───────── ULTRA — yengil avtomobil moylari
  { slug: 'ultra-0w-20-sp', line: 'ULTRA', name: 'SAE 0W-20 SP', grade: '0W-20', spec: 'API SP', base: 'synthetic', packs: OIL_PACKS, image: '/products/v2/ultra-0w-20-sp.webp' },
  { slug: 'ultra-0w-30-sn-c2-c3', line: 'ULTRA', name: 'SAE 0W-30 SN C2/C3', grade: '0W-30', spec: 'API SN · ACEA C2/C3', base: 'synthetic', packs: OIL_PACKS, image: '/products/v2/ultra-0w-30-sn-c2-c3.webp' },
  { slug: 'ultra-0w-40-sp', line: 'ULTRA', name: 'SAE 0W-40 SP', grade: '0W-40', spec: 'API SP', base: 'synthetic', packs: OIL_PACKS, image: '/products/v2/ultra-0w-40-sp.webp' },
  { slug: 'ultra-5w-30-sn-cf', line: 'ULTRA', name: 'SAE 5W-30 SN/CF', grade: '5W-30', spec: 'API SN/CF', base: 'synthetic', packs: OIL_PACKS, image: '/products/v2/ultra-5w-30-sn-cf.webp', featured: true, imageFit: 'cover' },
  { slug: 'ultra-5w-30-sn-c3', line: 'ULTRA', name: 'SAE 5W-30 SN C3', grade: '5W-30', spec: 'API SN · ACEA C3', base: 'synthetic', packs: OIL_PACKS, image: '/products/v2/ultra-5w-30-sn-c3.webp' },
  { slug: 'ultra-5w-30-sn-a3-b4', line: 'ULTRA', name: 'SAE 5W-30 SN A3/B4', grade: '5W-30', spec: 'API SN · ACEA A3/B4', base: 'synthetic', packs: OIL_PACKS, image: '/products/v2/ultra-5w-30-sn-a3-b4.webp' },
  { slug: 'ultra-10w-60-sn-racing', line: 'ULTRA', name: 'SAE 10W-60 SN Racing', grade: '10W-60', spec: 'API SN', base: 'synthetic', packs: OIL_PACKS, image: '/products/v2/ultra-10w-60-sn-racing.webp' },
  { slug: 'ultra-15w-40-sl', line: 'ULTRA', name: 'SAE 15W-40 SL', grade: '15W-40', spec: 'API SL', packs: OIL_PACKS, image: '/products/v2/ultra-15w-40-sl.webp' },
  { slug: 'ultra-20w-50-sl', line: 'ULTRA', name: 'SAE 20W-50 SL', grade: '20W-50', spec: 'API SL', packs: OIL_PACKS, image: '/products/v2/ultra-20w-50-sl.webp' },

  // ───────── POWER — yuk mashinalari va avtobuslar
  { slug: 'power-5w-30-ck-4-e9', line: 'POWER', name: 'SAE 5W-30 CK-4 E9', grade: '5W-30', spec: 'API CK-4 · ACEA E9', packs: OIL_PACKS, image: '/products/v2/power-5w-30-ck-4-e9.webp', featured: true },
  { slug: 'power-10w-40-ci-4-e4-e7', line: 'POWER', name: 'SAE 10W-40 CI-4 E4/E7', grade: '10W-40', spec: 'API CI-4 · ACEA E4/E7', base: 'semi', packs: OIL_PACKS, image: '/products/v2/power-10w-40-ci-4-e4-e7.webp' },
  { slug: 'power-15w-40-ch-4', line: 'POWER', name: 'SAE 15W-40 CH-4', grade: '15W-40', spec: 'API CH-4', packs: OIL_PACKS, image: '/products/v2/power-15w-40-ch-4.webp' },
  { slug: 'power-15w-40-ci-4-e7', line: 'POWER', name: 'SAE 15W-40 CI-4 E7', grade: '15W-40', spec: 'API CI-4 · ACEA E7', packs: OIL_PACKS, image: '/products/v2/power-15w-40-ci-4-e7.webp' },
  { slug: 'power-sae-50-cf', line: 'POWER', name: 'SAE 50 CF', grade: 'SAE 50', spec: 'API CF', packs: OIL_PACKS, image: '/products/v2/power-sae-50-cf.webp' },
  { slug: 'power-sae-40-cf', line: 'POWER', name: 'SAE 40 CF', grade: 'SAE 40', spec: 'API CF', packs: OIL_PACKS, image: '/products/v2/power-sae-40-cf.webp' },

  // ───────── MOTA — mototsikl moylari
  { slug: 'mota-10w-40-sl-jaso-ma2', line: 'MOTA', name: '10W-40 SL JASO MA-2', grade: '10W-40', spec: 'API SL · JASO MA-2', packs: OIL_PACKS, image: '/products/v2/mota-10w-40-sl-jaso-ma2.webp' },
  { slug: 'mota-15w-40-sl-jaso-ma2', line: 'MOTA', name: '15W-40 SL JASO MA-2', grade: '15W-40', spec: 'API SL · JASO MA-2', packs: OIL_PACKS, image: '/products/v2/mota-15w-40-sl-jaso-ma2.webp' },

  // ───────── GEARA — uzatma va transmissiya moylari
  { slug: 'geara-atf-dex-iii', line: 'GEARA', name: 'ATF DEX III', grade: 'ATF', spec: 'Dexron III', base: 'synthetic', packs: OIL_PACKS, image: '/products/v2/geara-atf-dex-iii.webp' },
  { slug: 'geara-atf-dex-vi', line: 'GEARA', name: 'ATF DEX VI', grade: 'ATF', spec: 'Dexron VI', base: 'synthetic', packs: OIL_PACKS, image: '/products/v2/geara-atf-dex-vi.webp', featured: true },
  { slug: 'geara-75w-80-gl-4', line: 'GEARA', name: 'SAE 75W-80 GL-4', grade: '75W-80', spec: 'API GL-4', base: 'synthetic', packs: OIL_PACKS, image: '/products/v2/geara-75w-80-gl-4.webp' },
  { slug: 'geara-80w-90-gl-4', line: 'GEARA', name: 'SAE 80W-90 GL-4', grade: '80W-90', spec: 'API GL-4', base: 'mineral', packs: OIL_PACKS, image: '/products/v2/geara-80w-90-gl-4.webp' },
  { slug: 'geara-75w-85-gl-4-gl-5', line: 'GEARA', name: 'SAE 75W-85 GL-4/GL-5', grade: '75W-85', spec: 'API GL-4/GL-5', packs: OIL_PACKS, image: '/products/v2/geara-75w-85-gl-4-gl-5.webp' },
  { slug: 'geara-75w-gl-4', line: 'GEARA', name: 'SAE 75W GL-4', grade: '75W', spec: 'API GL-4', packs: OIL_PACKS, image: '/products/v2/geara-75w-gl-4.webp' },
  { slug: 'geara-75w-140-gl-5', line: 'GEARA', name: 'SAE 75W-140 GL-5', grade: '75W-140', spec: 'API GL-5', packs: OIL_PACKS, image: '/products/v2/geara-75w-140-gl-5.webp' },
  { slug: 'geara-cvt', line: 'GEARA', name: 'CVT Fluid', grade: 'CVT', base: 'synthetic', packs: OIL_PACKS, image: '/products/v2/geara-cvt.webp' },

  // ───────── FREEZA — antifriz va sovutuvchi suyuqliklar
  { slug: 'freeza-concentrate', line: 'FREEZA', name: 'Antifreeze Concentrate', grade: 'Concentrate', packs: OIL_PACKS, image: '/products/v2/freeza-concentrate.webp' },
  { slug: 'freeza-premix-33', line: 'FREEZA', name: 'Antifreeze Premix 33%', grade: 'Premix 33%', packs: OIL_PACKS, image: '/products/v2/freeza-premix-33.webp' },
  { slug: 'freeza-premix-50', line: 'FREEZA', name: 'Antifreeze Premix 50%', grade: 'Premix 50%', packs: OIL_PACKS, image: '/products/v2/freeza-premix-50.webp' },

  // ───────── FORSA — tormoz suyuqliklari
  { slug: 'forsa-dot-4', line: 'FORSA', name: 'Brake Fluid DOT 4', grade: 'DOT 4', packs: BRAKE_PACKS, image: '/products/v2/forsa-dot-4.webp', featured: true },
  { slug: 'forsa-dot-3', line: 'FORSA', name: 'Brake Fluid DOT 3', grade: 'DOT 3', packs: BRAKE_PACKS, image: '/products/v2/forsa-dot-3.webp' },

  // ───────── HYDRA — gidravlik moylar
  { slug: 'hydra-hlp-32', line: 'HYDRA', name: 'Hydraulic HLP 32', grade: 'ISO VG 32', spec: 'HLP', packs: OIL_PACKS, image: '/products/v2/hydra-hlp-32.webp' },
  { slug: 'hydra-hlp-68', line: 'HYDRA', name: 'Hydraulic HLP 68', grade: 'ISO VG 68', spec: 'HLP', packs: OIL_PACKS, image: '/products/v2/hydra-hlp-68.webp' },
  { slug: 'hydra-hvlp-46', line: 'HYDRA', name: 'Hydraulic HVLP 46', grade: 'ISO VG 46', spec: 'HVLP', packs: OIL_PACKS, image: '/products/v2/hydra-hvlp-46.webp' },

  // ───────── SMOOTHE — surkov moylari (grease)
  { slug: 'smoothe-li-ep2', line: 'SMOOTHE', name: 'LI EP2 Grease', grade: 'NLGI 2', spec: 'Lithium EP', packs: GREASE_PACKS, image: '/products/v2/smoothe-li-ep2.webp', featured: true },
  { slug: 'smoothe-lc-40-ep-semi-syn', line: 'SMOOTHE', name: 'LC 40-EP Semi-Syn Grease', grade: 'NLGI 2', spec: 'EP · Semi-synthetic', base: 'semi', packs: GREASE_PACKS, image: '/products/v2/smoothe-lc-40-ep-semi-syn.webp' },
  { slug: 'smoothe-l-100-ep-syn', line: 'SMOOTHE', name: 'L 100-EP Syn Grease', grade: 'NLGI 2', spec: 'Lithium · PAO', base: 'synthetic', packs: GREASE_PACKS, image: '/products/v2/smoothe-l-100-ep-syn.webp' },

  // ───────── ADDIT — qo'shimchalar
  { slug: 'addit-oil-system-cleaner', line: 'ADDIT', name: 'Oil System Cleaner', grade: '300 ml', spec: 'Engine oil treatment', packs: ADDIT_PACKS, image: '/products/v2/addit-oil-system-cleaner.webp' },
  { slug: 'addit-engine-transmission-cleaner', line: 'ADDIT', name: 'Engine & Transmission System Cleaner', grade: '300 ml', spec: 'System cleaner', packs: ADDIT_PACKS, image: '/products/v2/addit-engine-transmission-cleaner.webp' },
  { slug: 'addit-fuel-system-cleaner', line: 'ADDIT', name: 'Fuel System Cleaner', grade: '300 ml', spec: 'Fuel system cleaner', packs: ADDIT_PACKS, image: '/products/v2/addit-fuel-system-cleaner.webp' },
];

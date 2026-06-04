export type Locale = 'uz' | 'ru' | 'en';

export const translations = {
  uz: {
    nav: {
      home: 'Bosh sahifa',
      products: 'Mahsulotlar',
      about: 'Biz haqimizda',
      contact: 'Aloqa',
      admin: 'Admin panel'
    },
    hero: {
      title: 'KUCH VA ISHONCH HAMISHA HAMROHINGIZ',
      subtitle: 'Premium darajadagi MaxMiles motor moylari va moylash materiallari sizning avtomobilingiz uchun eng yuqori himoyani kafolatlaydi.',
      cta: 'Barcha mahsulotlar',
      aboutCta: 'Biz haqimizda ko\'proq'
    },
    categories: {
      title: 'Kategoriyalar',
      subtitle: 'Avtomobillar, mototsikllar va sanoat uchun maxsus moylash materiallari',
      viewAll: 'Hammasini ko\'rish'
    },
    whyUs: {
      title: 'Nega aynan MaxMiles?',
      subtitle: 'Sifat, barqarorlik va yuqori darajadagi texnologik yondashuv',
      card1Title: 'Premium Sifat',
      card1Desc: 'Eng ilg\'or texnologiyalar va PAO bazaviy moylar asosida tayyorlangan formulalar.',
      card2Title: 'Maksimal Himoya',
      card2Desc: 'Dvigatelni yeyilish, korroziya va ekstremal haroratlardan ishonchli himoya qiladi.',
      card3Title: 'Yoqilg\'i Tejamkorligi',
      card3Desc: 'Ishqalanishni kamaytirib, yoqilg\'i sarfini sezilarli darajada pasaytiradi.',
      card4Title: 'Keng Assortiment',
      card4Desc: 'Yengil, og\'ir yuk mashinalari, mototsikl, uzatmalar qutisi va sanoat uchun moylar.'
    },
    aboutSection: {
      title: 'MaxMiles Lubricants Haqida',
      p1: 'MaxMiles brendi - bu eng zamonaviy texnologiyalar yordamida yaratilgan, xalqaro standartlarga to\'la javob beradigan premium toifadagi moylash materiallari ishlab chiqaruvchisi. Bizning maqsadimiz - har qanday sharoitda dvigatelingiz va uzatmalar qutingizning benuqson ishlashini ta\'minlashdir.',
      p2: 'Bizning barcha mahsulotlarimiz eng yuqori sifatli bazaviy moylar (jumladan, PAO) va dunyodagi eng yetakchi qo\'shimcha (additive) ishlab chiqaruvchilarining ilg\'or paketlari asosida tayyorlanadi. MaxMiles bilan siz avtomobilingiz kelajagiga ishonishingiz mumkin.',
      statsActive: 'Mijozlarimiz',
      statsProducts: 'Mahsulotlar',
      statsExperience: 'Yillik tajriba'
    },
    products: {
      searchPlaceholder: 'Mahsulot qidirish...',
      all: 'Barcha mahsulotlar',
      category: 'Kategoriya',
      specs: 'Spetsifikatsiyasi',
      sae: 'Yopishqoqlik (SAE)',
      volume: 'Hajmi',
      order: 'Buyurtma berish',
      inStock: 'Omborda bor',
      outOfStock: 'Tugagan',
      specsLabel: 'Texnik xususiyatlari',
      description: 'Tavsif',
      related: 'O\'xshash mahsulotlar',
      orderModalTitle: 'Telegram orqali buyurtma berish',
      orderFormName: 'Ismingiz',
      orderFormPhone: 'Telefon raqamingiz',
      orderFormVolume: 'Hajmni tanlang',
      orderFormQty: 'Soni',
      orderFormSubmit: 'Telegram orqali yuborish',
      orderSuccess: 'Buyurtmangiz muvaffaqiyatli Telegram botga yuborildi!',
      note: 'Qo\'shimcha eslatma'
    },
    footer: {
      desc: 'Premium darajadagi motor moylari va moylash materiallari.',
      quickLinks: 'Tezkor havolalar',
      contacts: 'Aloqa ma\'lumotlari',
      rights: 'Barcha huquqlar himoyalangan.'
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      products: 'Продукция',
      about: 'О нас',
      contact: 'Контакты',
      admin: 'Админ панель'
    },
    hero: {
      title: 'СИЛА И НАДЕЖНОСТЬ ВСЕГДА С ВАМИ',
      subtitle: 'Моторные масла и смазочные материалы премиум-класса MaxMiles гарантируют максимальную защиту вашего автомобиля.',
      cta: 'Вся продукция',
      aboutCta: 'Узнать больше'
    },
    categories: {
      title: 'Категории',
      subtitle: 'Специальные смазочные материалы для автомобилей, мотоциклов и промышленности',
      viewAll: 'Показать все'
    },
    whyUs: {
      title: 'Почему именно MaxMiles?',
      subtitle: 'Качество, стабильность и передовой технологический подход',
      card1Title: 'Премиум Качество',
      card1Desc: 'Рецептуры, разработанные на основе самых передовых технологий и базовых масел ПАО.',
      card2Title: 'Максимальная Защита',
      card2Desc: 'Надежно защищает двигатель от износа, коррозии и экстремальных температур.',
      card3Title: 'Экономия Топлива',
      card3Desc: 'Снижает трение, что значительно уменьшает расход топлива.',
      card4Title: 'Широкий Ассортимент',
      card4Desc: 'Масла для легковых, грузовых автомобилей, мотоциклов, трансмиссий и промышленности.'
    },
    aboutSection: {
      title: 'О компании MaxMiles Lubricants',
      p1: 'Бренд MaxMiles – это производитель смазочных материалов премиум-класса, созданных с использованием самых современных технологий и полностью соответствующих международным стандартам. Наша цель – обеспечить безупречную работу вашего двигателя и трансмиссии в любых условиях.',
      p2: 'Вся наша продукция изготавливается на основе высококачественных базовых масел (включая ПАО) и передовых пакетов присадок от ведущих мировых производителей. С MaxMiles вы можете быть уверены в будущем вашего автомобиля.',
      statsActive: 'Активных клиентов',
      statsProducts: 'Продуктов',
      statsExperience: 'Лет опыта'
    },
    products: {
      searchPlaceholder: 'Поиск продукции...',
      all: 'Все продукты',
      category: 'Категория',
      specs: 'Спецификации',
      sae: 'Вязкость (SAE)',
      volume: 'Объем',
      order: 'Заказать',
      inStock: 'В наличии',
      outOfStock: 'Нет в наличии',
      specsLabel: 'Технические свойства',
      description: 'Описание',
      related: 'Похожие продукты',
      orderModalTitle: 'Заказ через Telegram',
      orderFormName: 'Ваше имя',
      orderFormPhone: 'Номер телефона',
      orderFormVolume: 'Выберите объем',
      orderFormQty: 'Количество',
      orderFormSubmit: 'Отправить в Telegram',
      orderSuccess: 'Ваш заказ успешно отправлен в Telegram бот!',
      note: 'Примечание'
    },
    footer: {
      desc: 'Моторные масла и смазочные материалы премиум-класса.',
      quickLinks: 'Быстрые ссылки',
      contacts: 'Контакты',
      rights: 'Все права защищены.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      about: 'About',
      contact: 'Contact',
      admin: 'Admin Panel'
    },
    hero: {
      title: 'POWER AND RELIABILITY ALWAYS WITH YOU',
      subtitle: 'Premium MaxMiles motor oils and lubricants guarantee the ultimate protection for your vehicle.',
      cta: 'All Products',
      aboutCta: 'Learn More'
    },
    categories: {
      title: 'Categories',
      subtitle: 'Specialized lubricants for cars, motorcycles, and industries',
      viewAll: 'View All'
    },
    whyUs: {
      title: 'Why MaxMiles?',
      subtitle: 'Quality, stability, and advanced technological approach',
      card1Title: 'Premium Quality',
      card1Desc: 'Formulas developed based on the most advanced technologies and PAO base oils.',
      card2Title: 'Maximum Protection',
      card2Desc: 'Reliably protects the engine from wear, corrosion, and extreme temperatures.',
      card3Title: 'Fuel Efficiency',
      card3Desc: 'Minimizes friction, which significantly reduces fuel consumption.',
      card4Title: 'Wide Assortment',
      card4Desc: 'Oils for passenger cars, trucks, motorcycles, transmissions, and industrial applications.'
    },
    aboutSection: {
      title: 'About MaxMiles Lubricants',
      p1: 'The MaxMiles brand is a manufacturer of premium lubricants created using state-of-the-art technologies and fully complying with international standards. Our goal is to ensure the flawless operation of your engine and transmission under any conditions.',
      p2: 'All our products are formulated based on the highest quality base oils (including PAO) and advanced additive packages from the world\'s leading manufacturers. With MaxMiles, you can trust your vehicle\'s future.',
      statsActive: 'Happy Clients',
      statsProducts: 'Products',
      statsExperience: 'Years of Experience'
    },
    products: {
      searchPlaceholder: 'Search products...',
      all: 'All Products',
      category: 'Category',
      specs: 'Specifications',
      sae: 'Viscosity (SAE)',
      volume: 'Volume',
      order: 'Order Now',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      specsLabel: 'Technical Properties',
      description: 'Description',
      related: 'Related Products',
      orderModalTitle: 'Order via Telegram',
      orderFormName: 'Your Name',
      orderFormPhone: 'Your Phone Number',
      orderFormVolume: 'Select Volume',
      orderFormQty: 'Quantity',
      orderFormSubmit: 'Send via Telegram',
      orderSuccess: 'Your order has been successfully sent to our Telegram bot!',
      note: 'Additional Note'
    },
    footer: {
      desc: 'Premium engine oils and lubricants.',
      quickLinks: 'Quick Links',
      contacts: 'Contact Info',
      rights: 'All rights reserved.'
    }
  }
};

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local file to get MONGODB_URI
const envPath = path.join(__dirname, '../.env.local');
let mongodbUri = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/^MONGODB_URI=(.*)$/m);
  if (match && match[1]) {
    mongodbUri = match[1].trim().replace(/['"]/g, '');
  }
}

if (!mongodbUri) {
  mongodbUri = 'mongodb+srv://Climax Apparels:xI2QuBaFZsYQ5vRD@cluster0.e5n1hnl.mongodb.net/Climax Apparels';
}

console.log('Connecting to MongoDB...');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
});
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  purchasePrice: { type: Number },
  discountRate: { type: Number },
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, default: 0 },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: String }],
  images: [{ type: String }],
  attributes: [
    {
      key: { type: String },
      value: { type: String },
    },
  ],
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isFlashSale: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const baseProducts = [
  // ==================== Category 1: LED TV (led-tv) ====================
  {
    name: 'Sony Bravia 55" 4K Ultra HD Smart LED TV',
    slug: 'sony-bravia-55-4k-smart-tv',
    description: 'Experience stunning realism with the Sony Bravia 55-inch 4K Ultra HD Smart LED TV. Features X1 4K Processor, Triluminos Pro display, Dolby Vision, Google TV integration, and cinematic sound for the ultimate home entertainment.',
    price: 85000,
    salePrice: 78000,
    discountRate: 8,
    purchasePrice: 65000,
    stock: 15,
    sku: 'AT-TV-01',
    categorySlug: 'led-tv',
    images: ['/assets/images/products/led-tv-banner.webp'],
    tags: ['sony', '4k tv', 'smart tv', 'led tv'],
    attributes: [{ key: 'Size', value: '55 Inch' }, { key: 'Resolution', value: '4K Ultra HD' }],
    isFlashSale: true,
    isFeatured: true,
    isNewArrival: false,
  },
  {
    name: 'Samsung 43" Crystal 4K UHD Smart TV',
    slug: 'samsung-43-crystal-4k-uhd-tv',
    description: 'Bring bright, crisp picture quality into your living room with the Samsung 43-inch Crystal 4K UHD Smart TV. Powered by Crystal Processor 4K, featuring HDR, Motion Xcelerator, and seamless smart voice assistant support.',
    price: 52000,
    salePrice: 46800,
    discountRate: 10,
    purchasePrice: 38000,
    stock: 25,
    sku: 'AT-TV-02',
    categorySlug: 'led-tv',
    images: ['/assets/images/products/led-tv-banner.webp'],
    tags: ['samsung', 'crystal 4k', 'smart tv'],
    attributes: [{ key: 'Size', value: '43 Inch' }, { key: 'OS', value: 'Tizen Smart OS' }],
    isFlashSale: true,
    isFeatured: false,
    isNewArrival: true,
  },
  {
    name: 'Xiaomi Mi TV P1 55" Bezel-less Smart TV',
    slug: 'xiaomi-mi-tv-p1-55-bezel-less',
    description: 'Enjoy a limitless display with the Xiaomi Mi TV P1. Boasting a beautiful bezel-less design, 4K UHD resolution, Android TV 10, hands-free Google Assistant, and high-fidelity dual Dolby Audio speakers.',
    price: 68000,
    salePrice: 62000,
    discountRate: 9,
    purchasePrice: 50000,
    stock: 20,
    sku: 'AT-TV-03',
    categorySlug: 'led-tv',
    images: ['/assets/images/products/led-tv-banner.webp'],
    tags: ['xiaomi', 'mi tv', 'android tv', 'bezel-less'],
    attributes: [{ key: 'Size', value: '55 Inch' }, { key: 'OS', value: 'Android TV 10' }],
    isFlashSale: false,
    isFeatured: true,
    isNewArrival: true,
  },
  {
    name: 'LG 32" Smart LED HD TV ThinQ AI',
    slug: 'lg-32-smart-led-hd-tv-thinq',
    description: 'A compact and smart addition to any bedroom. The LG 32-inch Smart HD TV features ThinQ AI for intelligent voice commands, Active HDR, Dynamic Color Enhancer, and immersive Virtual Surround Sound.',
    price: 28000,
    salePrice: 24500,
    discountRate: 13,
    purchasePrice: 19000,
    stock: 35,
    sku: 'AT-TV-04',
    categorySlug: 'led-tv',
    images: ['/assets/images/products/led-tv-banner.webp'],
    tags: ['lg', '32 inch tv', 'thinq ai', 'budget tv'],
    attributes: [{ key: 'Size', value: '32 Inch' }, { key: 'Resolution', value: 'HD Ready (1366x768)' }],
    isFlashSale: false,
    isFeatured: true,
    isNewArrival: false,
  },
  {
    name: 'Walton 50" 4K Android Smart LED TV',
    slug: 'walton-50-4k-android-smart-led-tv',
    description: 'Experience premium localized smart technology with Walton 50-inch 4K Smart TV. Powered by official Android TV, featuring Dolby Vision, HDR10, built-in Chromecast, and locally backed warranty support.',
    price: 48000,
    salePrice: 43200,
    discountRate: 10,
    purchasePrice: 35000,
    stock: 18,
    sku: 'AT-TV-05',
    categorySlug: 'led-tv',
    images: ['/assets/images/products/led-tv-banner.webp'],
    tags: ['walton', 'local brand', '4k tv', 'smart tv'],
    attributes: [{ key: 'Size', value: '50 Inch' }, { key: 'OS', value: 'Android TV' }],
    isFlashSale: false,
    isFeatured: false,
    isNewArrival: true,
  },

  // ==================== Category 2: Fans (fans) ====================
  {
    name: 'BRB Premium High-Speed Ceiling Fan 56"',
    slug: 'brb-premium-high-speed-ceiling-fan',
    description: 'Stay cool and energy-efficient with the BRB Premium Ceiling Fan. Engineered with 100% pure copper wire motor, aerodynamically balanced blades for noise-free high-speed air delivery, and rust-free powder coated finish.',
    price: 4500,
    salePrice: 3990,
    discountRate: 11,
    purchasePrice: 3100,
    stock: 50,
    sku: 'AT-FN-01',
    categorySlug: 'fans',
    images: ['/assets/images/products/fans-banner.webp'],
    tags: ['brb', 'ceiling fan', 'copper motor', 'cooling'],
    attributes: [{ key: 'Size', value: '56 Inch' }, { key: 'Power', value: '75W' }],
    isFlashSale: true,
    isFeatured: true,
    isNewArrival: false,
  },
  {
    name: 'GFC Deluxe Pedestal Stand Fan 24"',
    slug: 'gfc-deluxe-pedestal-stand-fan',
    description: 'Ensure wide-range air circulation with GFC Deluxe Pedestal Fan. Features heavy duty height-adjustable stand, powerful multi-speed copper motor, elegant oscillation grill, and long-lasting paint finish.',
    price: 6800,
    purchasePrice: 5500,
    stock: 30,
    sku: 'AT-FN-02',
    categorySlug: 'fans',
    images: ['/assets/images/products/fans-banner.webp'],
    tags: ['gfc', 'stand fan', 'pedestal fan', 'cooling'],
    attributes: [{ key: 'Size', value: '24 Inch' }, { key: 'Speeds', value: '3 Speed Controls' }],
    isFlashSale: false,
    isFeatured: true,
    isNewArrival: true,
  },
  {
    name: 'Click Smart Rechargeable Defender AC/DC Fan',
    slug: 'click-smart-rechargeable-ac-dc-fan',
    description: 'Never worry about load shedding again. Click AC/DC Rechargeable fan offers up to 8 hours of backup runtime on a single charge. Includes built-in LED night light, USB mobile charging port, and remote control.',
    price: 5800,
    salePrice: 4950,
    discountRate: 15,
    purchasePrice: 3900,
    stock: 40,
    sku: 'AT-FN-03',
    categorySlug: 'fans',
    images: ['/assets/images/products/fans-banner.webp'],
    tags: ['click', 'rechargeable fan', 'ac/dc fan', 'emergency'],
    attributes: [{ key: 'Backup Time', value: 'Up to 8 Hours' }, { key: 'Battery', value: '12V 4.5Ah Lead-Acid' }],
    isFlashSale: true,
    isFeatured: false,
    isNewArrival: true,
  },
  {
    name: 'Super Star Premium Exhaust Fan 12"',
    slug: 'super-star-premium-exhaust-fan',
    description: 'Keep your kitchen and bathroom fresh and odor-free with the Super Star Exhaust Fan. Designed with high-suction capacity, back louvers to protect against dust, and low noise long-lasting copper motor.',
    price: 1850,
    salePrice: 1650,
    discountRate: 11,
    purchasePrice: 1200,
    stock: 65,
    sku: 'AT-FN-04',
    categorySlug: 'fans',
    images: ['/assets/images/products/fans-banner.webp'],
    tags: ['super star', 'exhaust fan', 'kitchen', 'ventilation'],
    attributes: [{ key: 'Size', value: '12 Inch' }, { key: 'RPM', value: '1400 RPM' }],
    isFlashSale: false,
    isFeatured: false,
    isNewArrival: false,
  },
  {
    name: 'Walton Wall Mount Smart Fan with Remote',
    slug: 'walton-wall-mount-smart-fan',
    description: 'Save floor space with the premium Walton Wall Fan. Operates via fully functional remote control, featuring auto oscillation, timer mode, whisper-quiet motor, and elegant modern plastic blade design.',
    price: 3600,
    purchasePrice: 2800,
    stock: 35,
    sku: 'AT-FN-05',
    categorySlug: 'fans',
    images: ['/assets/images/products/fans-banner.webp'],
    tags: ['walton', 'wall fan', 'remote control'],
    attributes: [{ key: 'Size', value: '16 Inch' }, { key: 'Control', value: 'Remote Control' }],
    isFlashSale: false,
    isFeatured: true,
    isNewArrival: false,
  },

  // ==================== Category 3: Smartphones & Gadgets (smartphones) ====================
  {
    name: 'Samsung Galaxy A54 5G Smartphone',
    slug: 'samsung-galaxy-a54-5g',
    description: 'Snap crisp photos and enjoy smooth 120Hz scrolling with Samsung Galaxy A54 5G. Features 50MP triple OIS camera, premium IP67 water/dust resistance, immersive AMOLED display, and reliable 5000mAh battery.',
    price: 42000,
    salePrice: 38500,
    discountRate: 8,
    purchasePrice: 33000,
    stock: 12,
    sku: 'AT-PH-01',
    categorySlug: 'smartphones',
    images: ['/assets/images/products/smartphones-banner.webp'],
    tags: ['samsung', 'galaxy', '5g phone', 'smartphone'],
    attributes: [{ key: 'RAM/Storage', value: '8GB / 128GB' }, { key: 'Battery', value: '5000 mAh' }],
    isFlashSale: true,
    isFeatured: true,
    isNewArrival: false,
  },
  {
    name: 'Redmi Note 12 Pro 5G - AMOLED display',
    slug: 'redmi-note-12-pro-5g',
    description: 'Redefine luxury at a budget with Redmi Note 12 Pro. Boasts a flagship-grade 50MP Sony IMX766 OIS camera, 67W Turbo charging, MediaTek Dimensity 1080 chip, and crystal-clear Pro Dolby Vision AMOLED.',
    price: 35000,
    salePrice: 31999,
    discountRate: 9,
    purchasePrice: 27000,
    stock: 18,
    sku: 'AT-PH-02',
    categorySlug: 'smartphones',
    images: ['/assets/images/products/smartphones-banner.webp'],
    tags: ['redmi', 'xiaomi', 'note 12 pro', 'value phone'],
    attributes: [{ key: 'RAM/Storage', value: '8GB / 256GB' }, { key: 'Charging', value: '67W Turbo Charger' }],
    isFlashSale: true,
    isFeatured: false,
    isNewArrival: true,
  },
  {
    name: 'Realme C55 Android Smartphone',
    slug: 'realme-c55-android-smartphone',
    description: 'The champion budget phone featuring a 64MP AI camera, up to 16GB dynamic RAM, and the innovative Mini Capsule notification system. Packed with 33W SUPERVOOC charge and a sleek sunshower design.',
    price: 19500,
    salePrice: 17500,
    discountRate: 10,
    purchasePrice: 14500,
    stock: 22,
    sku: 'AT-PH-03',
    categorySlug: 'smartphones',
    images: ['/assets/images/products/smartphones-banner.webp'],
    tags: ['realme', 'budget phone', 'c55'],
    attributes: [{ key: 'RAM/Storage', value: '6GB / 128GB' }, { key: 'Camera', value: '64MP AI Main' }],
    isFlashSale: false,
    isFeatured: true,
    isNewArrival: true,
  },
  {
    name: 'Anker Soundcore Life P2i True Wireless Earbuds',
    slug: 'anker-soundcore-life-p2i-earbuds',
    description: 'Enjoy thumping bass and crystal-clear calls with Anker Life P2i. Featuring 10mm drivers, AI-enhanced dual microphone call setup, IPX5 waterproof rating, and a massive 28 hours total battery backup.',
    price: 3200,
    salePrice: 2800,
    discountRate: 13,
    purchasePrice: 2000,
    stock: 45,
    sku: 'AT-GD-01',
    categorySlug: 'smartphones',
    images: ['/assets/images/products/active_noise_cancelling_smart_earbuds.webp'],
    tags: ['anker', 'soundcore', 'earbuds', 'tws', 'gadget'],
    attributes: [{ key: 'Playtime', value: 'Up to 28 Hours' }, { key: 'Waterproof', value: 'IPX5' }],
    isFlashSale: false,
    isFeatured: true,
    isNewArrival: false,
  },
  {
    name: 'Xiaomi Mi Band 8 Smart Fitness Tracker',
    slug: 'xiaomi-mi-band-8-fitness-tracker',
    description: 'Step up your fitness goals with Xiaomi Mi Band 8. Equipped with a 1.62" AMOLED touch screen, 150+ workout modes, comprehensive heart rate & SpO2 tracking, and up to 16 days of ultra-long battery life.',
    price: 4500,
    purchasePrice: 3400,
    stock: 30,
    sku: 'AT-GD-02',
    categorySlug: 'smartphones',
    images: ['/assets/images/products/smart-fitness-tracker-band.webp'],
    tags: ['xiaomi', 'mi band', 'fitness tracker', 'smart band'],
    attributes: [{ key: 'Display', value: '1.62" AMOLED' }, { key: 'Battery Life', value: 'Up to 16 Days' }],
    isFlashSale: false,
    isFeatured: false,
    isNewArrival: true,
  },

  // ==================== Category 4: Electrical & Wiring (electrical-wiring) ====================
  {
    name: 'BBS Cables 2.5 RM Bypass Wiring Cable 100M',
    slug: 'bbs-cables-2-5-rm-bypass-wiring',
    description: 'Premium quality BBS flame retardant PVC insulated domestic wiring copper cable. Meets international standards for safe, steady electric current transmission, preventing short circuits and heating issues.',
    price: 6800,
    salePrice: 6120,
    discountRate: 10,
    purchasePrice: 5000,
    stock: 40,
    sku: 'AT-EL-01',
    categorySlug: 'electrical-wiring',
    images: ['/assets/images/products/electrical-wiring-banner.webp'],
    tags: ['bbs cables', 'copper wire', 'wiring', 'home electrical'],
    attributes: [{ key: 'Size', value: '2.5 RM' }, { key: 'Length', value: '100 Meters' }],
    isFlashSale: true,
    isFeatured: true,
    isNewArrival: false,
  },
  {
    name: 'Super Star Premium 5-Pin Multi Socket Panel',
    slug: 'super-star-premium-5-pin-multi-socket',
    description: 'Safe and aesthetic solution for all plug types. Super Star modular series 5-pin multi switch-socket. Made with flame retardant polycarbonate material and premium brass internal contact points.',
    price: 380,
    salePrice: 320,
    discountRate: 16,
    purchasePrice: 220,
    stock: 120,
    sku: 'AT-EL-02',
    categorySlug: 'electrical-wiring',
    images: ['/assets/images/products/smart-wifi-plug-adapter.webp'],
    tags: ['super star', 'socket', 'switch board', 'electrical fittings'],
    attributes: [{ key: 'Voltage', value: '250V AC' }, { key: 'Current', value: '13A' }],
    isFlashSale: true,
    isFeatured: false,
    isNewArrival: true,
  },
  {
    name: 'Schneider Electric 63A Double Pole MCB',
    slug: 'schneider-electric-63a-double-pole-mcb',
    description: 'Ensure ultimate electrical safety in your home with Schneider double pole miniature circuit breaker (MCB). Protects all home appliances from power overloads, short-circuits, and fluctuations.',
    price: 2400,
    purchasePrice: 1900,
    stock: 25,
    sku: 'AT-EL-03',
    categorySlug: 'electrical-wiring',
    images: ['/assets/images/products/electrical-wiring-banner.webp'],
    tags: ['schneider', 'mcb', 'circuit breaker', 'safety'],
    attributes: [{ key: 'Rating', value: '63 Amps' }, { key: 'Poles', value: 'Double Pole (DP)' }],
    isFlashSale: false,
    isFeatured: true,
    isNewArrival: true,
  },
  {
    name: 'Click Premium Extension Multi-Plug 4-Way',
    slug: 'click-premium-extension-multi-plug-4-way',
    description: 'Extend your power access safely. Click 4-way heavy duty multi-plug features surge protection, individual power switch indicators, safe shutters for kids, and a 3-meter thick copper power cord.',
    price: 850,
    salePrice: 750,
    discountRate: 12,
    purchasePrice: 550,
    stock: 50,
    sku: 'AT-EL-04',
    categorySlug: 'electrical-wiring',
    images: ['/assets/images/products/smart_power_strip_4_outlet.webp'],
    tags: ['click', 'multi-plug', 'extension board', 'power strip'],
    attributes: [{ key: 'Outlets', value: '4 Outlets' }, { key: 'Cable Length', value: '3 Meters' }],
    isFlashSale: false,
    isFeatured: true,
    isNewArrival: false,
  },
  {
    name: 'Havells Modular 1-Gang Light Switch Panel',
    slug: 'havells-modular-1-gang-light-switch',
    description: 'Add a luxury touch to your interior walls. Havells premium modular light switch plate features smooth click action, stylish silver borders, scratch resistant matte white surface, and long lifespan.',
    price: 290,
    purchasePrice: 200,
    stock: 80,
    sku: 'AT-EL-05',
    categorySlug: 'electrical-wiring',
    images: ['/assets/images/products/smart_wifi_light_switch.webp'],
    tags: ['havells', 'switch', 'modular switch', 'lighting board'],
    attributes: [{ key: 'Type', value: '1 Gang Switch' }, { key: 'Lifespan', value: '100,000 Clicks' }],
    isFlashSale: false,
    isFeatured: false,
    isNewArrival: true,
  },

  // ==================== Category 5: LED Lights (lighting) ====================
  {
    name: 'Super Star Energy Saving LED Bulb 15W E27',
    slug: 'super-star-energy-saving-led-bulb-15w',
    description: 'Illuminate your home with high brightness while reducing electric bills. Super Star 15-watt LED bulb provides glare-free cool daylight lighting, standard E27 thread base, and comes with a 2-year warranty.',
    price: 320,
    salePrice: 280,
    discountRate: 13,
    purchasePrice: 190,
    stock: 150,
    sku: 'AT-LT-01',
    categorySlug: 'lighting',
    images: ['/assets/images/products/smart_wifi_led_bulb_e27.webp'],
    tags: ['super star', 'led bulb', 'energy saving', 'cool daylight'],
    attributes: [{ key: 'Power', value: '15 Watts' }, { key: 'Holder Type', value: 'E27 Thread' }],
    isFlashSale: true,
    isFeatured: true,
    isNewArrival: false,
  },
  {
    name: 'Transtec T5 Integrated LED Tube Light 20W',
    slug: 'transtec-t5-integrated-led-tube-light-20w',
    description: 'Sleek and bright kitchen/bedroom illumination. Transtec integrated T5 tube light features energy saving technology, high lumen output, easy installation clamp brackets, and uniform light spread.',
    price: 480,
    salePrice: 420,
    discountRate: 13,
    purchasePrice: 300,
    stock: 90,
    sku: 'AT-LT-02',
    categorySlug: 'lighting',
    images: ['/assets/images/products/lighting-banner.webp'],
    tags: ['transtec', 'tube light', 'led tube', 'bright lights'],
    attributes: [{ key: 'Length', value: '4 Feet' }, { key: 'Power', value: '20 Watts' }],
    isFlashSale: true,
    isFeatured: false,
    isNewArrival: true,
  },
  {
    name: 'Xiaomi Yeelight Smart RGB Color LED Bulb',
    slug: 'xiaomi-yeelight-smart-rgb-color-led-bulb',
    description: 'Control your home lighting setup via phone. Yeelight Smart bulb offers 16 million colors, voice control compatibility (Google/Alexa), customizable lighting scenes, and syncs with music.',
    price: 1850,
    purchasePrice: 1400,
    stock: 40,
    sku: 'AT-LT-03',
    categorySlug: 'lighting',
    images: ['/assets/images/products/smart_wifi_led_bulb_e27.webp'],
    tags: ['xiaomi', 'yeelight', 'smart light', 'rgb bulb'],
    attributes: [{ key: 'Base Type', value: 'E27' }, { key: 'Features', value: '16M Colors & App Control' }],
    isFlashSale: false,
    isFeatured: true,
    isNewArrival: true,
  },
  {
    name: 'Philips LED Spotlight Warm White 5W',
    slug: 'philips-led-spotlight-warm-white-5w',
    description: 'Perfect for false ceilings, highlight walls, and showrooms. Philips LED spotlight offers a premium warm yellow cone beam, robust thermal management body, and long operational lifespan.',
    price: 650,
    salePrice: 560,
    discountRate: 14,
    purchasePrice: 450,
    stock: 75,
    sku: 'AT-LT-04',
    categorySlug: 'lighting',
    images: ['/assets/images/products/lighting-banner.webp'],
    tags: ['philips', 'spotlight', 'ceiling light', 'warm lighting'],
    attributes: [{ key: 'Color Temp', value: '3000K (Warm White)' }, { key: 'Power', value: '5 Watts' }],
    isFlashSale: false,
    isFeatured: true,
    isNewArrival: false,
  },
  {
    name: 'Panasonic Smart Motion Sensor Night Light',
    slug: 'panasonic-smart-motion-sensor-night-light',
    description: 'Smart night lamp for hallways and stairs. Panasonic smart light automatically switches on when motion is detected in the dark, and turns off after 30 seconds of inactivity. Battery operated and highly portable.',
    price: 1250,
    purchasePrice: 900,
    stock: 35,
    sku: 'AT-LT-05',
    categorySlug: 'lighting',
    images: ['/assets/images/products/smart_motion_sensor_night_light.webp'],
    tags: ['panasonic', 'motion sensor', 'night light', 'gadget lighting'],
    attributes: [{ key: 'Sensor Range', value: 'Up to 3 Meters' }, { key: 'Battery', value: '3x AAA Batteries' }],
    isFlashSale: false,
    isFeatured: false,
    isNewArrival: true,
  }
];

const extraImages = [
  '/assets/images/products/led-tv-banner.webp',
  '/assets/images/products/led-tv-banner.webp',
  '/assets/images/products/led-tv-banner.webp',
  '/assets/images/products/led-tv-banner.webp',
  '/assets/images/products/led-tv-banner.webp',
  '/assets/images/products/fans-banner.webp',
  '/assets/images/products/fans-banner.webp',
  '/assets/images/products/fans-banner.webp',
  '/assets/images/products/fans-banner.webp',
  '/assets/images/products/fans-banner.webp',
  '/assets/images/products/smartphones-banner.webp',
  '/assets/images/products/smartphones-banner.webp',
  '/assets/images/products/smartphones-banner.webp',
  '/assets/images/products/active_noise_cancelling_smart_earbuds.webp',
  '/assets/images/products/smart-fitness-tracker-band.webp',
  '/assets/images/products/electrical-wiring-banner.webp',
  '/assets/images/products/smart-wifi-plug-adapter.webp',
  '/assets/images/products/electrical-wiring-banner.webp',
  '/assets/images/products/smart_power_strip_4_outlet.webp',
  '/assets/images/products/smart_wifi_light_switch.webp',
  '/assets/images/products/smart_wifi_led_bulb_e27.webp',
  '/assets/images/products/lighting-banner.webp',
  '/assets/images/products/smart_wifi_led_bulb_e27.webp',
  '/assets/images/products/lighting-banner.webp',
  '/assets/images/products/smart_motion_sensor_night_light.webp'
];

async function seed() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB successfully.');

    // Clear existing products
    const deleteResult = await Product.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing products.`);

    // Fetch all categories
    const dbCategories = await Category.find({});
    console.log(`Fetched ${dbCategories.length} categories from DB.`);

    const categoryMap = {};
    dbCategories.forEach(c => {
      categoryMap[c.slug] = c._id;
    });

    // Prepare products with correct ObjectIds
    const finalProducts = baseProducts.map((p, idx) => {
      const categoryId = categoryMap[p.categorySlug];
      if (!categoryId) {
        throw new Error(`Category with slug "${p.categorySlug}" not found in DB! Seed categories first.`);
      }

      const productCopy = { ...p };
      productCopy.categories = [categoryId];
      delete productCopy.categorySlug;

      // Add exactly 1 extra image from the 25 extra images list to the first 25 products
      if (idx < 25) {
        productCopy.images.push(extraImages[idx]);
      }

      return productCopy;
    });

    // Insert new products
    const insertResult = await Product.insertMany(finalProducts);
    console.log(`Seeded ${insertResult.length} products successfully:`);

    // Count verification
    let flashCount = 0;
    let featuredCount = 0;
    let newCount = 0;
    let discountCount = 0;

    insertResult.forEach((prod, i) => {
      if (prod.isFlashSale) flashCount++;
      if (prod.isFeatured) featuredCount++;
      if (prod.isNewArrival) newCount++;
      if (prod.salePrice && prod.salePrice < prod.price) discountCount++;
    });

    console.log(`Verification: Flash Sale: ${flashCount}, Featured: ${featuredCount}, New Arrival: ${newCount}, Discounted: ${discountCount}`);

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();

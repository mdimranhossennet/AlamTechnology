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
  // Fallback if env file doesn't parse correctly
  mongodbUri = 'mongodb+srv://Climax Apparels:S4Epscw0SOkd5ZtG@cluster0.e5n1hnl.mongodb.net/Climax Apparels';
}

console.log('Connecting to MongoDB...');

const BannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String },
    primaryBtnText: { type: String },
    primaryBtnLink: { type: String },
    secondaryBtnText: { type: String },
    secondaryBtnLink: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Banner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);

const banners = [
  {
    title: 'Smart LED TVs & Home Entertainment',
    image: '/assets/images/Banner/led-tv-banner.webp',
    link: '/shop',
    primaryBtnText: 'Shop LED TVs',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: 'https://wa.me/8801621974063',
    order: 1,
    isActive: true,
  },
  {
    title: 'Premium Ceiling Fans & AC',
    image: '/assets/images/Banner/fans-banner.webp',
    link: '/shop',
    primaryBtnText: 'Shop Fans & AC',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: 'https://wa.me/8801621974063',
    order: 2,
    isActive: true,
  },
  {
    title: 'Latest Smartphones & Gadgets',
    image: '/assets/images/Banner/smartphones-banner.webp',
    link: '/shop',
    primaryBtnText: 'Shop Smartphones',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: 'https://wa.me/8801621974063',
    order: 3,
    isActive: true,
  },
  {
    title: 'Premium Electrical & Wiring Solutions',
    image: '/assets/images/Banner/electrical-wiring-banner.webp',
    link: '/shop',
    primaryBtnText: 'Shop Wiring & Switches',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: 'https://wa.me/8801621974063',
    order: 4,
    isActive: true,
  },
  {
    title: 'LED & Energy-Saving Lights',
    image: '/assets/images/Banner/lighting-banner.webp',
    link: '/shop',
    primaryBtnText: 'Shop LED Lights',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: 'https://wa.me/8801621974063',
    order: 5,
    isActive: true,
  }
];

async function seed() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB successfully.');

    // Clear existing banners
    const deleteResult = await Banner.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing banners.`);

    // Insert new banners
    const insertResult = await Banner.insertMany(banners);
    console.log(`Seeded ${insertResult.length} banners successfully:`);
    insertResult.forEach((b, i) => {
      console.log(`[Banner ${i + 1}] Title: "${b.title}", Image: "${b.image}"`);
    });

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();

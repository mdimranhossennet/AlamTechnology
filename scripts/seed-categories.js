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

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    image: { type: String },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const categoryHierarchy = [
  {
    name: 'LED TV',
    slug: 'led-tv',
    image: '/assets/images/cagetory/led-tv.webp',
    subcategories: []
  },
  {
    name: 'Fans',
    slug: 'fans',
    image: '/assets/images/cagetory/fans.webp',
    subcategories: []
  },
  {
    name: 'Smartphones & Gadgets',
    slug: 'smartphones',
    image: '/assets/images/cagetory/smartphones.webp',
    subcategories: []
  },
  {
    name: 'Electrical & Wiring',
    slug: 'electrical-wiring',
    image: '/assets/images/cagetory/electrical-wiring.webp',
    subcategories: []
  },
  {
    name: 'LED Lights',
    slug: 'lighting',
    image: '/assets/images/cagetory/lighting.webp',
    subcategories: []
  }
];

async function seedCategory(node, parentId = null) {
  const created = await Category.create({
    name: node.name,
    slug: node.slug,
    parentCategory: parentId,
    image: node.image || null,
    isActive: true,
  });
  console.log(`Created: ${created.name} (${created.slug})`);
  if (node.subcategories && node.subcategories.length > 0) {
    for (const sub of node.subcategories) {
      await seedCategory(sub, created._id);
    }
  }
}

async function seed() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB successfully.');

    // Clear existing categories
    const deleteResult = await Category.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing categories.`);

    // Insert new hierarchy
    for (const mainCat of categoryHierarchy) {
      await seedCategory(mainCat, null);
    }
    console.log(`Seeding completed successfully!`);

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();

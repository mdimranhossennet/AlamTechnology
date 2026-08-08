import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';

let MONGODB_URI = null;
try {
  const envFile = fs.readFileSync(path.join(process.cwd(), '.env'), 'utf-8');
  const mongoUriMatch = envFile.match(/^MONGODB_URI=(.*)$/m);
  if (mongoUriMatch) {
    MONGODB_URI = mongoUriMatch[1].trim().replace(/^"|"$/g, '');
  }
} catch (e) {
  try {
    const envLocalFile = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf-8');
    const mongoUriMatch = envLocalFile.match(/^MONGODB_URI=(.*)$/m);
    if (mongoUriMatch) {
      MONGODB_URI = mongoUriMatch[1].trim().replace(/^"|"$/g, '');
    }
  } catch (e2) {
    console.log("Could not read .env or .env.local");
  }
}

if (!MONGODB_URI) {
  console.error("MONGODB_URI not found");
  process.exit(1);
}

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    embedding: { type: [Number] },
  },
  { timestamps: true }
);

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy for all unused items in their original packaging. Please contact our support team to initiate a return.",
    order: 1,
    isActive: true
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 2-3 business days inside Dhaka, and 3-5 business days outside Dhaka.",
    order: 2,
    isActive: true
  },
  {
    question: "Do you offer home delivery?",
    answer: "Yes, we offer home delivery all over Bangladesh via our trusted courier partners (Steadfast, Pathao, RedX, etc.).",
    order: 3,
    isActive: true
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is processed, you will receive a tracking link via SMS or email to monitor the status of your delivery.",
    order: 4,
    isActive: true
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Cash on Delivery (COD), secure Mobile Banking (bKash, Nagad, Rocket), and major credit/debit cards.",
    order: 5,
    isActive: true
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");
    
    const count = await FAQ.countDocuments();
    if (count > 0) {
      await FAQ.deleteMany({});
      console.log("Cleared existing FAQs.");
    }
    
    await FAQ.insertMany(faqs);
    console.log("Seeded 5 FAQs successfully.");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding FAQs:", error);
    process.exit(1);
  }
}

seed();

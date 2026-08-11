require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  durationMonths: { type: Number },
  monthlyFee: { type: Number, required: true, min: 0 },
  admissionFee: { type: Number, required: true, min: 0 },
  isActive: { type: Boolean, default: true },
});

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

async function seedCourses() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB for Courses seed');

    const coursesToAdd = [
      {
        name: 'Hifzul Quran',
        description: 'Complete memorization of the Holy Quran with Tajweed.',
        durationMonths: 36,
        monthlyFee: 1500,
        admissionFee: 3000,
        isActive: true,
      },
      {
        name: 'Pre-Cadet Batch (Class 5-8)',
        description: 'Intensive coaching for cadet college admission.',
        durationMonths: 12,
        monthlyFee: 2000,
        admissionFee: 4000,
        isActive: true,
      },
      {
        name: 'English Spoken & Phonetics',
        description: 'Master spoken English with proper pronunciation.',
        durationMonths: 6,
        monthlyFee: 1000,
        admissionFee: 2000,
        isActive: true,
      },
      {
        name: 'Computer & Basic IT',
        description: 'Learn MS Office, Internet, and basic troubleshooting.',
        durationMonths: 3,
        monthlyFee: 800,
        admissionFee: 1500,
        isActive: true,
      }
    ];

    for (let c of coursesToAdd) {
      const exists = await Course.findOne({ name: c.name });
      if (!exists) {
        await Course.create(c);
        console.log('Created course:', c.name);
      }
    }
    
    console.log('Courses seeded successfully!');
  } catch (error) {
    console.error('Error seeding courses:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedCourses();

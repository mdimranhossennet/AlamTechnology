require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);

async function seedFAQs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB for FAQs seed');

    // First delete existing shopping FAQs
    await FAQ.deleteMany({});
    console.log('Deleted existing FAQs');

    const faqsToAdd = [
      {
        question: 'What is the admission procedure?',
        answer: 'You can apply online through our Courses section or visit the campus physically. Admissions are granted based on seat availability and an entrance test.',
        order: 1
      },
      {
        question: 'Do you provide residential facilities?',
        answer: 'Yes, we provide separate, secure, and modern residential facilities for students with 24/7 supervision and Islamic environment.',
        order: 2
      },
      {
        question: 'What syllabus is followed here?',
        answer: 'We follow a modern curriculum combined with Islamic moral studies to ensure holistic development of the students.',
        order: 3
      },
      {
        question: 'Is there any scholarship program?',
        answer: 'We offer merit-based scholarships and special financial aid for underprivileged, deserving students.',
        order: 4
      },
      {
        question: 'What are the school timings?',
        answer: 'Regular classes run from 8:00 AM to 1:30 PM (Saturday to Thursday). Hifz and residential batch timings vary according to their specific routines.',
        order: 5
      }
    ];

    for (let f of faqsToAdd) {
      await FAQ.create(f);
      console.log('Created FAQ:', f.question);
    }
    
    console.log('FAQs seeded successfully!');
  } catch (error) {
    console.error('Error seeding FAQs:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedFAQs();

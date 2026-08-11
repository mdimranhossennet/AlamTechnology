require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  noticeType: { type: String, enum: ['general', 'exam', 'holiday', 'fee_reminder'], default: 'general' },
  targetAudience: { type: String, enum: ['all', 'students', 'parents', 'teachers'], default: 'all' },
  isActive: { type: Boolean, default: true },
  publishedDate: { type: Date, default: Date.now },
});

const Notice = mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);

async function seedNotices() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB for Notices seed');

    const noticesToAdd = [
      {
        title: 'Mid-Term Examination Routine 2026',
        description: 'The mid-term examination for all classes will commence from August 25, 2026. Please check your respective class portals for the detailed routine.',
        noticeType: 'exam',
        targetAudience: 'students',
        isActive: true,
      },
      {
        title: 'Upcoming Summer Holidays',
        description: 'The institute will remain closed from September 1 to September 10 due to summer vacations. Regular classes will resume on September 11.',
        noticeType: 'holiday',
        targetAudience: 'all',
        isActive: true,
      },
      {
        title: 'Monthly Tuition Fee Reminder',
        description: 'Dear Parents, please be reminded that the tuition fee for the current month is due by the 15th. Kindly complete the payment to avoid late fees.',
        noticeType: 'fee_reminder',
        targetAudience: 'parents',
        isActive: true,
      },
      {
        title: 'New Hifz Batch Starting Soon',
        description: 'A new Hifzul Quran batch is starting next Monday. Interested students are requested to complete their admission formalities immediately.',
        noticeType: 'general',
        targetAudience: 'all',
        isActive: true,
      }
    ];

    for (let n of noticesToAdd) {
      const exists = await Notice.findOne({ title: n.title });
      if (!exists) {
        await Notice.create(n);
        console.log('Created notice:', n.title);
      }
    }
    
    console.log('Notices seeded successfully!');
  } catch (error) {
    console.error('Error seeding notices:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedNotices();

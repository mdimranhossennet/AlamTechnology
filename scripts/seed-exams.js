require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Quick schemas
const ExamSchema = new mongoose.Schema({
  name: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  date: Date,
  subject: String,
  totalMarks: Number,
  isActive: { type: Boolean, default: true },
});

const CourseSchema = new mongoose.Schema({
  name: String,
});

const Exam = mongoose.models.Exam || mongoose.model('Exam', ExamSchema);
const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

async function seedExams() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const count = await Exam.countDocuments();
    if (count > 0) {
      console.log('Exams already exist.');
      process.exit(0);
    }

    let course = await Course.findOne();
    if (!course) {
      course = await Course.create({ name: 'General Studies' });
    }

    const now = new Date();
    
    const examRecords = [
      {
        name: 'Mid Term Examination 2026',
        course: course._id,
        date: new Date(now.getFullYear(), now.getMonth() + 1, 15), // Future
        subject: 'All Subjects',
        totalMarks: 500
      },
      {
        name: 'Monthly Unit Test - August',
        course: course._id,
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5), // Past
        subject: 'Mathematics',
        totalMarks: 50
      },
      {
        name: 'Weekly Assessment',
        course: course._id,
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate()), // Today
        subject: 'Spoken English',
        totalMarks: 20
      }
    ];

    await Exam.insertMany(examRecords);
    console.log('Seeded Exams successfully.');
    
  } catch (error) {
    console.error('Error seeding exams:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedExams();

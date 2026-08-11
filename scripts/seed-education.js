require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Quick schemas
const BatchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  schedule: { type: String },
  capacity: { type: Number },
  isActive: { type: Boolean, default: true }
});

const StudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  studentId: String,
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  status: { type: String, default: 'Active' }
});

const Batch = mongoose.models.Batch || mongoose.model('Batch', BatchSchema);
const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('No MONGODB_URI found.');
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const count = await Batch.countDocuments();
    if (count > 0) {
      console.log('Batches already exist, skipping seed.');
      process.exit(0);
    }

    // Create a batch
    const batch1 = await Batch.create({
      name: 'Class 6 - Morning Batch',
      schedule: 'Sat-Mon-Wed 9:00 AM',
      capacity: 50,
      isActive: true
    });

    const batch2 = await Batch.create({
      name: 'Class 7 - Evening Batch',
      schedule: 'Sun-Tue-Thu 4:00 PM',
      capacity: 50,
      isActive: true
    });

    // Create students
    await Student.create([
      { firstName: 'Hasan', lastName: 'Mahmud', studentId: 'ST-2026-001', batch: batch1._id, status: 'Active' },
      { firstName: 'Sumiya', lastName: 'Akter', studentId: 'ST-2026-002', batch: batch1._id, status: 'Active' },
      { firstName: 'Rahim', lastName: 'Uddin', studentId: 'ST-2026-003', batch: batch2._id, status: 'Active' },
      { firstName: 'Karim', lastName: 'Hossain', studentId: 'ST-2026-004', batch: batch1._id, status: 'Active' },
      { firstName: 'Ayesha', lastName: 'Siddika', studentId: 'ST-2026-005', batch: batch2._id, status: 'Active' },
    ]);

    console.log('Seeded Batches and Students successfully.');
    
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();

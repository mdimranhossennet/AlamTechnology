require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Quick schemas
const FeeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  feeType: String,
  amount: Number,
  amountPaid: { type: Number, default: 0 },
  dueDate: Date,
  status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
  paymentDate: Date,
});

const Fee = mongoose.models.Fee || mongoose.model('Fee', FeeSchema);
const Student = mongoose.models.Student || mongoose.model('Student', new mongoose.Schema({
  firstName: String,
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }
}));

async function seedFees() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const count = await Fee.countDocuments();
    if (count > 0) {
      console.log('Fees already exist.');
      process.exit(0);
    }

    const students = await Student.find().limit(5);
    if (students.length === 0) {
      console.log('No students found to assign fees.');
      process.exit(0);
    }

    const feeRecords = [];
    const now = new Date();
    
    // Seed some fees
    for (let i = 0; i < students.length; i++) {
      feeRecords.push({
        student: students[i]._id,
        batch: students[i].batch,
        feeType: 'Monthly Tuition - August 2026',
        amount: 2500,
        dueDate: new Date(now.getFullYear(), now.getMonth(), 10), // 10th of current month
        status: i % 2 === 0 ? 'paid' : 'pending',
        amountPaid: i % 2 === 0 ? 2500 : 0,
        paymentDate: i % 2 === 0 ? new Date() : null
      });

      // Maybe add an admission fee
      if (i === 1 || i === 3) {
         feeRecords.push({
            student: students[i]._id,
            batch: students[i].batch,
            feeType: 'Admission Fee',
            amount: 5000,
            dueDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            status: 'overdue',
            amountPaid: 0
         });
      }
    }

    await Fee.insertMany(feeRecords);
    console.log('Seeded Fees successfully.');
    
  } catch (error) {
    console.error('Error seeding fees:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedFees();

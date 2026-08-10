import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IExam extends Document {
  name: string;
  course: mongoose.Types.ObjectId;
  date: Date;
  subject: string;
  totalMarks: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExamSchema: Schema<IExam> = new Schema(
  {
    name: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    date: { type: Date, required: true },
    subject: { type: String, required: true },
    totalMarks: { type: Number, required: true, min: 1 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Exam: Model<IExam> = mongoose.models.Exam || mongoose.model<IExam>('Exam', ExamSchema);

export default Exam;

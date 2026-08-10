import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  description?: string;
  durationMonths?: number;
  monthlyFee: number;
  admissionFee: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema<ICourse> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    durationMonths: { type: Number },
    monthlyFee: { type: Number, required: true, min: 0 },
    admissionFee: { type: Number, required: true, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course;

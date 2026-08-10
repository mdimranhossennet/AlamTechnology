import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IStudent extends Document {
  studentId: string;
  name: string;
  email?: string;
  mobile: string;
  photo?: string;
  guardianInfo: {
    fatherName: string;
    motherName: string;
    guardianMobile: string;
    address: string;
  };
  currentClass: string;
  batch?: mongoose.Types.ObjectId;
  status: 'active' | 'inactive' | 'alumni';
  enrollmentDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema<IStudent> = new Schema(
  {
    studentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, lowercase: true, trim: true },
    mobile: { type: String, required: true },
    photo: { type: String },
    guardianInfo: {
      fatherName: { type: String },
      motherName: { type: String },
      guardianMobile: { type: String, required: true },
      address: { type: String },
    },
    currentClass: { type: String, required: true },
    batch: { type: Schema.Types.ObjectId, ref: 'Batch' },
    status: { type: String, enum: ['active', 'inactive', 'alumni'], default: 'active' },
    enrollmentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Student: Model<IStudent> = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);

export default Student;

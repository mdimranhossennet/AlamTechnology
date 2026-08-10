import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITeacher extends Document {
  name: string;
  email?: string;
  mobile: string;
  photo?: string;
  subjects: string[];
  salary?: number;
  joinDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeacherSchema: Schema<ITeacher> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, lowercase: true, trim: true },
    mobile: { type: String, required: true },
    photo: { type: String },
    subjects: [{ type: String }],
    salary: { type: Number, min: 0 },
    joinDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Teacher: Model<ITeacher> = mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);

export default Teacher;

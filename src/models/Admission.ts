import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAdmission extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  batch?: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  admissionDate: Date;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdmissionSchema: Schema<IAdmission> = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    batch: { type: Schema.Types.ObjectId, ref: 'Batch' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    admissionDate: { type: Date, default: Date.now },
    remarks: { type: String },
  },
  { timestamps: true }
);

const Admission: Model<IAdmission> = mongoose.models.Admission || mongoose.model<IAdmission>('Admission', AdmissionSchema);

export default Admission;

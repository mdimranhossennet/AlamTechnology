import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IBatch extends Document {
  name: string;
  course: mongoose.Types.ObjectId;
  teachers: mongoose.Types.ObjectId[];
  schedule: {
    day: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
    startTime: string;
    endTime: string;
  }[];
  maxStudents: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BatchSchema: Schema<IBatch> = new Schema(
  {
    name: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
    schedule: [
      {
        day: { 
          type: String, 
          enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], 
          required: true 
        },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },
    ],
    maxStudents: { type: Number, default: 30 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Batch: Model<IBatch> = mongoose.models.Batch || mongoose.model<IBatch>('Batch', BatchSchema);

export default Batch;

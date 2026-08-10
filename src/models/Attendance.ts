import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAttendance extends Document {
  date: Date;
  batch: mongoose.Types.ObjectId;
  records: {
    student: mongoose.Types.ObjectId;
    status: 'present' | 'absent' | 'late';
  }[];
  recordedBy?: mongoose.Types.ObjectId; // Could be a Teacher or Admin
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema: Schema<IAttendance> = new Schema(
  {
    date: { type: Date, required: true },
    batch: { type: Schema.Types.ObjectId, ref: 'Batch', required: true },
    records: [
      {
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        status: { type: String, enum: ['present', 'absent', 'late'], required: true },
      },
    ],
    recordedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Ensure only one attendance record per batch per day
AttendanceSchema.index({ date: 1, batch: 1 }, { unique: true });

const Attendance: Model<IAttendance> = mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema);

export default Attendance;

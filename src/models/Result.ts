import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IResult extends Document {
  exam: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  marksObtained: number;
  grade: string;
  gpa: number;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResultSchema: Schema<IResult> = new Schema(
  {
    exam: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    marksObtained: { type: Number, required: true, min: 0 },
    grade: { type: String, required: true },
    gpa: { type: Number, required: true, min: 0, max: 5 }, // Assuming scale of 5.0
    remarks: { type: String },
  },
  { timestamps: true }
);

// Prevent duplicate results for the same student in the same exam
ResultSchema.index({ exam: 1, student: 1 }, { unique: true });

const Result: Model<IResult> = mongoose.models.Result || mongoose.model<IResult>('Result', ResultSchema);

export default Result;

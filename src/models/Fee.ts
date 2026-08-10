import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IFee extends Document {
  student: mongoose.Types.ObjectId;
  amount: number;
  feeType: 'admission' | 'monthly' | 'exam' | 'other';
  month?: string; // For monthly fees (e.g., "January 2024")
  year?: number;
  status: 'paid' | 'due' | 'partial';
  paidAmount: number;
  dueAmount: number;
  paymentMethod?: 'Cash' | 'bKash' | 'Nagad' | 'Bank';
  transactionId?: string;
  paymentDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const FeeSchema: Schema<IFee> = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    amount: { type: Number, required: true, min: 0 },
    feeType: { type: String, enum: ['admission', 'monthly', 'exam', 'other'], required: true },
    month: { type: String },
    year: { type: Number },
    status: { type: String, enum: ['paid', 'due', 'partial'], default: 'due' },
    paidAmount: { type: Number, default: 0, min: 0 },
    dueAmount: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, enum: ['Cash', 'bKash', 'Nagad', 'Bank'] },
    transactionId: { type: String },
    paymentDate: { type: Date },
  },
  { timestamps: true }
);

const Fee: Model<IFee> = mongoose.models.Fee || mongoose.model<IFee>('Fee', FeeSchema);

export default Fee;

import mongoose, { Document, Model, Schema } from 'mongoose';

export interface INotice extends Document {
  title: string;
  description: string;
  noticeType: 'general' | 'exam' | 'holiday' | 'fee_reminder';
  targetAudience: 'all' | 'students' | 'parents' | 'teachers';
  isActive: boolean;
  publishedDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NoticeSchema: Schema<INotice> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    noticeType: { 
      type: String, 
      enum: ['general', 'exam', 'holiday', 'fee_reminder'], 
      default: 'general' 
    },
    targetAudience: { 
      type: String, 
      enum: ['all', 'students', 'parents', 'teachers'], 
      default: 'all' 
    },
    isActive: { type: Boolean, default: true },
    publishedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Notice: Model<INotice> = mongoose.models.Notice || mongoose.model<INotice>('Notice', NoticeSchema);

export default Notice;

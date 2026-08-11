import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectToDatabase from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import Student from '@/models/Student';
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user || !['admin', 'super_admin', 'manager'].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get('date');
    const batchId = searchParams.get('batchId');

    if (!dateStr || !batchId) {
      return NextResponse.json({ message: 'Missing date or batchId' }, { status: 400 });
    }

    await connectToDatabase();
    
    // Parse date (set to start of day UTC for consistency)
    const date = new Date(dateStr);
    date.setUTCHours(0, 0, 0, 0);

    // Find attendance record
    const attendance = await Attendance.findOne({
      date: date,
      batch: new mongoose.Types.ObjectId(batchId)
    }).populate('records.student', 'firstName lastName studentId status');

    if (attendance) {
      return NextResponse.json(attendance);
    }

    // If no attendance record exists, return the list of active students in the batch
    const students = await Student.find({ batch: batchId, status: 'Active' })
      .select('_id firstName lastName studentId')
      .sort({ studentId: 1 });

    return NextResponse.json({
      date,
      batch: batchId,
      isNew: true,
      records: students.map(s => ({
        student: s,
        status: 'pending' // UI state, not saved to DB yet
      }))
    });

  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user || !['admin', 'super_admin', 'manager'].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { date: dateStr, batchId, records } = body;

    if (!dateStr || !batchId || !records || !Array.isArray(records)) {
      return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }

    await connectToDatabase();
    
    const date = new Date(dateStr);
    date.setUTCHours(0, 0, 0, 0);

    // Prepare records
    const formattedRecords = records.map((r: any) => ({
      student: new mongoose.Types.ObjectId(r.studentId),
      status: r.status // 'present', 'absent', 'late'
    })).filter((r: any) => r.status !== 'pending'); // Don't save pending records

    // Upsert attendance record
    const attendance = await Attendance.findOneAndUpdate(
      { date, batch: new mongoose.Types.ObjectId(batchId) },
      { 
        $set: { 
          records: formattedRecords,
          recordedBy: new mongoose.Types.ObjectId((session.user as any).id)
        } 
      },
      { new: true, upsert: true }
    );

    return NextResponse.json(attendance);
  } catch (error) {
    console.error('Error saving attendance:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

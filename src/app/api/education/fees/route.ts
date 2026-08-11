import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectToDatabase from '@/lib/db';
import Fee from '@/models/Fee';
import Student from '@/models/Student';
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user || !['admin', 'super_admin', 'manager'].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all'; // all, paid, pending, overdue

    await connectToDatabase();
    
    const query: any = {};
    if (status !== 'all') {
      query.status = status;
    }

    // First find students matching the search
    if (search) {
      const students = await Student.find({
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { studentId: { $regex: search, $options: 'i' } }
        ]
      }).select('_id');
      query.student = { $in: students.map(s => s._id) };
    }

    const fees = await Fee.find(query)
      .populate('student', 'firstName lastName studentId')
      .populate('batch', 'name')
      .sort({ dueDate: -1 })
      .limit(50);

    return NextResponse.json(fees);
  } catch (error) {
    console.error('Error fetching fees:', error);
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
    await connectToDatabase();

    const newFee = await Fee.create(body);
    return NextResponse.json(newFee, { status: 201 });
  } catch (error) {
    console.error('Error creating fee:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user || !['admin', 'super_admin', 'manager'].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, amountPaid, transactionId, paymentMethod } = body;

    await connectToDatabase();

    const updateData: any = { status };
    if (amountPaid !== undefined) updateData.amountPaid = amountPaid;
    if (transactionId) updateData.transactionId = transactionId;
    if (paymentMethod) updateData.paymentMethod = paymentMethod;
    if (status === 'paid') updateData.paymentDate = new Date();

    const fee = await Fee.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(fee);
  } catch (error) {
    console.error('Error updating fee:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

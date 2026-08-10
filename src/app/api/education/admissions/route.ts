import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Admission from '@/models/Admission';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user || !['admin', 'super_admin', 'manager'].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const admissions = await Admission.find()
      .populate('student')
      .populate('course')
      .populate('batch')
      .sort({ createdAt: -1 });

    return NextResponse.json(admissions);
  } catch (error) {
    console.error('Error fetching admissions:', error);
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

    const newAdmission = await Admission.create(body);
    return NextResponse.json(newAdmission, { status: 201 });
  } catch (error) {
    console.error('Error creating admission:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

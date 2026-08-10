import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Student from '@/models/Student';
import { auth } from '@/auth';

// GET all students
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    // Allow admin roles
    if (!session || !session.user || !['admin', 'super_admin', 'manager'].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const students = await Student.find().populate('batch').sort({ createdAt: -1 });

    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// POST create a new student
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user || !['admin', 'super_admin', 'manager'].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    await connectToDatabase();

    // Check if student ID already exists
    const existingStudent = await Student.findOne({ studentId: body.studentId });
    if (existingStudent) {
      return NextResponse.json({ message: 'Student ID already exists' }, { status: 400 });
    }

    const newStudent = await Student.create(body);
    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

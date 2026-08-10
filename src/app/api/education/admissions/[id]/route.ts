import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Admission from '@/models/Admission';
import { auth } from '@/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session || !session.user || !['admin', 'super_admin', 'manager'].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const admission = await Admission.findById(id)
      .populate('student')
      .populate('course')
      .populate('batch');

    if (!admission) {
      return NextResponse.json({ message: 'Admission not found' }, { status: 404 });
    }

    return NextResponse.json(admission);
  } catch (error) {
    console.error('Error fetching admission:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session || !session.user || !['admin', 'super_admin', 'manager'].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    await connectToDatabase();

    const updatedAdmission = await Admission.findByIdAndUpdate(id, { $set: body }, { new: true });

    if (!updatedAdmission) {
      return NextResponse.json({ message: 'Admission not found' }, { status: 404 });
    }

    return NextResponse.json(updatedAdmission);
  } catch (error) {
    console.error('Error updating admission:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session || !session.user || !['admin', 'super_admin', 'manager'].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const deletedAdmission = await Admission.findByIdAndDelete(id);

    if (!deletedAdmission) {
      return NextResponse.json({ message: 'Admission not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Admission deleted successfully' });
  } catch (error) {
    console.error('Error deleting admission:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

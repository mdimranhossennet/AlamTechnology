import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Notice from '@/models/Notice';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    // Fetch active notices, sorted by latest
    const notices = await Notice.find({ isActive: true })
      .sort({ publishedDate: -1 })
      .limit(10); // Fetch top 10 latest notices
      
    return NextResponse.json(notices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    // Verify admin access
    if (!session || !session.user || !['admin', 'super_admin', 'manager'].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    await connectToDatabase();

    const newNotice = await Notice.create(body);
    return NextResponse.json(newNotice, { status: 201 });
  } catch (error) {
    console.error('Error creating notice:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

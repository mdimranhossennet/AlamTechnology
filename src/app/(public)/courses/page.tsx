import { Suspense } from 'react';
import connectToDatabase from '@/lib/db';
import Course from '@/models/Course';
import { Calendar, Users, Clock, BookOpen, GraduationCap, DollarSign, Timer } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Courses & Programs | HEB Vision International',
  description: 'Explore our wide range of educational courses and programs.',
};

export const dynamic = 'force-dynamic';

async function getCourses() {
  await connectToDatabase();
  const courses = await Course.find({ isActive: true }).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(courses));
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main className="flex-1 w-full bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Admissions Open</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Our Programs & Courses</h1>
          <p className="text-slate-600 font-medium text-lg max-w-2xl mx-auto">
            Discover a comprehensive range of academic and skill-development courses tailored for success.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-700">No active courses right now</h3>
            <p className="text-slate-500 mt-2">Please check back later for new admission announcements.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any) => (
              <div key={course._id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="h-40 bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
                  <GraduationCap className="h-20 w-20 text-white/90 drop-shadow-sm" />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-slate-900 line-clamp-2">{course.name}</h2>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full shrink-0">
                      Active
                    </span>
                  </div>
                  
                  {course.description && (
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">{course.description}</p>
                  )}
                  
                  <div className="space-y-3 mb-6">
                    {course.durationMonths && (
                      <div className="flex items-center text-sm text-slate-600 font-medium">
                        <Timer className="h-4 w-4 mr-3 text-primary" />
                        Duration: {course.durationMonths} Months
                      </div>
                    )}
                    <div className="flex items-center text-sm text-slate-600 font-medium">
                      <DollarSign className="h-4 w-4 mr-3 text-primary" />
                      Monthly Fee: ৳{course.monthlyFee}
                    </div>
                    <div className="flex items-center text-sm text-slate-600 font-medium">
                      <DollarSign className="h-4 w-4 mr-3 text-primary" />
                      Admission Fee: ৳{course.admissionFee}
                    </div>
                  </div>

                  <Link 
                    href="/education" 
                    className="block w-full text-center py-3 px-4 bg-slate-50 hover:bg-primary text-slate-700 hover:text-white font-bold rounded-xl transition-colors border border-slate-200 hover:border-primary"
                  >
                    Apply for Admission
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

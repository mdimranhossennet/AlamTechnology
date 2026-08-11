import { Suspense } from 'react';
import { NoticeBoard } from '@/components/storefront/education/NoticeBoard';

export const metadata = {
  title: 'Notice Board | HEB Vision International',
  description: 'Stay updated with the latest notices, exam schedules, and holiday announcements from HEB Vision International.',
};

export default function NoticesPage() {
  return (
    <main className="flex-1 w-full bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Official Notice Board</h1>
          <p className="text-slate-600 font-medium text-lg max-w-2xl mx-auto">
            Stay informed with the latest updates, circulars, exam routines, and important announcements for all our students and parents.
          </p>
        </div>
        
        {/* We can reuse the NoticeBoard component which fetches and displays notices */}
        <NoticeBoard />
      </div>
    </main>
  );
}

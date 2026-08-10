'use client';

import { useEffect, useState } from 'react';
import { Bell, AlertTriangle, CalendarDays, FileText } from 'lucide-react';

interface NoticeData {
  _id: string;
  title: string;
  description: string;
  noticeType: 'general' | 'exam' | 'holiday' | 'fee_reminder';
  publishedDate: string;
}

export function NoticeBoard() {
  const [notices, setNotices] = useState<NoticeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const res = await fetch('/api/education/notices');
        if (res.ok) {
          const data = await res.json();
          setNotices(data);
        }
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchNotices();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-64 bg-slate-50 animate-pulse rounded-3xl mb-12"></div>
    );
  }

  if (notices.length === 0) {
    // If no notices are available, we can return null to hide the section
    return null;
  }

  return (
    <section className="mb-16 mt-8 relative overflow-hidden bg-white border border-blue-100 rounded-[2rem] shadow-sm">
      {/* Decorative header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full backdrop-blur-md">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">নোটিশ বোর্ড (Notice Board)</h2>
        </div>
        <div className="hidden md:flex relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notices.map((notice) => (
            <div 
              key={notice._id} 
              className="group bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-2xl p-5 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex flex-col h-full"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-xl shrink-0 ${
                  notice.noticeType === 'exam' ? 'bg-indigo-100 text-indigo-600' :
                  notice.noticeType === 'holiday' ? 'bg-red-100 text-red-600' :
                  notice.noticeType === 'fee_reminder' ? 'bg-amber-100 text-amber-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {notice.noticeType === 'exam' ? <FileText className="w-5 h-5" /> :
                   notice.noticeType === 'holiday' ? <AlertTriangle className="w-5 h-5" /> :
                   notice.noticeType === 'fee_reminder' ? <CalendarDays className="w-5 h-5" /> :
                   <Bell className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors line-clamp-2">
                    {notice.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    {new Date(notice.publishedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-slate-600 text-sm font-medium line-clamp-3 mt-auto pt-3 border-t border-slate-200">
                {notice.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

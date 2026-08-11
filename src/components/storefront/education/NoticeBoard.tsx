'use client';

import { useEffect, useState } from 'react';
import { Bell, AlertTriangle, CalendarDays, FileText, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [selectedNotice, setSelectedNotice] = useState<NoticeData | null>(null);

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
              onClick={() => setSelectedNotice(notice)}
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

      {/* Notice Details Modal */}
      <Dialog open={!!selectedNotice} onOpenChange={(open) => !open && setSelectedNotice(null)}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white rounded-[2rem]">
          {selectedNotice && (
            <>
              <div className={`px-6 py-4 flex items-center gap-3 ${
                  selectedNotice.noticeType === 'exam' ? 'bg-indigo-50 border-b border-indigo-100' :
                  selectedNotice.noticeType === 'holiday' ? 'bg-red-50 border-b border-red-100' :
                  selectedNotice.noticeType === 'fee_reminder' ? 'bg-amber-50 border-b border-amber-100' :
                  'bg-blue-50 border-b border-blue-100'
              }`}>
                <div className={`p-2 rounded-xl shrink-0 ${
                  selectedNotice.noticeType === 'exam' ? 'bg-indigo-100 text-indigo-600' :
                  selectedNotice.noticeType === 'holiday' ? 'bg-red-100 text-red-600' :
                  selectedNotice.noticeType === 'fee_reminder' ? 'bg-amber-100 text-amber-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {selectedNotice.noticeType === 'exam' ? <FileText className="w-6 h-6" /> :
                   selectedNotice.noticeType === 'holiday' ? <AlertTriangle className="w-6 h-6" /> :
                   selectedNotice.noticeType === 'fee_reminder' ? <CalendarDays className="w-6 h-6" /> :
                   <Bell className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">{selectedNotice.title}</h2>
                  <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    Published: {new Date(selectedNotice.publishedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
                  {selectedNotice.description}
                </p>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setSelectedNotice(null)}
                  className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition-colors text-sm"
                >
                  Close Notice
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

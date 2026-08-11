'use client';

import { Suspense, useState } from 'react';
import { Loader2, Plus, Search, Bell, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { CreateNoticeModal } from './CreateNoticeModal';

function NoticesContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Dummy data
  const dummyNotices = [
    { id: '1', title: 'Holiday Notice: Independence Day', type: 'Holiday', date: '2026-08-10', target: 'Everyone', isUrgent: false },
    { id: '2', title: 'Mid-Term Exam Schedule Published', type: 'Exam', date: '2026-08-08', target: 'Students', isUrgent: true },
    { id: '3', title: 'Monthly Fees Reminder', type: 'Fees', date: '2026-08-01', target: 'Parents', isUrgent: false },
  ];

  return (
    <div className="flex flex-col gap-6 px-0 py-4 md:p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Notice Board</h1>
          <p className="text-muted-foreground text-sm font-medium">Publish notices for students, parents, and teachers.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-6 h-11 shadow-lg shadow-blue-200 border-none transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="mr-2 h-4 w-4" />
            Publish Notice
          </Button>
        </div>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 h-11 rounded-xl border bg-white focus-visible:ring-primary/20 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyNotices.map((notice) => (
          <div key={notice.id} className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-primary/30 transition-colors">
            {notice.isUrgent && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                Urgent
              </div>
            )}
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl flex-shrink-0 ${notice.isUrgent ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                {notice.isUrgent ? <AlertTriangle className="h-6 w-6" /> : <Bell className="h-6 w-6" />}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">{notice.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">Target: {notice.target} • {notice.type}</p>
              </div>
            </div>
            <div className="mt-auto pt-4 border-t flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Published: {notice.date}</span>
              <button className="text-primary hover:underline font-bold">View</button>
            </div>
          </div>
        ))}
      </div>

      <CreateNoticeModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={() => {
          // Optional: trigger a refetch of notices here
        }}
      />
    </div>
  );
}

export default function NoticesPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <NoticesContent />
    </Suspense>
  );
}

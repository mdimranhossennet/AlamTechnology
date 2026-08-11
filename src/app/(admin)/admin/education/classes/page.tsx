'use client';

import { Suspense } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import { CreateCourseModal } from './CreateCourseModal';

function ClassesContent() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  return (
    <div className="flex flex-col gap-6 px-0 py-4 md:p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Courses & Batches</h1>
          <p className="text-muted-foreground text-sm font-medium">Manage all your academic courses and class routines.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-6 h-11 shadow-lg shadow-blue-200 border-none transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder UI to show progress */}
        <div className="p-6 rounded-3xl border bg-white shadow-sm flex flex-col gap-4">
          <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl">
            ENG
          </div>
          <div>
            <h3 className="font-black text-xl text-slate-900">Spoken English</h3>
            <p className="text-sm text-muted-foreground font-medium mt-1">3 Months Duration • 2 Batches Active</p>
          </div>
          <div className="mt-2 pt-4 border-t flex justify-between items-center text-sm font-bold">
            <span className="text-slate-500">Monthly Fee</span>
            <span className="text-emerald-600 text-lg">৳1500</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center gap-2 text-center text-muted-foreground hover:bg-slate-100 transition-colors cursor-pointer" onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-8 w-8 mb-2 opacity-50" />
          <p className="font-bold">Add New Course</p>
          <p className="text-xs">Configure subjects, fees and duration.</p>
        </div>
      </div>
      <CreateCourseModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSuccess={() => {}} />
    </div>
  );
}

export default function ClassesPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ClassesContent />
    </Suspense>
  );
}

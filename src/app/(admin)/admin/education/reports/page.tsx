'use client';

import { Suspense } from 'react';
import { Loader2, BarChart3, Users, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function ReportsContent() {
  const reportTypes = [
    { id: 1, title: 'Total Students Overview', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 2, title: 'Admission Analytics', icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { id: 3, title: 'Attendance Report', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-100' },
    { id: 4, title: 'Fee Collection Summary', icon: BarChart3, color: 'text-rose-600', bg: 'bg-rose-100' },
    { id: 5, title: 'Outstanding Dues', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  ];

  return (
    <div className="flex flex-col gap-6 px-0 py-4 md:p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Reports & Analytics</h1>
          <p className="text-muted-foreground text-sm font-medium">Generate comprehensive reports for the coaching center.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => (
          <div key={report.id} className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col gap-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${report.bg} ${report.color}`}>
                <report.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900">{report.title}</h3>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 font-bold"
                onClick={() => toast.info(`Viewing ${report.title}`)}
              >
                View
              </Button>
              <Button 
                className="flex-1 bg-slate-900 text-white font-bold hover:bg-slate-800"
                onClick={() => toast.success(`Downloading ${report.title}`)}
              >
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ReportsContent />
    </Suspense>
  );
}

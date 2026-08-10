'use client';

import { Suspense, useState } from 'react';
import { Loader2, Plus, Search, Trophy, FileSignature, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

function ExamsContent() {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data
  const dummyExams = [
    { id: '1', title: 'Mid Term Examination 2026', class: 'Class 6 & 7', date: '15 Sep 2026', status: 'upcoming' },
    { id: '2', title: 'Monthly Unit Test - August', class: 'All Classes', date: '25 Aug 2026', status: 'completed' },
    { id: '3', title: 'Weekly Assessment', class: 'Spoken English', date: '12 Aug 2026', status: 'ongoing' },
  ];

  return (
    <div className="flex flex-col gap-6 px-0 py-4 md:p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Exams & Results</h1>
          <p className="text-muted-foreground text-sm font-medium">Manage examination routines and publish results.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => toast.info("Create Exam Modal goes here")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-6 h-11 shadow-lg shadow-blue-200 border-none transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Exam
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-indigo-600/70 uppercase tracking-widest">Total Exams</p>
            <h2 className="text-3xl font-black text-indigo-600 mt-1">24</h2>
          </div>
          <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
            <FileSignature className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center justify-between hover:bg-emerald-100/80 transition-colors cursor-pointer" onClick={() => toast.info("Publish results")}>
          <div>
            <p className="text-sm font-bold text-emerald-600/70 uppercase tracking-widest">Publish Results</p>
            <p className="text-sm font-medium text-emerald-700 mt-1">Generate marksheet</p>
          </div>
          <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
            <Trophy className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer" onClick={() => toast.info("Grade settings")}>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Grading System</p>
            <p className="text-sm font-medium text-slate-600 mt-1">Configure GPA/Marks</p>
          </div>
          <div className="h-12 w-12 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center">
            <Settings className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-md mt-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by exam title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 h-11 rounded-xl border bg-white focus-visible:ring-primary/20 shadow-sm"
        />
      </div>

      <div className="rounded-2xl border shadow-sm overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">Exam Title</TableHead>
              <TableHead className="font-bold">Target Class</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyExams.map((exam) => (
              <TableRow key={exam.id} className="hover:bg-muted/30">
                <TableCell className="font-bold text-slate-700">{exam.title}</TableCell>
                <TableCell className="text-slate-600">{exam.class}</TableCell>
                <TableCell className="text-slate-500">{exam.date}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={`capitalize px-3 py-0.5 rounded-full font-bold text-[10px] tracking-wider 
                      ${exam.status === 'completed' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : ''}
                      ${exam.status === 'upcoming' ? 'bg-amber-100 text-amber-700 border-amber-200' : ''}
                      ${exam.status === 'ongoing' ? 'bg-blue-100 text-blue-700 border-blue-200' : ''}
                    `}
                  >
                    {exam.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                   <Button variant="outline" size="sm" className="hover:bg-slate-50">
                      Manage Marks
                   </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default function ExamsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ExamsContent />
    </Suspense>
  );
}

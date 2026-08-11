'use client';

import { Suspense, useState, useEffect } from 'react';
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

interface ExamRecord {
  _id: string;
  name: string;
  course: {
    _id: string;
    name: string;
  };
  date: string;
  subject: string;
  totalMarks: number;
  status: string;
}

function ExamsContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [exams, setExams] = useState<ExamRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/education/exams');
        if (res.ok) {
          const data = await res.json();
          // compute status based on date
          const enriched = data.map((e: any) => {
            const examDate = new Date(e.date);
            const now = new Date();
            let status = 'upcoming';
            if (examDate < now) status = 'completed';
            // simple dummy ongoing
            if (examDate.toDateString() === now.toDateString()) status = 'ongoing';
            return { ...e, status };
          });
          setExams(enriched);
        }
      } catch (error) {
        toast.error('Failed to load exams');
      } finally {
        setIsLoading(false);
      }
    };
    fetchExams();
  }, []);

  const filteredExams = exams.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h2 className="text-3xl font-black text-indigo-600 mt-1">{exams.length}</h2>
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

      <div className="rounded-2xl border shadow-sm overflow-hidden bg-white relative min-h-[300px]">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">Exam Title</TableHead>
              <TableHead className="font-bold">Subject</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExams.length === 0 && !isLoading ? (
               <TableRow>
                 <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                   No exams found.
                 </TableCell>
               </TableRow>
            ) : (
              filteredExams.map((exam) => (
                <TableRow key={exam._id} className="hover:bg-muted/30">
                  <TableCell className="font-bold text-slate-700">{exam.name}</TableCell>
                  <TableCell className="text-slate-600">{exam.subject}</TableCell>
                  <TableCell className="text-slate-500">{new Date(exam.date).toLocaleDateString()}</TableCell>
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
                     <Button variant="outline" size="sm" className="hover:bg-slate-50" onClick={() => toast.info('Manage Marks not fully implemented')}>
                        Manage Marks
                     </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
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

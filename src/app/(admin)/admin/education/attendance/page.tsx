'use client';

import { Suspense, useState } from 'react';
import { Loader2, Calendar as CalendarIcon, Check, X, Search } from 'lucide-react';
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
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

function AttendanceContent() {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data for visual representation
  const dummyStudents = [
    { id: '1', studentId: 'ST-2026-001', name: 'Md. Hasan Mahmud', class: 'Class 6', status: 'present' },
    { id: '2', studentId: 'ST-2026-002', name: 'Sumiya Akter', class: 'Class 6', status: 'absent' },
    { id: '3', studentId: 'ST-2026-003', name: 'Rahim Uddin', class: 'Class 7', status: 'pending' },
  ];

  return (
    <div className="flex flex-col gap-6 px-0 py-4 md:p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Attendance</h1>
          <p className="text-muted-foreground text-sm font-medium">Record and manage daily student attendance.</p>
        </div>
        <div className="flex items-center gap-3">
          <Input 
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-40 rounded-xl h-11 border-slate-200"
          />
          <Button 
            onClick={() => toast.success("Attendance saved successfully")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl h-11 px-6 shadow-md transition-all"
          >
            Save Attendance
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Students</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">450</h2>
          </div>
          <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <CalendarIcon className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-emerald-600/70 uppercase tracking-widest">Present Today</p>
            <h2 className="text-3xl font-black text-emerald-600 mt-1">412</h2>
          </div>
          <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
            <Check className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-rose-600/70 uppercase tracking-widest">Absent Today</p>
            <h2 className="text-3xl font-black text-rose-600 mt-1">38</h2>
          </div>
          <div className="h-12 w-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
            <X className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-md mt-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by student name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 h-11 rounded-xl border bg-white focus-visible:ring-primary/20 shadow-sm"
        />
      </div>

      <div className="rounded-2xl border shadow-sm overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">Student ID</TableHead>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Class / Batch</TableHead>
              <TableHead className="text-right font-bold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyStudents.map((student) => (
              <TableRow key={student.id} className="hover:bg-muted/30">
                <TableCell className="font-bold text-slate-700">{student.studentId}</TableCell>
                <TableCell className="font-semibold text-slate-900">{student.name}</TableCell>
                <TableCell className="text-slate-600">{student.class}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant={student.status === 'present' ? 'default' : 'outline'}
                      className={student.status === 'present' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                      onClick={() => toast.info('Status updated')}
                    >
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === 'absent' ? 'default' : 'outline'}
                      className={student.status === 'absent' ? 'bg-rose-600 hover:bg-rose-700' : ''}
                      onClick={() => toast.info('Status updated')}
                    >
                      Absent
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default function AttendancePage() {
  return (
    <Suspense fallback={
      <div className="flex h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <AttendanceContent />
    </Suspense>
  );
}

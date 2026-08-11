'use client';

import { Suspense, useState, useEffect } from 'react';
import { Loader2, Calendar as CalendarIcon, Check, X, Search, Save } from 'lucide-react';
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

interface Batch {
  _id: string;
  name: string;
}

interface StudentRecord {
  student: {
    _id: string;
    studentId: string;
    firstName: string;
    lastName: string;
  };
  status: 'present' | 'absent' | 'late' | 'pending';
}

function AttendanceContent() {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch batches on mount
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await fetch('/api/education/batches');
        if (res.ok) {
          const data = await res.json();
          setBatches(data);
          if (data.length > 0) {
            setSelectedBatch(data[0]._id);
          }
        }
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };
    fetchBatches();
  }, []);

  // Fetch attendance records when date or batch changes
  useEffect(() => {
    if (!selectedBatch || !date) return;

    const fetchAttendance = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/education/attendance?date=${date}&batchId=${selectedBatch}`);
        if (res.ok) {
          const data = await res.json();
          setRecords(data.records || []);
        } else {
          toast.error('Failed to load attendance');
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
        toast.error('Error loading attendance');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, [date, selectedBatch]);

  const updateStatus = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setRecords(prev => prev.map(record => 
      record.student._id === studentId ? { ...record, status } : record
    ));
  };

  const handleSave = async () => {
    if (!selectedBatch || !date) return;
    
    // Check if there are any pending records
    const hasPending = records.some(r => r.status === 'pending');
    if (hasPending) {
       toast.warning('Please mark all students before saving.');
       return;
    }

    setIsSaving(true);
    try {
      const payload = {
        date,
        batchId: selectedBatch,
        records: records.map(r => ({
          studentId: r.student._id,
          status: r.status
        }))
      };

      const res = await fetch('/api/education/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success("Attendance saved successfully");
      } else {
        toast.error("Failed to save attendance");
      }
    } catch (error) {
      console.error('Error saving attendance:', error);
      toast.error('Error saving attendance');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredRecords = records.filter(record => 
    record.student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = records.length;
  const presentCount = records.filter(r => r.status === 'present' || r.status === 'late').length;
  const absentCount = records.filter(r => r.status === 'absent').length;

  return (
    <div className="flex flex-col gap-6 px-0 py-4 md:p-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Attendance</h1>
          <p className="text-muted-foreground text-sm font-medium">Record and manage daily student attendance.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="h-11 rounded-xl border border-slate-200 px-3 bg-white min-w-[150px]"
          >
            {batches.map(batch => (
              <option key={batch._id} value={batch._id}>{batch.name}</option>
            ))}
          </select>
          <Input 
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-40 rounded-xl h-11 border-slate-200 bg-white"
          />
          <Button 
            onClick={handleSave}
            disabled={isSaving || records.length === 0}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl h-11 px-6 shadow-md transition-all gap-2"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Attendance
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Students</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">{totalStudents}</h2>
          </div>
          <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <CalendarIcon className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-emerald-600/70 uppercase tracking-widest">Present Today</p>
            <h2 className="text-3xl font-black text-emerald-600 mt-1">{presentCount}</h2>
          </div>
          <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
            <Check className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-rose-600/70 uppercase tracking-widest">Absent Today</p>
            <h2 className="text-3xl font-black text-rose-600 mt-1">{absentCount}</h2>
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

      <div className="rounded-2xl border shadow-sm overflow-hidden bg-white relative min-h-[300px]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : null}
        
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">Student ID</TableHead>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="text-right font-bold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length === 0 && !isLoading ? (
               <TableRow>
                 <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                   No students found in this batch.
                 </TableCell>
               </TableRow>
            ) : (
              filteredRecords.map((record) => (
                <TableRow key={record.student._id} className="hover:bg-muted/30">
                  <TableCell className="font-bold text-slate-700">{record.student.studentId}</TableCell>
                  <TableCell className="font-semibold text-slate-900">
                    {record.student.firstName} {record.student.lastName}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant={record.status === 'present' ? 'default' : 'outline'}
                        className={record.status === 'present' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                        onClick={() => updateStatus(record.student._id, 'present')}
                      >
                        Present
                      </Button>
                      <Button
                        size="sm"
                        variant={record.status === 'absent' ? 'default' : 'outline'}
                        className={record.status === 'absent' ? 'bg-rose-600 hover:bg-rose-700' : ''}
                        onClick={() => updateStatus(record.student._id, 'absent')}
                      >
                        Absent
                      </Button>
                    </div>
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

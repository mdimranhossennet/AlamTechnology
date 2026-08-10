'use client';

import { Suspense, useState } from 'react';
import { Loader2, Plus, Search, Receipt, TrendingUp, AlertCircle } from 'lucide-react';
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

function FeesContent() {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data
  const dummyFees = [
    { id: '1', receiptNo: 'FEE-1001', student: 'Md. Hasan Mahmud', amount: 1500, type: 'Monthly Fee', date: '2026-08-10', status: 'paid' },
    { id: '2', receiptNo: 'FEE-1002', student: 'Sumiya Akter', amount: 3000, type: 'Admission Fee', date: '2026-08-09', status: 'paid' },
    { id: '3', receiptNo: 'FEE-1003', student: 'Rahim Uddin', amount: 1500, type: 'Monthly Fee', date: '2026-08-05', status: 'unpaid' },
  ];

  return (
    <div className="flex flex-col gap-6 px-0 py-4 md:p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Fees & Payments</h1>
          <p className="text-muted-foreground text-sm font-medium">Manage student fees, collections, and dues.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => toast.info("Collect Fee Modal goes here")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-6 h-11 shadow-lg shadow-blue-200 border-none transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="mr-2 h-4 w-4" />
            Collect Fee
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Collected</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">৳45,000</h2>
          </div>
          <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-amber-600/70 uppercase tracking-widest">Total Dues</p>
            <h2 className="text-3xl font-black text-amber-600 mt-1">৳12,500</h2>
          </div>
          <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
            <AlertCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-md mt-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by student or receipt..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 h-11 rounded-xl border bg-white focus-visible:ring-primary/20 shadow-sm"
        />
      </div>

      <div className="rounded-2xl border shadow-sm overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">Receipt No</TableHead>
              <TableHead className="font-bold">Student Name</TableHead>
              <TableHead className="font-bold">Fee Type</TableHead>
              <TableHead className="font-bold">Amount</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyFees.map((fee) => (
              <TableRow key={fee.id} className="hover:bg-muted/30">
                <TableCell className="font-bold text-slate-700">{fee.receiptNo}</TableCell>
                <TableCell className="font-semibold text-slate-900">{fee.student}</TableCell>
                <TableCell className="text-slate-600">{fee.type}</TableCell>
                <TableCell className="font-bold text-slate-900">৳{fee.amount}</TableCell>
                <TableCell className="text-slate-500">{fee.date}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={`capitalize px-3 py-0.5 rounded-full font-bold text-[10px] tracking-wider 
                      ${fee.status === 'paid' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : ''}
                      ${fee.status === 'unpaid' ? 'bg-rose-100 text-rose-700 border-rose-200' : ''}
                    `}
                  >
                    {fee.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                   <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                      <Receipt className="h-4 w-4 mr-2" />
                      View Invoice
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

export default function FeesPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <FeesContent />
    </Suspense>
  );
}

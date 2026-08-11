'use client';

import { Suspense, useState, useEffect } from 'react';
import { Loader2, Plus, Search, Receipt, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
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

interface FeeRecord {
  _id: string;
  student: {
    _id: string;
    studentId: string;
    firstName: string;
    lastName: string;
  };
  batch: {
    name: string;
  };
  feeType: string;
  amount: number;
  amountPaid: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
}

function FeesContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFees = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/education/fees?search=${searchTerm}&status=${statusFilter}`);
      if (res.ok) {
        const data = await res.json();
        setFees(data);
      }
    } catch (error) {
      console.error('Error fetching fees:', error);
      toast.error('Failed to load fees');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchFees();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, statusFilter]);

  const handleMarkAsPaid = async (feeId: string) => {
    try {
      const res = await fetch('/api/education/fees', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: feeId, status: 'paid' })
      });
      if (res.ok) {
        toast.success('Fee marked as paid');
        fetchFees();
      } else {
        toast.error('Failed to update fee');
      }
    } catch (error) {
      toast.error('Error updating fee');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-0">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalCollected = fees.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
  const pendingAmount = fees.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="flex flex-col gap-6 px-0 py-4 md:p-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Fees & Payments</h1>
          <p className="text-muted-foreground text-sm font-medium">Manage student tuition fees and payment records.</p>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl h-11 px-6 shadow-md transition-all gap-2">
          <Plus className="h-4 w-4" />
          Generate Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Collected</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">৳{totalCollected.toLocaleString()}</h2>
          </div>
          <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Pending Amount</p>
            <h2 className="text-3xl font-black text-amber-600 mt-1">৳{pendingAmount.toLocaleString()}</h2>
          </div>
          <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
            <Receipt className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Overdue Invoices</p>
            <h2 className="text-3xl font-black text-rose-600 mt-1">{fees.filter(f => f.status === 'overdue').length}</h2>
          </div>
          <div className="h-12 w-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
            <AlertCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by student name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-11 rounded-xl border bg-white focus-visible:ring-primary/20 shadow-sm"
          />
        </div>
        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-full md:w-auto">
          {['all', 'pending', 'paid', 'overdue'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all flex-1 md:flex-none ${
                statusFilter === status 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
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
              <TableHead className="font-bold">Student</TableHead>
              <TableHead className="font-bold">Class/Batch</TableHead>
              <TableHead className="font-bold">Fee Type</TableHead>
              <TableHead className="font-bold">Amount</TableHead>
              <TableHead className="font-bold">Due Date</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fees.length === 0 && !isLoading ? (
               <TableRow>
                 <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                   No fee records found.
                 </TableCell>
               </TableRow>
            ) : (
              fees.map((fee) => (
                <TableRow key={fee._id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="font-semibold text-slate-900">
                       {fee.student?.firstName} {fee.student?.lastName}
                    </div>
                    <div className="text-xs text-slate-500">{fee.student?.studentId}</div>
                  </TableCell>
                  <TableCell className="text-slate-600 font-medium">{fee.batch?.name || 'N/A'}</TableCell>
                  <TableCell className="text-slate-600">{fee.feeType}</TableCell>
                  <TableCell className="font-bold text-slate-900">৳{fee.amount}</TableCell>
                  <TableCell className="text-slate-500">{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(fee.status)}</TableCell>
                  <TableCell className="text-right">
                    {fee.status !== 'paid' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200"
                        onClick={() => handleMarkAsPaid(fee._id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Paid
                      </Button>
                    )}
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

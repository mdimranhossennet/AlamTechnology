'use client';

import { useEffect, useState, Suspense, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MoreHorizontal,
  Loader2,
  FileText,
  Eye,
  Search,
  CheckCircle,
  XCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { CreateAdmissionModal } from './CreateAdmissionModal';

interface AdmissionData {
  _id: string;
  student: { name: string, studentId: string };
  course: { name: string };
  status: string;
  admissionDate: string;
}

function AdmissionsContent() {
  const [admissions, setAdmissions] = useState<AdmissionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAdmissions = useCallback(async () => {
    try {
      const response = await fetch('/api/education/admissions');
      if (!response.ok) throw new Error('Failed to fetch admissions');
      const data = await response.json();
      setAdmissions(data || []);
    } catch (error) {
      console.error('Error fetching admissions:', error);
      toast.error('Failed to load admissions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadAdmissions = async () => {
      await fetchAdmissions();
    };
    loadAdmissions();
  }, [fetchAdmissions]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/education/admissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        toast.success(`Admission ${newStatus} successfully`);
        fetchAdmissions();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('Error updating admission');
    }
  };

  const filteredAdmissions = admissions.filter(a =>
    a.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.course?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 px-0 py-4 md:p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Admissions</h1>
          <p className="text-muted-foreground text-sm font-medium">Manage pending and approved student admissions.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-6 h-11 shadow-lg shadow-blue-200 border-none transition-all hover:scale-105 active:scale-95"
          >
            <FileText className="mr-2 h-4 w-4" />
            Process New Admission
          </Button>
        </div>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by student name or course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 h-11 rounded-xl border bg-white focus-visible:ring-primary/20 shadow-sm"
        />
      </div>

      <div className="rounded-2xl border shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-bold">Date</TableHead>
                <TableHead className="font-bold">Student Name</TableHead>
                <TableHead className="font-bold">Course</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="text-right font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-muted-foreground font-medium">Loading admissions...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredAdmissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center">
                    <p className="text-muted-foreground">No admissions found.</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAdmissions.map((admission) => (
                  <TableRow key={admission._id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="text-slate-500">
                      {new Date(admission.admissionDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-semibold text-slate-900">
                      {admission.student?.name || 'N/A'}
                    </TableCell>
                    <TableCell className="text-slate-700">{admission.course?.name || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`capitalize px-3 py-0.5 rounded-full font-bold text-[10px] tracking-wider 
                        ${admission.status === 'approved' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : ''}
                        ${admission.status === 'pending' ? 'bg-amber-100 text-amber-700 border-amber-200' : ''}
                        ${admission.status === 'rejected' ? 'bg-red-100 text-red-700 border-red-200' : ''}
                      `}
                      >
                        {admission.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {admission.status !== 'approved' && (
                            <DropdownMenuItem
                              onClick={() => handleUpdateStatus(admission._id, 'approved')}
                              className="cursor-pointer text-emerald-600 font-bold"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" /> Approve
                            </DropdownMenuItem>
                          )}
                          {admission.status !== 'rejected' && (
                            <DropdownMenuItem
                              onClick={() => handleUpdateStatus(admission._id, 'rejected')}
                              className="cursor-pointer text-red-600 font-bold"
                            >
                              <XCircle className="mr-2 h-4 w-4" /> Reject
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <CreateAdmissionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchAdmissions}
      />
    </div>
  );
}

export default function AdmissionsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <AdmissionsContent />
    </Suspense>
  );
}

'use client';

import { useEffect, useState, Suspense, useCallback } from 'react';
import { useSession } from 'next-auth/react';
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
  UserPlus, 
  Eye, 
  Trash2,
  Search,
  Pencil
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import Swal from 'sweetalert2';

interface StudentData {
  _id: string;
  studentId: string;
  name: string;
  email: string;
  mobile: string;
  currentClass: string;
  status: string;
  enrollmentDate: string;
}

function StudentsContent() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: session } = useSession();

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/education/students');
      if (!response.ok) throw new Error('Failed to fetch students');
      const data = await response.json();
      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleDeleteStudent = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: 'Delete Student?',
      text: `Are you sure you want to delete student "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete!',
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/education/students/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success(`Student "${name}" deleted successfully`);
        fetchStudents();
      } else {
        toast.error('Failed to delete student');
      }
    } catch (error) {
      toast.error('Error deleting student');
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.mobile.includes(searchTerm)
  );

  return (
    <div className="flex flex-col gap-6 px-0 py-4 md:p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Student Management</h1>
          <p className="text-muted-foreground text-sm font-medium">Manage all students in the coaching center.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => toast.info("Add Student Modal goes here")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-6 h-11 shadow-lg shadow-blue-200 border-none transition-all hover:scale-105 active:scale-95"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Student
          </Button>
        </div>
      </div>
      
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by ID, name or mobile..."
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
              <TableHead className="font-bold">Student ID</TableHead>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Mobile</TableHead>
              <TableHead className="font-bold">Class</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground font-medium">Loading student data...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-48 text-center">
                  <p className="text-muted-foreground">No students found.</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student._id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-bold text-slate-700">{student.studentId}</TableCell>
                  <TableCell className="font-semibold text-slate-900">{student.name}</TableCell>
                  <TableCell className="text-slate-600">{student.mobile}</TableCell>
                  <TableCell className="text-slate-600">{student.currentClass}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={student.status === 'active' ? 'default' : 'outline'}
                      className={`capitalize px-3 py-0.5 rounded-full font-bold text-[10px] tracking-wider ${student.status === 'active' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}`}
                    >
                      {student.status}
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
                        <DropdownMenuItem className="cursor-pointer">
                          <Pencil className="mr-2 h-4 w-4" /> Edit Student
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteStudent(student._id, student.name)}
                          className="text-destructive cursor-pointer font-bold bg-red-50 hover:bg-red-100"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
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
    </div>
  );
}

export default function StudentsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <StudentsContent />
    </Suspense>
  );
}

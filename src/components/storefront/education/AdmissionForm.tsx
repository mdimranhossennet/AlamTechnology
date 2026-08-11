'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

export function AdmissionForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    guardianName: '',
    phone: '',
    class: '',
    previousSchool: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/education/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: 'pending'
        })
      });

      if (res.ok) {
        toast.success('Application submitted successfully! We will contact you soon.');
        setFormData({
          studentName: '',
          guardianName: '',
          phone: '',
          class: '',
          previousSchool: ''
        });
      } else {
        toast.error('Failed to submit application. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">Student Name *</label>
        <Input 
          required 
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          placeholder="Enter full name" 
          className="h-12 bg-slate-50 border-slate-200 rounded-xl"
        />
      </div>
      
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">Guardian Name *</label>
        <Input 
          required 
          name="guardianName"
          value={formData.guardianName}
          onChange={handleChange}
          placeholder="Father/Mother/Guardian name" 
          className="h-12 bg-slate-50 border-slate-200 rounded-xl"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number *</label>
          <Input 
            required 
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="01XXXXXXXXX" 
            className="h-12 bg-slate-50 border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Class/Batch *</label>
          <select 
            required
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select a class</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
            <option value="Spoken English">Spoken English</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1.5">Previous School (Optional)</label>
        <Input 
          name="previousSchool"
          value={formData.previousSchool}
          onChange={handleChange}
          placeholder="School name" 
          className="h-12 bg-slate-50 border-slate-200 rounded-xl"
        />
      </div>

      <Button 
        type="submit" 
        disabled={loading}
        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-lg mt-6 shadow-md"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
        ) : (
          <Send className="w-5 h-5 mr-2" />
        )}
        Submit Application
      </Button>
    </form>
  );
}

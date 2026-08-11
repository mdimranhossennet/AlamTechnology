import { Suspense } from 'react';
import { BookOpen, Calendar, Clock, Trophy, MapPin, Phone, GraduationCap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'Education & Admission | HEB Vision International',
  description: 'Explore our courses, modern facilities, and apply online for admission to HEB Vision International Coaching Center.',
};

export default function EducationPage() {
  return (
    <main className="flex-1 w-full flex flex-col bg-slate-50 min-h-screen pb-20">
      
      {/* Hero Section */}
      <section className="relative w-full bg-slate-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 z-0"></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
          <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 mb-6 py-1.5 px-4 rounded-full font-bold uppercase tracking-widest text-xs">
            Admission Open 2026
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight max-w-4xl">
            Shaping the Future with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Moral & Modern Education</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Join HEB Vision International Coaching Center. We provide world-class facilities, experienced teachers, and a strong focus on Islamic values.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#admission-form">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 px-8 rounded-full text-lg shadow-xl shadow-blue-900/20 transition-all hover:scale-105">
                Apply Online Now
              </Button>
            </Link>
            <Link href="#courses">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold h-14 px-8 rounded-full text-lg backdrop-blur-md transition-all">
                View Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Facilities & Features */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">Why Choose Us?</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">We provide the best environment for students to grow academically and morally.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: 'Modern Curriculum', desc: 'Up-to-date syllabus with practical learning approaches.' },
              { icon: GraduationCap, title: 'Expert Teachers', desc: 'Highly qualified and experienced faculty members.' },
              { icon: CheckCircle, title: 'Islamic Values', desc: 'Moral education integrated into everyday learning.' },
              { icon: Trophy, title: 'Excellent Results', desc: 'Proven track record of outstanding academic success.' },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-3xl bg-slate-50 hover:bg-blue-50 transition-colors border border-slate-100 hover:border-blue-100 group">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 font-medium text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Form Section */}
      <section id="admission-form" className="py-20 bg-slate-50 relative">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-6">Online Admission</h2>
              <p className="text-slate-600 font-medium text-lg leading-relaxed mb-8">
                Ready to join? Fill out the form below to submit your admission request. Our administration team will contact you shortly to confirm your enrollment.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Campus Address</h4>
                    <p className="text-slate-600 font-medium mt-1">Patenga, Chattogram, Bangladesh</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Contact Us</h4>
                    <p className="text-slate-600 font-medium mt-1">+880 1621-974063</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
               <h3 className="text-2xl font-bold text-slate-900 mb-6">Application Form</h3>
               {/* Client component for form to handle state */}
               <AdmissionForm />
            </div>
            
          </div>
        </div>
      </section>

    </main>
  );
}

// Inline Client Component for the form to keep it simple and encapsulated
import { AdmissionForm } from '@/components/storefront/education/AdmissionForm';
import { Badge } from '@/components/ui/badge';

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Heart, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EducationHero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 py-16 md:py-24 rounded-3xl shadow-2xl mb-8 mt-4 mx-0 lg:mx-0 border-4 border-blue-100/10">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-blue-500 blur-[120px] rounded-full mix-blend-overlay"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-indigo-500 blur-[120px] rounded-full mix-blend-overlay"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-8 mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm uppercase tracking-widest">
            <GraduationCap className="h-4 w-4 text-amber-400" />
            Established 2026
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
            HEB VISION <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              INTERNATIONAL
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100 font-medium max-w-2xl mx-auto md:mx-0">
            Empowering humanity through education and sustainable business. <br className="hidden md:block"/>
            <span className="font-bold italic mt-2 inline-block">মানবতার সেবা, শিক্ষার আলো, ব্যবসার উন্নয়ন</span>
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
            <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
              <Heart className="h-5 w-5 text-rose-400" />
              <span className="font-bold">Humanity</span>
            </div>
            <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
              <BookOpen className="h-5 w-5 text-emerald-400" />
              <span className="font-bold">Education</span>
            </div>
            <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
              <Briefcase className="h-5 w-5 text-amber-400" />
              <span className="font-bold">Business</span>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Button size="lg" className="h-14 px-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-lg shadow-xl shadow-orange-500/30 border-none group w-full sm:w-auto">
              ভর্তি চলছে
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-2 border-white/30 bg-white/5 text-white hover:bg-white/10 font-bold w-full sm:w-auto backdrop-blur-md">
              Learn More
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md mx-auto relative hidden md:block">
           {/* Logo Graphic Representation */}
           <div className="relative aspect-square rounded-full border-8 border-white/10 bg-white/5 backdrop-blur-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent rounded-full"></div>
              <h2 className="text-5xl font-black text-white mb-2">HEB</h2>
              <p className="text-white font-bold tracking-widest text-sm uppercase">Vision International</p>
              <div className="flex gap-4 mt-8">
                 <div className="flex flex-col items-center text-blue-300">
                    <Heart className="h-8 w-8 mb-2" />
                 </div>
                 <div className="flex flex-col items-center text-emerald-300">
                    <BookOpen className="h-8 w-8 mb-2" />
                 </div>
                 <div className="flex flex-col items-center text-amber-300">
                    <Briefcase className="h-8 w-8 mb-2" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

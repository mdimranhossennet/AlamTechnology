'use client';

import { Armchair, Tv, Wifi, AirVent, Gamepad2, Bike, Car, Puzzle } from 'lucide-react';

export function FacilitiesSection() {
  return (
    <div className="space-y-8 mb-16">
      {/* Waiting Room Section */}
      <section className="relative overflow-hidden rounded-3xl bg-blue-50 border border-blue-100 p-8 md:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/50 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
          <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">অভিভাবকদের জন্য</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
            উন্নত মানের বিনোদনমূলক <span className="text-blue-600">ওয়েটিং রুম</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium">
            অভিভাবকদের আরামদায়কভাবে বসে সময় কাটানোর জন্য শীতাতপ নিয়ন্ত্রিত ও বিনোদনমূলক অপেক্ষাকক্ষসহ উন্নত মানের ওয়েটিং রুমের ব্যবস্থা।
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <Armchair className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-900">আরামদায়ক আসন</h4>
            <p className="text-sm text-slate-500 mt-1">Comfortable Seating</p>
          </div>
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
              <Tv className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-900">টিভি ও বিনোদন</h4>
            <p className="text-sm text-slate-500 mt-1">TV & Entertainment</p>
          </div>
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <Wifi className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-900">ফ্রি Wi-Fi</h4>
            <p className="text-sm text-slate-500 mt-1">Free Wi-Fi Access</p>
          </div>
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
              <AirVent className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-900">এয়ারকন্ডিশন পরিবেশ</h4>
            <p className="text-sm text-slate-500 mt-1">Air-Conditioned</p>
          </div>
        </div>
      </section>

      {/* Playground Section */}
      <section className="relative overflow-hidden rounded-3xl bg-amber-50 border border-amber-100 p-8 md:p-12">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-200/50 rounded-full blur-[80px] -ml-32 -mb-32"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
          <p className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-3">শিক্ষার্থীদের খেলাধুলার জন্য</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
            উন্মুক্ত <span className="text-amber-600">প্ল্যাটফর্ম</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium">
            শিক্ষার্থীদের শারীরিক ও মানসিক বিকাশের জন্য রয়েছে উন্মুক্ত ও নিরাপদ খেলার মাঠ।
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center text-center shadow-sm border border-amber-100/50">
            <Gamepad2 className="w-8 h-8 text-amber-500 mb-3" />
            <h4 className="font-bold text-sm text-slate-900">দোলনা</h4>
            <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Swing</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center text-center shadow-sm border border-amber-100/50">
            <Car className="w-8 h-8 text-amber-500 mb-3" />
            <h4 className="font-bold text-sm text-slate-900">ব্যাটারি চালিত গাড়ি</h4>
            <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Electric Car</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center text-center shadow-sm border border-amber-100/50">
            <Bike className="w-8 h-8 text-amber-500 mb-3" />
            <h4 className="font-bold text-sm text-slate-900">ব্যাটারি চালিত মোটরসাইকেল</h4>
            <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Electric Bike</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center text-center shadow-sm border border-amber-100/50">
            <Bike className="w-8 h-8 text-amber-500 mb-3" />
            <h4 className="font-bold text-sm text-slate-900">সাইকেল</h4>
            <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Bicycle</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center text-center shadow-sm border border-amber-100/50">
            <Puzzle className="w-8 h-8 text-amber-500 mb-3" />
            <h4 className="font-bold text-sm text-slate-900">বিভিন্ন ধরনের খেলনা</h4>
            <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Various Toys</p>
          </div>
        </div>
      </section>
    </div>
  );
}

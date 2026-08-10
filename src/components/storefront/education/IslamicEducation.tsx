'use client';

import { BookHeart, CheckCircle2 } from 'lucide-react';

export function IslamicEducation() {
  return (
    <section className="py-16 rounded-3xl mb-8 relative overflow-hidden bg-emerald-950 text-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900/50 rounded-l-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-sm uppercase tracking-widest mb-6 border border-emerald-500/30">
                <BookHeart className="w-4 h-4" />
                মানবতার সেবায়, শিক্ষার আলোয়
              </div>
              <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6 text-white">
                নামাজ, কোরআন ও <br/>
                <span className="text-emerald-400">ইসলামিক শিক্ষা</span>
              </h2>
              <p className="text-lg text-emerald-100/80 font-medium max-w-lg leading-relaxed">
                শুদ্ধ জ্ঞান, সুন্দর চরিত্র ও আলোকিত ভবিষ্যৎ গড়তে আমাদের রয়েছে বিশেষ ইসলামিক শিক্ষা ব্যবস্থা।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">নামাজ শিক্ষা</h4>
                  <p className="text-sm text-emerald-100/70">সঠিক নিয়মে নামাজ আদায়ের পূর্ণাঙ্গ শিক্ষা।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">কোরআন শিক্ষা</h4>
                  <p className="text-sm text-emerald-100/70">তিলাওয়াত ও অর্থ সহ কোরআন শিক্ষা।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">ইসলামিক শিক্ষা</h4>
                  <p className="text-sm text-emerald-100/70">আকিদা, আদব-আখলাক ও হাদিসের শিক্ষা।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">নৈতিক শিক্ষা</h4>
                  <p className="text-sm text-emerald-100/70">সুন্দর চরিত্র গঠন ও জীবন গঠনের শিক্ষা।</p>
                </div>
              </div>
            </div>

            <div className="inline-block p-[2px] rounded-2xl bg-gradient-to-r from-amber-200 to-amber-500 mt-4">
              <div className="bg-emerald-950 px-6 py-4 rounded-[14px] flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 text-2xl font-black">
                  ❤️
                </div>
                <div>
                  <h4 className="text-amber-400 font-bold text-lg">অসহায় গরীব শিক্ষার্থীদের জন্য</h4>
                  <p className="font-black text-xl text-white">ফ্রি শিক্ষার সুযোগ রয়েছে</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full bg-emerald-900/50 p-6 md:p-8 rounded-[40px] border border-emerald-800 backdrop-blur-md">
            <blockquote className="relative">
              <span className="absolute -top-4 -left-4 text-6xl text-emerald-500/40 font-serif">"</span>
              <p className="text-xl md:text-2xl text-emerald-50 font-medium text-center leading-relaxed italic px-4 py-8">
                তোমরা তোমাদের সন্তানদেরকে নামাজের আদেশ দাও যখন তারা সাত বছরের পৌঁছে যায় এবং যখন তারা দশ বছরের হয়, তখন তাদের উপর নামাজের জন্য কঠোর হও।
              </p>
              <footer className="text-center font-bold text-emerald-400">(সুনান আবু দাউদ: ৪৯৫)</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

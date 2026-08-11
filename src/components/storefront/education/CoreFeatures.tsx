'use client';

import { 
  BookOpen, 
  MonitorPlay, 
  Wrench, 
  HeartHandshake, 
  Activity, 
  ShieldCheck, 
  Video,
  PlayCircle
} from 'lucide-react';

const features = [
  {
    title: "ইংলিশ মিডিয়াম শিক্ষা",
    subtitle: "English Medium Education",
    desc: "ইংরেজির উপর বিশেষ গুরুত্ব দিয়ে আন্তর্জাতিক মানের পাঠদান।",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "কম্পিউটার ও আইটি শিক্ষা",
    subtitle: "Computer & IT Education",
    desc: "আধুনিক প্রযুক্তি ও ডিজিটাল শিক্ষায় দক্ষ করে তোলা।",
    icon: MonitorPlay,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "কারিগরি প্রশিক্ষণ",
    subtitle: "Vocational Training",
    desc: "দক্ষ টেকনিশিয়ান গড়ে তুলতে হাতে কলমে বাস্তবমুখী প্রশিক্ষণ।",
    icon: Wrench,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "মানবিক সহায়তা ও সেবা",
    subtitle: "Humanitarian Aid",
    desc: "অসহায় শিক্ষার্থীদের মানবিক সহায়তা প্রদান।",
    icon: HeartHandshake,
    color: "bg-rose-100 text-rose-600",
  },
  {
    title: "শারীরিক চর্চা ও খেলাধুলা",
    subtitle: "Physical Exercise",
    desc: "সুস্থ দেহ সুন্দর মন গড়তে নিয়মিত খেলাধুলার ব্যবস্থা।",
    icon: Activity,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "নিরাপদ পরিবেশ",
    subtitle: "Safe Environment",
    desc: "সিসিটিভি নিয়ন্ত্রিত সম্পূর্ণ নিরাপদ ও সুশৃঙ্খল ক্যাম্পাস।",
    icon: ShieldCheck,
    color: "bg-slate-100 text-slate-700",
  },
];

export function CoreFeatures() {
  return (
    <section className="py-16 bg-white/50 rounded-3xl mb-8">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">আমাদের বৈশিষ্ট্য</h2>
          <p className="text-muted-foreground font-medium text-lg">
            মানবিক শিক্ষা, আধুনিক প্রযুক্তি ও নৈতিক মূল্যবোধের সমন্বয়ে আগামী দিনের বিশ্বমানের শিক্ষা প্রতিষ্ঠান।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, idx) => (
            <div key={idx} className="group p-6 rounded-3xl border border-slate-200 bg-white hover:shadow-xl hover:border-primary/20 transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{feature.title}</h3>
              <h4 className="text-xs font-black uppercase tracking-widest text-primary/60 mb-3">{feature.subtitle}</h4>
              <p className="text-slate-600 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}

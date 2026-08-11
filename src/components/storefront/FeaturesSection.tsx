'use client';

import { Users, BookOpen, Heart, MonitorPlay, ShieldCheck, Library } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: "Expert Teachers",
    desc: "Highly qualified faculty",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    icon: BookOpen,
    title: "Modern Syllabus",
    desc: "Updated curriculum",
    color: "bg-green-500/10 text-green-500"
  },
  {
    icon: Heart,
    title: "Islamic Environment",
    desc: "Moral and ethical focus",
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    icon: MonitorPlay,
    title: "Digital Classrooms",
    desc: "Smart learning aids",
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    icon: ShieldCheck,
    title: "24/7 Security",
    desc: "Safe & secure campus",
    color: "bg-pink-500/10 text-pink-500"
  },
  {
    icon: Library,
    title: "Rich Library",
    desc: "Extensive resources",
    color: "bg-yellow-500/10 text-yellow-500"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-12 border-y bg-muted/20">
      <div className="container mx-auto px-4 md:px-0 ">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter">
            Why Choose <span className="text-primary italic">HEB Vision International</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 md:p-6 rounded-3xl bg-card border border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
            >
              <div className={`p-4 rounded-2xl mb-4 transition-transform group-hover:scale-110 ${item.color}`}>
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-sm mb-1">{item.title}</h3>
              <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

import { useSettings } from "@/components/SettingsProvider";

const fallbackReviews = [
  {
    name: "Ariful Islam",
    role: "Parent of Class 8 Student",
    content: "The teaching quality and moral environment here is outstanding. I have seen a remarkable improvement in my son's academic performance and discipline.",
    image: "https://avatar.iran.liara.run/public/boy?username=Ariful",
    rating: 5
  },
  {
    name: "Sadia Afrin",
    role: "Parent of Hifz Student",
    content: "Excellent teachers and a very caring administration. They focus not only on studies but also on Islamic values. Highly recommended for any parent.",
    image: "https://avatar.iran.liara.run/public/girl?username=Sadia",
    rating: 5
  },
  {
    name: "Tanvir Ahmed",
    role: "Guardian",
    content: "The residential facilities are secure and well-managed. The daily updates from the school help us stay connected with our child's progress.",
    image: "https://avatar.iran.liara.run/public/boy?username=Tanvir",
    rating: 5
  },
  {
    name: "Nusrat Jahan",
    role: "Parent of Class 5 Student",
    content: "We are very satisfied with the modern syllabus combined with religious education. It's the perfect balance for my daughter's future.",
    image: "https://avatar.iran.liara.run/public/girl?username=Nusrat",
    rating: 5
  }
];

export function Testimonials() {
  const settings = useSettings();
  const reviews = settings?.testimonials && settings.testimonials.length > 0
    ? settings.testimonials
    : fallbackReviews;

  return (
    <section className="py-12 md:py-20 overflow-hidden font-jost">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 text-center md:text-left max-w-xl">
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter">
              What our <span className="text-primary italic">Parents</span> say
            </h2>
            <p className="text-muted-foreground font-medium">
              Don&apos;t just take our word for it. Join hundreds of happy parents who trust us with their children&apos;s future!
            </p>
          </div>
          <div className="flex items-center gap-2 pb-2">
            <div className="flex -space-x-3">
              {reviews.slice(0, 3).map((r, i) => (
                <Avatar key={i} className="border-2 border-white size-10 bg-slate-100">
                  <AvatarImage src={r.image} alt={`${r.name} avatar`} />
                  <AvatarFallback>{r.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="text-sm font-bold pl-2">
              <div className="flex text-yellow-500 scale-75 -ml-4 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-current size-3" />
                ))}
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground italic font-black">4.9/5 Average Rating</p>
            </div>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-full border bg-card rounded-[2.5rem] p-8 md:p-10 flex flex-col hover:border-primary/20 transition-colors group relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 text-primary/5 group-hover:text-primary/10 transition-colors">
                    <Quote className="size-32 fill-current" />
                  </div>
                  <div className="flex text-yellow-500 gap-1 mb-6">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="fill-current size-4" />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed mb-8 flex-1 italic text-muted-foreground font-medium">
                    &quot;{review.content}&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar className="size-12 rounded-full border-2 border-primary/20 shadow-lg shadow-primary/10 bg-slate-100">
                      <AvatarImage src={review.image} alt={review.name} />
                      <AvatarFallback>{review.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">{review.name}</p>
                      <p className="text-xs text-muted-foreground uppercase font-black tracking-widest">{review.role}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

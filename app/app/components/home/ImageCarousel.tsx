"use client";

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const showcaseImages = [
  {
    url: '/asanas/crow-pose-human.jpeg',
    title: 'Precision in Balance',
    subtitle: 'Human Demonstration',
  },
  {
    url: '/asanas/cobra-pose-anatomical.jpeg',
    title: 'Anatomical Insight',
    subtitle: 'Skeletal View',
  },
  {
    url: '/asanas/warrior-2-human.jpeg',
    title: 'Rooted Strength',
    subtitle: 'Classic Lineage',
  },
  {
    url: '/asanas/tree-pose-anatomical.jpeg',
    title: 'Functional Stability',
    subtitle: 'Muscle Activation',
  },
  {
    url: '/asanas/downward-dog-human.jpeg',
    title: 'Sacred Geometry',
    subtitle: 'The Foundation',
  },
  {
    url: '/asanas/tree-pose-human.jpeg',
    title: 'Grace in Stillness',
    subtitle: 'Equilibrium',
  },
];

export default function ImageCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <section className="py-12 bg-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink">Lineage in Motion</h2>
            <p className="text-ink-light mt-2 italic">Bridging ancient form with anatomical precision.</p>
          </div>
          <div className="flex gap-2">
            <button 
              className="p-2 rounded-full border border-sand hover:bg-paper-light transition"
              onClick={() => {
                const el = document.getElementById('carousel-container');
                if (el) el.scrollBy({ left: -300, behavior: 'smooth' });
              }}
            >
              <ChevronLeft className="w-5 h-5 text-ink-light" />
            </button>
            <button 
              className="p-2 rounded-full border border-sand hover:bg-paper-light transition"
              onClick={() => {
                const el = document.getElementById('carousel-container');
                if (el) el.scrollBy({ left: 300, behavior: 'smooth' });
              }}
            >
              <ChevronRight className="w-5 h-5 text-ink-light" />
            </button>
          </div>
        </div>
      </div>

      <div 
        id="carousel-container"
        className="flex gap-6 overflow-x-auto pb-8 px-4 sm:px-[calc((100vw-1280px)/2+32px)] scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {showcaseImages.map((image, index) => (
          <div 
            key={index}
            className="flex-shrink-0 w-72 sm:w-80 lg:w-96 aspect-square relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group snap-center"
          >
            <Image
              src={image.url}
              alt={image.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-clay-light text-xs font-bold uppercase tracking-widest mb-1">{image.subtitle}</p>
              <h3 className="text-white text-xl font-serif font-bold">{image.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

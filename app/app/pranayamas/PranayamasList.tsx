"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Filter, X, Wind } from 'lucide-react';
import Fuse from 'fuse.js';
import { getPranayamaCategoryDisplayName } from '@/lib/pranayamas-utils';
import type { PranayamaMetadata } from '@/types/pranayama';
import MobileNav from '@/app/components/MobileNav';

interface PranayamasListProps {
  pranayamas: PranayamaMetadata[];
  categories: string[];
}

export default function PranayamasList({ pranayamas, categories }: PranayamasListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(pranayamas, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'sanskritName', weight: 0.4 },
        { name: 'id', weight: 0.2 },
      ],
      threshold: 0.4,
      ignoreLocation: true,
      includeScore: true,
    });
  }, [pranayamas]);

  const filteredPranayamas = useMemo(() => {
    let result = pranayamas;

    // Apply category filter first
    if (selectedCategory) {
      result = result.filter((pranayama) =>
        pranayama.category.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase())
      );
    }

    // Apply fuzzy search
    if (searchQuery.trim()) {
      if (selectedCategory) {
        const categoryFuse = new Fuse(result, {
          keys: [
            { name: 'title', weight: 0.4 },
            { name: 'sanskritName', weight: 0.4 },
            { name: 'id', weight: 0.2 },
          ],
          threshold: 0.4,
          ignoreLocation: true,
          includeScore: true,
        });
        result = categoryFuse.search(searchQuery).map(r => r.item);
      } else {
        result = fuse.search(searchQuery).map(r => r.item);
      }
    }

    return result;
  }, [searchQuery, selectedCategory, pranayamas, fuse]);

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="border-b border-sand bg-paper-light/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-ink-light hover:text-ink transition touch-target"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Home</span>
          </Link>
          <h1 className="text-base sm:text-lg font-serif font-semibold text-ink flex items-center gap-2">
            <Wind className="w-4 h-4 text-accent" />
            Pranayama
          </h1>
          <MobileNav currentPath="/pranayamas" />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-ink mb-2 sm:mb-3">
            Pranayama
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-ink-light mb-4 sm:mb-6">
            Master the art of breath control with detailed techniques, benefits, and safety guidelines.
          </p>

          {/* Search & Filter Row */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-light w-5 h-5" />
              <input
                type="text"
                placeholder="Search pranayamas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-paper-light border border-sand rounded-lg text-ink placeholder:text-ink-light focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-sm sm:text-base"
              />
            </div>
            {/* Filter Icon Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`touch-target p-2 sm:p-2.5 rounded-lg transition-all ${
                showFilters || selectedCategory !== null
                  ? "bg-accent text-white"
                  : "bg-paper-light text-ink-light hover:bg-paper border border-sand"
              }`}
              aria-label="Toggle filters"
            >
              {showFilters ? (
                <X className="w-5 h-5" />
              ) : (
                <Filter className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Category Filters - Collapsible */}
          <div
            className={`flex flex-wrap gap-2 transition-all duration-300 overflow-hidden ${
              showFilters
                ? "max-h-96 opacity-100 mt-3"
                : "max-h-0 opacity-0"
            }`}
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-lg text-xs sm:text-sm font-medium touch-target transition-all px-3 py-1.5 sm:px-4 sm:py-2 ${
                selectedCategory === null
                  ? "bg-accent text-white"
                  : "bg-paper-light text-ink-light hover:bg-paper border border-sand"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-lg text-xs sm:text-sm font-medium touch-target transition-all px-3 py-1.5 sm:px-4 sm:py-2 ${
                  selectedCategory === category
                    ? "bg-accent text-white"
                    : "bg-paper-light text-ink-light hover:bg-paper border border-sand"
                }`}
              >
                {getPranayamaCategoryDisplayName(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {(searchQuery || selectedCategory) && (
          <div className="mb-4 text-sm text-ink-light">
            Showing {filteredPranayamas.length} of {pranayamas.length} pranayamas
          </div>
        )}

        {/* Pranayamas Grid */}
        {filteredPranayamas.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <p className="text-ink-light text-base sm:text-lg mb-2">No pranayamas found</p>
            <p className="text-sm text-ink-light">
              Try a different search or category
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPranayamas.map((pranayama) => (
              <Link
                key={pranayama.id}
                href={`/pranayamas/${pranayama.id}`}
                className="group bg-paper-light p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-sand hover:border-accent/30 hover:shadow-lg transition-all touch-target flex flex-col"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-serif font-semibold text-ink group-hover:text-accent transition">
                    {pranayama.title}
                  </h3>
                  <Wind className="w-5 h-5 text-accent/50 group-hover:text-accent transition" />
                </div>
                <p className="text-sm sm:text-base text-ink-light italic">
                  {pranayama.sanskritName || pranayama.id}
                </p>
                <div className="mt-3 pt-3 border-t border-sand flex flex-wrap gap-1.5">
                  {pranayama.category.map((cat) => (
                    <span
                      key={cat}
                      className="inline-block px-2.5 py-1 bg-accent/10 text-accent text-[10px] sm:text-xs font-semibold rounded-full uppercase tracking-wide"
                    >
                      {getPranayamaCategoryDisplayName(cat)}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

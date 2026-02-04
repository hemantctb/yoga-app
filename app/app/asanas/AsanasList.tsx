"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Filter, X } from 'lucide-react';
import { getCategoryDisplayName } from '@/lib/asanas-utils';
import type { AsanaMetadata } from '@/types/asana';

interface AsanasListProps {
  asanas: AsanaMetadata[];
  categories: string[];
}

export default function AsanasList({ asanas, categories }: AsanasListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredAsanas = useMemo(() => {
    let result = asanas;

    if (selectedCategory) {
      result = result.filter((asana) =>
        asana.category.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((asana) =>
        asana.title.toLowerCase().includes(query) ||
        asana.id.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchQuery, selectedCategory, asanas]);

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
          <h1 className="text-base sm:text-lg font-serif font-semibold text-ink">
            Asana Library
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-ink mb-2 sm:mb-3">
            Explore {asanas.length} Asanas
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-ink-light mb-4 sm:mb-6">
            Comprehensive guide to yoga poses with anatomical details and cueing tips.
          </p>

          {/* Search & Filter Row */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-light w-5 h-5" />
              <input
                type="text"
                placeholder="Search asanas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-paper-light border border-sand rounded-lg text-ink placeholder:text-ink-light focus:outline-none focus:ring-2 focus:ring-clay focus:border-transparent transition-all text-sm sm:text-base"
              />
            </div>
            {/* Filter Icon Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`touch-target p-2 sm:p-2.5 rounded-lg transition-all ${
                showFilters || selectedCategory !== null
                  ? "bg-clay text-white"
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
                  ? "bg-clay text-white"
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
                    ? "bg-clay text-white"
                    : "bg-paper-light text-ink-light hover:bg-paper border border-sand"
                }`}
              >
                {getCategoryDisplayName(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {(searchQuery || selectedCategory) && (
          <div className="mb-4 text-sm text-ink-light">
            Showing {filteredAsanas.length} of {asanas.length} asanas
          </div>
        )}

        {/* Asanas Grid */}
        {filteredAsanas.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <p className="text-ink-light text-base sm:text-lg mb-2">No asanas found</p>
            <p className="text-sm text-ink-light">
              Try a different search or category
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredAsanas.map((asana) => (
              <Link
                key={asana.id}
                href={`/asanas/${asana.id}`}
                className="group bg-paper-light p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-sand hover:border-clay/30 hover:shadow-lg transition-all touch-target flex flex-col"
              >
                <h3 className="text-lg sm:text-xl font-serif font-semibold text-ink mb-2 group-hover:text-clay transition">
                  {asana.title}
                </h3>
                <p className="text-sm sm:text-base text-ink-light italic">
                  {asana.sanskritName || asana.id}
                </p>
                <div className="mt-3 pt-3 border-t border-sand flex flex-wrap gap-1.5">
                  {asana.category.map((cat) => (
                    <span
                      key={cat}
                      className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-[10px] sm:text-xs font-semibold rounded-full uppercase tracking-wide"
                    >
                      {getCategoryDisplayName(cat)}
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

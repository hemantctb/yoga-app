"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import type { Asana } from "@/types/asana";

interface ElevatedCuesProps {
  asana: Asana;
  elevatedSuggestions?: Array<{
    original: string;
    suggestion: string;
  }>;
}

export default function ElevatedCues({ asana, elevatedSuggestions }: ElevatedCuesProps) {
  // Use real suggestions if available, otherwise fallback to asana vocabulary
  const suggestions = elevatedSuggestions && elevatedSuggestions.length > 0
    ? elevatedSuggestions
    : asana.cueing.elevated_vocabulary.slice(0, 3).map(v => ({
        original: v.basic,
        suggestion: v.elevated
      }));

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-turmeric" />
        <h2 className="text-xs uppercase tracking-wide text-ink-light font-bold">
          Elevate Your Language
        </h2>
      </div>

      <div className="space-y-3">
        {suggestions.map((cue, index) => (
          <div
            key={index}
            className="bg-turmeric-light border border-turmeric/20 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <ArrowRight className="w-4 h-4 text-turmeric shrink-0 mt-1" />
              <div className="text-sm">
                <p className="text-ink-light mb-1">
                  Instead of <span className="font-medium text-ink">"{cue.original}"</span>
                </p>
                <p className="text-ink">
                  Try: <span className="font-semibold text-clay">"{cue.suggestion}"</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

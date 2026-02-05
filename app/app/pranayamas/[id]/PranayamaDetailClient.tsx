"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Wind,
  Target,
  Sparkles,
  Activity,
  CircleDot,
  ShieldAlert,
  BookOpen,
  Hand,
  Timer,
  Flame,
  Droplets,
} from 'lucide-react';
import type { Pranayama } from '@/types/pranayama';
import { getChakraName } from '@/lib/constants-utils';
import {
  getPranayamaCategoryDisplayName,
  getMudraDisplayName,
  getBandhaDisplayName,
  getDoshaDisplayName,
  getGunaDisplayName,
  getNostrilFocusDisplayName,
} from '@/lib/pranayamas-utils';
import MobileNav from '@/app/components/MobileNav';

interface PranayamaDetailClientProps {
  pranayama: Pranayama;
}

const ALL_SECTIONS = ['technique', 'mechanics', 'energy', 'benefits', 'safety', 'vocabulary'];

export default function PranayamaDetailClient({ pranayama }: PranayamaDetailClientProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['technique', 'mechanics']));
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
      if (e.matches) {
        setExpandedSections(new Set(ALL_SECTIONS));
      } else {
        setExpandedSections(new Set(['technique', 'mechanics']));
      }
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans pb-16 relative">
      {/* HERO HEADER */}
      <header className="pt-4 pb-4 px-4 bg-paper-light border-b border-sand rounded-b-[1.5rem] shadow-sm">
        {/* Top Nav */}
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <Link
            href="/pranayamas"
            className="touch-target p-2 text-ink-light hover:text-ink hover:bg-paper rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="px-2.5 py-1 bg-accent/10 text-accent text-[10px] font-bold tracking-widest uppercase rounded-full border border-accent/20">
            {pranayama.difficulty_level}
          </span>
          <MobileNav currentPath="/pranayamas" />
        </div>

        {/* Titles */}
        <div className="text-center mb-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wind className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-ink mb-1 sm:mb-2">
            {pranayama.names.english}
          </h1>
          <h2 className="font-serif text-base sm:text-lg lg:text-xl italic text-ink-light mb-1">
            {pranayama.names.sanskrit}
          </h2>
          <p className="text-xs sm:text-sm text-ink-light">{pranayama.names.phonetic}</p>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-ink-light leading-relaxed text-center mb-4 px-2 max-w-3xl mx-auto">
          {pranayama.description}
        </p>

        {/* Mudra & Bandhas */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {/* Mudra */}
          {pranayama.mudra && (
            <div className="flex items-center justify-center gap-2">
              <Hand size={14} className="text-accent" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-ink-light">
                Mudra:
              </span>
              <span className="px-2.5 py-1 bg-accent/10 text-accent text-[10px] font-semibold rounded-lg border border-accent/20">
                {getMudraDisplayName(pranayama.mudra)}
              </span>
            </div>
          )}

          {/* Bandhas */}
          {pranayama.bandhas_involved && pranayama.bandhas_involved.length > 0 && (
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold tracking-widest uppercase text-ink-light">
                Bandhas:
              </span>
              {pranayama.bandhas_involved.map((bandha, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-secondary/10 text-secondary text-[10px] rounded-md border border-secondary/20"
                >
                  {getBandhaDisplayName(bandha)}
                </span>
              ))}
            </div>
          )}

          {/* Categories */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {pranayama.category.map((cat) => (
              <span
                key={cat}
                className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-semibold rounded-full uppercase tracking-wide"
              >
                {getPranayamaCategoryDisplayName(cat)}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="px-0 py-4 sm:p-4 space-y-4 max-w-5xl mx-auto">
        {/* THE TECHNIQUE */}
        <section>
          <button
            onClick={() => toggleSection('technique')}
            className="flex items-center justify-between w-full mb-3 px-4 sm:px-0"
          >
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg sm:text-xl lg:text-2xl italic text-ink lg:font-semibold">The Technique</h3>
              <div className="h-px bg-sand flex-1"></div>
            </div>
          </button>

          {expandedSections.has('technique') && (
            <div className="bg-paper-light sm:rounded-xl border-y sm:border border-sand overflow-hidden shadow-sm">
              {/* Summary */}
              {pranayama.cueing?.summary && pranayama.cueing.summary.length > 0 && (
                <div className="p-4 border-b border-paper">
                  <div className="flex items-center gap-2 mb-2 text-accent">
                    <Target size={16} />
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                      Quick Steps
                    </span>
                  </div>
                  <ol className="space-y-2">
                    {pranayama.cueing.summary.map((step, i) => (
                      <li
                        key={i}
                        className="text-sm sm:text-base text-ink leading-relaxed pl-3 border-l-2 border-accent/30 flex gap-2"
                      >
                        <span className="text-accent font-bold">{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Foundation */}
              {pranayama.cueing?.foundation && (
                <div className="p-4 border-b border-paper">
                  <div className="flex items-center gap-2 mb-2 text-accent">
                    <Sparkles size={16} />
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                      Foundation
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-ink leading-relaxed pl-3 border-l-2 border-sand">
                    {pranayama.cueing.foundation}
                  </p>
                </div>
              )}

              {/* Hand Position */}
              {pranayama.cueing?.hand_position && (
                <div className="p-4 border-b border-paper">
                  <div className="flex items-center gap-2 mb-2 text-accent">
                    <Hand size={16} />
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                      Hand Position
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-ink leading-relaxed pl-3 border-l-2 border-sand">
                    {pranayama.cueing.hand_position}
                  </p>
                </div>
              )}

              {/* Breath Instruction */}
              {pranayama.cueing?.breath_instruction && (
                <div className="p-4 bg-accent/5">
                  <div className="flex items-center gap-2 mb-2 text-accent">
                    <Wind size={16} />
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                      Breath Cue
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-ink leading-relaxed italic">
                    &ldquo;{pranayama.cueing.breath_instruction}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* BREATH MECHANICS */}
        {pranayama.mechanics && (
          <section>
            <button
              onClick={() => toggleSection('mechanics')}
              className="flex items-center justify-between w-full mb-3 px-4 sm:px-0"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl italic text-ink lg:font-semibold">Breath Mechanics</h3>
                <div className="h-px bg-sand flex-1"></div>
              </div>
            </button>

            {expandedSections.has('mechanics') && (
              <div className="bg-paper-light sm:rounded-xl border-y sm:border border-sand overflow-hidden shadow-sm">
                <div className="grid sm:grid-cols-2 gap-0 sm:gap-0">
                  {/* Default Ratio */}
                  <div className="p-4 border-b sm:border-r sm:border-b-0 border-sand">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      <Timer size={14} />
                      <span className="text-[10px] font-bold tracking-widest uppercase">
                        Default Ratio
                      </span>
                    </div>
                    <p className="text-lg font-mono font-bold text-ink">
                      {pranayama.mechanics.default_ratio}
                    </p>
                    <p className="text-xs text-ink-light mt-1">Inhale : Exhale</p>
                  </div>

                  {/* Advanced Ratio */}
                  <div className="p-4 border-b border-sand">
                    <div className="flex items-center gap-2 mb-2 text-secondary">
                      <Timer size={14} />
                      <span className="text-[10px] font-bold tracking-widest uppercase">
                        Advanced Ratio
                      </span>
                    </div>
                    <p className="text-lg font-mono font-bold text-ink">
                      {pranayama.mechanics.advanced_ratio}
                    </p>
                    <p className="text-xs text-ink-light mt-1">Inhale : Retain : Exhale : Suspend</p>
                  </div>
                </div>

                {/* Nostril Focus & Technique */}
                <div className="p-4 flex flex-wrap gap-4">
                  {pranayama.mechanics.nostril_focus && (
                    <div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-ink-light block mb-1">
                        Nostril Focus
                      </span>
                      <span className="px-3 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-lg">
                        {getNostrilFocusDisplayName(pranayama.mechanics.nostril_focus)}
                      </span>
                    </div>
                  )}

                  {pranayama.mechanics.technique && (
                    <div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-ink-light block mb-1">
                        Technique
                      </span>
                      <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-lg capitalize">
                        {pranayama.mechanics.technique.replace(/-/g, ' ')}
                      </span>
                    </div>
                  )}

                  {pranayama.mechanics.mouth_breath && (
                    <div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-ink-light block mb-1">
                        Mouth Breath
                      </span>
                      <span className="px-3 py-1.5 bg-turmeric/10 text-turmeric text-sm font-medium rounded-lg">
                        Yes
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        {/* ENERGY & AYURVEDA */}
        {pranayama.impact && (
          <section>
            <button
              onClick={() => toggleSection('energy')}
              className="flex items-center justify-between w-full mb-3 px-4 sm:px-0"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl italic text-ink lg:font-semibold">Energy & Ayurveda</h3>
                <div className="h-px bg-sand flex-1"></div>
              </div>
            </button>

            {expandedSections.has('energy') && (
              <div className="bg-paper-light sm:rounded-xl border-y sm:border border-sand overflow-hidden shadow-sm">
                {/* Chakras */}
                {pranayama.impact.chakras && (
                  <div className="p-4 border-b border-sand">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={14} className="text-accent" />
                      <span className="text-[10px] font-bold tracking-widest uppercase text-ink-light">
                        Chakras
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] text-accent font-bold uppercase">Primary:</span>
                        <span className="px-2.5 py-1 bg-accent text-white text-[10px] font-semibold rounded-lg">
                          {getChakraName(pranayama.impact.chakras.primary)}
                        </span>
                      </div>
                      {pranayama.impact.chakras.secondary && pranayama.impact.chakras.secondary.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="text-[9px] text-secondary font-bold uppercase">Secondary:</span>
                          {pranayama.impact.chakras.secondary.map((chakra, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-secondary/10 text-secondary text-[10px] rounded-md border border-secondary/20"
                            >
                              {getChakraName(chakra)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Ayurveda */}
                {pranayama.impact.ayurveda && (
                  <div className="p-4 flex flex-wrap gap-4">
                    {pranayama.impact.ayurveda.dosha_impact && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Flame size={14} className="text-turmeric" />
                          <span className="text-[10px] font-bold tracking-widest uppercase text-ink-light">
                            Dosha Impact
                          </span>
                        </div>
                        <span className="px-3 py-1.5 bg-turmeric/10 text-turmeric text-sm font-medium rounded-lg">
                          {getDoshaDisplayName(pranayama.impact.ayurveda.dosha_impact)}
                        </span>
                      </div>
                    )}

                    {pranayama.impact.ayurveda.guna && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Droplets size={14} className="text-sage" />
                          <span className="text-[10px] font-bold tracking-widest uppercase text-ink-light">
                            Guna
                          </span>
                        </div>
                        <span className="px-3 py-1.5 bg-sage/10 text-sage text-sm font-medium rounded-lg">
                          {getGunaDisplayName(pranayama.impact.ayurveda.guna)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* BENEFITS */}
        {pranayama.impact && (pranayama.impact.physical?.length > 0 || pranayama.impact.mental?.length > 0) && (
          <section>
            <button
              onClick={() => toggleSection('benefits')}
              className="flex items-center justify-between w-full mb-3 px-4 sm:px-0"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl italic text-ink lg:font-semibold">Benefits</h3>
                <div className="h-px bg-sand flex-1"></div>
              </div>
            </button>

            {expandedSections.has('benefits') && (
              <div className="grid sm:grid-cols-2 gap-0 sm:gap-3">
                {/* Physical */}
                {pranayama.impact.physical && pranayama.impact.physical.length > 0 && (
                  <div className="bg-paper-light p-3 sm:p-4 sm:rounded-xl border-y sm:border border-sand">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      <Activity size={14} />
                      <span className="text-[10px] font-bold tracking-widest uppercase">
                        Physical
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {pranayama.impact.physical.map((benefit, i) => (
                        <li key={i} className="text-sm text-ink leading-relaxed pl-3 border-l-2 border-primary/30">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Mental */}
                {pranayama.impact.mental && pranayama.impact.mental.length > 0 && (
                  <div className="bg-paper-light p-3 sm:p-4 sm:rounded-xl border-y sm:border border-sand">
                    <div className="flex items-center gap-2 mb-2 text-accent">
                      <CircleDot size={14} />
                      <span className="text-[10px] font-bold tracking-widest uppercase">
                        Mental
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {pranayama.impact.mental.map((benefit, i) => (
                        <li key={i} className="text-sm text-ink leading-relaxed pl-3 border-l-2 border-accent/30">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* SAFETY */}
        {pranayama.safety && (pranayama.safety.contraindications?.length > 0 || pranayama.safety.retention_warnings?.length > 0) && (
          <section>
            <button
              onClick={() => toggleSection('safety')}
              className="flex items-center justify-between w-full mb-3 px-4 sm:px-0"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl italic text-ink lg:font-semibold">Safety</h3>
                <div className="h-px bg-sand flex-1"></div>
              </div>
            </button>

            {expandedSections.has('safety') && (
              <div className="bg-clay/5 sm:rounded-xl border-y sm:border border-clay/20 overflow-hidden">
                {/* Contraindications */}
                {pranayama.safety.contraindications && pranayama.safety.contraindications.length > 0 && (
                  <div className="p-4 border-b border-clay/10">
                    <div className="flex items-center gap-2 mb-3 text-clay">
                      <ShieldAlert size={16} />
                      <span className="text-[10px] font-bold tracking-widest uppercase">
                        Contraindications
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {pranayama.safety.contraindications.map((item, i) => (
                        <li key={i} className="text-sm text-ink leading-relaxed pl-3 border-l-2 border-clay/30 capitalize">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Retention Warnings */}
                {pranayama.safety.retention_warnings && pranayama.safety.retention_warnings.length > 0 && (
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3 text-turmeric">
                      <ShieldAlert size={16} />
                      <span className="text-[10px] font-bold tracking-widest uppercase">
                        Breath Retention Warnings
                      </span>
                    </div>
                    <p className="text-xs text-ink-light mb-2 italic">
                      Avoid or modify breath retention (kumbhaka) if you have:
                    </p>
                    <ul className="space-y-2">
                      {pranayama.safety.retention_warnings.map((item, i) => (
                        <li key={i} className="text-sm text-ink leading-relaxed pl-3 border-l-2 border-turmeric/30 capitalize">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* ELEVATED VOCABULARY */}
        {pranayama.cueing?.elevated_vocabulary && pranayama.cueing.elevated_vocabulary.length > 0 && (
          <section>
            <button
              onClick={() => toggleSection('vocabulary')}
              className="flex items-center justify-between w-full mb-3 px-4 sm:px-0"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl italic text-ink lg:font-semibold">Elevated Vocabulary</h3>
                <div className="h-px bg-sand flex-1"></div>
              </div>
            </button>

            {expandedSections.has('vocabulary') && (
              <div className="bg-paper-light sm:rounded-xl border-y sm:border border-sand overflow-hidden shadow-sm p-4">
                <div className="flex items-center gap-2 mb-4 text-turmeric">
                  <BookOpen size={16} />
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    Elevate Your Cueing
                  </span>
                </div>
                <div className="space-y-3">
                  {pranayama.cueing.elevated_vocabulary.map((vocab, i) => (
                    <div key={i} className="p-3 bg-turmeric/5 rounded-lg border border-turmeric/10">
                      <p className="text-sm text-ink-light mb-1">
                        <span className="text-turmeric font-medium">Instead of:</span> &ldquo;{vocab.basic}&rdquo;
                      </p>
                      <p className="text-sm text-ink">
                        <span className="text-sage font-medium">Try:</span> &ldquo;{vocab.elevated}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

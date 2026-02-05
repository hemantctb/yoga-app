"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Mic,
  Wind,
  Footprints,
  AlignLeft,
  Sparkles,
  Eye,
  Target,
  Activity,
  Box,
  CircleDot,
  Dumbbell,
  Minimize2,
  LayoutGrid,
  HandHelping,
  ShieldCheck,
  User,
  Bone,
} from 'lucide-react';
import type { Asana } from '@/types/asana';
import { getMuscleName, getChakraName, getDrishtiName } from '@/lib/constants-utils';
import MobileNav from '@/app/components/MobileNav';

interface AsanaDetailClientProps {
  asana: Asana;
}

interface ImageStatus {
  hasHumanImage: boolean;
  hasAnatomicalImage: boolean;
  humanImagePath: string | null;
  anatomicalImagePath: string | null;
}

const ALL_SECTIONS = ['images', 'script', 'impact', 'anatomy', 'props', 'assists', 'vocabulary'];

export default function AsanaDetailClient({ asana }: AsanaDetailClientProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['images', 'script']));
  const [isDesktop, setIsDesktop] = useState(false);
  const [imageStatus, setImageStatus] = useState<ImageStatus | null>(null);
  const [activeImage, setActiveImage] = useState<'human' | 'anatomical'>('human');

  // Fetch image status
  const fetchImageStatus = useCallback(async () => {
    try {
      const response = await fetch(`/api/generate-images?asanaId=${asana.id}`);
      if (response.ok) {
        const data = await response.json();
        setImageStatus(data);
      }
    } catch (error) {
      console.error('Failed to fetch image status:', error);
    }
  }, [asana.id]);

  useEffect(() => {
    fetchImageStatus();
  }, [fetchImageStatus]);

  useEffect(() => {
    // Check if desktop (lg breakpoint = 1024px)
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
      if (e.matches) {
        // Expand all sections on desktop
        setExpandedSections(new Set(ALL_SECTIONS));
      } else {
        // On mobile, always show images and script by default
        setExpandedSections(new Set(['images', 'script']));
      }
    };

    // Initial check
    handleChange(mediaQuery);

    // Listen for changes
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
    <div className="min-h-screen bg-paper text-ink font-sans pb-32 relative">
      {/* HERO HEADER */}
      <header className="pt-4 pb-4 px-4 bg-paper-light border-b border-sand rounded-b-[1.5rem] shadow-sm">
        {/* Top Nav */}
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <Link
            href="/asanas"
            className="touch-target p-2 text-ink-light hover:text-ink hover:bg-paper rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase rounded-full border border-primary/20">
            {asana.difficulty_level}
          </span>
          <MobileNav currentPath="/asanas" />
        </div>

        {/* Titles */}
        <div className="text-center mb-4 max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-ink mb-1 sm:mb-2">
            {asana.names.english}
          </h1>
          <h2 className="font-serif text-base sm:text-lg lg:text-xl italic text-ink-light mb-1">
            {asana.names.sanskrit}
          </h2>
          <p className="text-xs sm:text-sm text-ink-light">{asana.names.phonetic}</p>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-ink-light leading-relaxed text-center mb-4 px-2 max-w-3xl mx-auto">
          {asana.description}
        </p>

        {/* Energy & Focus Info */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {/* Chakras */}
          {asana.impact?.chakras && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-accent" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-ink-light">
                  Chakras
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {/* Primary Chakra */}
                <div className="flex items-center gap-1">
                  <span className="text-[9px] text-accent font-bold uppercase">Primary:</span>
                  <span className="px-2.5 py-1 bg-accent text-white text-[10px] font-semibold rounded-lg border border-accent/20">
                    {getChakraName(asana.impact.chakras.primary)}
                  </span>
                </div>
                {/* Secondary Chakras */}
                {asana.impact.chakras.secondary &&
                  asana.impact.chakras.secondary.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="text-[9px] text-secondary font-bold uppercase">
                        Secondary:
                      </span>
                      {asana.impact.chakras.secondary.map((chakra, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-secondary-light text-secondary text-[10px] rounded-md border border-secondary/20"
                        >
                          {getChakraName(chakra)}
                        </span>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Drishti */}
          {asana.drishti && (
            <div>
              <div className="flex items-center gap-2">
                <Eye size={14} className="text-accent" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-ink-light mr-2">
                  Drishti / Gaze:
                </span>
                <span className="px-3 py-1.5 bg-accent-light text-accent text-xs font-medium rounded-lg border border-accent/20">
                  {getDrishtiName(asana.drishti)}
                </span>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="px-0 py-4 sm:p-4 space-y-4 max-w-5xl mx-auto">
        {/* POSE IMAGES */}
        {imageStatus && (imageStatus.hasHumanImage || imageStatus.hasAnatomicalImage) && (
          <section>
            <button
              onClick={() => toggleSection('images')}
              className="flex items-center justify-between w-full mb-3 px-4 sm:px-0"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl italic text-ink lg:font-semibold">Visual Guide</h3>
                <div className="h-px bg-sand flex-1"></div>
              </div>
            </button>

            {expandedSections.has('images') && (
              <div className="bg-paper-light sm:rounded-xl border-y sm:border border-sand overflow-hidden shadow-sm">
                {/* Image Toggle */}
                {imageStatus.hasHumanImage && imageStatus.hasAnatomicalImage && (
                  <div className="flex border-b border-sand">
                    <button
                      onClick={() => setActiveImage('human')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                        activeImage === 'human'
                          ? 'bg-primary/10 text-primary border-b-2 border-primary'
                          : 'text-ink-light hover:text-ink hover:bg-paper'
                      }`}
                    >
                      <User size={16} />
                      <span>Pose</span>
                    </button>
                    <button
                      onClick={() => setActiveImage('anatomical')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                        activeImage === 'anatomical'
                          ? 'bg-accent/10 text-accent border-b-2 border-accent'
                          : 'text-ink-light hover:text-ink hover:bg-paper'
                      }`}
                    >
                      <Bone size={16} />
                      <span>Anatomy</span>
                    </button>
                  </div>
                )}

                {/* Image Display */}
                <div className="relative aspect-square w-full max-w-md mx-auto p-4">
                  {activeImage === 'human' && imageStatus.hasHumanImage && imageStatus.humanImagePath && (
                    <Image
                      src={`/asanas/${asana.id}-human.jpeg`}
                      alt={`${asana.names.english} pose demonstration`}
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  )}
                  {activeImage === 'anatomical' && imageStatus.hasAnatomicalImage && imageStatus.anatomicalImagePath && (
                    <Image
                      src={`/asanas/${asana.id}-anatomical.jpeg`}
                      alt={`${asana.names.english} anatomical illustration`}
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  )}
                  {/* Fallback if only one image exists */}
                  {!imageStatus.hasHumanImage && imageStatus.hasAnatomicalImage && imageStatus.anatomicalImagePath && activeImage === 'human' && (
                    <Image
                      src={`/asanas/${asana.id}-anatomical.jpeg`}
                      alt={`${asana.names.english} anatomical illustration`}
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  )}
                  {imageStatus.hasHumanImage && !imageStatus.hasAnatomicalImage && imageStatus.humanImagePath && activeImage === 'anatomical' && (
                    <Image
                      src={`/asanas/${asana.id}-human.jpeg`}
                      alt={`${asana.names.english} pose demonstration`}
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  )}
                </div>

                {/* Image Caption */}
                <div className="px-4 pb-4 text-center">
                  <p className="text-xs text-ink-light">
                    {activeImage === 'human' ? 'Pose demonstration' : 'Muscle engagement visualization'}
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* THE SCRIPT (Cueing Blueprint) */}
        <section>
          <button
            onClick={() => toggleSection('script')}
            className="flex items-center justify-between w-full mb-3 px-4 sm:px-0"
          >
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg sm:text-xl lg:text-2xl italic text-ink lg:font-semibold">The Script</h3>
              <div className="h-px bg-sand flex-1"></div>
            </div>
          </button>

          {expandedSections.has('script') && (
            <div className="bg-paper-light sm:rounded-xl border-y sm:border border-sand overflow-hidden shadow-sm">
              {/* Summary */}
              {asana.cueing?.summary && asana.cueing.summary.length > 0 && (
                <div className="p-4 border-b border-paper">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Target size={16} />
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                      Quick Summary
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {asana.cueing.summary.map((cue, i) => (
                      <li
                        key={i}
                        className="text-sm sm:text-base text-ink leading-relaxed pl-3 border-l-2 border-sand"
                      >
                        {cue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Foundation */}
              {asana.cueing?.foundation && asana.cueing.foundation.length > 0 && (
                <div className="p-4 border-b border-paper">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Footprints size={16} />
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                      Foundation
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {asana.cueing.foundation.map((cue, i) => (
                      <li
                        key={i}
                        className="text-sm sm:text-base text-ink leading-relaxed pl-3 border-l-2 border-sand"
                      >
                        {cue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Alignment */}
              {asana.cueing?.alignment && asana.cueing.alignment.length > 0 && (
                <div className="p-4 border-b border-paper">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <AlignLeft size={16} />
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                      Alignment
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {asana.cueing.alignment.map((cue, i) => (
                      <li
                        key={i}
                        className="text-sm sm:text-base text-ink leading-relaxed pl-3 border-l-2 border-sand"
                      >
                        {cue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Breath Banner */}
              {asana.cueing?.breath_instruction && (
                <div className="bg-accent-light p-2.5 flex items-center justify-center gap-2 text-accent">
                  <Wind size={18} />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide">
                    {asana.cueing.breath_instruction.split(';').map((part, i, arr) => (
                      <span key={i}>
                        {part.trim()}
                        {i < arr.length - 1 && <><br /></>}
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
          )}
        </section>

        {/* IMPACT */}
        <section>
          <button
            onClick={() => toggleSection('impact')}
            className="flex items-center justify-between w-full mb-3 px-4 sm:px-0"
          >
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg sm:text-xl lg:text-2xl italic text-ink lg:font-semibold">Impact</h3>
              <div className="h-px bg-sand flex-1"></div>
            </div>
          </button>

          {expandedSections.has('impact') && (
            <div className="grid sm:grid-cols-2 gap-0 sm:gap-3">
              {/* Physical Benefits */}
              {asana.impact?.physical && asana.impact.physical.length > 0 && (
                <div className="bg-paper-light p-3 sm:p-4 sm:rounded-xl border-y sm:border border-sand shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Activity size={14} />
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                      Physical
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {asana.impact.physical.map((benefit, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-sm text-ink leading-relaxed pl-2 border-l-2 border-sand"
                      >
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mental Benefits */}
              {asana.impact?.mental && asana.impact.mental.length > 0 && (
                <div className="bg-paper-light p-3 sm:p-4 sm:rounded-xl border-b sm:border border-sand shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-accent">
                    <CircleDot size={14} />
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                      Mental
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {asana.impact.mental.map((benefit, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-sm text-ink leading-relaxed pl-2 border-l-2 border-sand"
                      >
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ANATOMY */}
        <section>
          <button
            onClick={() => toggleSection('anatomy')}
            className="flex items-center justify-between w-full mb-3 px-4 sm:px-0"
          >
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg sm:text-xl lg:text-2xl italic text-ink lg:font-semibold">Anatomy</h3>
              <div className="h-px bg-sand flex-1"></div>
            </div>
          </button>

          {expandedSections.has('anatomy') && (
            <div className="space-y-0 sm:space-y-3">
              {/* Strengthen */}
              {asana.anatomy?.strengthen &&
                (asana.anatomy.strengthen.primary || asana.anatomy.strengthen.secondary) && (
                  <div className="bg-primary/10 p-3 sm:p-4 sm:rounded-xl border-y sm:border border-primary/20 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      <Dumbbell size={14} />
                      <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                        Strengthen
                      </span>
                    </div>
                    <div className="space-y-2">
                      {asana.anatomy.strengthen.primary &&
                        asana.anatomy.strengthen.primary.length > 0 && (
                          <div>
                            <span className="text-[9px] text-primary font-bold uppercase mb-1 block">
                              Primary
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {asana.anatomy.strengthen.primary.map((muscle, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-primary text-white text-[10px] sm:text-xs rounded-md"
                                >
                                  {getMuscleName(muscle)}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      {asana.anatomy.strengthen.secondary &&
                        asana.anatomy.strengthen.secondary.length > 0 && (
                          <div>
                            <span className="text-[9px] text-ink-light font-bold uppercase mb-1 block">
                              Secondary
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {asana.anatomy.strengthen.secondary.map((muscle, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-paper text-ink-light text-[10px] sm:text-xs rounded-md border border-primary/20"
                                >
                                  {getMuscleName(muscle)}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                )}

              {/* Stretch */}
              {asana.anatomy?.stretch &&
                (asana.anatomy.stretch.primary || asana.anatomy.stretch.secondary) && (
                  <div className="bg-accent-light/50 p-3 sm:p-4 sm:rounded-xl border-b sm:border border-accent/20 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-accent">
                      <Minimize2 size={14} />
                      <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                        Stretch
                      </span>
                    </div>
                    <div className="space-y-2">
                      {asana.anatomy.stretch.primary &&
                        asana.anatomy.stretch.primary.length > 0 && (
                          <div>
                            <span className="text-[9px] text-accent font-bold uppercase mb-1 block">
                              Primary
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {asana.anatomy.stretch.primary.map((muscle, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-accent text-white text-[10px] sm:text-xs rounded-md"
                                >
                                  {getMuscleName(muscle)}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      {asana.anatomy.stretch.secondary &&
                        asana.anatomy.stretch.secondary.length > 0 && (
                          <div>
                            <span className="text-[9px] text-ink-light font-bold uppercase mb-1 block">
                              Secondary
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {asana.anatomy.stretch.secondary.map((muscle, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-paper text-ink-light text-[10px] sm:text-xs rounded-md border border-accent/20"
                                >
                                  {getMuscleName(muscle)}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                )}

              {/* Stabilize */}
              {asana.anatomy?.stabilize &&
                (asana.anatomy.stabilize.primary || asana.anatomy.stabilize.secondary) && (
                  <div className="bg-secondary-light/50 p-3 sm:p-4 sm:rounded-xl border-b sm:border border-secondary/20 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-secondary">
                      <LayoutGrid size={14} />
                      <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                        Stabilize
                      </span>
                    </div>
                    <div className="space-y-2">
                      {asana.anatomy.stabilize.primary &&
                        asana.anatomy.stabilize.primary.length > 0 && (
                          <div>
                            <span className="text-[9px] text-secondary font-bold uppercase mb-1 block">
                              Primary
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {asana.anatomy.stabilize.primary.map((muscle, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-secondary text-white text-[10px] sm:text-xs rounded-md"
                                >
                                  {getMuscleName(muscle)}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      {asana.anatomy.stabilize.secondary &&
                        asana.anatomy.stabilize.secondary.length > 0 && (
                          <div>
                            <span className="text-[9px] text-ink-light font-bold uppercase mb-1 block">
                              Secondary
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {asana.anatomy.stabilize.secondary.map((muscle, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-paper text-ink-light text-[10px] sm:text-xs rounded-md border border-secondary/20"
                                >
                                  {getMuscleName(muscle)}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                )}
            </div>
          )}
        </section>

        {/* PROPS & GUIDANCE */}
        {asana.props && asana.props.length > 0 && (
          <section>
            <button
              onClick={() => toggleSection('props')}
              className="flex items-center justify-between w-full mb-3 px-4 sm:px-0"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl italic text-ink lg:font-semibold">
                  Props & Guidance
                </h3>
                <div className="h-px bg-sand flex-1"></div>
              </div>
            </button>

            {expandedSections.has('props') && (
              <div className="space-y-0 sm:space-y-2">
                {/* List props */}
                <div className="flex flex-wrap gap-2 mb-3 px-4 sm:px-0">
                  {asana.props.map((prop, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-paper-light text-ink text-[11px] sm:text-xs font-medium rounded-lg border border-sand"
                    >
                      <Box size={10} /> {prop}
                    </span>
                  ))}
                </div>

                {/* Prop guidance */}
                {asana.prop_guidance && asana.prop_guidance.length > 0 && (
                  <div className="space-y-0 sm:space-y-2">
                    {asana.prop_guidance.map((guidance, i) => (
                      <div
                        key={i}
                        className="bg-paper-light p-3 sm:p-4 sm:rounded-xl border-b sm:border border-sand shadow-sm"
                      >
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <Box size={12} className="text-primary" />
                          <span className="text-[10px] sm:text-xs font-bold uppercase text-primary">
                            {guidance.prop}
                          </span>
                          <span className="text-[10px] sm:text-xs text-ink-light">
                            → {guidance.purpose}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-ink leading-relaxed pl-5">
                          {guidance.instruction}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* ASSISTS */}
        {asana.assists && asana.assists.length > 0 && (
          <section>
            <button
              onClick={() => toggleSection('assists')}
              className="flex items-center justify-between w-full mb-3 px-4 sm:px-0"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl italic text-ink lg:font-semibold">Assists</h3>
                <div className="h-px bg-sand flex-1"></div>
              </div>
            </button>

            {expandedSections.has('assists') && (
              <div className="space-y-0 sm:space-y-3">
                {asana.assists.map((assist, i) => (
                  <div
                    key={assist.id || i}
                    className="bg-paper-light sm:rounded-xl p-3 sm:p-4 border-b sm:border border-sand shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <HandHelping size={14} className="text-primary shrink-0" />
                      <span className="text-xs sm:text-sm font-bold uppercase text-primary tracking-wide">
                        {assist.title}
                      </span>
                      {assist.type && (
                        <span className="px-2 py-0.5 bg-accent-light text-accent text-[10px] font-semibold rounded-full">
                          {assist.type}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-ink leading-relaxed pl-5 mb-2">
                      {assist.instruction}
                    </p>
                    {assist.safety_check && (
                      <div className="flex items-start gap-2 pl-5 pt-2 border-t border-sand mt-2">
                        <ShieldCheck size={12} className="text-secondary shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-ink-light leading-relaxed italic">
                          {assist.safety_check}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Elevated Vocabulary */}
        {asana.cueing?.elevated_vocabulary && asana.cueing.elevated_vocabulary.length > 0 && (
          <section>
            <button
              onClick={() => toggleSection('vocabulary')}
              className="flex items-center justify-between w-full mb-3 px-4 sm:px-0"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl italic text-ink lg:font-semibold">
                  Elevated Vocabulary
                </h3>
                <div className="h-px bg-sand flex-1"></div>
              </div>
            </button>

            {expandedSections.has('vocabulary') && (
              <div className="space-y-0 sm:space-y-2">
                {asana.cueing.elevated_vocabulary.map((vocab, i) => (
                  <div key={i} className="bg-paper-light p-3 sm:p-4 sm:rounded-xl border-b sm:border border-sand">
                    <p className="text-xs sm:text-sm text-ink-light mb-1">
                      Instead of: <span className="italic">"{vocab.basic}"</span>
                    </p>
                    <p className="text-sm sm:text-base text-ink font-medium">
                      Try: <span className="text-primary">"{vocab.elevated}"</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
        {/* Category Badges */}
        <div className="flex flex-wrap gap-2 justify-center pt-4">
          {asana.category.map((cat) => (
            <span
              key={cat}
              className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase rounded-full border border-primary/20"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* FLOATING ACTION BUTTON */}
      <div className="fixed bottom-0 left-0 w-full bg-paper-light/90 backdrop-blur-xl border-t border-sand p-3 pb-safe z-30 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <div className="flex-1 pl-1">
          <p className="text-[9px] text-ink-light uppercase tracking-widest font-bold">Ready?</p>
          <p className="text-sm sm:text-base text-ink font-serif italic truncate">
            {asana.names.english}
          </p>
        </div>
        <Link
          href={`/asanas/${asana.id}/practice`}
          className="bg-primary hover:bg-primary-dark text-white rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center gap-2 font-bold text-xs sm:text-sm shadow-lg shadow-primary/30 transition-all active:scale-95 touch-target"
        >
          <Mic size={16} />
          <span className="hidden sm:inline">Practice Cueing</span>
          <span className="sm:hidden">Practice</span>
        </Link>
      </div>
    </div>
  );
}

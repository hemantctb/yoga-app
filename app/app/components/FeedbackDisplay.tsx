"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, TrendingUp, Wind, Info, ChevronDown, ChevronUp } from "lucide-react";
import type { EvaluationFeedback } from "@/types/asana";

interface FeedbackDisplayProps {
  feedback: EvaluationFeedback;
}

export default function FeedbackDisplay({ feedback }: FeedbackDisplayProps) {
  const [isScoreBreakdownOpen, setIsScoreBreakdownOpen] = useState(false);
  const getScoreColor = (score: number) => {
    if (score >= 7) return "text-sage";
    if (score >= 5) return "text-turmeric";
    return "text-clay";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 7) return "bg-sage-light";
    if (score >= 5) return "bg-turmeric-light";
    return "bg-turmeric-light";
  };

  // Remove redundant prefixes from feedback items
  const cleanFeedbackText = (text: string) => {
    return text
      .replace(/^Keep [Dd]oing [Tt]his:\s*/i, "")
      .replace(/^Try [Tt]his [Nn]ext [Tt]ime:\s*/i, "")
      .trim();
  };

  return (
    <div className="space-y-6">
      {/* Score and Transcript - Two column on desktop */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Overall Score */}
        <div className="text-center py-8 bg-paper-light rounded-xl border border-sand shadow-sm">
          <div className={`text-6xl font-bold ${getScoreColor(feedback.score)} mb-2`}>
            {feedback.score}/10
          </div>
          <p className="text-ink-light text-sm">Overall Score</p>
        </div>

        {/* Transcript */}
        {feedback.transcript && (
          <div className="bg-paper-light rounded-xl p-4 border border-sand shadow-sm flex flex-col justify-center">
            <h3 className="text-xs uppercase tracking-wide text-ink-light font-bold mb-2">
              Your Cueing
            </h3>
            <p className="text-sm text-ink leading-relaxed italic">
              "{feedback.transcript}"
            </p>
          </div>
        )}
      </div>

      {/* Breath Cue Check */}
      <div className={`rounded-xl p-4 border ${
        feedback.breathCue.correct
          ? "bg-sage-light border-sage/20"
          : "bg-turmeric-light border-turmeric/20"
      }`}>
        <div className="flex items-start gap-3">
          {feedback.breathCue.correct ? (
            <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" />
          ) : (
            <Wind className="w-5 h-5 text-turmeric shrink-0 mt-0.5" />
          )}
          <div>
            <h4 className={`text-sm font-bold uppercase tracking-wide mb-1 ${
              feedback.breathCue.correct ? "text-sage" : "text-turmeric"
            }`}>
              Breath Instruction
            </h4>
            <p className="text-xs text-ink">
              {feedback.breathCue.correct
                ? `Perfect! You mentioned the correct breath cue: ${feedback.breathCue.expected}`
                : `Expected: ${feedback.breathCue.expected}${
                    feedback.breathCue.found
                      ? ` (You mentioned: ${feedback.breathCue.found})`
                      : " (Not mentioned)"
                  }`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Forbidden Words Alert */}
      {feedback.forbiddenWordsUsed.length > 0 && (
        <div className="bg-turmeric-light border border-turmeric/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-turmeric shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-turmeric uppercase tracking-wide mb-1">
                Avoid These Words
              </h4>
              <p className="text-xs text-ink mb-2">
                You used some words to avoid in yoga cueing:
              </p>
              <div className="flex flex-wrap gap-2">
                {feedback.forbiddenWordsUsed.map((word, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-paper text-ink-light text-xs rounded-lg"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Strengths and Improvements - Two column on desktop */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths */}
        {feedback.strengths.length > 0 && (
          <div className="bg-sage-light rounded-xl p-4 border border-sage/20 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-sage" />
              <h3 className="text-sm font-bold text-sage uppercase tracking-wide">
                Keep Doing This
              </h3>
            </div>
            <ul className="space-y-2">
              {feedback.strengths.map((strength, i) => (
                <li key={i} className="text-sm text-ink leading-relaxed pl-4 border-l-2 border-sage">
                  {cleanFeedbackText(strength)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Improvements */}
        {feedback.improvements.length > 0 && (
          <div className="bg-turmeric-light rounded-xl p-4 border border-turmeric/20 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-turmeric" />
              <h3 className="text-sm font-bold text-turmeric uppercase tracking-wide">
                Try This Next Time
              </h3>
            </div>
            <ul className="space-y-2">
              {feedback.improvements.map((improvement, i) => (
                <li key={i} className="text-sm text-ink leading-relaxed pl-4 border-l-2 border-turmeric">
                  {cleanFeedbackText(improvement)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Score Breakdown Explanation (Collapsible) */}
      <div className="bg-sand/30 rounded-xl border border-sand shadow-sm overflow-hidden">
        <button
          onClick={() => setIsScoreBreakdownOpen(!isScoreBreakdownOpen)}
          className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-sand/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-ink-light shrink-0" />
            <h3 className="text-xs uppercase tracking-wide text-ink-light font-bold">
              How Your Score is Calculated
            </h3>
          </div>
          {isScoreBreakdownOpen ? (
            <ChevronUp className="w-4 h-4 text-ink-light shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-ink-light shrink-0" />
          )}
        </button>

        {isScoreBreakdownOpen && (
          <div className="px-4 pb-4 pt-2">
            <div className="text-xs text-ink space-y-1">
              <p className="font-semibold mb-2">Your score reflects your progress and effort:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>9-10:</strong> Excellent! Comprehensive and inspiring cueing</li>
                <li><strong>7-8:</strong> Great job! You're hitting key teaching points</li>
                <li><strong>5-6:</strong> Good start! You're building solid foundations</li>
                <li><strong>Below 5:</strong> Keep practicing - every attempt helps you grow!</li>
              </ul>
              <p className="mt-3 text-ink-light bg-sand/50 p-2 rounded">
                <strong>What we evaluate:</strong> Foundation cues, alignment points, breath instruction, safety awareness, and anatomical precision.
              </p>
              <p className="mt-2 text-ink-light italic">
                {feedback.score >= 8 && "🌟 Outstanding! You're teaching with confidence and clarity."}
                {feedback.score >= 6 && feedback.score < 8 && "💪 You're doing great! Each practice session makes you stronger."}
                {feedback.score < 6 && "🌱 You've taken the first step! Keep going - growth happens with practice."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

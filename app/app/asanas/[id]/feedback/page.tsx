"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import FeedbackDisplay from "@/app/components/FeedbackDisplay";
import type { EvaluationFeedback } from "@/types/asana";

export default function FeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [feedback, setFeedback] = useState<EvaluationFeedback | null>(null);
  const [asanaTitle, setAsanaTitle] = useState<string>("");

  useEffect(() => {
    // Get feedback from sessionStorage
    const storedFeedback = sessionStorage.getItem("feedback");
    const storedAsanaId = sessionStorage.getItem("asanaId");

    if (!storedFeedback || storedAsanaId !== id) {
      // No feedback found or mismatched asana, redirect to practice page
      router.push(`/asanas/${id}/practice`);
      return;
    }

    try {
      const parsedFeedback = JSON.parse(storedFeedback) as EvaluationFeedback;
      setFeedback(parsedFeedback);
    } catch {
      router.push(`/asanas/${id}/practice`);
    }

    // Fetch asana title for display
    async function fetchAsanaTitle() {
      try {
        const response = await fetch(`/api/asanas/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAsanaTitle(data.names?.english || "");
        }
      } catch {
        // Ignore errors, title is optional
      }
    }

    fetchAsanaTitle();
  }, [id, router]);

  const handlePracticeAgain = () => {
    // Clear previous feedback
    sessionStorage.removeItem("feedback");
    sessionStorage.removeItem("asanaId");
    router.push(`/asanas/${id}/practice`);
  };

  if (!feedback) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="animate-pulse text-ink-light">Loading feedback...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="sticky top-0 bg-paper-light border-b border-sand backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={`/asanas/${id}`}
            className="inline-flex items-center gap-2 text-ink-light hover:text-ink transition touch-target"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Asana</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Title Section */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-ink mb-2">
            Your Feedback
          </h1>
          {asanaTitle && (
            <p className="text-ink-light text-sm">
              Cueing practice for <span className="font-medium">{asanaTitle}</span>
            </p>
          )}
        </div>

        {/* Feedback Display */}
        <FeedbackDisplay feedback={feedback} />

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handlePracticeAgain}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-clay text-white rounded-lg font-semibold hover:bg-clay/90 transition touch-target"
          >
            <RotateCcw className="w-4 h-4" />
            Practice Again
          </button>
          <Link
            href={`/asanas/${id}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-paper-light border border-sand text-ink rounded-lg font-semibold hover:bg-sand/30 transition touch-target"
          >
            Back to Asana Details
          </Link>
        </div>
      </main>
    </div>
  );
}

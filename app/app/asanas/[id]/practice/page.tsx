"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import VoiceRecorder from "@/app/components/VoiceRecorder";
import type { Asana, EvaluationFeedback } from "@/types/asana";

type PracticeState = "loading" | "instructions" | "recording" | "processing";

export default function PracticePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [state, setState] = useState<PracticeState>("loading");
  const [asana, setAsana] = useState<Asana | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAsana() {
      try {
        const response = await fetch(`/api/asanas/${id}`);
        if (!response.ok) throw new Error("Failed to load asana");
        const data = await response.json();
        setAsana(data);
        setState("recording");
      } catch (err) {
        setError("Failed to load asana. Please try again.");
        console.error(err);
      }
    }

    loadAsana();
  }, [id]);

  const handleRecordingComplete = async (audioBlob: Blob) => {
    setState("processing");

    try {
      // Step 1: Transcribe the audio
      const formData = new FormData();
      // OpenAI Whisper API requires a filename with extension to determine format
      const extension = audioBlob.type.includes('mp4') ? 'm4a'
        : audioBlob.type.includes('ogg') ? 'ogg'
        : 'webm';
      formData.append("audio", audioBlob, `recording.${extension}`);

      const transcribeResponse = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!transcribeResponse.ok) {
        throw new Error("Failed to transcribe audio");
      }

      const { transcript } = await transcribeResponse.json();

      // Step 2: Evaluate the transcript
      const evaluateResponse = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript,
          asana,
        }),
      });

      if (!evaluateResponse.ok) {
        throw new Error("Failed to evaluate cueing");
      }

      const feedback: EvaluationFeedback = await evaluateResponse.json();

      // Store feedback in sessionStorage
      sessionStorage.setItem("feedback", JSON.stringify(feedback));
      sessionStorage.setItem("asanaId", id);

      // Navigate to feedback page
      router.push(`/asanas/${id}/feedback`);
    } catch (err) {
      setError("Failed to process recording. Please try again.");
      setState("recording");
      console.error(err);
    }
  };

  const handleCancel = () => {
    router.push(`/asanas/${id}`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-clay font-semibold">{error}</p>
          <Link
            href={`/asanas/${id}`}
            className="inline-flex items-center gap-2 text-ink hover:text-clay transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Asana
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="sticky top-0 bg-paper-light border-b border-sand backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-4">
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
        {state === "loading" ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-clay" />
            <p className="text-ink-light">Loading asana...</p>
          </div>
        ) : state === "processing" ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-clay" />
            <p className="text-ink font-semibold">Analyzing your cues...</p>
            <p className="text-ink-light text-sm">This may take a moment</p>
          </div>
        ) : asana ? (
          <VoiceRecorder
            asana={asana}
            onComplete={handleRecordingComplete}
            onCancel={handleCancel}
          />
        ) : null}
      </main>
    </div>
  );
}

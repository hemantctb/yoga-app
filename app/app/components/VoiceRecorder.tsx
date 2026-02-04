"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Square, X, AlertCircle, Sparkles, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import type { Asana } from "@/types/asana";

interface VoiceRecorderProps {
  asana: Asana;
  onComplete: (audioBlob: Blob) => void;
  onCancel: () => void;
}

export default function VoiceRecorder({
  asana,
  onComplete,
  onCancel,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [showCueTips, setShowCueTips] = useState(false);
  const [showGeneralTips, setShowGeneralTips] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  // Request wake lock to prevent screen from locking
  const requestWakeLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
        console.log('✅ Wake Lock active - screen will stay on');

        // Re-request wake lock if it's released (e.g., user switches tabs)
        wakeLockRef.current.addEventListener('release', () => {
          console.log('⚠️ Wake Lock released');
        });
      } else {
        console.log('⚠️ Wake Lock API not supported');
      }
    } catch (err) {
      console.error('❌ Wake Lock error:', err);
    }
  };

  // Release wake lock
  const releaseWakeLock = async () => {
    try {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        console.log('✅ Wake Lock released');
      }
    } catch (err) {
      console.error('❌ Wake Lock release error:', err);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          // Auto-stop at 30 seconds
          if (newTime >= 30) {
            handleStopRecording();
            return 30;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  // Cleanup wake lock on unmount
  useEffect(() => {
    return () => {
      releaseWakeLock();
    };
  }, []);

  const handleStartRecording = async () => {
    try {
      console.log("🎤 Start Recording clicked");
      setPermissionError(null);
      setIsRequesting(true);

      // Check if getUserMedia is available
      console.log("🔍 Checking navigator.mediaDevices:", !!navigator.mediaDevices);
      console.log("🔍 Checking getUserMedia:", !!(navigator.mediaDevices?.getUserMedia));

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("❌ getUserMedia not available");
        setPermissionError(
          "Microphone access is not available. On mobile devices, you must access this app via HTTPS. Current URL: " + window.location.href
        );
        setIsRequesting(false);
        return;
      }

      console.log("🎤 Requesting microphone permission...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("✅ Microphone permission granted");

      // Check which mime types are supported
      let mimeType = 'audio/webm';
      if (!MediaRecorder.isTypeSupported('audio/webm')) {
        if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
          mimeType = 'audio/ogg';
        } else {
          mimeType = ''; // Let browser choose
        }
      }

      const mediaRecorder = new MediaRecorder(stream, mimeType ? {
        mimeType: mimeType,
      } : undefined);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType || 'audio/webm' });
        stream.getTracks().forEach(track => track.stop());
        onComplete(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setHasStarted(true);
      setRecordingTime(0);
      setIsRequesting(false);

      // Request wake lock to keep screen on
      await requestWakeLock();

      console.log("✅ Recording started successfully");
    } catch (error) {
      console.error("❌ Error starting recording:", error);
      setIsRequesting(false);
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          setPermissionError("Microphone access denied. Please allow microphone access in your browser settings.");
        } else if (error.name === 'NotFoundError') {
          setPermissionError("No microphone found. Please connect a microphone and try again.");
        } else if (error.name === 'NotSupportedError') {
          setPermissionError("Recording is not supported on this device/browser. Try using Chrome or Safari on iOS 14.3+.");
        } else {
          setPermissionError(`Error accessing microphone: ${error.message}`);
        }
      } else {
        setPermissionError("Microphone access denied. Please allow microphone access to record.");
      }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Release wake lock when recording stops
      releaseWakeLock();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isInTargetRange = recordingTime >= 15 && recordingTime <= 30;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Pose Info */}
      <div className="text-center space-y-1">
        <button
          onClick={onCancel}
          className="absolute top-4 left-4 p-2 text-ink-light hover:text-ink touch-target"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-sans font-semibold text-ink leading-tight">{asana.names.english}</h2>
        <p className="text-base font-serif italic text-ink-light mt-1">{asana.names.sanskrit}</p>
      </div>

      {/* Recording Interface */}
      <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-8">
        {permissionError ? (
          <>
            <div className="w-32 h-32 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <AlertCircle className="w-16 h-16 md:w-12 md:h-12 text-primary" />
            </div>
            <div className="text-center space-y-3 max-w-sm px-4">
              <p className="text-xl text-ink font-semibold">
                Microphone Access Issue
              </p>
              <p className="text-base text-ink leading-relaxed bg-secondary-light p-4 rounded-lg border border-secondary">
                {permissionError}
              </p>
            </div>
            <button
              onClick={handleStartRecording}
              className="px-6 py-3 bg-primary text-white rounded-full font-medium text-base touch-target hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          </>
        ) : !hasStarted ? (
          <>
            <div className="w-32 h-32 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Mic className="w-16 h-16 md:w-12 md:h-12 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg text-ink">
                Ready to record your cues?
              </p>
              <p className="text-sm text-ink-light">
                Aim for 15-30 seconds of clear, structured cueing
              </p>
            </div>
            <button
              onClick={handleStartRecording}
              disabled={isRequesting}
              className="px-6 py-3 bg-primary text-white rounded-full font-medium text-base touch-target hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRequesting ? "Requesting Permission..." : "Start Recording"}
            </button>
          </>
        ) : (
          <>
            {/* Timer Display */}
            <div className="text-center">
              <div
                className={`text-6xl font-bold mb-2 ${
                  isInTargetRange ? "text-accent" : "text-ink"
                }`}
              >
                {formatTime(recordingTime)}
              </div>
              <p className="text-sm text-ink-light">
                {recordingTime < 15
                  ? "Keep going..."
                  : recordingTime <= 30
                  ? "Perfect range!"
                  : "Recording stopped"}
              </p>
            </div>

            {/* Record Button */}
            {isRecording ? (
              <button
                onClick={handleStopRecording}
                className="w-32 h-32 md:w-24 md:h-24 rounded-full bg-primary text-white flex items-center justify-center touch-target animate-pulse"
              >
                <Square className="w-12 h-12 md:w-8 md:h-8" />
              </button>
            ) : (
              <div className="space-y-4 text-center">
                <div className="w-24 h-24 md:w-20 md:h-20 rounded-full bg-paper-light flex items-center justify-center mx-auto">
                  <Mic className="w-12 h-12 md:w-10 md:h-10 text-ink-light" />
                </div>
                <p className="text-ink-light">
                  Recording stopped. Processing...
                </p>
              </div>
            )}

            {/* Instructions */}
            {isRecording && (
              <div className="text-center space-y-1">
                <p className="text-sm text-ink-light">
                  Tap the button to stop recording
                </p>
                <p className="text-xs text-ink-light">
                  Remember: Foundation → Alignment → Breath
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Tips */}
      {!hasStarted && (
        <div className="grid md:grid-cols-2 gap-4">
          {/* General Tips - Collapsible */}
          <div className="bg-paper-light rounded-xl border border-sand shadow-sm overflow-hidden">
            <button
              onClick={() => setShowGeneralTips(!showGeneralTips)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-paper/50 transition-colors"
            >
              <h3 className="text-xs uppercase tracking-[1.5px] text-ink font-semibold">
                Tips for Great Cueing
              </h3>
              {showGeneralTips ? (
                <ChevronUp className="w-5 h-5 text-ink-light" />
              ) : (
                <ChevronDown className="w-5 h-5 text-ink-light" />
              )}
            </button>

            {showGeneralTips && (
              <div className="px-4 pb-4">
                <ul className="text-sm text-ink-light space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Start with foundation (feet, ground connection)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Use active verbs ("press", "lift", "engage")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Include breath instructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Mention modifications when helpful</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Elevate Your Cue - Collapsible */}
          {(asana.cueing.elevated_vocabulary?.length > 0 || asana.cueing.forbidden_words?.length > 0) && (
            <div className="bg-paper-light rounded-xl border border-sand shadow-sm overflow-hidden">
              <button
                onClick={() => setShowCueTips(!showCueTips)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-paper/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h3 className="text-xs uppercase tracking-[1.5px] text-ink font-semibold">
                    Elevate Your Language
                  </h3>
                </div>
                {showCueTips ? (
                  <ChevronUp className="w-5 h-5 text-ink-light" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-ink-light" />
                )}
              </button>

              {showCueTips && (
                <div className="px-4 pb-4 space-y-4">
                  {/* Forbidden Words Warning */}
                  {asana.cueing.forbidden_words && asana.cueing.forbidden_words.length > 0 && (
                    <div className="bg-secondary-light border border-secondary rounded-lg p-3 flex items-start gap-2">
                      <AlertCircle className="text-secondary shrink-0 mt-0.5" size={14} />
                      <div>
                        <h4 className="text-[10px] font-bold text-secondary uppercase tracking-wide mb-1">
                          Avoid These Words
                        </h4>
                        <p className="text-xs text-ink leading-relaxed opacity-80">
                          {asana.cueing.forbidden_words.join(", ")}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Elevated Vocabulary */}
                  {asana.cueing.elevated_vocabulary && asana.cueing.elevated_vocabulary.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-primary uppercase tracking-wide">
                        Better Alternatives:
                      </h4>
                      {asana.cueing.elevated_vocabulary.slice(0, 3).map((vocab, i) => (
                        <div
                          key={i}
                          className="bg-paper rounded-lg p-3 border border-sand"
                        >
                          <div className="flex items-start gap-2 mb-1.5">
                            <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <div className="flex-1 space-y-1.5">
                              <div>
                                <span className="text-[9px] text-ink-light uppercase block mb-0.5">Instead of</span>
                                <p className="text-xs text-ink-light">"{vocab.basic}"</p>
                              </div>
                              <div>
                                <span className="text-[9px] text-primary font-bold uppercase block mb-0.5">Try This</span>
                                <p className="text-xs font-medium text-ink">"{vocab.elevated}"</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import BookingModal from "./BookingModal";
import {
  Play,
  Pause,
  CheckCircle,
  Mail,
  Calendar,
  Phone,
  PhoneCall,
  MessageSquare,
  ArrowRight,
  Clock,
  Zap,
  RotateCcw,
  User,
  Mic,
  MicOff,
  Database,
  Bell,
  Smartphone,
  Volume2,
  VolumeX,
} from "lucide-react";

/* ───────────────── types ───────────────── */
type VoiceStep =
  | "idle"
  | "ringing"
  | "greeting"
  | "collecting"
  | "confirming"
  | "crm"
  | "calendar"
  | "notifications"
  | "done";

interface ConversationLine {
  speaker: "ai" | "caller";
  text: string;
  audio: string; // filename in /audio/voice-demo/
  delay: number; // ms from step start (fallback only)
}

interface CRMEntry {
  field: string;
  value: string;
  icon: React.ReactNode;
}

/* ───────────────── conversation script ───────────────── */
const AUDIO_BASE = "/audio/voice-demo";

const CONVERSATION: { step: VoiceStep; lines: ConversationLine[] }[] = [
  {
    step: "greeting",
    lines: [
      {
        speaker: "ai",
        text: "Good afternoon! Thank you for calling Accelyx AI. I'm Ava, your AI receptionist. How can I help you today?",
        audio: "greeting_01.mp3",
        delay: 800,
      },
      {
        speaker: "caller",
        text: "Hi, I'd like to book a consultation for our business automation needs.",
        audio: "greeting_02.mp3",
        delay: 3500,
      },
    ],
  },
  {
    step: "collecting",
    lines: [
      {
        speaker: "ai",
        text: "I'd love to help you with that! Could I get your name please?",
        audio: "collecting_01.mp3",
        delay: 600,
      },
      { speaker: "caller", text: "It's James Mitchell.", audio: "collecting_02.mp3", delay: 2500 },
      {
        speaker: "ai",
        text: "Great, James! And what's the best email to send the confirmation to?",
        audio: "collecting_03.mp3",
        delay: 4200,
      },
      {
        speaker: "caller",
        text: "james@brightpath.io",
        audio: "collecting_04.mp3",
        delay: 6000,
      },
      {
        speaker: "ai",
        text: "Perfect. And your company name?",
        audio: "collecting_05.mp3",
        delay: 7500,
      },
      { speaker: "caller", text: "BrightPath Solutions.", audio: "collecting_06.mp3", delay: 9000 },
      {
        speaker: "ai",
        text: "Got it! What time works best for you? We have openings tomorrow at 10 AM or 2 PM.",
        audio: "collecting_07.mp3",
        delay: 10500,
      },
      {
        speaker: "caller",
        text: "2 PM tomorrow would be perfect.",
        audio: "collecting_08.mp3",
        delay: 12500,
      },
    ],
  },
  {
    step: "confirming",
    lines: [
      {
        speaker: "ai",
        text: "Wonderful! Let me book that for you right now. One moment please...",
        audio: "confirming_01.mp3",
        delay: 600,
      },
      {
        speaker: "ai",
        text: "All set, James! Your consultation is confirmed for tomorrow at 2:00 PM. You'll receive a confirmation email and SMS shortly. Is there anything else I can help with?",
        audio: "confirming_02.mp3",
        delay: 3000,
      },
      {
        speaker: "caller",
        text: "No, that's everything. Thank you so much!",
        audio: "confirming_03.mp3",
        delay: 6500,
      },
      {
        speaker: "ai",
        text: "You're welcome, James! We look forward to speaking with you tomorrow. Have a wonderful day!",
        audio: "confirming_04.mp3",
        delay: 8500,
      },
    ],
  },
];

/* ───────────────── CRM data ───────────────── */
const CRM_FIELDS: CRMEntry[] = [
  { field: "Full Name", value: "James Mitchell", icon: <User className="w-3.5 h-3.5" /> },
  { field: "Email", value: "james@brightpath.io", icon: <Mail className="w-3.5 h-3.5" /> },
  { field: "Company", value: "BrightPath Solutions", icon: <Database className="w-3.5 h-3.5" /> },
  { field: "Phone", value: "+1 (555) 847-2930", icon: <Phone className="w-3.5 h-3.5" /> },
  { field: "Source", value: "Voice AI Inbound Call", icon: <PhoneCall className="w-3.5 h-3.5" /> },
  { field: "Status", value: "Consultation Booked", icon: <CheckCircle className="w-3.5 h-3.5" /> },
];

/* ───────────────── main component ───────────────── */
export default function VoiceAIDemo() {
  const [step, setStep] = useState<VoiceStep>("idle");
  const [visibleLines, setVisibleLines] = useState<
    { speaker: "ai" | "caller"; text: string }[]
  >([]);
  const [typingText, setTypingText] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);
  const [waveActive, setWaveActive] = useState(false);
  const [callerSpeaking, setCallerSpeaking] = useState(false);
  const [crmRows, setCrmRows] = useState<number>(0);
  const [calendarBooked, setCalendarBooked] = useState(false);
  const [calendarSearching, setCalendarSearching] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [smsSending, setSmsSending] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const timer = useRef<NodeJS.Timeout | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const cancelledRef = useRef(false);
  const pausedRef = useRef(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioAvailableRef = useRef<boolean | null>(null);

  /* ── check if pre-recorded audio files exist ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const testAudio = new Audio(`${AUDIO_BASE}/greeting_01.mp3`);
    testAudio.addEventListener("canplaythrough", () => {
      audioAvailableRef.current = true;
    });
    testAudio.addEventListener("error", () => {
      audioAvailableRef.current = false;
      console.log("Voice AI Demo: Pre-recorded audio not found. Run 'pip install edge-tts && python generate_voices.py' to generate natural voices.");
    });
    testAudio.load();
  }, []);

  /**
   * Play a pre-recorded audio file. Returns a Promise that resolves when done.
   * Falls back to browser speech synthesis if audio files aren't available.
   * Handles pause/resume and mute properly.
   */
  const playAudio = (audioFile: string, text: string, speaker: "ai" | "caller"): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined") {
        resolve();
        return;
      }

      // If voice is disabled, skip audio but continue
      if (!voiceEnabled) {
        resolve();
        return;
      }

      // Try pre-recorded audio first
      if (audioAvailableRef.current !== false) {
        const audio = new Audio(`${AUDIO_BASE}/${audioFile}`);
        currentAudioRef.current = audio;

        audio.onended = () => {
          if (currentAudioRef.current === audio) {
            currentAudioRef.current = null;
          }
          resolve();
        };
        audio.onerror = () => {
          // Fallback to browser speech if audio file fails
          if (currentAudioRef.current === audio) {
            currentAudioRef.current = null;
          }
          fallbackSpeak(text, speaker).then(resolve);
        };

        // Handle pause state
        if (isPaused) {
          audio.pause();
        }

        audio.play().catch(() => {
          if (currentAudioRef.current === audio) {
            currentAudioRef.current = null;
          }
          fallbackSpeak(text, speaker).then(resolve);
        });
        return;
      }

      // Fallback: browser speech synthesis
      fallbackSpeak(text, speaker).then(resolve);
    });
  };

  /* ── fallback browser speech (if no audio files) ── */
  const fallbackSpeak = (text: string, speaker: "ai" | "caller"): Promise<void> => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) { resolve(); return; }

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const enVoices = voices.filter((v) => v.lang.startsWith("en"));

      if (speaker === "ai") {
        utterance.voice = enVoices.find((v) => /samantha|jenny|ava|allison|female/i.test(v.name)) || enVoices[0] || voices[0];
        utterance.pitch = 1.1;
        utterance.rate = 0.95;
      } else {
        utterance.voice = enVoices.find((v) => /daniel|david|guy|christopher|male|aaron/i.test(v.name)) || enVoices[1] || voices[0];
        utterance.pitch = 0.85;
        utterance.rate = 0.9;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  };

  /* ── stop all audio ── */
  const stopSpeech = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  /* ── auto-scroll chat ── */
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [visibleLines, typingText]);

  /* ── timer ── */
  useEffect(() => {
    if (step !== "idle" && step !== "done") {
      timer.current = setInterval(() => setElapsed((e) => e + 100), 100);
    } else if (step === "done" && timer.current) {
      clearInterval(timer.current);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [step]);

  /* ── handle pause/resume ── */
  useEffect(() => {
    pausedRef.current = isPaused;
    if (currentAudioRef.current) {
      if (isPaused) {
        currentAudioRef.current.pause();
      } else {
        currentAudioRef.current.play().catch(() => {
          // Ignore errors if audio can't be resumed
        });
      }
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      if (isPaused) {
        window.speechSynthesis.pause();
      } else {
        window.speechSynthesis.resume();
      }
    }
  }, [isPaused]);

  /* ── handle mute - stop current audio but keep demo running ── */
  useEffect(() => {
    if (!voiceEnabled && currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    if (!voiceEnabled && typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [voiceEnabled]);

  /* ── cleanup timeouts ── */
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const addTimeout = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  };

  /* ── helper: wait ms ── */
  const wait = (ms: number) => new Promise<void>((resolve) => {
    const id = setTimeout(resolve, ms);
    timeoutsRef.current.push(id);
  });

  /**
   * Show one conversation line: type it out visually while playing audio.
   * Audio and typing run in parallel, and we wait for BOTH to finish
   * before resolving — so the next line never overlaps.
   */
  const showLine = async (line: ConversationLine) => {
    if (cancelledRef.current) return;

    const { text, speaker, audio } = line;

    // Set speaking state
    if (speaker === "ai") {
      setIsAITyping(true);
      setWaveActive(true);
    } else {
      setCallerSpeaking(true);
    }
    setTypingText("");

    // Start audio playback (resolves when done)
    const audioDone = playAudio(audio, text, speaker);

    // Start typing animation in parallel
    const charDelay = speaker === "ai" ? 22 : 30;
    const chars = text.split("");
    const typingDone = new Promise<void>((resolve) => {
      chars.forEach((ch, i) => {
        addTimeout(() => {
          setTypingText((prev) => prev + ch);
        }, i * charDelay);
      });
      addTimeout(resolve, chars.length * charDelay);
    });

    // Wait for BOTH audio and typing to finish
    await Promise.all([audioDone, typingDone]);

    if (cancelledRef.current) return;

    // Finalize line
    setVisibleLines((prev) => [...prev, { speaker, text }]);
    setTypingText("");
    setIsAITyping(false);
    setCallerSpeaking(false);
    setWaveActive(false);

    // Small natural pause between lines
    await wait(400);
  };

  /**
   * Play all lines for a conversation step, one by one.
   * Each line waits for the previous to finish (speech + typing).
   */
  const playConversation = async (stepName: VoiceStep) => {
    const convo = CONVERSATION.find((c) => c.step === stepName);
    if (!convo) return;

    for (const line of convo.lines) {
      if (cancelledRef.current) return;
      await showLine(line);
    }
  };

  /* ── main demo sequence (fully async — speech-driven) ── */
  const runDemo = async () => {
    // Reset everything
    cancelledRef.current = false;
    stopSpeech();
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setStep("ringing");
    setElapsed(0);
    setVisibleLines([]);
    setTypingText("");
    setIsAITyping(false);
    setWaveActive(false);
    setCallerSpeaking(false);
    setCrmRows(0);
    setCalendarBooked(false);
    setCalendarSearching(false);
    setSmsSent(false);
    setEmailSent(false);
    setSmsSending(false);
    setEmailSending(false);
    setCallEnded(false);

    // Phase 1: Ringing
    await wait(1500);
    if (cancelledRef.current) return;

    // Phase 2: Greeting
    setStep("greeting");
    await playConversation("greeting");
    if (cancelledRef.current) return;

    // Phase 3: Collecting info
    setStep("collecting");
    await playConversation("collecting");
    if (cancelledRef.current) return;

    // Phase 4: Confirming
    setStep("confirming");
    await playConversation("confirming");
    if (cancelledRef.current) return;

    // Phase 5: End call
    await wait(800);
    setCallEnded(true);
    if (cancelledRef.current) return;

    // Phase 6: CRM update
    await wait(600);
    setStep("crm");
    for (let i = 0; i < CRM_FIELDS.length; i++) {
      if (cancelledRef.current) return;
      await wait(350);
      setCrmRows(i + 1);
    }
    if (cancelledRef.current) return;

    // Phase 7: Calendar
    await wait(600);
    setStep("calendar");
    setCalendarSearching(true);
    await wait(1800);
    if (cancelledRef.current) return;
    setCalendarSearching(false);
    setCalendarBooked(true);

    // Phase 8: Notifications
    await wait(800);
    if (cancelledRef.current) return;
    setStep("notifications");
    setSmsSending(true);
    await wait(1500);
    if (cancelledRef.current) return;
    setSmsSending(false);
    setSmsSent(true);
    setEmailSending(true);
    await wait(1500);
    if (cancelledRef.current) return;
    setEmailSending(false);
    setEmailSent(true);

    // Done
    await wait(800);
    if (cancelledRef.current) return;
    setStep("done");
  };

  const reset = () => {
    cancelledRef.current = true;
    stopSpeech();
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (timer.current) clearInterval(timer.current);
    setStep("idle");
    setElapsed(0);
    setVisibleLines([]);
    setTypingText("");
    setIsAITyping(false);
    setWaveActive(false);
    setCallerSpeaking(false);
    setCrmRows(0);
    setCalendarBooked(false);
    setCalendarSearching(false);
    setSmsSent(false);
    setEmailSent(false);
    setSmsSending(false);
    setEmailSending(false);
    setCallEnded(false);
  };

  const stepIndex =
    step === "idle"
      ? -1
      : step === "ringing"
      ? 0
      : step === "greeting" || step === "collecting" || step === "confirming"
      ? 1
      : step === "crm"
      ? 2
      : step === "calendar"
      ? 3
      : step === "notifications"
      ? 4
      : 5;

  const isInCall =
    step === "ringing" ||
    step === "greeting" ||
    step === "collecting" ||
    step === "confirming";

  return (
    <div>
      {/* ── Progress bar ── */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
        {[
          { icon: PhoneCall, label: "Voice Call" },
          { icon: MessageSquare, label: "AI Conversation" },
          { icon: Database, label: "CRM Update" },
          { icon: Calendar, label: "Calendar" },
          { icon: Bell, label: "Notifications" },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-2 sm:gap-3">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl border transition-all duration-500 ${
                stepIndex >= i + (i === 0 ? 0 : 0) &&
                stepIndex !== -1 &&
                (i === 0
                  ? stepIndex >= 0
                  : i === 1
                  ? stepIndex >= 1
                  : i === 2
                  ? stepIndex >= 2
                  : i === 3
                  ? stepIndex >= 3
                  : stepIndex >= 4)
                  ? "border-brand-500 bg-brand-500/10 text-brand-400"
                  : "border-[var(--border)] text-[var(--muted)]"
              }`}
            >
              {(i === 0 && stepIndex > 0) ||
              (i === 1 && stepIndex > 1) ||
              (i === 2 && stepIndex > 2) ||
              (i === 3 && stepIndex > 3) ||
              (i === 4 && stepIndex > 4) ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <s.icon className="w-4 h-4" />
              )}
              <span className="text-xs font-medium hidden sm:inline">
                {s.label}
              </span>
            </div>
            {i < 4 && (
              <ArrowRight
                className={`w-3.5 h-3.5 transition-colors duration-500 ${
                  (i === 0 && stepIndex > 0) ||
                  (i === 1 && stepIndex > 1) ||
                  (i === 2 && stepIndex > 2) ||
                  (i === 3 && stepIndex > 3)
                    ? "text-green-400"
                    : "text-[var(--muted)]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* ── Timer + start ── */}
      <div className="flex justify-center gap-4 mb-10">
        {step === "idle" ? (
          <div className="flex items-center gap-3">
            <button
              onClick={runDemo}
              className="btn-primary flex items-center gap-2"
            >
              <Phone className="w-5 h-5" /> Start Voice AI Demo
            </button>
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                voiceEnabled
                  ? "border-brand-500/30 bg-brand-500/10 text-brand-400"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)]"
              }`}
              title={voiceEnabled ? "Voice On — click to mute" : "Voice Off — click to unmute"}
            >
              {voiceEnabled ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </button>
          </div>
        ) : step === "done" ? (
          <div className="flex items-center gap-3">
            <button
              onClick={reset}
              className="btn-secondary flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" /> Run Again
            </button>
            <button
              onClick={() => { setVoiceEnabled(!voiceEnabled); if (voiceEnabled) stopSpeech(); }}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                voiceEnabled
                  ? "border-brand-500/30 bg-brand-500/10 text-brand-400"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)]"
              }`}
              title={voiceEnabled ? "Voice On" : "Voice Off"}
            >
              {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-[var(--text)]">
                {isInCall ? "Call in progress..." : "Processing..."}
              </span>
              <span className="font-mono text-brand-400 text-sm">
                {(elapsed / 1000).toFixed(1)}s
              </span>
            </div>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`p-2.5 rounded-xl border transition-all duration-300 ${
                isPaused
                  ? "border-brand-500/30 bg-brand-500/10 text-brand-400"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)]"
              }`}
              title={isPaused ? "Resume call" : "Pause call"}
            >
              {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              onClick={() => { setVoiceEnabled(!voiceEnabled); if (voiceEnabled) stopSpeech(); }}
              className={`p-2.5 rounded-xl border transition-all duration-300 ${
                voiceEnabled
                  ? "border-brand-500/30 bg-brand-500/10 text-brand-400"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)]"
              }`}
              title={voiceEnabled ? "Mute voice" : "Unmute voice"}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </>
        )}
      </div>

      {step === "done" && (
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-green-500/10 border border-green-500/30">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-green-400 font-semibold text-lg">
              Complete in {(elapsed / 1000).toFixed(1)} seconds
            </span>
            <Zap className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
      )}

      {/* ── Demo panels ── */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT: Voice Call / Conversation */}
        <DemoCard
          title={callEnded ? "Voice Call — Ended" : "Voice AI Receptionist — Live Call"}
          icon={<PhoneCall className="w-5 h-5" />}
          active={isInCall && !callEnded}
          done={callEnded || stepIndex > 1}
          className="lg:row-span-2"
        >
          {/* Call status header */}
          {step !== "idle" && (
            <div className="mb-4">
              {step === "ringing" && (
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="relative">
                    <Phone className="w-8 h-8 text-green-400" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                  </div>
                  <div>
                    <p className="text-[var(--text)] font-medium">
                      Incoming Call...
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      +1 (555) 847-2930
                    </p>
                  </div>
                </div>
              )}

              {isInCall && step !== "ringing" && !callEnded && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <PhoneCall className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-[var(--text)] font-medium text-sm">
                        Connected
                      </p>
                      <p className="text-xs text-[var(--muted)]">
                        +1 (555) 847-2930
                      </p>
                    </div>
                  </div>
                  {/* Audio waveform */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-150 ${
                          waveActive || callerSpeaking
                            ? "bg-green-400"
                            : "bg-[var(--border)]"
                        }`}
                        style={{
                          height:
                            waveActive || callerSpeaking
                              ? `${12 + Math.sin(Date.now() / 200 + i * 1.5) * 10}px`
                              : "4px",
                          animation:
                            waveActive || callerSpeaking
                              ? `wave${i} 0.4s ease-in-out infinite alternate`
                              : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {callEnded && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--surface)] flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[var(--muted)]" />
                  </div>
                  <div>
                    <p className="text-[var(--text)] font-medium text-sm">
                      Call Ended
                    </p>
                    <p className="text-xs text-green-400">
                      Successfully completed
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chat messages */}
          <div
            ref={chatRef}
            className="space-y-3 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin"
            style={{ minHeight: step === "idle" ? "200px" : "300px" }}
          >
            {step === "idle" && (
              <div className="flex flex-col items-center justify-center h-[200px] text-[var(--muted)] gap-3">
                <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center">
                  <Mic className="w-8 h-8 text-brand-400/50" />
                </div>
                <p className="text-sm">
                  Start the demo to hear the AI receptionist in action
                </p>
              </div>
            )}

            {step === "ringing" && (
              <div className="flex flex-col items-center justify-center h-[200px] gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center animate-pulse">
                    <Phone className="w-10 h-10 text-green-400" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-green-400/30 animate-ping" />
                </div>
                <p className="text-[var(--text)] font-medium animate-pulse">
                  Ringing...
                </p>
              </div>
            )}

            {visibleLines.map((line, i) => (
              <ChatBubble key={i} speaker={line.speaker} text={line.text} />
            ))}

            {typingText && (
              <ChatBubble
                speaker={isAITyping ? "ai" : "caller"}
                text={typingText}
                isTyping
              />
            )}
          </div>
        </DemoCard>

        {/* RIGHT TOP: CRM */}
        <DemoCard
          title="CRM — Contact Created"
          icon={<Database className="w-5 h-5" />}
          active={step === "crm"}
          done={stepIndex > 2}
        >
          <div className="space-y-2">
            {CRM_FIELDS.map((entry, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-500 ${
                  i < crmRows
                    ? "bg-brand-500/5 border border-brand-500/20 animate-fade-in"
                    : "border border-transparent"
                }`}
                style={{ opacity: i < crmRows ? 1 : 0.2 }}
              >
                <div
                  className={`p-1.5 rounded-md ${
                    i < crmRows
                      ? "bg-brand-500/20 text-brand-400"
                      : "bg-[var(--surface)] text-[var(--muted)]"
                  }`}
                >
                  {entry.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--muted)]">{entry.field}</p>
                  <p
                    className={`text-sm font-medium truncate ${
                      i < crmRows ? "text-[var(--text)]" : "text-[var(--muted)]"
                    }`}
                  >
                    {i < crmRows ? entry.value : "—"}
                  </p>
                </div>
                {i < crmRows && (
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                )}
              </div>
            ))}

            {crmRows === 0 && step !== "crm" && stepIndex < 2 && (
              <div className="flex flex-col items-center justify-center py-6 text-[var(--muted)] gap-2">
                <Database className="w-8 h-8 opacity-30" />
                <span className="text-sm">Waiting for call data...</span>
              </div>
            )}
          </div>
        </DemoCard>

        {/* RIGHT BOTTOM: Calendar + Notifications side by side on smaller, stacked on mobile */}
        <div className="space-y-6">
          {/* Calendar */}
          <DemoCard
            title="Google Calendar — Auto-Booked"
            icon={<Calendar className="w-5 h-5" />}
            active={step === "calendar"}
            done={stepIndex > 3}
          >
            {calendarSearching && (
              <div className="p-4 rounded-xl bg-brand-500/5 border border-brand-500/20 text-center animate-pulse">
                <span className="text-brand-400 text-sm font-medium">
                  Finding available time slot...
                </span>
              </div>
            )}

            {calendarBooked && (
              <div className="animate-fade-in p-4 rounded-xl bg-brand-500/10 border border-brand-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-semibold text-sm">
                    Meeting Booked
                  </span>
                </div>
                <p className="text-[var(--text)] font-medium">
                  Consultation — James Mitchell
                </p>
                <div className="flex items-center gap-2 mt-1 text-[var(--muted)] text-sm">
                  <Clock className="w-3.5 h-3.5" />
                  Tomorrow • 2:00 PM – 2:30 PM
                </div>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Zoom • Auto-scheduled by Voice AI
                </p>
              </div>
            )}

            {!calendarSearching && !calendarBooked && (
              <div className="p-4 rounded-xl border border-dashed border-[var(--border)] text-center text-[var(--muted)] text-sm">
                Waiting for calendar event...
              </div>
            )}
          </DemoCard>

          {/* Notifications: SMS + Email */}
          <DemoCard
            title="Notifications — SMS & Email"
            icon={<Bell className="w-5 h-5" />}
            active={step === "notifications"}
            done={stepIndex > 4}
          >
            <div className="space-y-3">
              {/* SMS */}
              <div
                className={`p-3 rounded-xl border transition-all duration-500 ${
                  smsSent
                    ? "border-green-500/30 bg-green-500/5"
                    : smsSending
                    ? "border-brand-500/30 bg-brand-500/5 animate-pulse"
                    : "border-[var(--border)]"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone
                    className={`w-4 h-4 ${
                      smsSent
                        ? "text-green-400"
                        : smsSending
                        ? "text-brand-400"
                        : "text-[var(--muted)]"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      smsSent
                        ? "text-green-400"
                        : smsSending
                        ? "text-brand-400"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    {smsSent
                      ? "SMS Delivered"
                      : smsSending
                      ? "Sending SMS..."
                      : "SMS Pending"}
                  </span>
                  {smsSent && (
                    <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
                  )}
                </div>
                {smsSent && (
                  <div className="animate-fade-in ml-6 p-2.5 rounded-lg bg-[var(--surface)] text-xs text-[var(--text)]">
                    <p className="font-medium mb-1">To: +1 (555) 847-2930</p>
                    <p className="text-[var(--muted)]">
                      Hi James! Your consultation with Accelyx AI is confirmed
                      for tomorrow at 2:00 PM. See you then!
                    </p>
                  </div>
                )}
              </div>

              {/* Email */}
              <div
                className={`p-3 rounded-xl border transition-all duration-500 ${
                  emailSent
                    ? "border-green-500/30 bg-green-500/5"
                    : emailSending
                    ? "border-brand-500/30 bg-brand-500/5 animate-pulse"
                    : "border-[var(--border)]"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Mail
                    className={`w-4 h-4 ${
                      emailSent
                        ? "text-green-400"
                        : emailSending
                        ? "text-brand-400"
                        : "text-[var(--muted)]"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      emailSent
                        ? "text-green-400"
                        : emailSending
                        ? "text-brand-400"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    {emailSent
                      ? "Email Delivered"
                      : emailSending
                      ? "Sending Email..."
                      : "Email Pending"}
                  </span>
                  {emailSent && (
                    <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
                  )}
                </div>
                {emailSent && (
                  <div className="animate-fade-in ml-6 space-y-1.5 text-xs">
                    <div className="flex gap-2">
                      <span className="text-[var(--muted)]">To:</span>
                      <span className="text-[var(--text)]">
                        james@brightpath.io
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[var(--muted)]">Subject:</span>
                      <span className="text-[var(--text)] font-medium">
                        Your Consultation is Confirmed!
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--surface)] text-[var(--muted)] mt-1">
                      Hi James, your consultation with Accelyx AI is booked for
                      tomorrow at 2:00 PM via Zoom. We&apos;ll send a meeting
                      link shortly. Looking forward to it!
                    </div>
                  </div>
                )}
              </div>

              {!smsSending && !smsSent && !emailSending && !emailSent && (
                <div className="flex flex-col items-center justify-center py-4 text-[var(--muted)] gap-2">
                  <Bell className="w-6 h-6 opacity-30" />
                  <span className="text-sm">
                    Waiting to send notifications...
                  </span>
                </div>
              )}
            </div>
          </DemoCard>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="text-center mt-16">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text)] mb-4">
          Ready for an AI receptionist that{" "}
          <span className="gradient-text">never misses a call</span>?
        </h2>
        <p className="text-[var(--muted)] mb-6 max-w-lg mx-auto">
          Our Voice AI handles calls 24/7, books appointments, updates your CRM,
          and notifies your team — all without lifting a finger.
        </p>
        <button
          onClick={() => setShowBookingModal(true)}
          className="btn-primary inline-flex items-center gap-2"
        >
          Book Your Free Strategy Call
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />

      {/* Inline keyframe styles for waveform */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wave0 { from { height: 6px; } to { height: 20px; } }
        @keyframes wave1 { from { height: 10px; } to { height: 24px; } }
        @keyframes wave2 { from { height: 4px; } to { height: 18px; } }
        @keyframes wave3 { from { height: 8px; } to { height: 22px; } }
        @keyframes wave4 { from { height: 6px; } to { height: 16px; } }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
      ` }} />
    </div>
  );
}

/* ───────────────── sub-components ───────────────── */

function DemoCard({
  title,
  icon,
  active,
  done,
  children,
  className = "",
}: {
  title: string;
  icon: React.ReactNode;
  active: boolean;
  done: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`card p-5 sm:p-6 transition-all duration-500 ${
        active
          ? "ring-2 ring-brand-500/50 shadow-lg shadow-brand-500/10"
          : done
          ? "ring-1 ring-green-500/30"
          : ""
      } ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`p-2 rounded-lg transition-colors duration-300 ${
            active
              ? "bg-brand-500/20 text-brand-400"
              : done
              ? "bg-green-500/20 text-green-400"
              : "bg-[var(--surface)] text-[var(--muted)]"
          }`}
        >
          {done ? <CheckCircle className="w-5 h-5" /> : icon}
        </div>
        <h3 className="font-semibold text-[var(--text)] text-sm sm:text-base">
          {title}
        </h3>
        {active && (
          <span className="ml-auto flex items-center gap-1.5 text-xs text-brand-400">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            Active
          </span>
        )}
        {done && (
          <span className="ml-auto text-xs text-green-400 font-medium">
            Done
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function ChatBubble({
  speaker,
  text,
  isTyping = false,
}: {
  speaker: "ai" | "caller";
  text: string;
  isTyping?: boolean;
}) {
  const isAI = speaker === "ai";

  return (
    <div className={`flex gap-2 ${isAI ? "" : "flex-row-reverse"}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isAI
            ? "bg-brand-500/20 text-brand-400"
            : "bg-cyan-500/20 text-cyan-400"
        }`}
      >
        {isAI ? (
          <Mic className="w-4 h-4" />
        ) : (
          <User className="w-4 h-4" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isAI
            ? "bg-brand-500/10 border border-brand-500/20 text-[var(--text)] rounded-tl-md"
            : "bg-cyan-500/10 border border-cyan-500/20 text-[var(--text)] rounded-tr-md"
        }`}
      >
        {text}
        {isTyping && (
          <span className="inline-block w-0.5 h-3.5 bg-brand-400 animate-pulse ml-0.5 align-text-bottom" />
        )}
      </div>
    </div>
  );
}

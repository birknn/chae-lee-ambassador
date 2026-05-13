"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { questions, Question } from "@/lib/questions";

type FormData = Record<string, string>;

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "65%" : "-65%",
    opacity: 0,
    scale: 0.97,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? "-65%" : "65%",
    opacity: 0,
    scale: 0.97,
  }),
};

const transition = { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] as const };

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [direction, setDirection] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const q = questions[step];
  const isLast = step === questions.length - 1;
  const progress = Math.round(((step + 1) / questions.length) * 100);
  const showFollowUp = q.followUp && formData[q.id] === q.followUp.condition;

  const canProceed = useCallback(() => {
    if (!q.required) return true;
    return Boolean(formData[q.id]);
  }, [q, formData]);

  const goNext = useCallback(() => {
    if (!canProceed()) {
      setHasError(true);
      return;
    }
    setHasError(false);
    if (isLast) return; // submit handled separately
    setDirection(1);
    setStep((p) => p + 1);
  }, [canProceed, isLast]);

  // Enter key to advance
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey && q.type !== "textarea") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, q.type]);

  const goBack = () => {
    if (step === 0) { router.push("/"); return; }
    setHasError(false);
    setDirection(-1);
    setStep((p) => p - 1);
  };

  const updateField = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    setHasError(false);
  };

  const handleOptionSelect = (id: string, value: string, question: Question) => {
    const newData = { ...formData, [id]: value };
    setFormData(newData);
    setHasError(false);

    const hasFollowUp = question.followUp && value === question.followUp.condition;
    if (!hasFollowUp && step < questions.length - 1) {
      setTimeout(() => {
        setDirection(1);
        setStep((p) => p + 1);
      }, 380);
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) { setHasError(true); return; }
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("error");
      router.push("/thank-you");
    } catch {
      setSubmitError("Başvurun gönderilemedi. Lütfen tekrar dene.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#FDF8F5] to-[#F7E8EC] flex flex-col overflow-hidden">
      {/* Floating orb background */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-kb-rose/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-24 left-0 w-48 h-48 rounded-full bg-kb-petal/30 blur-2xl pointer-events-none" />

      {/* ── Top bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-kb-rose/20">
        {/* Progress track */}
        <div className="h-[3px] bg-kb-rose/30">
          <div
            className="h-full bg-gradient-to-r from-kb-blush to-kb-mauve progress-fill rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Nav row */}
        <div className="flex items-center justify-between px-5 py-3">
          <button
            onClick={goBack}
            className="flex items-center gap-1.5 text-kb-muted text-sm font-body active:scale-95 transition-transform"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Geri
          </button>

          <div className="flex items-center gap-2">
            <span className="text-kb-blush font-display text-lg font-medium">
              {String(step + 1).padStart(2, "0")}
            </span>
            <span className="text-kb-muted/40 text-sm font-body">/</span>
            <span className="text-kb-muted/60 text-sm font-body">
              {String(questions.length).padStart(2, "0")}
            </span>
          </div>

          <div className="w-12 flex justify-end">
            <span className="text-[10px] text-kb-muted/50 font-body tracking-wide">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* ── Question area ── */}
      <div className="flex-1 flex flex-col pt-[72px] pb-28 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="flex-1 flex flex-col px-5 pt-8"
          >
            {/* Question label */}
            <div className="mb-7">
              <span className="text-kb-blush/70 text-[10px] tracking-[0.3em] uppercase font-body font-medium block mb-2">
                Soru {String(step + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-[1.65rem] leading-snug text-kb-deep font-medium">
                {q.question}
              </h2>
              {q.subtitle && (
                <p className="mt-2 text-[13px] text-kb-muted font-body leading-relaxed">
                  {q.subtitle}
                </p>
              )}
            </div>

            {/* Input renderer */}
            <QuestionInput
              question={q}
              value={formData[q.id] || ""}
              onChange={(v) => updateField(q.id, v)}
              onSelect={(v) => handleOptionSelect(q.id, v, q)}
              hasError={hasError && q.required && !formData[q.id]}
            />

            {/* Follow-up (conditional) */}
            <AnimatePresence>
              {showFollowUp && q.followUp && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22 }}
                  className="mt-5"
                >
                  <label className="block text-[13px] text-kb-muted font-body mb-2">
                    {q.followUp.label}
                  </label>
                  <textarea
                    value={formData[q.followUp.id] || ""}
                    onChange={(e) => updateField(q.followUp!.id, e.target.value)}
                    placeholder={q.followUp.placeholder}
                    rows={3}
                    className="input-luxury resize-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error hint */}
            <AnimatePresence>
              {hasError && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-[13px] text-red-400 font-body"
                >
                  Bu alan zorunludur, lütfen yanıtla ↑
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Fixed bottom CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-8 pt-4 bg-gradient-to-t from-[#FDF8F5] via-[#FDF8F5]/95 to-transparent">
        {isLast ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-[18px] rounded-2xl btn-shimmer text-white font-body font-medium text-base tracking-wide shadow-blush-glow active:scale-[0.97] transition-transform duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Gönderiliyor...
              </span>
            ) : (
              "Başvuruyu Gönder ✨"
            )}
          </button>
        ) : (
          <button
            onClick={goNext}
            className="w-full py-[18px] rounded-2xl bg-kb-blush text-white font-body font-medium text-base tracking-wide shadow-blush-glow active:scale-[0.97] transition-all duration-150 hover:bg-kb-mauve"
          >
            Devam Et →
          </button>
        )}

        {submitError && (
          <p className="mt-3 text-[13px] text-red-400 font-body text-center">{submitError}</p>
        )}

        {/* Skip for optional */}
        {!q.required && !isLast && (
          <button
            onClick={goNext}
            className="w-full mt-3 py-2 text-[13px] text-kb-muted/60 font-body underline-offset-2 hover:underline"
          >
            Bu soruyu geç
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// QuestionInput — renders the correct input UI
// ─────────────────────────────────────────────
function QuestionInput({
  question,
  value,
  onChange,
  onSelect,
  hasError,
}: {
  question: Question;
  value: string;
  onChange: (v: string) => void;
  onSelect: (v: string) => void;
  hasError: boolean;
}) {
  const errorCls = hasError ? " error" : "";

  if (question.type === "select" && question.options) {
    return (
      <div className="flex flex-col gap-3">
        {question.options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`option-card ${value === opt ? "selected" : "unselected"}`}
          >
            <span className="flex items-center justify-between">
              <span>{opt}</span>
              {value === opt && (
                <span className="ml-2 text-white/90">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
    );
  }

  if (question.type === "textarea") {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
        rows={4}
        className={`input-luxury resize-none${errorCls}`}
        autoFocus
      />
    );
  }

  if (question.type === "url") {
    return (
      <div>
        <div className="w-full rounded-2xl border border-dashed border-kb-rose bg-kb-petal/30 p-6 text-center mb-4">
          <div className="text-3xl mb-2">🎥</div>
          <p className="text-kb-muted text-[13px] font-body">
            Instagram, TikTok veya YouTube video linkini yapıştır
          </p>
          <p className="text-kb-muted/50 text-[11px] font-body mt-1">Bu alan opsiyoneldir</p>
        </div>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className={`input-luxury${errorCls}`}
        />
      </div>
    );
  }

  return (
    <input
      type={question.type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder}
      className={`input-luxury${errorCls}`}
      autoFocus
    />
  );
}

"use client";

import { useState } from "react";

type Props = {
  placeholder: string;
  cta: string;
  success: string;
  variant?: "light" | "dark";
};

export default function EmailForm({
  placeholder,
  cta,
  success,
  variant = "light",
}: Props) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const dark = variant === "dark";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // UI-only for now. Wire to a backend / email service later.
    setDone(true);
  }

  if (done) {
    return (
      <p
        className={`text-sm font-medium ${
          dark ? "text-white" : "text-foreground"
        }`}
        role="status"
      >
        ✓ {success}
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex w-full flex-col gap-2 sm:flex-row sm:items-center ${
        dark
          ? "rounded-full sm:border sm:border-white/20 sm:bg-white/5 sm:p-1.5"
          : "rounded-full sm:border sm:border-line sm:bg-white sm:p-1.5"
      }`}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className={`w-full flex-1 rounded-full px-5 py-3 text-sm outline-none ${
          dark
            ? "bg-white/10 text-white placeholder:text-white/50 sm:bg-transparent"
            : "bg-surface text-foreground placeholder:text-muted sm:bg-transparent"
        }`}
      />
      <button
        type="submit"
        className={`shrink-0 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
          dark ? "bg-white text-foreground" : "bg-foreground text-white"
        }`}
      >
        {cta}
      </button>
    </form>
  );
}

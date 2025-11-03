"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import LiveFeed from "./components/LiveFeed";
import FAQModal from "./components/FAQModal";

interface ConfettiItem {
  id: number;
  type: "circle" | "star";
  left: number;
  top: number;
}

export default function Home() {
  const [confetti, setConfetti] = useState<ConfettiItem[]>([]);
  const [isFAQOpen, setIsFAQOpen] = useState(false);

  const confettiCount = 15;

  const triggerConfetti = () => {
    const newConfetti: ConfettiItem[] = Array.from({ length: confettiCount }).map((_, i) => ({
      id: i,
      type: "circle",
      left: Math.random() * 100,
      top: 0,
    }));
    setConfetti(newConfetti);
  };

  const voucherLink = "https://uplevelrewarded.com/aff_c?offer_id=3120&aff_id=2431";

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-black via-red-950 to-red-900">
      {/* Header */}
      <div className="flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6 relative">
        <Image
          src="/Target_logo.png"
          alt="Target"
          width={100}
          height={46}
          className="w-16 sm:w-20 h-auto"
        />
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
          <LiveFeed />
        </div>
      </div>

      {/* Centered Content */}
      <div className="flex flex-1 flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 sm:px-6 mt-0 sm:-mt-8 md:-mt-[10rem]">
        <span className="inline-block bg-red-600/70 text-red-100 px-4 py-1.5 rounded-full text-xs font-medium border border-red-400/60 mb-6 sm:mb-8">
          New Feedback Program
        </span>

        <h1 className="text-center font-bold leading-tight mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          <div className="text-white mb-2 sm:mb-3">Share your thoughts.</div>
          <div>
            <span className="text-white">Earn </span>
            <span className="text-red-400">$700.</span>
          </div>
        </h1>

        <p className="text-center text-gray-300 text-sm sm:text-base font-medium mb-6">
          Simple feedback survey. Real rewards.
        </p>

        <p className="text-center text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-8 sm:mb-10 px-2">
          Your opinion about Target matters. Help us improve the shopping experience and receive $700 as our way of saying thanks.
        </p>

        {/* Social Proof */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-pink-400 border-2 border-slate-900 flex items-center justify-center text-white text-xs font-semibold">JM</div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-slate-900 flex items-center justify-center text-white text-xs font-semibold">SK</div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 border-2 border-slate-900 flex items-center justify-center text-white text-xs font-semibold">AL</div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 border-2 border-slate-900 flex items-center justify-center text-white text-xs font-semibold">DR</div>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1">
              <span className="text-red-400 text-sm">★★★★★</span>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm">
              <span className="font-semibold text-white">15,234</span> participants this month
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            triggerConfetti();
            window.open(voucherLink, '_blank', 'noopener,noreferrer');
          }}
          className="cursor-pointer bg-red-600 text-white hover:bg-red-700 font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base flex items-center gap-2 hover:scale-105 transition-transform mb-4 sm:mb-6 shadow-lg shadow-red-600/30"
        >
          <span>Claim My $700</span>
          <span>→</span>
        </button>

        {/* FAQ Trigger Button */}
        <button
          onClick={() => setIsFAQOpen(true)}
          className="cursor-pointer text-gray-400 hover:text-white font-medium text-sm sm:text-base flex items-center gap-1 transition-colors mb-8 sm:mb-12 underline decoration-gray-500/50 hover:decoration-white underline-offset-4 mr-2"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Have questions?</span>
        </button>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-16">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-gray-300 text-xs sm:text-sm font-medium">Secure & Private</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-gray-300 text-xs sm:text-sm font-medium">Instant Qualification</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-300 text-xs sm:text-sm font-medium">Guaranteed Payout</span>
          </div>
        </div>
      </div>

      {/* FAQ Modal */}
      <FAQModal isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />

      {/* Confetti Animation */}
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="absolute w-10 h-10"
          style={{ left: `${c.left}%`, top: "-50px", zIndex: 60 }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{ y: 500 + Math.random() * 100, rotate: 360, opacity: 0 }}
          transition={{ duration: 2 + Math.random() * 1, ease: "easeOut" }}
        >
          <div className="w-10 h-10 rounded-full bg-red-500"></div>
        </motion.div>
      ))}

      {/* Footer */}
      <footer className="text-gray-400 text-xs sm:text-sm z-10 mb-4 sm:mb-6 text-center w-full px-4">
      </footer>
    </div>
  );
}

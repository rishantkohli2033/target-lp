"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative bg-gradient-to-br from-black/60 via-red-950/40 to-red-900/60 backdrop-blur-xl border border-red-400/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-red-500/20 transition-all duration-300 hover:border-red-400/40">
        {/* Premium glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left px-5 py-4 sm:px-6 sm:py-5 flex items-start justify-between gap-4 relative z-10"
          aria-expanded={isOpen}
        >
          <span className="text-white font-semibold text-sm sm:text-base leading-relaxed pr-2 flex-1">
            {question}
          </span>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-shrink-0 mt-1"
          >
            <svg
              className="w-5 h-5 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4 sm:px-6 sm:pb-5 pt-0">
                <div className="border-t border-red-400/20 pt-3 sm:pt-4">
                  <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-gray-300 text-sm leading-relaxed"
                  >
                    {answer}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FAQModal({ isOpen, onClose }: FAQModalProps) {
  const faqs = [
    {
      question: "How long does it take to receive the voucher after completion?",
      answer: "It can take up to 1-2 days maximum. Most participants receive their voucher within 24 hours of completion."
    },
    {
      question: "What do I have to do in order to receive the voucher?",
      answer: "To receive the voucher, you need to complete at least 5 deals. Once you finish all required deals, you'll receive your voucher instantly."
    },
    {
      question: "Where will I receive my voucher?",
      answer: "It will be sent to your email! Make sure to check your inbox and spam folder within 1-2 days of completion."
    }
  ];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] overflow-y-auto" onClick={onClose}>
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-full max-w-2xl bg-gradient-to-br from-black via-red-950/50 to-red-900 border border-red-400/30 rounded-3xl shadow-2xl shadow-red-500/20 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="relative px-6 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-6 border-b border-red-400/20">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="pr-10 sm:pr-12"
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
                      <span className="bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
                        Frequently Asked Questions
                      </span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base text-center">
                      Everything you need to know about your voucher
                    </p>
                  </motion.div>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                    aria-label="Close modal"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="px-6 py-6 sm:px-8 sm:py-8 max-h-[60vh] overflow-y-auto">
                  <div className="space-y-3 sm:space-y-4">
                    {faqs.map((faq, index) => (
                      <FAQItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        index={index}
                      />
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2">
                  <button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-red-600 to-purple-700 hover:from-red-500 hover:to-red-600 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/50"
                  >
                    Got it, thanks!
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

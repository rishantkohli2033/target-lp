"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FeedItem {
  id: string;
  name: string;
  location: string;
  action: string;
  amount: string;
}

// Helper function to get initials from name
const getInitials = (name: string) => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return parts[0][0] + parts[1][0];
  }
  return name.substring(0, 2).toUpperCase();
};

// Helper function to get random avatar color
const getAvatarColor = (id: string) => {
  const colors = [
    'from-red-400 to-pink-400',
    'from-blue-400 to-cyan-400',
    'from-orange-400 to-red-400',
    'from-green-400 to-emerald-400',
    'from-pink-400 to-rose-400',
    'from-indigo-400 to-red-400',
  ];
  // Use id to consistently get same color for same user
  const index = parseInt(id.substring(0, 8), 36) % colors.length;
  return colors[index];
};

export default function LiveFeed() {
  const [currentItem, setCurrentItem] = useState<FeedItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchNewItem = async () => {
    try {
      const response = await fetch('/api/feed');
      const data: FeedItem = await response.json();

      // Slide out current item
      setIsVisible(false);

      // Wait for slide out, then update and slide in new item
      setTimeout(() => {
        setCurrentItem(data);
        setIsVisible(true);

        // Auto-hide after 6 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 6000);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch feed item:', error);
    }
  };

  useEffect(() => {
    // Fetch initial item after 2 seconds
    setTimeout(() => {
      fetchNewItem();
    }, 2000);

    // Update every 12 seconds
    const interval = setInterval(fetchNewItem, 12000);

    return () => clearInterval(interval);
  }, []);

  if (!currentItem) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="bg-gradient-to-br from-red-900/20 to-black/40 backdrop-blur-2xl border border-white/10 rounded-lg sm:rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.8),0_0_24px_0_rgba(168,85,247,0.4)] p-2.5 sm:p-4 max-w-[180px] sm:max-w-[320px]">
            <div className="flex items-start gap-2 sm:gap-3">
              {/* Avatar */}
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${getAvatarColor(currentItem.id)} flex items-center justify-center text-white text-xs sm:text-sm font-semibold flex-shrink-0 border border-red-300/40 shadow-lg`}>
                {getInitials(currentItem.name)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1">
                  {currentItem.name}
                </p>
                <p className="text-red-200 text-[10px] sm:text-xs mb-1 sm:mb-1.5">
                  <span className="text-red-300">from</span> {currentItem.location}
                </p>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="text-red-400 text-[10px] sm:text-xs font-medium">✓</span>
                  <p className="text-red-100 text-[10px] sm:text-xs">
                    {currentItem.action} <span className="text-red-400 font-semibold">{currentItem.amount}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

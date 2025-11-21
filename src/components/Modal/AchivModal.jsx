// src/components/Modal/AchivModal.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Flame, Crown, Gem, Zap } from "lucide-react";

const badgeConfig = {
  "Bronze Beginner": {
    icon: Trophy,
    color: "from-orange-600 to-red-700",
    glow: "shadow-orange-500/70",
  },
  "Silver Streak": {
    icon: Trophy,
    color: "from-gray-400 to-gray-600",
    glow: "shadow-gray-400/70",
  },
  "Gold Master": {
    icon: Crown,
    color: "from-yellow-400 to-amber-600",
    glow: "shadow-yellow-500/80",
  },
  "Diamond Legend": {
    icon: Gem,
    color: "from-cyan-400 to-blue-600",
    glow: "shadow-cyan-500/90",
  },
  "Immortal God": {
    icon: Flame,
    color: "from-purple-600 to-pink-700",
    glow: "shadow-purple-600/90",
    text: "text-white",
  },
  "Eternal Titan": {
    icon: Zap,
    color: "from-indigo-500 to-purple-800",
    glow: "shadow-indigo-600/90",
    text: "text-white",
  },
};

export default function AchivModal({
  habit,
  badge,
  icon: customIcon,
  color: customColor,
  onClose,
}) {
  const config = badgeConfig[badge] || {
    icon: Trophy,
    color: "from-purple-500 to-pink-600",
    glow: "shadow-purple-500/80",
  };
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 100, opacity: 0, scale: 0 }}
      whileHover={{ scale: 1.05 }}
      className="relative group cursor-pointer"
      onClick={onClose}
    >
      {/* Epic Glow Background */}
      <div
        className={`absolute -inset-4 bg-gradient-to-r ${
          customColor || config.color
        } blur-3xl opacity-70 group-hover:opacity-100 transition duration-1000`}
      />

      {/* Main Toast */}
      <div className="relative bg-black/90 backdrop-blur-3xl border-4 border-purple-500/60 rounded-3xl p-8 min-w-96 shadow-5xl">
        {/* Top Flame Line */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

        <div className="flex items-center gap-6">
          {/* Icon with insane effects */}
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8 }}
            className={`relative p-6 rounded-full bg-gradient-to-br ${
              customColor || config.color
            } ${config.glow} shadow-2xl`}
          >
            {customIcon ? (
              <span className="text-6xl">{customIcon}</span>
            ) : (
              <Icon className="w-20 h-20 text-white drop-shadow-2xl" />
            )}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-white/30"
            />
          </motion.div>

          <div className="flex-1">
            <motion.h2
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-black text-white mb-2"
            >
              LEGEND UNLOCKED
            </motion.h2>
            <p className="text-2xl font-bold text-purple-300">{habit}</p>
            <p className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              → {badge} ←
            </p>
          </div>
        </div>

        {/* Bottom fire particles */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 opacity-70">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -30], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              className="w-2 h-8 bg-orange-500 rounded-full blur-sm"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

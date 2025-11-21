// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import {
  Flame,
  Crown,
  Swords,
  Shield,
  Trophy,
  Zap,
  Target,
  Heart,
  Sparkles,
  User,
  Calendar,
  TrendingUp,
} from "lucide-react";

const Profile = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  // Симулируем данные пользователя (в реальности — из Redux/Auth)
  const user = {
    name: "Legendary Warrior",
    avatar: null, // можно добавить аватарку позже
    level: 42,
    totalStreaks: 1234,
    longestStreak: 127,
    habitsCompleted: 89,
    achievements: 37,
    joinDate: "2024-01-15",
    title: "Immortal Forge Master",
  };

  useEffect(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 8000);
  }, []);

  const rankProgress = (user.level / 100) * 100;
  const fireLevel = Math.min(user.totalStreaks / 10, 100);

  return (
    <>
      {showConfetti && (
        <Confetti recycle={false} numberOfPieces={400} gravity={0.05} />
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-pink-950 text-white relative overflow-hidden">
        {/* Космический фон */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -window.innerHeight - 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-1 h-1 bg-purple-400/60 rounded-full blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 py-16 max-w-7xl">
          {/* Заголовок */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h1 className="text-8xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x">
              YOUR LEGEND
            </h1>
            <p className="text-3xl mt-6 text-purple-300 font-light">
              Forged in Eternal Fire
            </p>
          </motion.div>

          {/* Аватар + Основная инфа */}
          <div className="flex flex-col items-center mb-20">
            <motion.div
              initial={{ scale: 0, rotate: -360 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="relative mb-10"
            >
              {/* Неоновый ореол вокруг аватара */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-full blur-3xl opacity-70 animate-pulse" />
              <div className="relative w-64 h-64 bg-black/80 backdrop-blur-3xl rounded-full border-8 border-purple-500/80 flex items-center justify-center shadow-5xl">
                <User className="w-40 h-40 text-purple-400" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border-4 border-dashed border-cyan-500/50"
                />
              </div>
              <Crown className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 text-yellow-400 drop-shadow-2xl" />
            </motion.div>

            <motion.h2
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-6xl font-black mb-4"
            >
              {user.name}
            </motion.h2>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
              "{user.title}"
            </p>
          </div>

          {/* Ключевые статы */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            {[
              {
                icon: Flame,
                label: "Total Fire Forged",
                value: user.totalStreaks,
                color: "from-orange-500 to-red-600",
              },
              {
                icon: Crown,
                label: "Longest Reign",
                value: `${user.longestStreak} days`,
                color: "from-yellow-400 to-amber-600",
              },
              {
                icon: Trophy,
                label: "Legends Unlocked",
                value: user.achievements,
                color: "from-purple-500 to-pink-600",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="relative group"
              >
                <div
                  className={`absolute -inset-4 bg-gradient-to-r ${stat.color} blur-3xl opacity-60 group-hover:opacity-100 transition duration-1000`}
                />
                <div className="relative bg-black/70 backdrop-blur-3xl border-4 border-purple-500/50 rounded-3xl p-10 text-center">
                  <stat.icon className="w-20 h-20 mx-auto mb-6 text-white drop-shadow-2xl animate-pulse" />
                  <p className="text-7xl font-black mb-4">{stat.value}</p>
                  <p className="text-2xl text-purple-300">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Прогресс-бары */}
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <div className="flex justify-between mb-4">
                <h3 className="text-3xl font-bold flex items-center gap-4">
                  <Sparkles className="w-10 h-10" /> Rank Progress
                </h3>
                <span className="text-3xl font-black">Level {user.level}</span>
              </div>
              <div className="h-16 bg-black/50 rounded-full overflow-hidden border-4 border-purple-500/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${rankProgress}%` }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </motion.div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <h3 className="text-3xl font-bold flex items-center gap-4">
                  <Flame className="w-10 h-10 text-orange-500" /> Inner Fire
                </h3>
                <span className="text-3xl font-black">
                  {Math.round(fireLevel)}%
                </span>
              </div>
              <div className="h-16 bg-black/50 rounded-full overflow-hidden border-4 border-orange-500/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${fireLevel}%` }}
                  transition={{ duration: 3, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 relative"
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse" />
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="absolute bottom-0 w-1 h-8 bg-orange-300 blur-sm"
                      style={{ left: `${20 + i * 20}%` }}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Финальный эпик-текст */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mt-32"
          >
            <p className="text-5xl font-light italic text-purple-300">
              "The forge never cools. The legend never dies."
            </p>
            <div className="flex justify-center gap-10 mt-10">
              <Heart className="w-16 h-16 text-red-500 fill-red-500 animate-pulse" />
              <Shield className="w-16 h-16 text-cyan-400 animate-pulse" />
              <Swords className="w-16 h-16 text-purple-400 animate-pulse" />
            </div>
          </motion.div>
        </div>

        <style jsx>{`
          @keyframes gradient-x {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          .animate-gradient-x {
            background-size: 200%;
            animation: gradient-x 8s ease infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default Profile;

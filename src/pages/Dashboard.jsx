// src/pages/Dashboard.jsx или src/views/Dashboard.jsx
import React, { useEffect, useState, useMemo } from "react";
import {
  useGetHabitsQuery,
  useUpdateHabitMutation,
} from "../app/features/apiSlice";
import { motion, AnimatePresence } from "framer-motion";
import AchivModal from "../components/Modal/AchivModal";
import Confetti from "react-confetti";
import {
  Flame,
  Trophy,
  Swords,
  Crown,
  Zap,
  Target,
  TrendingUp,
  Shield,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const { data: habitsData, refetch } = useGetHabitsQuery();
  const [habits, setHabits] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [updateHabit] = useUpdateHabitMutation();

  useEffect(() => {
    if (habitsData) setHabits(habitsData);
  }, [habitsData]);

  // === ЭПИЧНЫЕ ДОСТИЖЕНИЯ ===
  const checkAchievements = (habitName, streak) => {
    const badges = [
      {
        streak: 3,
        badge: "Bronze Forged",
        icon: "Bronze",
        color: "from-orange-500 to-red-600",
      },
      {
        streak: 7,
        badge: "Silver Flame",
        icon: "Silver",
        color: "from-gray-400 to-gray-600",
      },
      {
        streak: 15,
        badge: "Golden Warrior",
        icon: "Gold",
        color: "from-yellow-400 to-amber-600",
      },
      {
        streak: 30,
        badge: "Diamond Legend",
        icon: "Diamond",
        color: "from-cyan-400 to-blue-600",
      },
      {
        streak: 50,
        badge: "Immortal God",
        icon: "Immortal",
        color: "from-purple-600 to-pink-700",
      },
      {
        streak: 100,
        badge: "Eternal Titan",
        icon: "Eternal",
        color: "from-indigo-600 to-purple-800",
      },
    ];

    const earned = badges.find((b) => b.streak === streak);
    if (
      earned &&
      !achievements.find(
        (a) => a.badge === earned.badge && a.habit === habitName
      )
    ) {
      const ach = { habit: habitName, ...earned };
      setAchievements((prev) => [...prev, ach]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 8000);
    }
  };

  const handleDone = async (habit) => {
    const newStreak = (habit.streak || 0) + 1;
    await updateHabit({
      id: habit.id,
      streak: newStreak,
      completedToday: true,
    }).unwrap();
    refetch();
    checkAchievements(habit.name, newStreak);
  };

  // === СТАТИСТИКА ===
  const totalStreaks = habits.reduce((acc, h) => acc + (h.streak || 0), 0);
  const bestStreak = Math.max(...habits.map((h) => h.streak || 0), 0);
  const totalHabits = habits.length;
  const completedToday = habits.filter((h) => h.completedToday).length;

  const chartData = habits.map((h) => ({
    name: h.name.slice(0, 12),
    streak: h.streak || 0,
  }));
  const radialData = [
    {
      name: "Power",
      value: Math.min((totalStreaks / 100) * 100, 100),
      fill: "#a855f7",
    },
  ];

  const pieData = habits.map((h, i) => ({
    name: h.name,
    value: h.streak || 1,
    fill: ["#ff0080", "#8b5cf6", "#06b6d4", "#f59e0b", "#ef4444"][i % 5],
  }));

  return (
    <>
      {showConfetti && (
        <Confetti recycle={false} numberOfPieces={500} gravity={0.06} />
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white relative overflow-hidden">
        {/* Космический фон с частицами */}
        <div className="absolute inset-0 -z-10">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [-100, window.innerHeight + 100] }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-1 h-1 bg-cyan-400/60 rounded-full blur-sm"
              style={{ left: `${Math.random() * 100}%` }}
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
            <h1 className="text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-gradient-x">
              LEGENDARY FORGE
            </h1>
            <p className="text-3xl mt-4 text-purple-300">
              Your Empire of Willpower
            </p>
          </motion.div>

          {/* Ключевые метрики */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              {
                label: "Total Fire",
                value: totalStreaks,
                icon: Flame,
                color: "from-orange-500 to-red-600",
              },
              {
                label: "Longest Streak",
                value: bestStreak,
                icon: Crown,
                color: "from-yellow-400 to-amber-600",
              },
              {
                label: "Habits Forged",
                value: totalHabits,
                icon: Swords,
                color: "from-purple-500 to-pink-600",
              },
              {
                label: "Victories Today",
                value: completedToday,
                icon: Zap,
                color: "from-cyan-400 to-blue-600",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.2 }}
                className="relative group"
              >
                <div
                  className="absolute -inset-2 bg-gradient-to-r opacity-70 blur-xl group-hover:opacity-100 transition duration-1000"
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                    "--tw-gradient-from": stat.color.split(" ")[1],
                    "--tw-gradient-to": stat.color.split(" ")[3],
                  }}
                />
                <div className="relative bg-black/70 backdrop-blur-2xl border border-purple-500/50 rounded-3xl p-8 text-center">
                  <stat.icon className="w-16 h-16 mx-auto mb-4 text-white drop-shadow-2xl" />
                  <p className="text-5xl font-black">{stat.value}</p>
                  <p className="text-purple-300 text-lg mt-2">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Графики */}
          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            {/* Столбчатая диаграмма */}
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-black/60 backdrop-blur-3xl border border-purple-500/30 rounded-3xl p-8"
            >
              <h2 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                Streak Power
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#eee" />
                  <YAxis stroke="#eee" />
                  <Tooltip
                    contentStyle={{
                      background: "#1a0033",
                      border: "2px solid #a855f7",
                    }}
                  />
                  <Bar dataKey="streak" radius={20}>
                    {chartData.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={
                          ["#ff0080", "#8b5cf6", "#06b6d4", "#f59e0b"][i % 4]
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Радиальный прогресс */}
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-black/60 backdrop-blur-3xl border border-purple-500/30 rounded-3xl p-8 flex items-center justify-center"
            >
              <div>
                <h2 className="text-4xl font-bold text-center mb-8">
                  Overall Power Level
                </h2>
                <ResponsiveContainer width={400} height={400}>
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="30%"
                    outerRadius="90%"
                    data={radialData}
                  >
                    <RadialBar
                      dataKey="value"
                      cornerRadius={50}
                      fill="#a855f7"
                      background={{ fill: "#333" }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <p className="text-center text-6xl font-black mt-8">
                  {Math.round((totalStreaks / 100) * 100)}%
                </p>
              </div>
            </motion.div>
          </div>

          {/* Привычки */}
          <h2 className="text-5xl font-black text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500">
            Your Forged Blades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {habits.map((habit, i) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative group"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-1000" />
                <div className="relative bg-black/80 backdrop-blur-2xl border-2 border-purple-500/50 rounded-3xl p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl font-bold">{habit.name}</h3>
                    <div className="text-right">
                      <Flame
                        className={`w-12 h-12 ${
                          habit.streak >= 50
                            ? "text-red-500 animate-pulse"
                            : "text-orange-500"
                        }`}
                      />
                      <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600">
                        {habit.streak || 0}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDone(habit)}
                    className="w-full py-6 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-2xl font-black text-2xl shadow-2xl shadow-cyan-500/70 hover:shadow-emerald-500/90 transition-all"
                  >
                    {habit.completedToday ? "VICTORY CLAIMED" : "CLAIM TODAY"}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Достижения */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-6">
          <AnimatePresence>
            {achievements.slice(-3).map((ach, i) => (
              <AchivModal
                key={`${ach.habit}-${ach.badge}-${i}`}
                habit={ach.habit}
                badge={ach.badge}
                icon={ach.icon}
                color={ach.color}
                onClose={() => {}}
              />
            ))}
          </AnimatePresence>
        </div>
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
          animation: gradient-x 10s ease infinite;
        }
      `}</style>
    </>
  );
};

export default Dashboard;

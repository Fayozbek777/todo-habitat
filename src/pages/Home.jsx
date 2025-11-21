import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal/Modal";
import AchivModal from "../components/Modal/AchivModal";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import {
  useAddHabitMutation,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
  useGetHabitsQuery,
} from "../app/features/apiSlice";
import { Sparkles, Flame, Trophy, Zap } from "lucide-react";

export default function Home() {
  const [achievements, setAchievements] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  const { data: habitsData, refetch } = useGetHabitsQuery();
  const [addHabit] = useAddHabitMutation();
  const [updateHabit] = useUpdateHabitMutation();
  const [deleteHabit] = useDeleteHabitMutation();

  const toggleHabit = async (habit) => {
    try {
      const newStreak = (habit.streak || 0) + 1;
      const updated = await updateHabit({
        id: habit.id,
        completedToday: true,
        streak: newStreak,
      }).unwrap();

      refetch();
      checkAchievements(updated.name, newStreak);
    } catch (err) {
      console.error(err);
    }
  };

  const checkAchievements = (habitName, streak) => {
    let badge = null;
    let icon = null;
    let color = "";

    if (streak === 3) {
      badge = "Bronze Beginner";
      icon = "🥉";
      color = "from-orange-400 to-orange-600";
    } else if (streak === 7) {
      badge = "Silver Streak";
      icon = "🥈";
      color = "from-gray-300 to-gray-500";
    } else if (streak === 15) {
      badge = "Gold Master";
      icon = "🥇";
      color = "from-yellow-400 to-yellow-600";
    } else if (streak === 30) {
      badge = "Diamond Legend";
      icon = "💎";
      color = "from-cyan-400 to-blue-600";
    } else if (streak % 50 === 0 && streak >= 50) {
      badge = "Immortal God";
      icon = "👑";
      color = "from-purple-500 to-pink-600";
    }

    if (
      badge &&
      !achievements.find((a) => a.habit === habitName && a.badge === badge)
    ) {
      setAchievements((prev) => [
        ...prev,
        { habit: habitName, badge, icon, color },
      ]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);
    }
  };

  const handleAddHabit = async (habit) => {
    try {
      if (editingHabit) {
        await updateHabit({ id: editingHabit.id, ...habit }).unwrap();
        setEditingHabit(null);
      } else {
        await addHabit({ ...habit, streak: 0, completedToday: false }).unwrap();
      }
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteHabit = async (id) => {
    await deleteHabit(id).unwrap();
    refetch();
  };

  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <Navbar />

        <main className="container mx-auto  relative top-25 px-4 py-16 max-w-7xl">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
              Habit Forge
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-2xl mx-auto">
              Build unbreakable streaks. Unlock legendary achievements. Become
              unstoppable.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditingHabit(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all"
            >
              <Sparkles className="w-6 h-6" />
              Forge New Habit
            </motion.button>
          </motion.section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {habitsData?.map((habit, index) => (
                <motion.div
                  key={habit.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500"></div>

                  <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-white">
                        {habit.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Flame
                          className={`w-8 h-8 ${
                            habit.streak >= 7
                              ? "text-orange-500"
                              : "text-gray-600"
                          }`}
                        />
                        <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600">
                          {habit.streak || 0}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleHabit(habit)}
                        className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all ${
                          habit.completedToday
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/50"
                            : "bg-slate-800 hover:bg-slate-700 border border-slate-600"
                        }`}
                      >
                        {habit.completedToday ? "Done Today ✅" : "Mark Done"}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditHabit(habit)}
                        className="p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-2xl hover:bg-yellow-500/30 transition"
                      >
                        <Zap className="w-5 h-5 text-yellow-400" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteHabit(habit.id)}
                        className="p-4 bg-red-500/20 border border-red-500/50 rounded-2xl hover:bg-red-500/30 transition"
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
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {!habitsData?.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Trophy className="w-24 h-24 mx-auto mb-6 text-purple-500/50" />
              <p className="text-2xl text-purple-300">
                No habits yet. Start forging your legend!
              </p>
            </motion.div>
          )}
        </main>
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-4">
          <AnimatePresence>
            {achievements.map((ach, index) => (
              <AchivModal
                key={`${ach.habit}-${ach.badge}-${index}`}
                habit={ach.habit}
                badge={ach.badge}
                icon={ach.icon}
                color={ach.color}
                onClose={() =>
                  setAchievements((prev) => prev.filter((_, i) => i !== index))
                }
              />
            ))}
          </AnimatePresence>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingHabit(null);
          }}
          onSubmit={handleAddHabit}
          habit={editingHabit}
        />

        <Footer />
      </div>
    </>
  );
}

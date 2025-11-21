// src/components/Modal/Modal.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Swords, X, Flame } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  habit: editingHabit,
}) {
  const [name, setName] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen && editingHabit) setName(editingHabit.name);
    else if (isOpen) setName("");
  }, [isOpen, editingHabit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsAnimating(true);
    await onSubmit(editingHabit ? { ...editingHabit, name } : { name });
    setTimeout(() => {
      setIsAnimating(false);
      setName("");
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Эпический бэкдроп */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-3xl z-50 flex items-center justify-center p-4 overflow-hidden"
          >
            {/* Плавающие частицы */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  y: "100vh",
                  x: Math.random() * window.innerWidth - window.innerWidth / 2,
                }}
                animate={{ y: "-100vh" }}
                transition={{
                  duration: 8 + Math.random() * 12,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5,
                }}
                className="absolute w-1.5 h-1.5 bg-cyan-400/70 rounded-full blur-sm"
              />
            ))}

            {/* Вращающиеся кольца портала */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-96 h-96 border-8 border-purple-600/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute w-[500px] h-[500px] border-8 border-pink-600/20 rounded-full blur-3xl"
            />
          </motion.div>

          {/* Главная модалка — строго по центру */}
          <motion.div
            initial={{ scale: 0, rotateY: 180, opacity: 0 }}
            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
            exit={{ scale: 0, rotateY: -180, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none" // fixed + flex = 100% центр
          >
            <div className="pointer-events-auto relative w-full max-w-2xl mx-4">
              {/* Неоновый ореол */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-3xl blur-2xl opacity-75 animate-pulse" />

              <div className="relative bg-slate-900/95 backdrop-blur-3xl border-4 border-purple-500/60 rounded-3xl p-10 shadow-5xl overflow-hidden">
                {/* Кнопка закрытия */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-3 bg-red-600/30 border-2 border-red-500/60 rounded-full hover:bg-red-600/50 transition group z-10"
                >
                  <X className="w-8 h-8 text-red-400 group-hover:rotate-90 transition duration-300" />
                </button>

                {/* Заголовок */}
                <div className="text-center mb-12">
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Swords className="w-24 h-24 text-purple-400 mx-auto mb-6 drop-shadow-2xl" />
                  </motion.div>
                  <h2 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 animate-gradient-x">
                    {editingHabit ? "REFORGE" : "FORGE"}
                  </h2>
                  <p className="mt-4 text-2xl font-light text-purple-200">
                    {editingHabit
                      ? "Strengthen the blade."
                      : "Create unbreakable steel."}
                  </p>
                </div>

                {/* Форма */}
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name your legend..."
                      autoFocus
                      className="w-full px-16 py-7 text-3xl font-bold text-white bg-black/40 border-4 border-purple-500/50 rounded-3xl placeholder-purple-400/50 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/30 transition-all duration-500"
                    />
                    <Flame className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 text-orange-500 animate-pulse" />
                  </div>

                  <div className="flex justify-center gap-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={onClose}
                      className="px-10 py-5 bg-gradient-to-r from-gray-800 to-black rounded-2xl font-bold text-xl border-2 border-gray-700 hover:border-gray-500 transition-all"
                    >
                      Cancel
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={!name.trim() || isAnimating}
                      className="px-14 py-7 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl font-black text-3xl shadow-2xl shadow-purple-600/70 hover:shadow-cyan-600/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-5"
                    >
                      <Sparkles className="w-12 h-12" />
                      {editingHabit ? "REFORGE IT" : "FORGE NOW"}
                      {isAnimating && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Flame className="w-12 h-12 text-orange-400" />
                        </motion.div>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Flame, Sparkles, Trophy, Swords, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home", icon: Flame },
    { to: "/dashboard", label: "Dashboard", icon: Trophy },
    { to: "/profile", label: "Profile", icon: Crown },
  ];

  return (
    <motion.nav
      initial={{ y: -120 }}
      animate={{ y: 0 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700   ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-3xl border-b border-purple-500/30 shadow-2xl shadow-purple-600/20"
          : "bg-gradient-to-b from-black/40 via-transparent to-transparent"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-10 right-32 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative">
        <Link to="/" className="relative group">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Flame className="w-12 h-12 text-orange-500 drop-shadow-2xl shadow-orange-500/80" />
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 blur-xl bg-orange-500/60"
              />
            </motion.div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 animate-gradient-x">
                HABIT FORGE
              </h1>
              <p className="text-xs tracking-widest text-purple-400/80 font-light uppercase">
                Unbreakable Since 2025
              </p>
            </div>
          </div>
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-purple-600/40 via-pink-600/40 to-cyan-600/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"
            aria-hidden="true"
          />
        </Link>
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                className="relative group px-6 py-4 rounded-2xl overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-6 h-6 transition-all duration-500 ${
                      isActive
                        ? "text-cyan-400 scale-125"
                        : "text-purple-300 group-hover:text-white"
                    }`}
                  />
                  <span
                    className={`font-bold text-lg transition-all ${
                      isActive
                        ? "text-white"
                        : "text-purple-200 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-pink-600/40 rounded-2xl border border-purple-400/60"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
            );
          })}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative p-4 bg-white/5 backdrop-blur-2xl border border-purple-500/30 rounded-2xl hover:bg-white/10 transition-all group"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              {isOpen ? (
                <X className="w-8 h-8 text-cyan-400" />
              ) : (
                <Swords className="w-8 h-8 text-purple-400 group-hover:text-cyan-400 transition" />
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-gradient-to-br from-slate-950 via-purple-950 to-pink-950 border-l border-purple-500/50 z-50 overflow-hidden"
            >
              <div className="p-10 pt-32 text-center">
                <motion.h2
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-20"
                >
                  THE FORGE
                </motion.h2>

                {navItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => setIsOpen(false)}
                        className="block py-8 my-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-purple-500/30 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-600/30 hover:border-cyan-400 transition-all group"
                      >
                        <div className="flex items-center justify-center gap-6 text-3xl font-bold">
                          <Icon className="w-12 h-12 text-purple-300 group-hover:text-cyan-400 transition" />
                          <span className="text-white">{item.label}</span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
    </motion.nav>
  );
}

import React from "react";
import {
  Flame,
  Sparkles,
  Heart,
  Github,
  Twitter,
  Mail,
  Sword,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-gradient-to-t from-black via-slate-950 to-slate-900 border-t border-purple-800/50">
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -1000],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
            className="absolute w-2 h-2 bg-cyan-400/60 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-10px",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <Sword className="w-12 h-12 text-purple-500" />
              <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
                HABIT FORGE
              </h2>
            </div>
            <p className="text-purple-300 text-lg leading-relaxed max-w-sm">
              Where mortals become legends. Every day is a battle. Every streak
              is victory.
            </p>
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-cyan-400 animate-pulse" />
              <span className="text-sm text-purple-400">
                Protected by unbreakable will
              </span>
            </div>
          </motion.div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              The Codex
            </h3>
            <ul className="space-y-4 text-purple-200">
              {[
                "The Beginning",
                "The Journey",
                "The Legends",
                "The Code",
                "The Oath",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-cyan-400 transition-all hover:translate-x-3 block"
                  >
                    → {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">The Brotherhood</h3>
            <div className="flex gap-5">
              {[Github, Twitter, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-5 bg-purple-500/10 border border-purple-500/30 rounded-2xl hover:bg-purple-500/20 hover:border-cyan-400 transition-all"
                >
                  <Icon className="w-8 h-8 text-purple-300 hover:text-cyan-400 transition" />
                </motion.a>
              ))}
            </div>
          </div>
          <div className="text-center md:text-right space-y-6">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block"
            >
              <Heart className="w-16 h-16 text-red-500 fill-red-500 drop-shadow-2xl shadow-red-500/50" />
            </motion.div>
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              Forged in Fire.
              <br />
              Built to Last.
            </p>
            <p className="text-purple-400 text-sm">© 2025 — Eternity</p>
          </div>
        </div>

        {/* Bottom Glow Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5 }}
          className="mt-20 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        />
      </div>
    </footer>
  );
}

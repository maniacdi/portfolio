"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./EasterEggs.scss";


const EASTER_EGGS = [
  {
    sequence: ["b", "n", "b"], 
    id: "banana",
    component: BananaToast,
    duration: 3000,
  },
  {
    sequence: ["w", "o", "w"], 
    id: "wow",
    component: WowToast,
    duration: 3000,
  },
];

interface Toast {
  id: string;
  eggId: string;
  component: React.ComponentType;
}

export default function EasterEggs() {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [activeToasts, setActiveToasts] = useState<Toast[]>([]);
  const [lastKeyTime, setLastKeyTime] = useState(Date.now());

  // Timeout to reset sequence if user types too slowly
  const SEQUENCE_TIMEOUT = 2000;

  const checkForEasterEgg = useCallback((sequence: string[]) => {
    for (const egg of EASTER_EGGS) {
      const lastKeys = sequence.slice(-egg.sequence.length);
      
      if (
        lastKeys.length === egg.sequence.length &&
        lastKeys.every((key, index) => key === egg.sequence[index])
      ) {
        const newToast: Toast = {
          id: `${egg.id}-${Date.now()}`,
          eggId: egg.id,
          component: egg.component,
        };

        setActiveToasts((prev) => [...prev, newToast]);

        setTimeout(() => {
          setActiveToasts((prev) => prev.filter((t) => t.id !== newToast.id));
        }, egg.duration);

        setKeySequence([]);
        return true;
      }
    }
    return false;
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const now = Date.now();

      if (now - lastKeyTime > SEQUENCE_TIMEOUT) {
        setKeySequence([e.key.toLowerCase()]);
      } else {
        setKeySequence((prev) => {
          const newSequence = [...prev, e.key.toLowerCase()];
          
          if (newSequence.length > 20) {
            newSequence.shift();
          }

          checkForEasterEgg(newSequence);

          return newSequence;
        });
      }

      setLastKeyTime(now);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [lastKeyTime, checkForEasterEgg]);

  return (
    <div className="easter-eggs-container">
      <AnimatePresence>
        {activeToasts.map((toast, index) => {
          const ToastComponent = toast.component;
          return <ToastComponent key={`${toast.id}-${index}`} />;
        })}
      </AnimatePresence>
    </div>
  );
}

// 🍌 BANANA TOAST 
function BananaToast() {
  return (
    <motion.div
      className="easter-egg-toast banana-toast"
      initial={{ y: "100vh", rotate: -20, scale: 0.5 }}
      animate={{
        y: [
          "100vh",   // Start down
          "60vh",   // Go up
          "100vh",   // And fall back down
        ],
        scale: [0.5,  5, 0.5],
      }}
      transition={{
        duration: 3,
        times: [0,  0.5, 1],
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <div className="toast-content">
        <div className="banana-emoji">🍌</div>
      </div>
    </motion.div>
  );
}

// 🎉 WOW TOAST 
function WowToast() {
  return (
    <motion.div
      className="easter-egg-toast wow-toast"
      initial={{ scale: 0, rotate: 0 }}
      animate={{
         y: [
          "100vh",   // Start down
          "60vh",   // Go up
          "100vh",   // And fall back down
        ],
        scale: [0, 1, 0],
        rotate: [0, 360, 720],
      }}
      transition={{ duration: 3 }}
      exit={{ opacity: 0 }}
    >
      <div className="toast-content">
        <motion.div
          className="wow-emoji"
          animate={{
            scale: [1, 1.2, 1, 1.2, 1],
          }}
          transition={{ duration: 0.5, repeat: 5 }}
        >
          🎉
        </motion.div>
        <p className="wow-text">WOW!</p>
        
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="confetti"
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
            }}
            animate={{
              x: Math.cos((i * 360) / 20 * Math.PI / 180) * 200,
              y: Math.sin((i * 360) / 20 * Math.PI / 180) * 200,
              opacity: 0,
            }}
            transition={{ duration: 1.5 }}
          >
            {["🎊", "🎉", "✨", "⭐", "💫"][i % 5]}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { AnimatePresence, motion } from "framer-motion";

import Terminal from "./Terminal";

import "./EasterEggs.scss";

const EASTER_EGGS = [
  {
    sequence: ["b", "n", "b"],
    id: "banana",
    name: "Banana Jump",
    component: BananaToast,
    duration: 3000,
  },
  {
    sequence: ["w", "o", "w"],
    id: "wow",
    name: "WOW Party",
    component: WowToast,
    duration: 3000,
  },
  {
    sequence: ["k", "u", "n", "a", "i"],
    id: "kunai",
    name: "Kunai Naruto",
    component: KunaiToast,
    duration: 4000,
  },
  {
    sequence: ["h", "e", "l", "p"],
    id: "terminal",
    name: "Terminal",
    component: null,
    duration: 0,
  },
  {
    sequence: ["b", "a", "n", "k", "a", "i"],
    id: "senbonzakura",
    name: "Senbonzakura",
    component: SenbonzakuraToast,
    duration: 6000,
  },
];

const STORAGE_KEY = "portfolio-easter-eggs";

interface Toast {
  id: string;
  eggId: string;
  component: React.ComponentType;
}

export default function EasterEggs() {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [activeToasts, setActiveToasts] = useState<Toast[]>([]);
  const [lastKeyTime, setLastKeyTime] = useState(Date.now());
  const [foundEggs, setFoundEggs] = useState<Set<string>>(new Set());
  const [showProgress, setShowProgress] = useState(false);
  const [justCompletedAll, setJustCompletedAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const t = useTranslations("easterEggs");

  const SEQUENCE_TIMEOUT = 3000;

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setFoundEggs(new Set(JSON.parse(saved)));
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const saveProgress = (eggId: string) => {
    const newFound = new Set(foundEggs);
    newFound.add(eggId);
    setFoundEggs(newFound);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...newFound]));
    return newFound;
  };

  const checkForEasterEgg = useCallback(
    (sequence: string[]) => {
      for (const egg of EASTER_EGGS) {
        const lastKeys = sequence.slice(-egg.sequence.length);

        if (
          lastKeys.length === egg.sequence.length &&
          lastKeys.every((key, index) => key === egg.sequence[index])
        ) {
          if (egg.id === "terminal") {
            setShowTerminal(true);
            const wasFirstTime = !foundEggs.has(egg.id);
            const updatedFound = saveProgress(egg.id);
            if (wasFirstTime && updatedFound.size === EASTER_EGGS.length) setJustCompletedAll(true);
            setKeySequence([]);
            return true;
          }

          const newToast: Toast = {
            id: `${egg.id}-${Date.now()}`,
            eggId: egg.id,
            component: egg.component!,
          };

          setActiveToasts((prev) => [...prev, newToast]);

          const wasFirstTime = !foundEggs.has(egg.id);
          const updatedFound = saveProgress(egg.id);
          if (wasFirstTime && updatedFound.size === EASTER_EGGS.length) setJustCompletedAll(true);

          setTimeout(() => {
            setActiveToasts((prev) => prev.filter((t) => t.id !== newToast.id));
          }, egg.duration);

          setKeySequence([]);
          return true;
        }
      }
      return false;
    },
    [foundEggs]
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const now = Date.now();

      if (now - lastKeyTime > SEQUENCE_TIMEOUT) {
        setKeySequence([e.key.toLowerCase()]);
      } else {
        setKeySequence((prev) => {
          const newSequence = [...prev, e.key.toLowerCase()];
          if (newSequence.length > 20) newSequence.shift();
          checkForEasterEgg(newSequence);
          return newSequence;
        });
      }

      setLastKeyTime(now);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [lastKeyTime, checkForEasterEgg]);

  const progress = (foundEggs.size / EASTER_EGGS.length) * 100;
  const allFound = foundEggs.size === EASTER_EGGS.length;

  return (
    <>
      <div className="easter-eggs-container">
        <AnimatePresence>
          {activeToasts.map((toast, index) => {
            const ToastComponent = toast.component;
            return <ToastComponent key={`${toast.id}-${index}`} />;
          })}
        </AnimatePresence>
      </div>

      {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}

      <motion.button
        className={`easter-egg-progress-button ${allFound ? "completed" : ""}`}
        onClick={() => setShowProgress(!showProgress)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        {allFound ? "🏆" : "🎮"}
        <span className="progress-count">
          {foundEggs.size}/{EASTER_EGGS.length}
        </span>
      </motion.button>

      <AnimatePresence>
        {showProgress && (
          <motion.div
            className="easter-egg-progress-panel"
            initial={{ opacity: 0, x: -400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -400 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="panel-header">
              <h3>🎮 {t("title")}</h3>
              <button className="close-button" onClick={() => setShowProgress(false)}>
                ✕
              </button>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="progress-text">
                {foundEggs.size} / {EASTER_EGGS.length} {t("state")}
              </p>
            </div>

            <div className="eggs-list">
              {EASTER_EGGS.map((egg) => {
                const found = foundEggs.has(egg.id);
                return (
                  <motion.div
                    key={egg.id}
                    className={`egg-item ${found ? "found" : "locked"}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={found ? { scale: 1.05 } : {}}
                  >
                    <div className="egg-icon">{found ? "✅" : "🔒"}</div>
                    <div className="egg-info">
                      <p className="egg-name">{found ? egg.name : "???"}</p>
                      <p className="egg-hint">
                        {found
                          ? `Código: ${egg.sequence.join(" ").toUpperCase()}`
                          : `${egg.sequence.length} ${t("keys")}`}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button
              className="reset-button"
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY);
                setFoundEggs(new Set());
                setShowProgress(false);
              }}
            >
              🔄 {t("resetProgress")}
            </button>
            {isMobile && <p className="mobile-warning">{t("only")}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// 🍌 BANANA TOAST
function BananaToast() {
  return (
    <motion.div
      className="easter-egg-toast banana-toast"
      initial={{ y: "100vh", rotate: -20, scale: 0.5 }}
      animate={{ y: ["100vh", "60vh", "100vh"], scale: [0.5, 5, 0.5] }}
      transition={{ duration: 3, times: [0, 0.5, 1], ease: [0.43, 0.13, 0.23, 0.96] }}
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
      animate={{ y: ["100vh", "60vh", "100vh"], scale: [0, 1, 0], rotate: [0, 360, 720] }}
      transition={{ duration: 3 }}
      exit={{ opacity: 0 }}
    >
      <div className="toast-content">
        <motion.div
          className="wow-emoji"
          animate={{ scale: [1, 1.2, 1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: 5 }}
        >
          🎉
        </motion.div>
        <p className="wow-text">WOW!</p>

        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="confetti"
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos(((i * 360) / 20) * (Math.PI / 180)) * 200,
              y: Math.sin(((i * 360) / 20) * (Math.PI / 180)) * 200,
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

// 🔪 KUNAI TOAST
function KunaiToast() {
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    if (!audioPlayed) {
      const audio = new Audio("/easters/Naruto-theme.mp3");
      audio.volume = 0.5;
      audio.play().catch((err) => console.log("Audio play failed:", err));

      document.body.classList.add("kunai-impact");
      setTimeout(() => document.body.classList.remove("kunai-impact"), 900);

      setAudioPlayed(true);
    }
  }, [audioPlayed]);

  return (
    <motion.div
      className="easter-egg-toast kunai-toast"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10000,
      }}
      initial={{ x: "60vw", y: 0, rotate: -45, opacity: 1 }}
      animate={{ x: 0, y: 0, rotate: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0, 0.2, 1] }}
    >
      <div className="toast-content kunai-content">
        <motion.img
          src="/easters/kunai.png"
          alt="Kunai"
          className="kunai-image"
          animate={{ rotate: [0, -3, 3, 0] }}
          transition={{ delay: 0.5, duration: 0.3 }}
        />

        <motion.div
          className="impact-effect"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            delay: 0,
            duration: 0.6,
            ease: "easeOut",
          }}
        />

        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`smoke-${i}`}
            className="smoke-particle"
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: Math.cos(((i * 360) / 12) * (Math.PI / 180)) * 80,
              y: Math.sin(((i * 360) / 12) * (Math.PI / 180)) * 80,
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              delay: 0.2 + i * 0.01,
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            💨
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// 🌸 SENBONZAKURA KAGEYOSHI TOAST
function SenbonzakuraToast() {
  const mainPetals = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
    rotation: Math.random() * 360,
    size: 20 + Math.random() * 28,
    xWave: (Math.random() - 0.5) * 120,
    initialRotation: Math.random() * 360,
  }));

  const spiralPetals = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * 360) / 24;
    const radius = 120 + i * 8;
    return {
      id: i,
      angle,
      radius,
      delay: 1 + i * 0.04,
      size: 16 + Math.random() * 20,
      rotation: Math.random() * 360,
    };
  });

  return (
    <>
      <motion.div
        className="senbonzakura-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      />

      <motion.div
        className="easter-egg-toast senbonzakura-toast"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {mainPetals.map((petal) => (
          <motion.img
            key={`petal-${petal.id}`}
            src="/easters/sakura-petal.png"
            alt=""
            aria-hidden="true"
            className="sakura-petal"
            style={{
              left: `${petal.left}%`,
              top: "-60px",
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              position: "absolute",
              objectFit: "contain",
              pointerEvents: "none",
            }}
            initial={{
              y: -60,
              x: 0,
              rotate: petal.initialRotation,
              opacity: 0,
            }}
            animate={{
              y: "110vh",
              x: [0, petal.xWave * 0.4, petal.xWave * -0.3, petal.xWave * 0.6, 0],
              rotate: petal.initialRotation + 540,
              opacity: [0, 0.9, 0.9, 0.7, 0],
            }}
            transition={{
              delay: petal.delay,
              duration: petal.duration,
              ease: "linear",
              x: { duration: petal.duration, ease: "easeInOut" },
            }}
          />
        ))}

        {spiralPetals.map((petal) => (
          <motion.img
            key={`spiral-${petal.id}`}
            src="/easters/sakura-petal.png"
            alt=""
            aria-hidden="true"
            className="sakura-petal-spiral"
            style={{
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              position: "absolute",
              objectFit: "contain",
              pointerEvents: "none",
            }}
            initial={{
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
              scale: 0,
              opacity: 0,
              rotate: petal.rotation,
            }}
            animate={{
              x: `calc(-50% + ${Math.cos((petal.angle * Math.PI) / 180) * petal.radius}px)`,
              y: `calc(-50% + ${Math.sin((petal.angle * Math.PI) / 180) * petal.radius}px)`,
              scale: [0, 1.2, 0],
              opacity: [0, 1, 0],
              rotate: petal.rotation + 360,
            }}
            transition={{
              delay: petal.delay,
              duration: 2.5,
              ease: "easeOut",
            }}
          />
        ))}

        <motion.div
          className="shockwave"
          initial={{ scale: 0, opacity: 0.7 }}
          animate={{ scale: 5, opacity: 0 }}
          transition={{ delay: 0.5, duration: 1.8, ease: "easeOut" }}
        />

        {[0, 0.35, 0.7].map((delay, i) => (
          <motion.div
            key={`ring-${i}`}
            className="energy-ring"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ delay: 0.8 + delay, duration: 2, ease: "easeOut" }}
          />
        ))}
      </motion.div>
    </>
  );
}

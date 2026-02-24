"use client";

import { AnimatePresence,motion } from "framer-motion";

import { useGlobalStore } from "@/app/store/useGlobalStore";

import "./LoadingModal.scss";

export default function LoadingModal() {
  const { isLoading, loadingMessage } = useGlobalStore();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="loading-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            {/* Neon ring animation */}
            <div className="neon-ring">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>

            {/* Loading text */}
            <div className="loading-content">
              <h3 className="loading-title">MagaldiDev</h3>
              <p className="loading-message">{loadingMessage}</p>
            </div>

            {/* Dots animation */}
            <div className="dots-container">
              <div className="dot dot-1"></div>
              <div className="dot dot-2"></div>
              <div className="dot dot-3"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

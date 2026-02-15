"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";
import "./ToastProvider.scss";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (type: ToastType, message: string, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, duration = 5000) => {
      const id = `${Date.now()}-${Math.random()}`;
      const newToast: Toast = { id, type, message, duration };

      setToasts((prev) => [...prev, newToast]);

      // Auto-remove after duration
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  // Convenience methods
  const success = useCallback(
    (message: string, duration?: number) => showToast("success", message, duration),
    [showToast]
  );

  const error = useCallback(
    (message: string, duration?: number) => showToast("error", message, duration),
    [showToast]
  );

  const info = useCallback(
    (message: string, duration?: number) => showToast("info", message, duration),
    [showToast]
  );

  const warning = useCallback(
    (message: string, duration?: number) => showToast("warning", message, duration),
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, success, error, info, warning }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

// Custom hook to use toasts
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Toast Container Component
function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Individual Toast Component
function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle size={20} />;
      case "error":
        return <XCircle size={20} />;
      case "warning":
        return <AlertTriangle size={20} />;
      case "info":
        return <Info size={20} />;
    }
  };

  const getTitle = () => {
    switch (toast.type) {
      case "success":
        return "¡Éxito!";
      case "error":
        return "Error";
      case "warning":
        return "Advertencia";
      case "info":
        return "Información";
    }
  };

  return (
    <motion.div
      className={`toast toast-${toast.type}`}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      layout
    >
      <div className="toast-icon">{getIcon()}</div>

      <div className="toast-content">
        <p className="toast-title">{getTitle()}</p>
        <p className="toast-message">{toast.message}</p>
      </div>

      <button className="toast-close" onClick={() => onRemove(toast.id)}>
        <X size={16} />
      </button>

      {/* Progress bar */}
      {toast.duration && toast.duration > 0 && (
        <motion.div
          className="toast-progress"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: toast.duration / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
}

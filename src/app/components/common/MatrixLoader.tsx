"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./MatrixLoader.scss";

export default function MatrixLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [code, setCode] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const hackerText =
    "01101000 01100001 01100011 01101011 01100101 01110010 00100000 01101101 01101111 01100100 01100101 00100000 01100101 01101110 01100111 01100001 01100111 01100101 01100100";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(10, 14, 26, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    let i = 0;
    const typeWriter = setInterval(() => {
      if (i < hackerText.length) {
        setCode((prev) => prev + hackerText.charAt(i));
        i++;
      } else {
        clearInterval(typeWriter);
        setTimeout(() => setIsComplete(true), 1000);
      }
    }, 50);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(typeWriter);
    };
  }, []);

  if (isComplete) return null;

  return (
    <motion.div
      className="matrix-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <canvas ref={canvasRef} className="matrix-canvas" />

      <div className="matrix-content">
        <div className="matrix-header">
          <h1 className="matrix-title">SYSTEM BOOT</h1>
          <div className="matrix-status">
            <span className="status-dot active" />
            <span>INITIALIZING</span>
          </div>
        </div>

        <div className="matrix-terminal">
          <div className="terminal-output">
            <pre className="code">
              <code>{code}</code>
              <span className="cursor">|</span>
            </pre>
          </div>

          <div className="terminal-stats">
            <div className="stat">
              <span className="stat-label">CPU</span>
              <div className="stat-bar">
                <motion.div
                  className="stat-fill"
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </div>

            <div className="stat">
              <span className="stat-label">MEM</span>
              <div className="stat-bar">
                <motion.div
                  className="stat-fill"
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  transition={{ duration: 2, delay: 0.2 }}
                />
              </div>
            </div>

            <div className="stat">
              <span className="stat-label">GPU</span>
              <div className="stat-bar">
                <motion.div
                  className="stat-fill"
                  initial={{ width: 0 }}
                  animate={{ width: "95%" }}
                  transition={{ duration: 2, delay: 0.4 }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="matrix-footer">
          <span className="hint">{">"} ENTERING PORTFOLIO SPACE</span>
          <div className="scan-line" />
        </div>
      </div>
    </motion.div>
  );
}

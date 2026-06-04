"use client";

import { JSX,useEffect, useRef, useState } from "react";
import { useLocale,useTranslations } from "next-intl";

import { AnimatePresence,motion } from "framer-motion";

import "./Terminal.scss";

interface CommandOutput {
  id: string;
  command: string;
  output: string | JSX.Element;
  timestamp: Date;
}

interface Command {
  name: string;
  description: string;
  execute: () => string | JSX.Element;
}

interface TerminalProps {
  onClose: () => void;
}

export default function Terminal({ onClose }: TerminalProps) {
  const t = useTranslations("terminal");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(true);
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: { [key: string]: Command } = {
    help: {
      name: "help",
      description: locale === "es" ? "Muestra todos los comandos disponibles" : "Show all available commands",
      execute: () => (
        <div className="help-output">
          <p className="help-title">{t("availableCommands")}:</p>
          <div className="commands-list">
            {Object.entries(commands).map(([cmd, info]) => (
              <div key={cmd} className="command-item">
                <span className="command-name">{cmd}</span>
                <span className="command-desc">{info.description}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    about: {
      name: "about",
      description: locale === "es" ? "Información sobre Javi" : "Information about Javi",
      execute: () => {
        const loading = locale === "es" ? "Cargando" : "Loading";
        setTimeout(() => {
          const aboutText =
            locale === "es"
              ? `┌─────────────────────────────────────┐
│  JAVIER GARCÍA MAGALDI              │
│  Front-End Engineer                 │
├─────────────────────────────────────┤
│  📍 Santander, España               │
│  💼 AMS Solutions (Inditex)         │
│  🎓 Computer Science @ UC           │
│  💻 React · Vue · TypeScript        │
│  🚀 ~5 años experiencia             │
└─────────────────────────────────────┘

"Me apasiona crear experiencias web de calidad,
optimizar rendimiento y escribir código escalable."`
              : `┌─────────────────────────────────────┐
│  JAVIER GARCÍA MAGALDI              │
│  Front-End Engineer                 │
├─────────────────────────────────────┤
│  📍 Santander, Spain                │
│  💼 AMS Solutions (Inditex)         │
│  🎓 Computer Science @ UC           │
│  💻 React · Vue · TypeScript        │
│  🚀 ~5 years experience             │
└─────────────────────────────────────┘

"Passionate about creating quality web experiences,
optimizing performance and writing scalable code."`;

          addOutput("about", <pre className="ascii-art">{aboutText}</pre>);
        }, 1500);

        return `[${loading}...] ████████ 100%`;
      },
    },

    skills: {
      name: "skills",
      description: locale === "es" ? "Muestra el stack tecnológico" : "Show tech stack",
      execute: () => (
        <div className="skills-output">
          <div className="skill-category">
            <span className="category-title">Frontend:</span>
            <span className="category-items">React, Vue, TypeScript, JavaScript, HTML5, CSS3/SASS, Tailwind, Framer Motion</span>
          </div>
          <div className="skill-category">
            <span className="category-title">Backend:</span>
            <span className="category-items">Node.js, Express, BFF, Java</span>
          </div>
          <div className="skill-category">
            <span className="category-title">Database:</span>
            <span className="category-items">MongoDB, MySQL, SQL Server</span>
          </div>
          <div className="skill-category">
            <span className="category-title">Testing:</span>
            <span className="category-items">Jest, Cypress</span>
          </div>
          <div className="skill-category">
            <span className="category-title">DevOps:</span>
            <span className="category-items">Git/GitHub, Docker, AWS, Vercel</span>
          </div>
        </div>
      ),
    },

    projects: {
      name: "projects",
      description: locale === "es" ? "Lista proyectos destacados" : "List featured projects",
      execute: () => (
        <div className="projects-output">
          <div className="project-item">
            <span className="project-name">[1] Portfolio Full-Stack</span>
            <span className="project-tech">Next.js, React, Node.js, MongoDB</span>
            <span className="project-link">→ github.com/maniacdi/portfolio</span>
          </div>
          <div className="project-item">
            <span className="project-name">[2] Porra Mundial</span>
            <span className="project-tech">JavaScript, Supabase, Realtime</span>
            <span className="project-link">→ github.com/maniacdi/porra-mundial</span>
          </div>
          <div className="project-item">
            <span className="project-name">[3] Pokemon App</span>
            <span className="project-tech">Node.js, Express, PokéAPI</span>
            <span className="project-link">→ github.com/maniacdi/pokemon-app</span>
          </div>
          <div className="project-item">
            <span className="project-name">[4] AMS Technical Test</span>
            <span className="project-tech">React, E-commerce SPA</span>
            <span className="project-link">→ github.com/maniacdi/ams-test</span>
          </div>
        </div>
      ),
    },

    experience: {
      name: "experience",
      description: locale === "es" ? "Experiencia laboral" : "Work experience",
      execute: () => (
        <div className="experience-output">
          <div className="job-item">
            <span className="job-title">Front-End Engineer @ AMS Solutions</span>
            <span className="job-period"> {locale === "es" ? "May 2023 - Actualidad" : "May 2023 - Present"}</span>
            <span className="job-desc">• {locale === "es" ? "Desarrollo apps para Inditex (miles de usuarios)" : "Developing apps for Inditex (thousands of users)"}</span>
            <span className="job-desc">• {locale === "es" ? "Lideré plataforma unificada de componentes" : "Led unified component platform"}</span>
            <span className="job-desc">• {locale === "es" ? "Implementé BFF que redujo tiempos ~60%" : "Implemented BFF that reduced times ~60%"}</span>
          </div>
          <div className="job-item">
            <span className="job-title">Front-End Developer @ Innova-tsn</span>
            <span className="job-period"> {locale === "es" ? "Ago 2022 - May 2023" : "Aug 2022 - May 2023"}</span>
            <span className="job-desc">• {locale === "es" ? "Consultoría frontend para clientes corporativos" : "Frontend consulting for corporate clients"}</span>
          </div>
          <div className="job-item">
            <span className="job-title">Front-End Developer @ Incentro</span>
            <span className="job-period"> {locale === "es" ? "Sep 2020 - Ago 2022" : "Sep 2020 - Aug 2022"}</span>
            <span className="job-desc">• {locale === "es" ? "Rediseñé webs corporativas desde cero" : "Redesigned corporate websites from scratch"}</span>
            <span className="job-desc">• {locale === "es" ? "Gestioné e-commerce de gran volumen" : "Managed high-volume e-commerce"}</span>
          </div>
        </div>
      ),
    },

    contact: {
      name: "contact",
      description: locale === "es" ? "Información de contacto" : "Contact information",
      execute: () => (
        <div className="contact-output">
          <p>📧 Email: {locale === "es" ? "Disponible en el formulario del portfolio" : "Available in portfolio form"}</p>
          <p>💼 LinkedIn: linkedin.com/in/javimagaldi</p>
          <p>🐙 GitHub: github.com/maniacdi</p>
          <p>🌐 Portfolio: magaldidev.com</p>
          <p className="contact-note">
            {locale === "es"
              ? "💡 Abierto a oportunidades interesantes!"
              : "💡 Open to interesting opportunities!"}
          </p>
        </div>
      ),
    },

    clear: {
      name: "clear",
      description: locale === "es" ? "Limpia el terminal" : "Clear terminal",
      execute: () => {
        setHistory([]);
        return "";
      },
    },

    eastereggs: {
      name: "eastereggs",
      description: locale === "es" ? "Muestra los easter eggs disponibles" : "Show available easter eggs",
      execute: () => (
        <div className="eastereggs-output">
          <p className="ee-title">{locale === "es" ? "🎮 Easter Eggs Disponibles:" : "🎮 Available Easter Eggs:"}</p>
          <div className="ee-list">
            <div className="ee-item">
              <span className="ee-code">b n b</span>
              <span className="ee-name">→ Banana Jump</span>
            </div>
            <div className="ee-item">
              <span className="ee-code">w o w</span>
              <span className="ee-name">→ WOW Party</span>
            </div>
            <div className="ee-item">
              <span className="ee-code">k u n a i</span>
              <span className="ee-name">→ Kunai Naruto 🔪</span>
            </div>
            <div className="ee-item">
              <span className="ee-code">h e l p</span>
              <span className="ee-name">→ {locale === "es" ? "Este terminal" : "This terminal"} 🖥️</span>
            </div>
            <div className="ee-item">
              <span className="ee-code">b a n k a i</span>
              <span className="ee-name">→ Senbonzakura Kageyoshi 🌸</span>
            </div>
          </div>
        </div>
      ),
    },

    whoami: {
      name: "whoami",
      description: locale === "es" ? "¿Quién soy?" : "Who am I?",
      execute: () => "javi@portfolio:~$ Front-End Engineer | React & Vue Specialist",
    },

    pwd: {
      name: "pwd",
      description: locale === "es" ? "Directorio actual" : "Current directory",
      execute: () => "/home/javimagaldi/portfolio",
    },

    date: {
      name: "date",
      description: locale === "es" ? "Muestra la fecha actual" : "Show current date",
      execute: () => new Date().toString(),
    },
  };

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const addOutput = (command: string, output: string | JSX.Element) => {
    const newOutput: CommandOutput = {
      id: `${Date.now()}-${Math.random()}`,
      command,
      output,
      timestamp: new Date(),
    };
    setHistory((prev) => [...prev, newOutput]);
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (!trimmedCmd) return;

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd].execute();
      if (output) {
        addOutput(cmd, output);
      }
    } else {
      const errorMsg =
        locale === "es"
          ? `Comando no encontrado: ${cmd}. Escribe 'help' para ver comandos disponibles.`
          : `Command not found: ${cmd}. Type 'help' to see available commands.`;
      addOutput(cmd, <span className="error-text">{errorMsg}</span>);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      executeCommand(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="terminal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="terminal-window"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="btn btn-close" onClick={handleClose}></span>
                <span className="btn btn-minimize"></span>
                <span className="btn btn-maximize"></span>
              </div>
              <div className="terminal-title">javi@portfolio:~$</div>
            </div>

            <div className="terminal-body" ref={terminalRef}>
              <div className="welcome-message">
                <pre className="ascii-logo">{`
╔══════════════════════════════════════╗
║   JAVI'S PORTFOLIO TERMINAL v1.0    ║
╚══════════════════════════════════════╝`}</pre>
                <p className="welcome-text">
                  {locale === "es"
                    ? "Escribe 'help' para ver comandos disponibles"
                    : "Type 'help' to see available commands"}
                </p>
              </div>

              {history.map((item) => (
                <div key={item.id} className="command-output">
                  <div className="command-input-line">
                    <span className="prompt">javi@portfolio:~$</span>
                    <span className="command-text">{item.command}</span>
                  </div>
                  <div className="output-content">{item.output}</div>
                </div>
              ))}

              <form onSubmit={handleSubmit} className="command-input">
                <span className="prompt">javi@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-input"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function openTerminal() {
  const event = new CustomEvent("openTerminal");
  window.dispatchEvent(event);
}
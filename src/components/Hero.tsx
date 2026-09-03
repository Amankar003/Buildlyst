"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TypewriterPair {
  slot1: string;
  slot2: string;
}

const HERO_PAIRS: TypewriterPair[] = [
  { slot1: "AI Agents", slot2: "Enterprise Ops" },
  { slot1: "Gen AI", slot2: "Custom Data" },
  { slot1: "ML Models", slot2: "Smart Decisions" },
  { slot1: "AI Systems", slot2: "Market Insights" },
  { slot1: "Web Apps", slot2: "User Growth" },
  { slot1: "Smart AI", slot2: "Quality & Scale" },
  { slot1: "Cloud Tech", slot2: "Speed & Scale" },
  { slot1: "Data Tech", slot2: "Live Analytics" },
  { slot1: "RAG Tech", slot2: "Team Speed" },
];

const CHAT_SCENARIOS = [
  {
    problem: "I am suffering from a complex data infrastructure problem where pipelines are too slow.",
    solution: "If you want a solution for this problem, then you have to consult to Buildlyst.",
  },
  {
    problem: "Our current LLM deployment is hallucinating and lacks enterprise security.",
    solution: "To architect a secure, fine-tuned RAG system, you have to consult to Buildlyst.",
  },
  {
    problem: "We need an autonomous agent to handle our real-time market analysis.",
    solution: "For enterprise-grade autonomous AI agents, you have to consult to Buildlyst.",
  },
];

interface ChatMessage {
  text: string;
  sender: "user" | "ai";
  isTyping?: boolean;
}

export default function Hero() {
  // 1. Typewriter state
  const [pairIdx, setPairIdx] = useState(0);
  const [text1, setText1] = useState(HERO_PAIRS[0].slot1);
  const [text2, setText2] = useState(HERO_PAIRS[0].slot2);

  // 2. Chat simulation state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Typewriter Effect
  useEffect(() => {
    let active = true;
    let currentPairIdx = 0;
    let charIdx1 = HERO_PAIRS[0].slot1.length;
    let charIdx2 = HERO_PAIRS[0].slot2.length;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const runTypewriter = () => {
      if (!active) return;
      const currentPair = HERO_PAIRS[currentPairIdx];
      const target1 = currentPair.slot1;
      const target2 = currentPair.slot2;

      if (!isDeleting) {
        let d1 = false;
        let d2 = false;

        if (charIdx1 < target1.length) {
          charIdx1++;
          setText1(target1.substring(0, charIdx1));
        } else {
          d1 = true;
        }

        if (charIdx2 < target2.length) {
          charIdx2++;
          setText2(target2.substring(0, charIdx2));
        } else {
          d2 = true;
        }

        if (d1 && d2) {
          timer = setTimeout(() => {
            isDeleting = true;
            runTypewriter();
          }, 2200);
          return;
        }
        timer = setTimeout(runTypewriter, 60);
      } else {
        if (charIdx1 > 0) {
          charIdx1--;
          setText1(target1.substring(0, charIdx1));
        }
        if (charIdx2 > 0) {
          charIdx2--;
          setText2(target2.substring(0, charIdx2));
        }

        if (charIdx1 === 0 && charIdx2 === 0) {
          isDeleting = false;
          currentPairIdx = (currentPairIdx + 1) % HERO_PAIRS.length;
          setPairIdx(currentPairIdx);
          timer = setTimeout(runTypewriter, 300);
          return;
        }
        timer = setTimeout(runTypewriter, 35);
      }
    };

    // Delay start of typewriter deleting
    timer = setTimeout(() => {
      isDeleting = true;
      runTypewriter();
    }, 2500);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  // Chat Simulation Loop
  useEffect(() => {
    let active = true;
    let scenarioIdx = 0;
    let chatTimeout: NodeJS.Timeout;

    const runChatSimulation = () => {
      if (!active) return;
      const scenario = CHAT_SCENARIOS[scenarioIdx];

      // Reset chat messages
      setChatMessages([]);

      // 1. Show user typing the problem
      let charIdx = 0;
      let problemText = "";

      const typeUser = () => {
        if (!active) return;
        if (charIdx < scenario.problem.length) {
          problemText += scenario.problem.charAt(charIdx);
          setChatMessages([{ text: problemText, sender: "user" }]);
          charIdx++;
          chatTimeout = setTimeout(typeUser, Math.random() * 30 + 10);
        } else {
          // User finished typing. Wait, then show AI typing indicator
          chatTimeout = setTimeout(showAiIndicator, 400);
        }
      };

      const showAiIndicator = () => {
        if (!active) return;
        setChatMessages((prev) => [...prev, { text: "...", sender: "ai", isTyping: true }]);
        chatTimeout = setTimeout(typeAi, 1200); // 1.2s thinking delay
      };

      const typeAi = () => {
        if (!active) return;
        let aiIdx = 0;
        let aiText = "";

        const typeAiChar = () => {
          if (!active) return;
          if (aiIdx < scenario.solution.length) {
            aiText += scenario.solution.charAt(aiIdx);
            setChatMessages((prev) => {
              const updated = [...prev];
              // Replace typing indicator with typing text
              updated[updated.length - 1] = { text: aiText, sender: "ai" };
              return updated;
            });
            aiIdx++;
            chatTimeout = setTimeout(typeAiChar, 15);
          } else {
            // AI finished typing. Highlight Buildlyst
            setChatMessages((prev) => {
              const updated = [...prev];
              const rawText = updated[updated.length - 1].text;
              const formattedText = rawText.replace(
                "Buildlyst",
                '<strong style="color:var(--c-accent-cyan)">Buildlyst</strong>'
              );
              updated[updated.length - 1] = { text: formattedText, sender: "ai" };
              return updated;
            });

            // Wait 4s, fade out and go to next scenario
            chatTimeout = setTimeout(() => {
              scenarioIdx = (scenarioIdx + 1) % CHAT_SCENARIOS.length;
              runChatSimulation();
            }, 4000);
          }
        };

        typeAiChar();
      };

      chatTimeout = setTimeout(typeUser, 500);
    };

    runChatSimulation();

    return () => {
      active = false;
      clearTimeout(chatTimeout);
    };
  }, []);

  return (
    <section id="hero" className="hero-section reveal" style={{ opacity: 1 }}>
      {/* Animated Gradient Waves */}
      <div className="wave-container">
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00D2FF" />
              <stop offset="50%" stopColor="#8A2387" />
              <stop offset="100%" stopColor="#3A7BD5" />
            </linearGradient>
          </defs>
          <g className="parallax-waves">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="url(#wave-gradient)" opacity="0.05" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="url(#wave-gradient)" opacity="0.1" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="url(#wave-gradient)" opacity="0.15" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="url(#wave-gradient)" opacity="0.25" />
          </g>
        </svg>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <span className="overline highlight">AI & Data Engineering Studio</span>
          <h1 className="hero-typewriter-title">
            <span className="text-white">We build </span>
            <span id="hero-slot1" className="text-skyblue">
              {text1}
            </span>
            <br />
            <span className="text-white">to transform your</span>
            <br />
            <span id="hero-slot2" className="text-skyblue">
              {text2}
            </span>
            .
          </h1>
          <div className="subtext">
            <p style={{ marginBottom: "12px" }}>
              We build custom AI and data software that will increase your productivity, automate your operations, reduce costs, and scale your business.
            </p>
            <p style={{ margin: 0, fontWeight: 500, color: "var(--c-text-primary)" }}>
              Built for speed, engineered for scale.
            </p>
          </div>
          <div className="hero-actions">
            <Link href="#contact" className="btn btn-primary glow-border-btn">
              Start a Project
            </Link>
            <Link
              href="#master-industry-portal"
              className="btn btn-secondary"
              style={{
                border: "1.5px solid rgba(0, 210, 255, 0.4)",
                background: "rgba(0, 210, 255, 0.08)",
                color: "#fff",
                backdropFilter: "blur(10px)",
              }}
            >
              View Case Studies →
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          {/* Automated AI Chat Simulation */}
          <div className="chat-simulation-container glass-panel">
            <div className="sim-header">
              <div className="sim-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="sim-title">Buildlyst AI</span>
            </div>
            <div className="sim-messages" id="sim-messages">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`sim-message ${msg.sender}`}>
                  {msg.isTyping ? (
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

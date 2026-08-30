"use client";

import { useState, useRef, useEffect } from "react";

interface Bubble {
  id: string;
  sender: "system" | "user";
  text: string;
  isTyping?: boolean;
}

interface FormData {
  name: string;
  email: string;
  project_type: string;
  message: string;
}

export default function ContactForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    project_type: "",
    message: "",
  });

  const [bubbles, setBubbles] = useState<Bubble[]>([
    {
      id: "init",
      sender: "system",
      text: "Hello! I'm the Buildlyst assistant. I'll help you get your project started. First, what is your name?",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [options, setOptions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [bubbles]);

  const addBubble = (text: string, sender: "system" | "user", isTyping = false) => {
    const id = Math.random().toString(36).substring(2, 9);
    setBubbles((prev) => [...prev, { id, sender, text, isTyping }]);
    return id;
  };

  const removeTypingBubble = () => {
    setBubbles((prev) => prev.filter((b) => !b.isTyping));
  };

  const handleSend = () => {
    const val = inputValue.trim();
    if (!val) return;

    addBubble(val, "user");
    setInputValue("");

    setTimeout(() => {
      if (step === 0) {
        if (val.length < 2) {
          addBubble("Please enter a valid name (at least 2 characters).", "system");
          return;
        }
        setFormData((prev) => ({ ...prev, name: val }));
        addBubble(`Great to meet you, ${val}. What is your email address?`, "system");
        setStep(1);
      } else if (step === 1) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          addBubble("That doesn't look like a valid email. Please try again.", "system");
          return;
        }
        setFormData((prev) => ({ ...prev, email: val }));
        addBubble("Thanks! What area do you need help with?", "system");
        setShowInput(false);
        setOptions(["AI Agents", "Gen AI", "Machine Learning", "Data Engineering", "Web Development"]);
        setStep(2);
      } else if (step === 3) {
        if (val.length < 10) {
          addBubble("Please provide a bit more detail (at least 10 characters).", "system");
          return;
        }
        setFormData((prev) => ({ ...prev, message: val }));
        
        // Construct summary
        const summary = `Got it. Here is what I have:<br><br><b>Name:</b> ${formData.name}<br><b>Email:</b> ${formData.email}<br><b>Type:</b> ${formData.project_type}<br><b>Details:</b> ${val}<br><br>Does this look correct?`;
        addBubble(summary, "system");
        setShowInput(false);
        setOptions(["Yes, send inquiry", "No, start over"]);
        setStep(4);
      }
    }, 600);
  };

  const handleOptionClick = (opt: string) => {
    addBubble(opt, "user");
    setOptions([]);

    setTimeout(async () => {
      if (step === 2) {
        setFormData((prev) => ({ ...prev, project_type: opt }));
        addBubble("Excellent. Could you provide a brief detail about your project?", "system");
        setShowInput(true);
        setStep(3);
      } else if (step === 4) {
        if (opt.startsWith("Yes")) {
          // Show typing indicator
          const typingId = addBubble("", "system", true);

          try {
            const response = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                project_type: formData.project_type,
                message: formData.message,
              }),
            });

            removeTypingBubble();

            if (response.ok) {
              addBubble("Success! Your inquiry has been securely sent directly to our team. We will be in touch shortly.", "system");
            } else {
              throw new Error("Failed to send");
            }
          } catch (err) {
            removeTypingBubble();
            addBubble(`Sorry, there was an error submitting your request. Please try emailing us directly at amankar125@gmail.com.`, "system");
          }
        } else {
          // Start over
          setFormData({ name: "", email: "", project_type: "", message: "" });
          setStep(0);
          setShowInput(true);
          addBubble("Let's try again. What is your name?", "system");
        }
      }
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <section id="contact" className="contact-section reveal" style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.05)", background: "radial-gradient(circle at bottom center, rgba(0, 210, 255, 0.05) 0%, transparent 70%)" }}>
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: "24px" }}>
          <h2 className="text-gradient" style={{ fontSize: "clamp(32px, 5vw, 48px)", marginBottom: "16px", lineHeight: 1.1 }}>
            Ready to transform your data into leverage?
          </h2>
          <p className="subtext mx-auto text-center" style={{ margin: "0 auto" }}>
            Join elite companies building the future with Buildlyst.
          </p>
        </div>
        
        <div className="contact-grid">
          {/* Left Conversational Form */}
          <div className="contact-form-wrapper glass-panel glow-border p-lg">
            <h2 className="section-heading" style={{ marginBottom: "24px", fontSize: "28px" }}>Initiate Project</h2>

            <div className="conversational-ui-container">
              <div className="conv-messages" id="conv-messages" style={{ overflowY: "auto", maxHeight: "300px" }}>
                {bubbles.map((b) => (
                  <div key={b.id} className={`conv-bubble ${b.sender}`}>
                    <div className="conv-avatar">
                      {b.sender === "system" ? "B" : (formData.name.charAt(0).toUpperCase() || "U")}
                    </div>
                    <div className="conv-text">
                      {b.isTyping ? (
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      ) : (
                        <div dangerouslySetInnerHTML={{ __html: b.text }} />
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {showInput ? (
                <div className="conv-input-area" id="conv-input-area">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="glass-input"
                    placeholder={step === 0 ? "Type your name..." : step === 1 ? "Type your email..." : "Type details..."}
                    aria-label="Conversational message input"
                  />
                  <button onClick={handleSend} className="btn btn-primary glow-border-btn">Send</button>
                </div>
              ) : (
                <div className="conv-options-area" id="conv-options-area">
                  {options.map((opt, i) => (
                    <button key={i} onClick={() => handleOptionClick(opt)} className="conv-option-btn">
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Info blocks */}
          <div className="contact-info">
            <div className="info-block glass-panel">
              <span className="overline highlight">Headquarters</span>
              <p>Bangalore, India<br />Remote Worldwide</p>
            </div>
            <div className="info-block glass-panel">
              <span className="overline highlight">Also Present In</span>
              <p>Hyderabad<br />Noida</p>
            </div>
            <div className="info-block glass-panel">
              <span className="overline highlight">Direct Inquiry</span>
              <p>
                <a href="mailto:info@buildlyst.in" className="text-gradient">
                  info@buildlyst.in
                </a>
              </p>
            </div>
            <div className="info-block glass-panel">
              <span className="overline highlight">Socials</span>
              <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
                <a
                  href="https://www.instagram.com/buildlyst"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--c-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    transition: "all 0.3s ease",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/buildlyst/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--c-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    transition: "all 0.3s ease",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://x.com/buildlystin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--c-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    transition: "all 0.3s ease",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

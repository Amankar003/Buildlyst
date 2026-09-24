"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import TiltCard from "./TiltCard";
import Link from "next/link";
import { calculateEstimatedInvestment } from "@/data/pricingConfig";
import { Bot, BrainCircuit, Database, Microscope, Zap, ShieldCheck, Lock, Cloud, Check, PlugZap } from "lucide-react";

const SERVICES = [
  { id: "ai-agents", name: "AI AGENTS & AUTOMATION", desc: "Build intelligent AI agents that automate sales, customer support, operations, and repetitive business workflows — helping teams save time and scale efficiently.", price: "Custom Scoping", icon: <Bot className="theme-icon theme-icon-cyan" size={24} /> },
  { id: "gen-ai", name: "GENERATIVE AI & RAG", desc: "Build production-ready GenAI solutions that understand your business knowledge, documents, and data to deliver accurate answers, intelligent assistance, and automated workflows.", price: "Custom Scoping", icon: <BrainCircuit className="theme-icon theme-icon-purple" size={24} /> },
  { id: "data", name: "DATA ENGINEERING & ANALYTICS", desc: "Build reliable data pipelines and analytics systems that turn scattered business data into clean, accessible, and actionable insights.", price: "Custom Scoping", icon: <Database className="theme-icon theme-icon-cyan" size={24} /> },
  { id: "ml", name: "MACHINE LEARNING & PREDICTIVE AI", desc: "Build machine learning systems that use your business data to predict outcomes, identify patterns, and support smarter decisions.", price: "Custom Scoping", icon: <Microscope className="theme-icon theme-icon-purple" size={24} /> },
  { id: "web", name: "AI PRODUCT ENGINEERING", desc: "Turn AI ideas into production-ready products with robust applications, APIs, backend systems, integrations, and scalable infrastructure.", price: "Custom Scoping", icon: <Zap className="theme-icon theme-icon-cyan" size={24} /> },
];

const INTEGRATION_OPTIONS = [
  "WhatsApp", "CRM", "Calendar", "Email",
  "Payment Gateway", "Helpdesk", "Website",
  "Google Sheets", "Analytics", "Cloud",
  "Custom API", "Custom Database", "ERP",
  "Internal tools", "Other"
];
const DEPLOYMENT_OPTIONS = ["Proof of Concept", "Production", "Enterprise Production"];
const TIMELINE_OPTIONS = ["2–4 weeks", "1–2 months", "2–3 months", "Flexible"];
const SCALE_OPTIONS = ["Small / Early Stage", "Growing", "Enterprise"];

interface Message {
  id: string;
  sender: "system" | "user";
  content: React.ReactNode;
}

interface ScopeRecommendation {
  name: string;
  service: string;
  reason: string;
}

export default function Pricing() {
  const [step, setStep] = useState(1);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  const USD_PRICES: Record<string, { price: string; baseVal: number }> = {
    web: { price: "$500", baseVal: 500 },
    data: { price: "$1,100", baseVal: 1100 },
    ml: { price: "$1,200", baseVal: 1200 },
    "gen-ai": { price: "$1,400", baseVal: 1400 },
    "ai-agents": { price: "$1,200", baseVal: 1200 },
  };
  
  // Collected Data
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0]>(SERVICES[0]);
  const [business, setBusiness] = useState("");
  const [problem, setProblem] = useState("");
  const [recommendations, setRecommendations] = useState<ScopeRecommendation[]>([]);
  const [selectedSolution, setSelectedSolution] = useState<ScopeRecommendation | null>(null);
  const [groqComplexity, setGroqComplexity] = useState<string>("medium");
  const [reqs, setReqs] = useState({ scale: "", integrations: [] as string[], deployment: "", timeline: "", otherIntegration: "" });
  const [contact, setContact] = useState({ name: "", email: "", company: "" });
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "system",
      content: "First, tell me a little about your business. What do you do, and who are your customers?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [subStatus, setSubStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-select service from URL param (e.g. /?service=ai-agents)
  const searchParams = useSearchParams();
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const match = SERVICES.find(s => s.id === serviceParam);
      if (match) {
        setSelectedService(match);
        // Scroll to the scoping interface after a short delay
        setTimeout(() => {
          document.getElementById("scoping-interface")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 500);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, step]);

  const addMsg = (sender: "system" | "user", content: React.ReactNode) => {
    setMessages(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), sender, content }]);
  };

  const startScoping = (service: typeof SERVICES[0]) => {
    setSelectedService(service);
    if (step === 0) setStep(1); // Ensure chat is active
    
    // Optional: Add a message acknowledging the service change if they are already chatting
    if (messages.length > 1 && !messages.some(m => m.id === "service_switch")) {
      addMsg("system", `Got it, we will focus on ${service.name}.`);
    }
    
    setTimeout(() => {
      document.getElementById("scoping-interface")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleBusinessSubmit = (val: string) => {
    if (!val.trim()) return;
    setBusiness(val);
    addMsg("user", val);
    setStep(2);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMsg("system", "Got it. Now, what problem are you trying to solve? (e.g., What's slowing your team down, costing time, creating manual work, or limiting growth?)");
    }, 800);
  };

  const handleProblemSubmit = async (val: string) => {
    if (!val.trim()) return;
    setProblem(val);
    addMsg("user", val);
    setStep(3);
    
    setIsTyping(true);

    try {
      const res = await fetch("/api/scope-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business, problem: val }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();
      const primary: ScopeRecommendation = data.primaryRecommendation;
      const alts: ScopeRecommendation[] = data.alternativeRecommendations || [];
      const complexity: string = data.complexity || "medium";

      setGroqComplexity(complexity.toLowerCase());

      const allRecs = [primary, ...alts].filter(r => r && r.name);
      setRecommendations(allRecs);

      setIsTyping(false);
      addMsg("system", `I see ${allRecs.length} possible approaches for this problem:`);
    } catch (err) {
      console.error("Scope recommendation failed, using fallback:", err);

      // Fallback: generate local recommendations based on keywords
      const pLower = val.toLowerCase();
      let recs: ScopeRecommendation[] = [];

      if (pLower.includes("whatsapp") || pLower.includes("lead")) {
        recs = [
          { name: "WhatsApp AI Qualification Agent", service: "AI AGENTS", reason: "Automatically understands incoming leads and routes to sales." },
          { name: "Lead Intelligence + CRM Automation", service: "AI AGENTS", reason: "Automated enrichment and CRM updates." },
          { name: "Full AI Sales Workflow", service: "AI AGENTS", reason: "End-to-end qualification and follow-up automation." }
        ];
      } else if (pLower.includes("website") || pLower.includes("ecommerce") || pLower.includes("web") || pLower.includes("store") || pLower.includes("app")) {
        recs = [
          { name: "Custom E-Commerce Platform", service: "WEB & PRODUCT ENGINEERING", reason: "Scalable web platform tailored to your products." },
          { name: "Web Application Build", service: "WEB & PRODUCT ENGINEERING", reason: "A robust custom web app for your specific needs." },
          { name: "CMS + Marketing Site", service: "WEB & PRODUCT ENGINEERING", reason: "High-performance website optimized for conversions." }
        ];
      } else if (pLower.includes("ai") || pLower.includes("agent") || pLower.includes("automation")) {
        recs = [
          { name: "Autonomous AI Agent", service: "AI AGENTS", reason: "An intelligent agent capable of complex multi-step reasoning." },
          { name: "Workflow Automation", service: "AI AGENTS", reason: "Connect disjointed systems automatically." },
          { name: "Customer Support Agent", service: "AI AGENTS", reason: "Automated customer support with intelligent routing." }
        ];
      } else if (pLower.includes("data") || pLower.includes("scattered")) {
        recs = [
          { name: "Unified Data Pipeline", service: "DATA ENGINEERING & ANALYTICS", reason: "Centralize data into a single warehouse." },
          { name: "AI Insight Dashboard", service: "GENERATIVE AI", reason: "Natural language querying over your data." },
          { name: "Data Warehouse / Analytics", service: "DATA ENGINEERING & ANALYTICS", reason: "Structured storage and executive dashboards." }
        ];
      } else {
        recs = [
          { name: "Custom System Architecture", service: "WEB & PRODUCT ENGINEERING", reason: "A ground-up scalable platform built to spec." },
          { name: "Tech Stack Consultation", service: "WEB & PRODUCT ENGINEERING", reason: "Deep dive into your requirements and architecture design." },
          { name: "Workflow Automation", service: "AI AGENTS", reason: "Connect your existing tools together intelligently." }
        ];
      }

      setGroqComplexity("medium");
      setRecommendations(recs);

      setIsTyping(false);
      addMsg("system", `I see ${recs.length} possible approaches for this problem:`);
    }
  };

  const selectSolution = (sol: ScopeRecommendation) => {
    setSelectedSolution(sol);
    addMsg("user", `I'd like to proceed with: ${sol.name}`);
    setStep(4);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMsg("system", "Good choice. To scope this correctly, I need to understand how the system will fit into your existing workflow.");
    }, 800);
  };

  const toggleIntegration = (i: string) => {
    setReqs(prev => ({
      ...prev,
      integrations: prev.integrations.includes(i) ? prev.integrations.filter(x => x !== i) : [...prev.integrations, i],
      // Clear otherIntegration text if "Other" is deselected
      ...(i === "Other" && prev.integrations.includes("Other") ? { otherIntegration: "" } : {})
    }));
  };

  const handleReqsSubmit = () => {
    if (!reqs.scale || !reqs.deployment || !reqs.timeline) {
      alert("Please select Scale, Deployment, and Timeline to continue.");
      return;
    }
    
    const intList = reqs.integrations.map(i => 
      i === "Other" && reqs.otherIntegration ? `Other (${reqs.otherIntegration})` : i
    );
    const summary = `Scale: ${reqs.scale} | Deployment: ${reqs.deployment} | Timeline: ${reqs.timeline} | Integrations: ${intList.join(", ") || "None"}`;
    addMsg("user", summary);
    setStep(5);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMsg("system", "Great. I have enough information to prepare your build profile. Finally, what are your contact details?");
    }, 800);
  };

  const handleContactSubmit = async (nc: { name: string, email: string, company: string }) => {
    if (!nc.name || !nc.email) return;
    
    setContact(nc);
    addMsg("user", `${nc.name} (${nc.email}) - ${nc.company}`);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMsg("system", "Your profile is ready. You can review it below and send it to our engineering team.");
      setStep(6); // Delaying step 6 creates a nice "processing" anticipation
    }, 1500);
  };

  const resetScoping = () => {
    setStep(1);
    setSelectedService(SERVICES[0]);
    setBusiness("");
    setProblem("");
    setRecommendations([]);
    setSelectedSolution(null);
    setGroqComplexity("medium");
    setReqs({ scale: "", integrations: [], deployment: "", timeline: "", otherIntegration: "" });
    setContact({ name: "", email: "", company: "" });
    setSubStatus("idle");
    setMessages([
      {
        id: "init",
        sender: "system",
        content: "First, tell me a little about your business. What do you do, and who are your customers?"
      }
    ]);
  };

  const getEstimate = () => {
    return calculateEstimatedInvestment({
      solutionName: selectedSolution?.name || "Custom Solution",
      integrations: reqs.integrations,
      complexity: groqComplexity,
      timeline: reqs.timeline,
      currency,
    });
  };

  const buildProjectSummary = () => {
    const estimate = getEstimate();
    const intList = reqs.integrations.map(i => 
      i === "Other" && reqs.otherIntegration ? `Other (${reqs.otherIntegration})` : i
    );
    return [
      `Business: ${contact.company || business.substring(0, 100)}`,
      `Contact: ${contact.name} (${contact.email})`,
      `Challenge: ${problem.substring(0, 150)}`,
      `Recommended Solution: ${selectedSolution?.name || "Custom Architecture"}`,
      `Scale & Deployment: ${reqs.scale || "Standard"} | ${reqs.deployment || "Production"}`,
      `Integrations: ${intList.join(", ") || "None Specified"}`,
      `Timeline: ${reqs.timeline || "2–3 months"}`,
      `Deliverables: Custom Blueprint, Deployed Application, Integrations Pipeline, Monitoring Dashboard, 100% IP Ownership`,
      `Guarantee: Weekly Sprint Demos + 30-Day Post-Launch Support`,
      `Estimated Investment: ${estimate.formatted}`
    ].join("\n");
  };

  const submitToBuilders = async () => {
    setSubStatus("submitting");
    
    const payload = {
      name: contact.name,
      email: contact.email,
      company: contact.company,
      project_type: selectedService?.name,
      message: `
[BUILD PROFILE]
${buildProjectSummary()}
Complexity: ${groqComplexity}
      `.trim()
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubStatus("success");
    } catch (e) {
      setSubStatus("error");
      setTimeout(() => setSubStatus("idle"), 3000);
    }
  };

  const getWhatsAppUrl = () => {
    const summary = buildProjectSummary();
    const message = `Hello Buildlyst Team,\n\nHere is my project scope profile:\n\n${summary}\n\nLooking forward to discussing this on a tech call.`;
    return `https://wa.me/917462095793?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="pricing" className="pricing-section reveal" style={{ padding: "100px 0", background: "var(--c-bg-dark)" }}>
      <style>{`
        @media (max-width: 600px) {
          .hide-on-mobile { display: none !important; }
          .chat-messages-area { padding: 16px !important; gap: 16px !important; }
          .chat-bubble { max-width: 95% !important; padding: 12px !important; }
          .editor-header { padding: 10px !important; }
          .editor-header .editor-title { font-size: 13px !important; margin-left: 8px !important; }
          .playground-container { height: 600px !important; }
          .chat-input-area { padding: 12px !important; }
        }
      `}</style>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        
        <div className="section-header text-center" style={{ marginBottom: "48px" }}>
          <span className="overline highlight" style={{ color: "var(--c-accent-cyan)", fontSize: "12px", letterSpacing: "2px", fontWeight: 700 }}>ENGAGEMENT & PRICING</span>
          <h2 className="section-heading text-gradient" style={{ fontSize: "40px", marginTop: "16px", marginBottom: "24px" }}>
            Start With Your Problem. We'll Design the Solution.
          </h2>
          <p className="subtext text-center" style={{ maxWidth: "800px", margin: "0 auto", fontSize: "16px", color: "var(--c-text-muted)", lineHeight: 1.6 }}>
            Tell Buildlyst what you're trying to solve. Our AI scoping assistant will help identify the right technical solution, estimate the project scope, and prepare your requirements for our engineering team.
          </p>

          {/* CURRENCY SWITCHER */}
          <div style={{ marginTop: "24px", display: "inline-flex", background: "rgba(255,255,255,0.05)", padding: "4px", borderRadius: "30px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <button
              onClick={() => setCurrency("INR")}
              style={{
                padding: "8px 20px",
                borderRadius: "20px",
                border: "none",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s ease",
                background: currency === "INR" ? "var(--c-accent-cyan)" : "transparent",
                color: currency === "INR" ? "#000" : "var(--c-text-muted)",
              }}
            >
              🇮🇳 INR (₹)
            </button>
            <button
              onClick={() => setCurrency("USD")}
              style={{
                padding: "8px 20px",
                borderRadius: "20px",
                border: "none",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s ease",
                background: currency === "USD" ? "var(--c-accent-cyan)" : "transparent",
                color: currency === "USD" ? "#000" : "var(--c-text-muted)",
              }}
            >
              🌐 USD ($)
            </button>
          </div>
        </div>


        {/* 5 SERVICE CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", animation: "fadeInUp 0.6s ease", marginBottom: "48px", overflowX: "auto", paddingBottom: "16px", paddingTop: "16px" }}>
          {SERVICES.map((srv) => (
            <div 
              key={srv.id}
              onClick={() => startScoping(srv)}
              className="glass-panel"
              style={{
                minWidth: "180px",
                padding: "16px",
                borderRadius: "12px",
                cursor: "pointer",
                border: selectedService?.id === srv.id ? "2px solid var(--c-accent-cyan)" : "1px solid rgba(255,255,255,0.05)",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: selectedService?.id === srv.id ? "rgba(0, 210, 255, 0.05)" : "rgba(10, 15, 26, 0.4)",
                boxShadow: selectedService?.id === srv.id ? "0 0 15px rgba(0, 210, 255, 0.1)" : "none",
                transform: selectedService?.id === srv.id ? "translateY(-2px)" : "translateY(0)"
              }}
              onMouseEnter={(e) => {
                if (selectedService?.id === srv.id) return;
                e.currentTarget.style.borderColor = "var(--c-accent-cyan)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                if (selectedService?.id === srv.id) return;
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div>
                <div style={{ fontSize: "24px", marginBottom: "12px" }}>{srv.icon}</div>
                <h3 style={{ fontSize: "12px", fontWeight: 800, color: "#fff", marginBottom: "6px", lineHeight: 1.3 }}>{srv.name}</h3>
                <p style={{ fontSize: "11px", color: "var(--c-text-muted)", marginBottom: "16px", lineHeight: 1.4 }}>{srv.desc}</p>
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--c-accent-cyan)" }}>
                  {srv.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI SCOPING INTERFACE */}
        <div id="scoping-interface" style={{ animation: "fadeIn 0.5s ease", marginTop: "24px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <span style={{ fontSize: "11px", color: "var(--c-accent-violet)", fontWeight: 700, letterSpacing: "2px" }}>BUILDLYST SCOPING ASSISTANT</span>
            <h3 style={{ fontSize: "24px", color: "#fff", marginTop: "8px" }}>Let's Understand What You Need.</h3>
          </div>

            <div className="playground-container glass-panel">
              
              {/* CHAT INTERFACE */}
              <div className="playground-editor">
                {/* Progress Header */}
                <div className="editor-header">
                  <div className="sim-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="editor-title" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "#fff", marginLeft: "12px" }}>
                    Buildlyst Architect <span className="hide-on-mobile" style={{ fontSize: "11px", color: "var(--c-text-muted)", fontWeight: 400, marginLeft: "8px" }}>| AI-powered project discovery</span>
                  </span>
                  <button onClick={resetScoping} style={{ marginLeft: "auto", fontSize: "11px", color: "var(--c-text-muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", flexShrink: 0 }}>Start Over</button>
                </div>

                {/* Messages Area */}
                <div ref={messagesContainerRef} className="chat-messages-area" style={{ flex: 1, padding: "24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "24px" }}>
                  {messages.map(msg => (
                    <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.sender === "user" ? "flex-end" : "flex-start", width: "100%" }}>
                      <div className="chat-bubble" style={{ 
                        maxWidth: "85%", 
                        padding: "16px", 
                        borderRadius: "16px",
                        borderBottomRightRadius: msg.sender === "user" ? "4px" : "16px",
                        borderBottomLeftRadius: msg.sender === "system" ? "4px" : "16px",
                        background: msg.sender === "user" ? "rgba(0, 210, 255, 0.1)" : "rgba(255,255,255,0.03)",
                        border: msg.sender === "user" ? "1px solid rgba(0, 210, 255, 0.2)" : "1px solid rgba(255,255,255,0.05)",
                        color: msg.sender === "user" ? "#fff" : "var(--c-text-primary)",
                        fontSize: "14px",
                        lineHeight: 1.6
                      }}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                      <div style={{ padding: "16px", borderRadius: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <span style={{ animation: "blink 1s infinite", color: "var(--c-text-muted)" }}>● ● ●</span>
                      </div>
                    </div>
                  )}
                  
                  {step === 3 && recommendations.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {recommendations.map(rec => (
                        <div key={rec.name} style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.05)", padding: "16px", borderRadius: "10px", marginBottom: "12px" }}>
                          <h4 style={{ fontSize: "14px", color: "var(--c-accent-cyan)", marginBottom: "8px" }}>{rec.name}</h4>
                          <p style={{ fontSize: "12px", color: "#fff", marginBottom: "8px" }}>{rec.reason}</p>
                          <div style={{ fontSize: "10px", marginBottom: "12px", lineHeight: 1.4 }}>
                            <span style={{ color: "var(--c-text-muted)" }}>Service:</span> {rec.service}
                          </div>
                          <button onClick={() => selectSolution(rec)} className="btn glow-border-btn" style={{ padding: "6px 12px", fontSize: "11px", width: "100%" }}>Choose This Solution →</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="chat-input-area" style={{ padding: "20px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)", width: "100%" }}>
                  {step === 1 && !isTyping && (
                    <form onSubmit={e => { e.preventDefault(); const v = (e.target as any).biz.value; handleBusinessSubmit(v); }} style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "6px 6px 6px 20px", width: "100%" }}>
                      <input name="biz" type="text" placeholder="Example: We run a real estate company..." style={{ flex: 1, background: "transparent", border: "none", color: "#fff", fontSize: "14px", outline: "none", width: "100%" }} required />
                      <button type="submit" style={{ background: "var(--c-accent-cyan)", color: "#000", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginLeft: "12px", flexShrink: 0, transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                      </button>
                    </form>
                  )}

                  {step === 2 && !isTyping && (
                    <form onSubmit={e => { e.preventDefault(); const v = (e.target as any).prob.value; handleProblemSubmit(v); }} style={{ width: "100%" }}>
                      <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "6px 6px 6px 20px", marginBottom: "8px", width: "100%" }}>
                        <input name="prob" type="text" placeholder="Describe what's slowing your team down..." style={{ flex: 1, background: "transparent", border: "none", color: "#fff", fontSize: "14px", outline: "none", width: "100%" }} required />
                        <button type="submit" style={{ background: "var(--c-accent-cyan)", color: "#000", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginLeft: "12px", flexShrink: 0, transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--c-text-muted)", marginLeft: "20px" }}>Tip: Mention manual data entry, scattered tools, or prediction needs.</div>
                    </form>
                  )}

                  {step === 4 && !isTyping && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <div>
                        <label style={{ fontSize: "12px", fontWeight: "bold", color: "var(--c-text-muted)", marginBottom: "8px", display: "block" }}>SCALE</label>
                        <select value={reqs.scale} onChange={e => setReqs({...reqs, scale: e.target.value})} className="glass-input" style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "rgba(0,0,0,0.5)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}>
                          <option value="">Select Scale</option>
                          {SCALE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      
                      <div>
                        <label style={{ fontSize: "12px", fontWeight: "bold", color: "var(--c-text-muted)", marginBottom: "8px", display: "block" }}>INTEGRATIONS</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {INTEGRATION_OPTIONS.map(i => (
                            <button key={i} onClick={() => toggleIntegration(i)} style={{ padding: "6px 12px", fontSize: "12px", borderRadius: "20px", background: reqs.integrations.includes(i) ? "rgba(0, 210, 255, 0.2)" : "rgba(255,255,255,0.05)", border: reqs.integrations.includes(i) ? "1px solid var(--c-accent-cyan)" : "1px solid rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer" }}>
                              {i}
                            </button>
                          ))}
                        </div>
                        {/* "Other" custom input */}
                        {reqs.integrations.includes("Other") && (
                          <input
                            type="text"
                            placeholder="Specify your integration..."
                            value={reqs.otherIntegration}
                            onChange={e => setReqs({ ...reqs, otherIntegration: e.target.value })}
                            className="glass-input"
                            style={{ width: "100%", padding: "10px", borderRadius: "8px", marginTop: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "13px" }}
                          />
                        )}
                      </div>

                      <div style={{ display: "flex", gap: "12px" }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: "12px", fontWeight: "bold", color: "var(--c-text-muted)", marginBottom: "8px", display: "block" }}>DEPLOYMENT</label>
                          <select value={reqs.deployment} onChange={e => setReqs({...reqs, deployment: e.target.value})} className="glass-input" style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "rgba(0,0,0,0.5)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}>
                            <option value="">Select Deployment</option>
                            {DEPLOYMENT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: "12px", fontWeight: "bold", color: "var(--c-text-muted)", marginBottom: "8px", display: "block" }}>TIMELINE</label>
                          <select value={reqs.timeline} onChange={e => setReqs({...reqs, timeline: e.target.value})} className="glass-input" style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "rgba(0,0,0,0.5)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}>
                            <option value="">Select Timeline</option>
                            {TIMELINE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                      </div>

                      <button onClick={handleReqsSubmit} className="btn glass-btn" style={{ padding: "12px" }}>Confirm Requirements</button>
                    </div>
                  )}

                  {step === 5 && !isTyping && (
                    <form onSubmit={e => { 
                      e.preventDefault(); 
                      const t = e.target as any; 
                      handleContactSubmit({ name: t.n.value, email: t.e.value, company: t.c.value });
                    }}>
                      <input name="n" type="text" placeholder="Your Name" required className="glass-input" style={{ width: "100%", padding: "12px", borderRadius: "8px", marginBottom: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} />
                      <input name="e" type="email" placeholder="Work Email" required className="glass-input" style={{ width: "100%", padding: "12px", borderRadius: "8px", marginBottom: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} />
                      <input name="c" type="text" placeholder="Company Name" className="glass-input" style={{ width: "100%", padding: "12px", borderRadius: "8px", marginBottom: "16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} />
                      <button type="submit" className="btn glow-border-btn" style={{ width: "100%", padding: "12px" }}>Finish Profiling</button>
                    </form>
                  )}
                  
                  {step === 6 && (
                    <div style={{ textAlign: "center", color: "var(--c-text-muted)", fontSize: "14px", padding: "20px" }}>
                      Profile Complete. Review your summary.
                    </div>
                  )}
                </div>
              </div>

              {/* PROGRESS / SUMMARY COLUMN */}
              <div className="playground-output" style={{ padding: "24px", overflowY: "auto", height: "100%" }}>
                
                {/* Progress Indicators */}
                {step < 6 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {[
                      { s: 1, lbl: "01 Business" },
                      { s: 2, lbl: "02 Problem" },
                      { s: 3, lbl: "03 Solution" },
                      { s: 4, lbl: "04 Requirements" },
                      { s: 5, lbl: "05 Handoff" }
                    ].map(itm => (
                      <div key={itm.s} style={{ display: "flex", alignItems: "center", gap: "16px", opacity: step === itm.s ? 1 : step > itm.s ? 0.7 : 0.3, transition: "opacity 0.3s" }}>
                        <div style={{ 
                          width: "30px", height: "30px", borderRadius: "50%", 
                          background: step >= itm.s ? "var(--c-accent-cyan)" : "rgba(255,255,255,0.1)",
                          color: step >= itm.s ? "#000" : "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold"
                        }}>
                          {step > itm.s ? <Check size={14} className="theme-icon theme-icon-cyan" /> : itm.s}
                        </div>
                        <div style={{ fontSize: "14px", fontWeight: step === itm.s ? "bold" : "normal", color: step === itm.s ? "#fff" : "var(--c-text-muted)" }}>
                          {itm.lbl}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Final Summary Card */}
                {step === 6 && (
                  <div style={{ padding: "20px", borderRadius: "16px", border: "1px solid rgba(0, 210, 255, 0.3)", background: "rgba(10, 15, 26, 0.8)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", animation: "fadeIn 0.5s ease" }}>
                    
                    {subStatus === "success" ? (
                      <div style={{ textAlign: "center", padding: "40px 10px", animation: "fadeIn 0.5s ease" }}>
                        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(0, 210, 255, 0.1)", border: "2px solid var(--c-accent-cyan)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto", boxShadow: "0 0 30px rgba(0, 210, 255, 0.2)" }}>
                          <span style={{ fontSize: "32px", color: "var(--c-accent-cyan)", display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={32} /></span>
                        </div>
                        <h3 style={{ fontSize: "24px", color: "#fff", marginBottom: "12px" }}>Profile Submitted</h3>
                        <p style={{ fontSize: "14px", color: "var(--c-text-muted)", marginBottom: "32px", lineHeight: 1.5 }}>
                          Your build brief is on its way. Our engineering team will review the technical requirements and reach out to {contact.email} shortly.
                        </p>
                        <button onClick={resetScoping} className="btn glass-btn" style={{ padding: "12px 24px" }}>Start a New Project</button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                        <div style={{ textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
                          <span style={{ fontSize: "9px", color: "var(--c-accent-cyan)", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 700 }}>EXECUTIVE PROPOSAL BRIEF</span>
                          <h3 style={{ fontSize: "16px", color: "#fff", letterSpacing: "1px", fontWeight: 800, marginTop: "2px" }}>YOUR PROJECT SCOPE</h3>
                        </div>
                        
                        <div style={{ background: "rgba(0,0,0,0.35)", borderRadius: "10px", padding: "14px", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {/* Row 1 - Parameters Grid */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                              <div>
                                <span style={{ fontSize: "9px", color: "var(--c-text-muted)", textTransform: "uppercase", display: "block", fontWeight: 700, letterSpacing: "1px", marginBottom: "2px" }}>Business</span>
                                <div style={{ fontSize: "12px", color: "#fff", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{contact.company || business.substring(0, 30)+"..."}</div>
                              </div>
                              <div>
                                <span style={{ fontSize: "9px", color: "var(--c-text-muted)", textTransform: "uppercase", display: "block", fontWeight: 700, letterSpacing: "1px", marginBottom: "2px" }}>Timeline</span>
                                <div style={{ fontSize: "12px", color: "#fff", fontWeight: 600 }}>{reqs.timeline || "2–3 months"}</div>
                              </div>
                              <div>
                                <span style={{ fontSize: "9px", color: "var(--c-text-muted)", textTransform: "uppercase", display: "block", fontWeight: 700, letterSpacing: "1px", marginBottom: "2px" }}>Scale</span>
                                <div style={{ fontSize: "12px", color: "#fff", fontWeight: 600 }}>{reqs.scale || "Standard"}</div>
                              </div>
                              <div>
                                <span style={{ fontSize: "9px", color: "var(--c-text-muted)", textTransform: "uppercase", display: "block", fontWeight: 700, letterSpacing: "1px", marginBottom: "2px" }}>Deployment</span>
                                <div style={{ fontSize: "12px", color: "#fff", fontWeight: 600 }}>{reqs.deployment || "Production"}</div>
                              </div>
                            </div>
                            
                            {/* Row 2 - Core Challenge */}
                            <div style={{ borderTop: "1px dashed rgba(255,255,255,0.08)", paddingTop: "8px" }}>
                              <span style={{ fontSize: "9px", color: "var(--c-text-muted)", textTransform: "uppercase", display: "block", fontWeight: 700, letterSpacing: "1px", marginBottom: "2px" }}>Core Challenge</span>
                              <div style={{ fontSize: "12px", color: "#cbd5e1", lineHeight: 1.4 }}>{problem}</div>
                            </div>

                            {/* Row 3 - Recommended Architecture */}
                            <div style={{ background: "rgba(0, 210, 255, 0.08)", padding: "10px 12px", borderRadius: "8px", borderLeft: "3px solid var(--c-accent-cyan)" }}>
                              <span style={{ fontSize: "9px", color: "var(--c-accent-cyan)", textTransform: "uppercase", display: "block", fontWeight: 700, letterSpacing: "1px", marginBottom: "2px" }}>Recommended Architecture</span>
                              <div style={{ fontSize: "13px", color: "#fff", fontWeight: 800 }}>{selectedSolution?.name || "Custom Solution Architecture"}</div>
                            </div>
                            
                            {/* Row 4 - Integrations */}
                            <div>
                              <span style={{ fontSize: "9px", color: "var(--c-text-muted)", textTransform: "uppercase", display: "block", fontWeight: 700, letterSpacing: "1px", marginBottom: "4px" }}>Required Integrations</span>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                                {reqs.integrations.length > 0 ? reqs.integrations.map(i => {
                                  const label = i === "Other" && reqs.otherIntegration ? `Other (${reqs.otherIntegration})` : i;
                                  return <span key={i} style={{ fontSize: "10px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: "12px", color: "#e2e8f0" }}>{label}</span>;
                                }) : <span style={{ fontSize: "11px", color: "var(--c-text-muted)" }}>None Specified</span>}
                              </div>
                            </div>

                            {/* Row 5 - Deliverables Included */}
                            <div style={{ borderTop: "1px dashed rgba(255,255,255,0.08)", paddingTop: "8px" }}>
                              <span style={{ fontSize: "9px", color: "var(--c-accent-cyan)", textTransform: "uppercase", display: "block", fontWeight: 700, letterSpacing: "1px", marginBottom: "6px" }}>What You Get (Included Scope)</span>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                                <div style={{ fontSize: "10px", color: "#e2e8f0", display: "flex", alignItems: "center", gap: "4px" }}>
                                  <span style={{ color: "var(--c-accent-cyan)", display: "flex" }}><Zap size={14} className="theme-icon theme-icon-cyan" /></span> System Blueprint
                                </div>
                                <div style={{ fontSize: "10px", color: "#e2e8f0", display: "flex", alignItems: "center", gap: "4px" }}>
                                  <span style={{ color: "var(--c-accent-cyan)", display: "flex" }}><Bot size={14} className="theme-icon theme-icon-cyan" /></span> Deployed Engine
                                </div>
                                <div style={{ fontSize: "10px", color: "#e2e8f0", display: "flex", alignItems: "center", gap: "4px" }}>
                                  <span style={{ color: "var(--c-accent-cyan)", display: "flex" }}><PlugZap size={14} className="theme-icon theme-icon-cyan" /></span> Connected Pipelines
                                </div>
                                <div style={{ fontSize: "10px", color: "#e2e8f0", display: "flex", alignItems: "center", gap: "4px" }}>
                                  <span style={{ color: "var(--c-accent-cyan)", display: "flex" }}><Lock size={14} className="theme-icon theme-icon-cyan" /></span> 100% IP Ownership
                                </div>
                              </div>
                            </div>

                            {/* Row 6 - Buildlyst SLA & Guarantee */}
                            <div style={{ background: "rgba(39, 201, 63, 0.06)", border: "1px solid rgba(37, 211, 102, 0.2)", borderRadius: "6px", padding: "8px 10px" }}>
                              <div style={{ fontSize: "10px", color: "#25D366", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
                                <span style={{ display: "flex" }}><ShieldCheck size={14} className="theme-icon" style={{ color: "#25D366" }} /></span>
                                <span>Buildlyst SLA Guarantee:</span>
                              </div>
                              <div style={{ fontSize: "10px", color: "#cbd5e1", marginTop: "2px", lineHeight: 1.3 }}>
                                Weekly Live Sprint Demos + 30-Day Post-Launch Support & Bug Fix Coverage Included.
                              </div>
                            </div>
                          </div>
                          
                          {/* SECURITY & COMPLIANCE BADGES */}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "12px", borderTop: "1px dashed rgba(255,255,255,0.1)", paddingTop: "12px" }}>
                            <span style={{ fontSize: "9.5px", padding: "5px 10px", background: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.3)", borderRadius: "4px", color: "#4ade80", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                              <Lock size={12} className="theme-icon" style={{ color: "#4ade80" }} /> Enterprise-Grade Encryption
                            </span>
                            <span style={{ fontSize: "9.5px", padding: "5px 10px", background: "rgba(59, 130, 246, 0.1)", border: "1px solid rgba(59, 130, 246, 0.3)", borderRadius: "4px", color: "#60a5fa", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                              <ShieldCheck size={12} className="theme-icon" style={{ color: "#60a5fa" }} /> GDPR & Privacy Ready
                            </span>
                            <span style={{ fontSize: "9.5px", padding: "5px 10px", background: "rgba(168, 85, 247, 0.1)", border: "1px solid rgba(168, 85, 247, 0.3)", borderRadius: "4px", color: "#c084fc", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                              <Cloud size={12} className="theme-icon" style={{ color: "#c084fc" }} /> Private Cloud Ready
                            </span>
                          </div>
                        </div>

                        {/* ESTIMATED INVESTMENT CARD */}
                        <div style={{ background: "linear-gradient(135deg, rgba(0, 210, 255, 0.15), rgba(138, 35, 135, 0.15))", padding: "14px", borderRadius: "12px", border: "1.5px solid var(--c-accent-cyan)", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: "0 0 20px rgba(0, 210, 255, 0.2)" }}>
                          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "80px", height: "3px", background: "var(--c-accent-cyan)", borderRadius: "0 0 4px 4px" }}></div>
                          <div style={{ fontSize: "10px", color: "var(--c-accent-cyan)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "4px", fontWeight: 800 }}>ESTIMATED INVESTMENT</div>
                          <div style={{ fontSize: "28px", fontWeight: 900, color: "#fff", textShadow: "0 2px 12px rgba(0,210,255,0.5)", lineHeight: 1.2 }}>
                            {getEstimate().formatted}
                          </div>
                          <div style={{ fontSize: "9.5px", color: "rgba(255,255,255,0.7)", marginTop: "6px", lineHeight: 1.4 }}>
                            Indicative estimate • Flexible 40/40/20 milestone billing available. <br/>
                            <span style={{ color: "var(--c-text-muted)" }}>Final pricing is confirmed after technical discovery and project scoping.</span>
                          </div>
                        </div>
                        
                        {/* HUGE WHATSAPP CTA */}
                        <a
                          href={getWhatsAppUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            background: "#25D366",
                            color: "#fff",
                            fontSize: "13px",
                            fontWeight: 800,
                            textDecoration: "none",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)",
                            border: "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.boxShadow = "0 6px 16px rgba(37, 211, 102, 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(37, 211, 102, 0.3)";
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                          Send Profile via WhatsApp
                        </a>

                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={submitToBuilders} disabled={subStatus === "submitting"} className="btn glass-btn" style={{ flex: 1, padding: "8px", fontSize: "11px", border: "1px solid rgba(255,255,255,0.1)" }}>
                            {subStatus === "submitting" ? "Sending..." : subStatus === "error" ? "Failed" : "Send via Email"}
                          </button>
                          <button onClick={resetScoping} className="btn glass-btn" style={{ flex: 1, padding: "8px", fontSize: "11px", border: "1px solid rgba(255,255,255,0.1)" }}>
                            Start Over
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

      </div>
    </section>
  );
}

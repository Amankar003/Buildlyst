"use client";

import { useState, useEffect } from "react";

export default function Playground() {
  const [dataSource, setDataSource] = useState("s3");
  const [aiEngine, setAiEngine] = useState("gpt4");
  const [task, setTask] = useState("sales");
  const [format, setFormat] = useState("json");
  const [liveCode, setLiveCode] = useState("");

  const [isRunning, setIsRunning] = useState(false);
  const [terminalStatus, setTerminalStatus] = useState("STANDBY");
  const [terminalLines, setTerminalLines] = useState<string[]>(["> Ready to execute pipeline..."]);

  // Update live code snippet when configuration changes
  useEffect(() => {
    const modelMap: Record<string, string> = {
      gpt4: "gpt-4-enterprise",
      llama3: "llama-3-custom",
      claude: "claude-3.5-sonnet",
    };
    const dataMap: Record<string, string> = {
      s3: "s3://raw-data/q3",
      snowflake: "snowflake://crm/users",
      postgres: "postgresql://server/logs",
    };
    const taskMap: Record<string, string> = {
      sales: "extract_insights",
      churn: "predict_churn",
      anomaly: "detect_anomalies",
    };

    setLiveCode(`from buildlyst import AIAgent
agent = AIAgent(model="${modelMap[aiEngine]}")
data = agent.analyze_dataset(
    source="${dataMap[dataSource]}",
    task="${taskMap[task]}",
    format="${format}"
)`);
  }, [dataSource, aiEngine, task, format]);

  const runPipeline = () => {
    if (isRunning) return;

    setIsRunning(true);
    setTerminalStatus("RUNNING");
    setTerminalLines([`> Initializing ${aiEngine === "gpt4" ? "GPT-4 Enterprise" : aiEngine === "llama3" ? "Llama 3 Custom" : "Claude 3.5 Sonnet"}...`]);

    const dataSourceText =
      dataSource === "s3" ? "Amazon S3 (Q3 Sales Data)" : dataSource === "snowflake" ? "Snowflake (CRM Users)" : "PostgreSQL (Server Logs)";
    const taskText =
      task === "sales" ? "Extract Revenue Insights" : task === "churn" ? "Predict Churn Risk" : "Detect Security Anomalies";

    // Step 2: Connection
    setTimeout(() => {
      setTerminalLines((prev) => [...prev, `> Connecting to ${dataSourceText}... [CONNECTED]`]);

      // Step 3: Execution
      setTimeout(() => {
        setTerminalLines((prev) => [...prev, `> Executing pipeline task: ${taskText}...`]);

        // Step 4: Complete and print typewriter JSON result
        setTimeout(() => {
          setTerminalStatus("COMPLETED");
          setIsRunning(false);

          let resultText = "";
          if (task === "sales") {
            resultText = `{\n  "status": "success",\n  "insights": [\n    "Q3 Revenue: $4.2M (+24% YoY)",\n    "Top Region: APAC",\n    "Anomaly: Unusually high CAC in Week 4"\n  ]\n}`;
          } else if (task === "churn") {
            resultText = `{\n  "status": "success",\n  "risk_score": 0.84,\n  "flagged_accounts": 12,\n  "primary_factors": [\n    "Low product engagement (30d)",\n    "Unresolved support tickets > 48h"\n  ]\n}`;
          } else {
            resultText = `{\n  "status": "alert",\n  "threat_level": "High",\n  "anomalies_detected": 3,\n  "details": "Multiple failed login attempts from IP 192.168.1.45 targeting admin endpoints."\n}`;
          }

          // Typewriter effect for JSON output
          let i = 0;
          let typedText = "";
          const typeInterval = setInterval(() => {
            if (i < resultText.length) {
              typedText += resultText.charAt(i);
              setTerminalLines((prev) => {
                const updated = [...prev];
                if (i === 0) {
                  // Push a new line for the JSON payload
                  return [...updated, typedText];
                } else {
                  // Update the last line
                  updated[updated.length - 1] = typedText;
                  return updated;
                }
              });
              i++;
            } else {
              clearInterval(typeInterval);
              setTerminalLines((prev) => [...prev, "> Ready."]);
            }
          }, 15);
        }, 1000);
      }, 800);
    }, 600);
  };

  return (
    <section id="playground" className="playground-section reveal">
      <div className="container">
        <div className="section-header text-center">
          <span className="overline highlight">Live Demo</span>
          <h2 className="section-heading text-gradient">Interactive Playground</h2>
          <p className="subtext text-center mx-auto">
            Experience our engineering speed in real-time. Run a simulated data pipeline.
          </p>
        </div>

        <div className="playground-container glass-panel">
          {/* Left: Editor / Controls */}
          <div className="playground-editor">
            <div className="editor-header">
              <div className="sim-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="editor-title" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "#fff" }}>
                Pipeline Configurator
              </span>
            </div>
            <div className="editor-body">
              <div className="config-group">
                <label className="config-label">1. Connect Data Source</label>
                <select value={dataSource} onChange={(e) => setDataSource(e.target.value)} className="glass-input pg-select">
                  <option value="s3">Amazon S3 (Q3 Sales Data)</option>
                  <option value="snowflake">Snowflake (CRM Users)</option>
                  <option value="postgres">PostgreSQL (Server Logs)</option>
                </select>
              </div>

              <div className="config-group">
                <label className="config-label">2. Select AI Engine</label>
                <select value={aiEngine} onChange={(e) => setAiEngine(e.target.value)} className="glass-input pg-select">
                  <option value="gpt4">GPT-4 Enterprise Edition</option>
                  <option value="llama3">Custom Fine-Tuned Llama 3</option>
                  <option value="claude">Claude 3.5 Sonnet</option>
                </select>
              </div>

              <div className="config-group">
                <label className="config-label">3. Assign Task</label>
                <select value={task} onChange={(e) => setTask(e.target.value)} className="glass-input pg-select">
                  <option value="sales">Extract Revenue Insights</option>
                  <option value="churn">Predict Churn Risk</option>
                  <option value="anomaly">Detect Security Anomalies</option>
                </select>
              </div>

              <div className="config-group">
                <label className="config-label">4. Output Format</label>
                <select value={format} onChange={(e) => setFormat(e.target.value)} className="glass-input pg-select">
                  <option value="json">JSON (REST API)</option>
                  <option value="csv">CSV (Data Warehouse)</option>
                  <option value="dashboard">Visual Dashboard</option>
                </select>
              </div>

              <button onClick={runPipeline} disabled={isRunning} className="btn btn-primary glow-border-btn w-100 pg-btn">
                <span className="btn-text">{isRunning ? "Running Model..." : "Initialize Pipeline"}</span>
                {isRunning && <div className="btn-loader" style={{ display: "block" }}></div>}
              </button>
            </div>
          </div>

          {/* Right: Output Terminal */}
          <div className="playground-output">
            {/* Upper Right: Live Generated Code Snippet */}
            <div className="live-snippet-container">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  paddingBottom: "6px",
                }}
              >
                <span style={{ color: "var(--c-text-primary)", fontSize: "11px" }}>pipeline.py</span>
                <span style={{ color: "#27c93f", fontSize: "10px", letterSpacing: "1px" }}>AUTO-GENERATED</span>
              </div>
              <pre id="live-code-snippet" style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
                {liveCode}
              </pre>
            </div>

            {/* Lower Right: Terminal Output */}
            <div className="terminal-wrapper">
              <div className="output-header">
                <span>TERMINAL OUTPUT</span>
                <span className={`status-indicator ${isRunning ? "running" : ""}`}>{terminalStatus}</span>
              </div>
              <div className="output-body" id="playground-terminal" style={{ maxHeight: "180px", overflowY: "auto" }}>
                {terminalLines.map((line, idx) => {
                  const isJson = line.trim().startsWith("{") || line.trim().startsWith('"') || line.trim().startsWith("]");
                  return (
                    <div
                      key={idx}
                      className={`terminal-line ${isJson ? "success" : "comment"}`}
                      style={{ whiteSpace: "pre-wrap", margin: "4px 0" }}
                    >
                      {line}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

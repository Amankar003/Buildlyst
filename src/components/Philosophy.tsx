"use client";

import './AboutBento.css';

export default function Philosophy() {
  return (
    <section id="about" className="philosophy-section reveal">
      <div className="container">
        <div className="philosophy-grid">
          {/* LEFT: TEXT CONTENT */}
          <div className="philosophy-text">
            <span className="overline highlight">About Buildlyst</span>
            <h2 className="text-gradient">Engineered for Scale. Built for Impact.</h2>
            <p>
              Buildlyst is a technology studio that builds custom AI tools, automation systems, and data platforms
              for businesses that want to move faster, make smarter decisions, and grow without limits.
            </p>
            <p>
              We don&apos;t use templates or off-the-shelf wrappers. Every system we build is 100% custom code,
              deployed directly into your repository. Senior engineers, bank-grade security, and rapid weekly
              delivery are our standard.
            </p>
          </div>

          {/* RIGHT: BENTO GRID COLLAGE */}
          <div className="c6-collage" style={{ 
            minWidth: 0,
            '--clr-cyan': '#00D2FF', 
            '--clr-violet': '#9D7AFF', 
            '--clr-amber': '#F5A623', 
            '--clr-lime': '#7EE787', 
            '--clr-coral': '#FF6B6B' 
          } as React.CSSProperties}>
            
            {/* Giant typography hero */}
            <div className="c6-typo-hero">
              <div className="c6-giant-text">
                WE BUILD<br />THE SYSTEMS
              </div>
              <div className="c6-giant-overlay" style={{ bottom: 8 }}>
                that make your business run.
              </div>
            </div>

            <div className="c6-mobile-scroller">
              {/* CARD 1: DATA (BENTO LEFT: Large Left, 2 Small Right) */}
              <div className="bento-wrapper bento-left-large">
              <div className="c6-frag-panel c6-fragment bento-main" style={{ position: 'relative' }}>
                <div className="c6-frag-label" style={{ color: 'var(--clr-cyan)' }}>DATA INTELLIGENCE</div>
                <div className="c6-frag-title">Ask your data anything — in plain English.</div>
                <div className="c6-frag-sub">No spreadsheets, no waiting for reports. Type a question like &quot;What were last quarter&apos;s top products?&quot; and get instant answers with clear visuals.</div>
                <div style={{ marginTop: 16 }}>
                  <div style={{
                    background: 'rgba(0,210,255,0.04)',
                    border: '1px solid rgba(0,210,255,0.1)',
                    borderRadius: 8, padding: '8px 12px',
                    fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--clr-cyan)',
                    marginBottom: 12
                  }}>
                    &quot;Show quarterly trends&quot;
                  </div>
                  <div className="chart-bars" style={{ height: 44 }}>
                    {[28, 42, 38, 56, 62, 48, 74, 80, 68, 88, 92].map((h, i) => (
                      <div key={i} className="chart-bar" style={{
                        height: `${h}%`,
                        background: i >= 9 ? 'var(--clr-cyan)' : 'rgba(0,210,255,0.08)'
                      }} />
                    ))}
                  </div>
                </div>
                <div className="c6-big-number">01</div>
              </div>
              <div className="bento-side-col">
                <div className="bento-mini">
                  <div className="bento-mini-title" style={{ color: 'var(--clr-cyan)' }}>100x</div>
                  <div className="bento-mini-sub">Faster Insights</div>
                </div>
                <div className="bento-mini">
                  <div className="bento-mini-title" style={{ color: '#fff' }}>Secure</div>
                  <div className="bento-mini-sub">Your Data Stays Private</div>
                </div>
              </div>
            </div>

            {/* CARD 2: AUTOMATION (BENTO RIGHT: 2 Small Left, Large Right) */}
            <div className="bento-wrapper bento-right-large">
              <div className="bento-side-col">
                <div className="bento-mini">
                  <div className="bento-mini-title" style={{ color: 'var(--clr-amber)' }}>24/7</div>
                  <div className="bento-mini-sub">Always Running</div>
                </div>
                <div className="bento-mini">
                  <div className="bento-mini-title" style={{ color: '#fff' }}>No-code</div>
                  <div className="bento-mini-sub">Easy to Manage</div>
                </div>
              </div>
              <div className="c6-frag-panel c6-fragment bento-main" style={{ position: 'relative' }}>
                <div className="c6-frag-label" style={{ color: 'var(--clr-amber)' }}>AUTOMATION</div>
                <div className="c6-frag-title">Remove the repetitive work that slows your team down.</div>
                <div className="c6-frag-sub">Follow-ups, reports, invoices, onboarding — we automate the tasks your team shouldn&apos;t spend time on.</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 16 }}>
                  <div className="wf-step">
                    <div className="wf-dot" style={{ background: 'var(--clr-amber)' }} />
                    <span>New lead arrives</span>
                  </div>
                  <div style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.15)' }}>↓</div>
                  <div className="wf-step" style={{ background: 'rgba(126,231,135,0.04)', borderColor: 'rgba(126,231,135,0.12)' }}>
                    <div className="wf-dot" style={{ background: 'var(--clr-lime)' }} />
                    <span style={{ color: 'var(--clr-lime)' }}>Auto-qualified &amp; assigned</span>
                  </div>
                </div>
                <div className="c6-big-number">02</div>
              </div>
            </div>

            {/* CARD 3: DOCUMENTS (BENTO LEFT: Large Left, 2 Small Right) */}
            <div className="bento-wrapper bento-left-large">
              <div className="c6-frag-panel c6-fragment bento-main" style={{ position: 'relative' }}>
                <div className="c6-frag-label" style={{ color: 'var(--clr-violet)' }}>SMART DOCUMENTS</div>
                <div className="c6-frag-title">Turn any document into usable, structured data.</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
                  <div style={{
                    width: 36, height: 46, borderRadius: 4,
                    background: 'rgba(157,122,255,0.06)',
                    border: '1px solid rgba(157,122,255,0.15)',
                    padding: 6, display: 'flex', flexDirection: 'column', gap: 3
                  }}>
                    <div style={{ height: 2, width: '80%', background: 'rgba(157,122,255,0.3)', borderRadius: 1 }} />
                    <div style={{ height: 2, width: '50%', background: 'rgba(157,122,255,0.2)', borderRadius: 1 }} />
                    <div style={{ height: 2, width: '70%', background: 'rgba(157,122,255,0.15)', borderRadius: 1 }} />
                  </div>
                  <span style={{ color: 'var(--clr-violet)', fontSize: 20, opacity: 0.5 }}>→</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div className="kv-pair">
                      <span className="kv-key">EXTRACTED</span>
                      <span className="kv-val" style={{ color: 'var(--clr-violet)' }}>$12,800</span>
                    </div>
                  </div>
                </div>
                <div className="c6-big-number">03</div>
              </div>
              <div className="bento-side-col">
                <div className="bento-mini">
                  <div className="bento-mini-title" style={{ color: 'var(--clr-violet)' }}>OCR</div>
                  <div className="bento-mini-sub">Reads Any Format</div>
                </div>
                <div className="bento-mini">
                  <div className="bento-mini-title" style={{ color: '#fff' }}>JSON</div>
                  <div className="bento-mini-sub">Clean, Structured Output</div>
                </div>
              </div>
            </div>

            {/* CARD 4: CUSTOMER SUPPORT (BENTO RIGHT: 2 Small Left, Large Right) */}
            <div className="bento-wrapper bento-right-large">
              <div className="bento-side-col">
                <div className="bento-mini">
                  <div className="bento-mini-title" style={{ color: 'var(--clr-lime)' }}>Instant</div>
                  <div className="bento-mini-sub">Replies in Seconds</div>
                </div>
                <div className="bento-mini">
                  <div className="bento-mini-title" style={{ color: '#fff' }}>Human</div>
                  <div className="bento-mini-sub">Smart Handoff</div>
                </div>
              </div>
              <div className="c6-frag-panel c6-fragment bento-main" style={{ position: 'relative' }}>
                <div className="c6-frag-label" style={{ color: 'var(--clr-lime)' }}>AI CUSTOMER SUPPORT</div>
                <div className="c6-frag-title">Your customers get help in seconds, not hours.</div>
                <div className="c6-frag-sub">AI handles FAQs and troubleshooting instantly. When it&apos;s something complex, it hands off to your team seamlessly.</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
                  <div className="chat-msg chat-msg--user">How do I reset my password?</div>
                  <div className="chat-msg chat-msg--bot" style={{
                    background: 'rgba(126,231,135,0.08)',
                    border: '1px solid rgba(126,231,135,0.12)',
                    color: '#fff'
                  }}>
                    I&apos;ve sent a password reset link to your email. It&apos;ll expire in 15 minutes.
                  </div>
                </div>
                <div className="c6-big-number">04</div>
              </div>
            </div>

            {/* CARD 5: DIGITAL PRODUCTS (BENTO LEFT: Large Left, 2 Small Right) */}
            <div className="bento-wrapper bento-left-large">
              <div className="c6-frag-panel c6-fragment bento-main" style={{ position: 'relative' }}>
                <div className="c6-frag-label" style={{ color: 'var(--clr-coral)' }}>CUSTOM SOFTWARE</div>
                <div className="c6-frag-title">From idea to live product — built entirely for you.</div>
                <div className="c6-frag-sub">Websites, web apps, AI-powered tools — we design, build, and deploy directly into your systems. Not a template.</div>
                <div style={{ marginTop: 16 }}>
                  <div className="mini-browser">
                    <div className="mini-browser-bar">
                      <div style={{ display: 'flex', gap: 4 }}>
                        <div className="mini-browser-dot" style={{ background: '#FF5F57' }} />
                        <div className="mini-browser-dot" style={{ background: '#FFBD2E' }} />
                        <div className="mini-browser-dot" style={{ background: '#27C93F' }} />
                      </div>
                      <span className="mono-label" style={{ color: 'rgba(255,255,255,0.2)' }}>your-brand.com</span>
                    </div>
                    <div className="mini-browser-body" style={{ minHeight: 52 }}>
                      <div style={{
                        height: 24, borderRadius: 4, marginBottom: 6,
                        background: 'linear-gradient(135deg, rgba(255,107,107,0.08), rgba(245,166,35,0.05))'
                      }} />
                      <div style={{ display: 'flex', gap: 4 }}>
                        <div style={{ flex: 1, height: 12, borderRadius: 3, background: 'rgba(255,255,255,0.03)' }} />
                        <div style={{ flex: 1, height: 12, borderRadius: 3, background: 'rgba(255,255,255,0.03)' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="c6-big-number">05</div>
              </div>
              <div className="bento-side-col">
                <div className="bento-mini">
                  <div className="bento-mini-title" style={{ color: 'var(--clr-coral)' }}>100%</div>
                  <div className="bento-mini-sub">Your Code, Your Repo</div>
                </div>
                <div className="bento-mini">
                  <div className="bento-mini-title" style={{ color: '#fff' }}>Modern</div>
                  <div className="bento-mini-sub">Latest Tech Stack</div>
                </div>
              </div>
            </div>

            {/* CARD 6: AI */}
            <div className="c6-frag-panel c6-frag-panel--tall c6-fragment" style={{
              position: 'relative',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              marginTop: 12
            }}>
              <div>
                <div className="c6-frag-label" style={{ color: 'var(--clr-cyan)' }}>AI INTEGRATION</div>
                <div className="c6-frag-title">Add intelligence to any part of your business.</div>
                <div className="c6-frag-sub">Recommendations, fraud detection, smart search — we build custom AI that fits your workflow, not the other way around.</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: 'var(--clr-cyan)',
                  boxShadow: '0 0 12px rgba(0,210,255,0.4)'
                }} />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>
                  Custom AI models · Private &amp; secure · Enterprise-grade
                </span>
              </div>
              <div className="c6-big-number">06</div>
              </div>
            </div>

            {/* Bottom statement */}
            <div style={{
              textAlign: 'center', padding: '24px 0 0',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              marginTop: 24
            }}>
              <div className="mono-label" style={{ color: 'rgba(255,255,255,0.2)' }}>
                EVERY LINE OF CODE DEPLOYED DIRECTLY INTO YOUR REPOSITORY
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

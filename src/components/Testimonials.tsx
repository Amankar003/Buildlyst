"use client";

import TiltCard from "./TiltCard";

interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

const ROW1_TESTIMONIALS: Testimonial[] = [
  {
    quote: "Buildlyst understood what we needed from the start and turned our idea into a practical solution. The process was smooth, communication was clear, and the final result worked exactly as we expected.",
    author: "Rahul",
    company: "Real Estate",
  },
  {
    quote: "We wanted a technology solution that could make our day-to-day work simpler. Buildlyst understood the requirement quickly and delivered a solution that was easy for our team to use.",
    author: "Ankit",
    company: "Real Estate",
  },
  {
    quote: "Working with Buildlyst was a smooth experience. They understood the technical requirements well, suggested practical improvements, and delivered a clean solution without making things unnecessarily complicated.",
    author: "Ritik",
    company: "Technology",
  },
  {
    quote: "As a technology-focused team, we had clear expectations around the implementation. Buildlyst handled the requirements professionally and delivered a solution with a clean and well-structured approach.",
    author: "Arpit",
    company: "Technology",
  },
  {
    quote: "Buildlyst helped us turn our idea into something practical and usable. They were easy to communicate with, understood our requirements, and made the entire development process much simpler.",
    author: "Heba",
    company: "Startup / Business",
  },
];

const ROW2_TESTIMONIALS: Testimonial[] = [
  {
    quote: "Buildlyst did a great job understanding the technical requirements and translating them into a working solution. The development process was straightforward, and the team was responsive throughout.",
    author: "Shabin",
    company: "Technology",
  },
  {
    quote: "Buildlyst helped us approach our technology requirements in a much more structured way. They understood the business side as well as the technical requirements and delivered a solution that fit our needs.",
    author: "Ajit",
    company: "Manufacturing",
  },
  {
    quote: "The team at Buildlyst was quick to understand the requirement and focused on building a practical solution. The communication was clear and the overall experience was simple and professional.",
    author: "Abhishek",
    company: "Technology",
  },
  {
    quote: "Buildlyst helped us bring our idea to life with a solution that was simple, modern, and easy to use. They understood what we were looking for and made the development process much easier for us.",
    author: "Sumit",
    company: "Clothing / Fashion",
  },
  {
    quote: "Buildlyst helped us build an engaging website around our idea while keeping the experience smooth and easy to use. They understood the vision well and turned it into a polished final product.",
    author: "Aditya",
    company: "Entertainment",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section reveal">
      <div className="container">
        <div className="section-header text-center">
          <span className="overline highlight">Proof</span>
          <h2 className="section-heading text-gradient">Client Success</h2>
        </div>

        <div className="testimonial-marquee-container">
          {/* Row 1: Moves Left */}
          <div className="testimonial-marquee">
            <div className="testimonial-track left">
              {ROW1_TESTIMONIALS.map((t, idx) => (
                <TiltCard key={`row1-${idx}`} className="testimonial-card glass-panel">
                  <p className="quote">{t.quote}</p>
                  <div className="client-info mt-auto">
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--c-accent-cyan), var(--c-accent-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{t.author.split(' ').map(n => n[0]).join('')}</div>
                    <div className="client-info-text">
                      <h4>{t.author}</h4>
                      <span>{t.company}</span>
                    </div>
                  </div>
                </TiltCard>
              ))}
              {/* Duplicate for Infinite Scroll */}
              {ROW1_TESTIMONIALS.map((t, idx) => (
                <TiltCard key={`row1-dup-${idx}`} className="testimonial-card glass-panel">
                  <p className="quote">{t.quote}</p>
                  <div className="client-info mt-auto">
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--c-accent-cyan), var(--c-accent-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{t.author.split(' ').map(n => n[0]).join('')}</div>
                    <div className="client-info-text">
                      <h4>{t.author}</h4>
                      <span>{t.company}</span>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Row 2: Moves Right */}
          <div className="testimonial-marquee">
            <div className="testimonial-track right">
              {ROW2_TESTIMONIALS.map((t, idx) => (
                <TiltCard key={`row2-${idx}`} className="testimonial-card glass-panel">
                  <p className="quote">{t.quote}</p>
                  <div className="client-info mt-auto">
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--c-accent-cyan), var(--c-accent-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{t.author.split(' ').map(n => n[0]).join('')}</div>
                    <div className="client-info-text">
                      <h4>{t.author}</h4>
                      <span>{t.company}</span>
                    </div>
                  </div>
                </TiltCard>
              ))}
              {/* Duplicate for Infinite Scroll */}
              {ROW2_TESTIMONIALS.map((t, idx) => (
                <TiltCard key={`row2-dup-${idx}`} className="testimonial-card glass-panel">
                  <p className="quote">{t.quote}</p>
                  <div className="client-info mt-auto">
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--c-accent-cyan), var(--c-accent-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{t.author.split(' ').map(n => n[0]).join('')}</div>
                    <div className="client-info-text">
                      <h4>{t.author}</h4>
                      <span>{t.company}</span>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

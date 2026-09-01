"use client";

import { useRef } from "react";

interface ProjectItem {
  title: string;
  challenge: string;
  solution: string;
  imageSrc: string;
  tags: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    title: "FinTech Lead Enrichment",
    challenge: "A startup was struggling to manually score and route 10,000+ leads weekly, causing a massive sales bottleneck.",
    solution: "We built an autonomous RAG-based pipeline that instantly enriches leads with external data and routes them via an AI agent.",
    imageSrc: "/static/img/fintech.png",
    tags: ["Python", "OpenAI", "Pinecone"],
  },
  {
    title: "HealthTech ETL Pipeline",
    challenge: "A healthcare provider had unstructured patient data trapped across 5 different legacy systems.",
    solution: "Engineered a highly secure, HIPAA-compliant data engineering pipeline that normalizes data into a centralized AWS Redshift warehouse.",
    imageSrc: "/static/img/healthtech.png",
    tags: ["AWS", "Airflow", "Snowflake"],
  },
  {
    title: "Autonomous Customer Support",
    challenge: "An e-commerce brand was spending $20k/mo on a support team answering repetitive tier-1 questions.",
    solution: "Deployed a custom autonomous agent that handles 80% of tier-1 tickets instantly with verified, hallucination-free answers.",
    imageSrc: "/static/img/ai_support.png",
    tags: ["FastAPI", "React", "LangChain"],
  },
];

export default function ProjectsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (trackRef.current) {
      const amount = 400;
      trackRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="portfolio" className="projects-section reveal">
      <div className="container">
        <div className="section-header text-center">
          <span className="overline highlight">Proof of Impact</span>
          <h2 className="section-heading text-gradient">Featured Case Studies</h2>
        </div>

        <div className="projects-carousel">
          <div className="carousel-track" id="projects-track" ref={trackRef}>
            {PROJECTS.map((proj, idx) => (
              <div key={idx} className="project-card glass-panel">
                <div
                  className="project-image"
                  style={{
                    width: "100%",
                    backgroundImage: `url('${proj.imageSrc}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                  }}
                ></div>
                <div className="project-content">
                  <h3>{proj.title}</h3>
                  <p className="project-overview">
                    <strong>The Challenge:</strong> {proj.challenge}
                    <br />
                    <br />
                    <strong>The Solution:</strong> {proj.solution}
                  </p>
                  <div className="project-tags">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button className="carousel-btn glass-btn" onClick={() => scroll("left")} aria-label="Previous Project">
              ❮
            </button>
            <button className="carousel-btn glass-btn" onClick={() => scroll("right")} aria-label="Next Project">
              ❯
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

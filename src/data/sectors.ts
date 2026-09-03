export interface IndustryCase {
  id: string;
  title: string;
  subDomain: string;
  location: string;
  timeToRoi: string;
  roiBadge: string;
  bigStat: string;
  bigStatLabel: string;
  beforeMetric: string;
  afterMetric: string;
  problem: string;
  solution: string;
  impact: string;
  deliverables: string[];
  imageSrc: string;
  tags: string[];
}

export interface SectorCategory {
  id: string;
  name: string;
  icon: string;
  cases: IndustryCase[];
}

export const SECTORS: SectorCategory[] = [
  {
    id: "real-estate",
    name: "Real Estate",
    icon: "🏢",
    cases: [
      {
        id: "re-1",
        title: "WhatsApp AI Property Qualification & Booking Agent",
        subDomain: "Luxury Residential & Commercial Real Estate",
        location: "Bhopal & Delhi NCR",
        timeToRoi: "60 Days ROI",
        roiBadge: "+65% Qualified Leads • 24/7 Booking",
        bigStat: "+65%",
        bigStatLabel: "Qualified Buyer Bookings",
        beforeMetric: "48-Hr Response",
        afterMetric: "< 5s WhatsApp Reply",
        problem: "Real estate brokers were losing 40% of high-intent property buyers over weekends due to delayed manual responses and unorganized CRM logs.",
        solution: "Engineered a 24/7 Conversational WhatsApp AI Agent connected directly to client CRM & Google Calendar to pre-qualify budget & book visits automatically.",
        impact: "Increased qualified buyer bookings by +65%, automated 100% of tier-1 site visit scheduling, and completely halted lead leakage.",
        deliverables: ["24/7 WhatsApp AI Bot", "CRM Auto-Sync", "Calendar Booking Engine"],
        imageSrc: "/static/img/re1_whatsapp_ui.png",
        tags: ["WhatsApp AI Agent", "FastAPI", "Python", "CRM Sync"]
      },
      {
        id: "re-2",
        title: "Luxury Real Estate 3D Interactive Web Portal",
        subDomain: "High-Rise Commercial & Residential Portfolios",
        location: "Mumbai, MH",
        timeToRoi: "45 Days ROI",
        roiBadge: "3.8x Inquiries • 99 Speed",
        bigStat: "3.8x",
        bigStatLabel: "High-Net-Worth Villa Inquiries",
        beforeMetric: "72% Bounce Rate",
        afterMetric: "0.6s Global Edge Speed",
        problem: "A premier developer had an outdated, slow website that failed to showcase luxury floorplans, causing 72% mobile bounce rates and lost high-net-worth buyers.",
        solution: "Architected a Next.js 16 + GSAP 3D interactive web portal with sub-second page loads, dynamic floorplan viewer, and Vercel Global Edge CDN deployment.",
        impact: "Cut mobile bounce rate by 55%, boosted luxury villa inquiries by 3.8x, and achieved a perfect 99/100 score on Google Lighthouse.",
        deliverables: ["Next.js 16 Storefront", "GSAP 3D Floorplans", "Vercel Edge CDN"],
        imageSrc: "/static/img/re2_3d_portal.png",
        tags: ["Next.js 16", "GSAP 3D", "TailwindCSS", "Vercel CDN"]
      },
      {
        id: "re-3",
        title: "Autonomous Real Estate Lead Gen & Intent Agent",
        subDomain: "Commercial Leasing & Land Acquisition",
        location: "Bengaluru, KA",
        timeToRoi: "30 Days ROI",
        roiBadge: "4.5x Closing Rate • 62% Lower CPA",
        bigStat: "4.5x",
        bigStatLabel: "Sales Team Closing Rate",
        beforeMetric: "$2,400 Cost Per Acquisition",
        afterMetric: "62% Lower Acquisition Cost",
        problem: "Digital ad campaigns generated hundreds of cold, unqualified leads that wasted sales agents' time with non-serious inquiries and spam calls.",
        solution: "Deployed an Autonomous AI Lead Scoring & Intent Agent that enriches incoming leads with property tax records and buyer financial signals before routing.",
        impact: "Reduced customer acquisition costs by 62% and increased sales team closing rates by 4.5x.",
        deliverables: ["AI Intent Scorer", "Lead Enrichment API", "Sales Routing Hub"],
        imageSrc: "/static/img/re3_leadgen_ui.png",
        tags: ["AI Lead Scoring", "LangChain", "OpenAI", "React"]
      }
    ]
  },
  {
    id: "legal",
    name: "Legal & Law",
    icon: "⚖️",
    cases: [
      {
        id: "leg-1",
        title: "Property Dispute RAG Legal Intelligence System",
        subDomain: "Civil Litigation & Land Disputes",
        location: "Delhi NCR",
        timeToRoi: "40 Days ROI",
        roiBadge: "90% Audit Speed • 100% Precision",
        bigStat: "90%",
        bigStatLabel: "Faster Legal Case Research",
        beforeMetric: "20 Hrs/Case Research",
        afterMetric: "< 10s Cited Precedents",
        problem: "Senior attorneys spent 20+ hours per land dispute case manually searching through 30 years of High Court land judgment archives.",
        solution: "Engineered an Enterprise RAG Document Intelligence System trained on Indian Property Law, RERA regulations, and High Court precedent databases.",
        impact: "Cut legal case research time by 90% while providing instant, verified legal citations with zero hallucination.",
        deliverables: ["Enterprise RAG Engine", "Vector Judgments DB", "Attorney Portal"],
        imageSrc: "/static/img/leg1_rag_ui.png",
        tags: ["RAG Architecture", "Vector DB", "FastAPI", "Python"]
      },
      {
        id: "leg-2",
        title: "AI Legal Document Intelligence & Contract Scanner",
        subDomain: "Corporate Commercial & M&A Audits",
        location: "Mumbai, MH",
        timeToRoi: "30 Days ROI",
        roiBadge: "10x Review Speed • 0 Errors",
        bigStat: "10x",
        bigStatLabel: "Accelerated Audit Speed",
        beforeMetric: "Manual 100-Page Audit",
        afterMetric: "Instant Risk Heatmap",
        problem: "Corporate legal departments struggled to manually audit complex commercial leases, vendor contracts, and liability clauses under tight deadlines.",
        solution: "Built a Vision AI + LLM Document Intelligence Scanner that analyzes 100+ page contracts and highlights high-risk clauses and non-standard liabilities instantly.",
        impact: "Accelerated corporate contract review speed by 10x with zero compliance oversights.",
        deliverables: ["Vision LLM Scanner", "Risk Heatmap Engine", "PDF Parser"],
        imageSrc: "/static/img/leg2_docscanner.png",
        tags: ["Vision LLM", "OCR", "FastAPI", "React"]
      }
    ]
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: "🏭",
    cases: [
      {
        id: "mfg-1",
        title: "IoT Sensor Predictive Maintenance Engine",
        subDomain: "Industrial Plant Automation",
        location: "Ahmedabad, GJ",
        timeToRoi: "90 Days ROI",
        roiBadge: "99.99% Factory Uptime • $180k Saved",
        bigStat: "99.99%",
        bigStatLabel: "Factory Production Uptime",
        beforeMetric: "$45k Loss per Breakdown",
        afterMetric: "0 Emergency Outages",
        problem: "Unexpected motor breakdowns halted assembly lines unexpectedly, costing $45,000 per breakdown episode in lost production.",
        solution: "Installed an IoT Telemetry Sensor Streaming Pipeline paired with Predictive Maintenance ML Models trained on vibration & heat metrics.",
        impact: "Achieved 99.99% factory uptime, completely eliminated emergency outages, and saved $180,000 annually.",
        deliverables: ["IoT Sensor Stream", "Predictive ML Model", "Plant Dashboard"],
        imageSrc: "/static/img/mfg1_iot_ui.png",
        tags: ["IoT Streaming", "PyTorch", "TimesScaleDB", "Docker"]
      },
      {
        id: "mfg-2",
        title: "AI Factory Operations Control Center",
        subDomain: "Supply Chain & Assembly Throughput",
        location: "Pune, MH",
        timeToRoi: "60 Days ROI",
        roiBadge: "32% Throughput Boost",
        bigStat: "+32%",
        bigStatLabel: "Factory Throughput Boost",
        beforeMetric: "Manual Shift Records",
        afterMetric: "Live AI Metrics Stream",
        problem: "Plant managers lacked real-time visibility into machine idle times, worker bottleneck shifts, and material inventory flow.",
        solution: "Built a Centralized AI Operations Dashboard syncing IoT sensor feeds, warehouse stock, and shift outputs in real-time.",
        impact: "Boosted overall factory throughput by 32% and cut machine idle time by 4.5 hours per shift.",
        deliverables: ["Live AI Control Center", "Kafka Telemetry", "Shift Analytics"],
        imageSrc: "/static/img/mfg2_factory_ui.png",
        tags: ["FastAPI", "React", "Kafka", "Python"]
      }
    ]
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    icon: "🛍️",
    cases: [
      {
        id: "ecom-1",
        title: "Luxury Women's Boutique & Jewelry E-Commerce Platform",
        subDomain: "Fashion, Accessories & Fine Jewelry",
        location: "Delhi NCR",
        timeToRoi: "45 Days ROI",
        roiBadge: "3.2x Sales • Global Reach",
        bigStat: "3.2x",
        bigStatLabel: "Online Sales Growth",
        beforeMetric: "High Cart Abandonment",
        afterMetric: "Seamless VIP Checkout",
        problem: "A premium boutique was struggling to sell high-end jewelry and designer clothing online due to a clunky catalog that failed to showcase the luxury quality of their items.",
        solution: "Built a bespoke, visually stunning e-commerce storefront with high-resolution lookbooks, dynamic product galleries, and a seamless VIP checkout experience.",
        impact: "Increased monthly online sales by 3.2x and successfully expanded the brand's luxury retail presence globally.",
        deliverables: ["Bespoke Storefront UI", "Dynamic Lookbooks", "Secure Checkout"],
        imageSrc: "/static/img/case_hotel.png",
        tags: ["Next.js", "React", "TailwindCSS", "E-Commerce"]
      },
      {
        id: "ecom-2",
        title: "Real-Time AI Product Recommendation Engine",
        subDomain: "Personalized Merchandising",
        location: "Bengaluru, KA",
        timeToRoi: "45 Days ROI",
        roiBadge: "+34% Average Order Value (AOV)",
        bigStat: "+34%",
        bigStatLabel: "Average Order Value Boost",
        beforeMetric: "$24 Avg Basket Size",
        afterMetric: "$32.50 Avg Basket Value",
        problem: "Generic static product recommendations resulted in low cross-sell performance and missed upsell revenue opportunities.",
        solution: "Built a Collaborative Filtering + Vector Embedding ML Recommendation Engine tailored to user real-time browsing behavior.",
        impact: "Increased Average Order Value (AOV) by +34% and generated $42k in net new monthly revenue.",
        deliverables: ["Vector ML Engine", "Redis Cache Sync", "Personalization API"],
        imageSrc: "/static/img/financial_forecasting_ui.png",
        tags: ["Vector Embeddings", "FastAPI", "Redis", "Python"]
      }
    ]
  },
  {
    id: "accounting",
    name: "CA & Accounting",
    icon: "💼",
    cases: [
      {
        id: "ca-1",
        title: "ITR Filing Automation & Document OCR Pipeline",
        subDomain: "Tax Audits & Regulatory Filings",
        location: "Noida & Delhi",
        timeToRoi: "30 Days ROI",
        roiBadge: "85% Time Saved per Tax Audit",
        bigStat: "85%",
        bigStatLabel: "Prep Time Reduction",
        beforeMetric: "3.5 Hrs / Client Audit",
        afterMetric: "15 Mins / Automated Audit",
        problem: "CA associates spent 3.5 hours per client manually keying Form 16, Form 26AS, and bank statements into tax software.",
        solution: "Built an intelligent Vision OCR Extraction Pipeline auto-populating tax computation sheets and verifying data against tax rules.",
        impact: "Reduced ITR filing prep time by 85% and enabled the firm to handle 4x more corporate clients.",
        deliverables: ["Vision OCR Engine", "Tax Auto-Populator", "CA Portal"],
        imageSrc: "/static/img/accounting_dashboard_ui.png",
        tags: ["Vision OCR", "FastAPI", "Python", "Tesseract"]
      },
      {
        id: "ca-2",
        title: "AI Financial Forecasting & Auto-Bookkeeper",
        subDomain: "Corporate Finance & Bookkeeping",
        location: "Mumbai, MH",
        timeToRoi: "45 Days ROI",
        roiBadge: "Zero Data Entry • 100% Reconciliation",
        bigStat: "100%",
        bigStatLabel: "Automated Reconciliation",
        beforeMetric: "Manual Ledger Matching",
        afterMetric: "Real-Time AI Ledger",
        problem: "Mid-sized firms were spending weeks manually reconciling hundreds of bank transactions and categorizing expenses for monthly close.",
        solution: "Deployed an AI Bookkeeping Assistant that connects directly to banking APIs to auto-categorize expenses and forecast quarterly runway.",
        impact: "Achieved 100% automated ledger reconciliation, eliminating manual data entry and reducing month-end close from 14 days to 2 days.",
        deliverables: ["AI Bookkeeper", "Plaid API Sync", "Forecasting Dash"],
        imageSrc: "/static/img/financial_forecasting_ui.png",
        tags: ["Machine Learning", "Plaid API", "Next.js", "Python"]
      }
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "🏥",
    cases: [
      {
        id: "hc-1",
        title: "WhatsApp Healthcare Appointment & Triage Bot",
        subDomain: "Hospital Operations & Patient Support",
        location: "Hyderabad, TS",
        timeToRoi: "40 Days ROI",
        roiBadge: "80% Ticket Reduction • 24/7 Triage",
        bigStat: "80%",
        bigStatLabel: "Call Center Volume Cut",
        beforeMetric: "45-Min Call Center Hold",
        afterMetric: "< 3s WhatsApp Booking",
        problem: "A major hospital chain suffered long call center wait times for appointment booking and basic symptom queries.",
        solution: "Built a HIPAA-compliant WhatsApp AI Agent that triages patient symptoms, answers FAQs, and books doctor appointments.",
        impact: "Reduced call center volume by 80% and increased monthly appointment bookings by +45%.",
        deliverables: ["WhatsApp AI Agent", "Symptom Triager", "EHR Sync"],
        imageSrc: "/static/img/healthcare_chatbot_ui.png",
        tags: ["WhatsApp AI", "RAG Architecture", "FastAPI", "Python"]
      },
      {
        id: "hc-2",
        title: "Autonomous AI Patient Calling & Triage Agent",
        subDomain: "Telehealth & Patient Outreach",
        location: "Bengaluru, KA",
        timeToRoi: "30 Days ROI",
        roiBadge: "40% Fewer No-Shows • 24/7 Calls",
        bigStat: "1k+",
        bigStatLabel: "Automated Calls Daily",
        beforeMetric: "High Patient No-Show Rate",
        afterMetric: "100% Follow-up Coverage",
        problem: "Clinics were losing patients to missed follow-ups because receptionists were overwhelmed with incoming calls and manual dialing.",
        solution: "Deployed an outbound AI Voice Agent that automatically calls patients for post-visit checkups, triage, and appointment reminders using Twilio and OpenAI.",
        impact: "Reduced no-show rates by 40% and successfully automated over 1,000 daily follow-up calls without human intervention.",
        deliverables: ["AI Voice Agent", "Twilio Integration", "EHR Sync"],
        imageSrc: "/static/img/ai_support.jpg",
        tags: ["Voice AI", "Twilio", "OpenAI", "Python"]
      }
    ]
  },
  {
    id: "startups",
    name: "Startups & SaaS",
    icon: "🚀",
    cases: [
      {
        id: "su-1",
        title: "AI Sales Intelligence & Revenue Agent",
        subDomain: "B2B Sales & Revenue Operations",
        location: "Bengaluru, KA",
        timeToRoi: "30 Days ROI",
        roiBadge: "3x Pipeline Conversion • Zero Manual Research",
        bigStat: "3x",
        bigStatLabel: "Sales Conversion Rate",
        beforeMetric: "Manual Lead Research",
        afterMetric: "Automated Intent Scoring",
        problem: "SaaS sales teams were wasting 60% of their time manually researching leads and struggled to prioritize high-intent prospects, losing revenue to competitors.",
        solution: "Deployed an AI Sales Agent integrating ML lead scoring and LLM personalization. It detects intent, scores leads via CRM, and auto-generates personalized follow-ups.",
        impact: "Reduced sales teams' manual workload entirely and improved pipeline conversion opportunities by 3x.",
        deliverables: ["ML Lead Scoring", "CRM Integration", "LLM Email Generator"],
        imageSrc: "/static/img/fintech_fraud_dashboard.png",
        tags: ["LLM", "Machine Learning", "CRM API", "Python"]
      },
      {
        id: "su-2",
        title: "AI Customer Support Agent & Analytics Hub",
        subDomain: "Customer Experience & Support",
        location: "Mumbai, MH",
        timeToRoi: "21 Days ROI",
        roiBadge: "75% Ticket Deflection • Instant Resolution",
        bigStat: "75%",
        bigStatLabel: "Support Tickets Automated",
        beforeMetric: "48-Hour Resolution Time",
        afterMetric: "Instant AI Resolution",
        problem: "Customer support teams were overwhelmed by repetitive queries, leading to slow response times, high escalation rates, and poor customer experience.",
        solution: "Built an LLM + RAG-based AI Support Agent that handles ticket classification, automatic sentiment analysis, and intelligent human escalation.",
        impact: "Delivered faster resolutions, reduced manual support workload by 75%, and significantly elevated overall customer satisfaction.",
        deliverables: ["RAG Support Bot", "Sentiment Analyzer", "Analytics Dash"],
        imageSrc: "/static/img/leg1_rag_ui.png",
        tags: ["NLP", "RAG", "LLMs", "React"]
      },
      {
        id: "su-3",
        title: "AI Finance & Virtual CFO Copilot",
        subDomain: "Financial Intelligence & FP&A",
        location: "Delhi NCR",
        timeToRoi: "45 Days ROI",
        roiBadge: "100% Automated Reporting • Live Forecasting",
        bigStat: "100%",
        bigStatLabel: "Automated Financial Reports",
        beforeMetric: "Manual Excel Forecasting",
        afterMetric: "Live AI Gen-Analyst",
        problem: "SaaS founders lacked real-time financial intelligence on MRR, CAC, and cash-flow runway, relying on slow manual reporting and error-prone spreadsheets.",
        solution: "Developed a GenAI Financial Analyst Copilot. Users can simply ask 'What will our runway be in 6 months?' to receive instant ML-backed forecasts and anomaly detection.",
        impact: "Enabled drastically faster financial decision-making and completely automated board-level runway and cash flow reporting.",
        deliverables: ["GenAI Analyst", "ML Forecaster", "FP&A Dashboard"],
        imageSrc: "/static/img/accounting_dashboard_ui.png",
        tags: ["GenAI", "Machine Learning", "FastAPI", "Python"]
      },
      {
        id: "su-4",
        title: "Conversational AI Business Analyst Agent",
        subDomain: "Business Intelligence & Data Analytics",
        location: "Pune, MH",
        timeToRoi: "30 Days ROI",
        roiBadge: "Instant KPI Insights • SQL Automation",
        bigStat: "10x",
        bigStatLabel: "Faster Data Querying",
        beforeMetric: "Days for BI Reports",
        afterMetric: "Instant Conversational SQL",
        problem: "Business teams waited days for data analysts to build SQL queries and charts to understand KPI drops or revenue anomalies.",
        solution: "Built an LLM + SQL Agent allowing teams to upload CSVs/Databases and simply ask natural language questions (e.g., 'Why did sales drop last month?').",
        impact: "Provided non-technical business teams with instant, data-analyst-level insights, actionable recommendations, and automated chart generation.",
        deliverables: ["Text-to-SQL Engine", "Auto-Charting", "Data Profiler"],
        imageSrc: "/static/img/defi_trading_ui.png",
        tags: ["LLMs", "SQL Agent", "Data Analytics", "React"]
      }
    ]
  }
];

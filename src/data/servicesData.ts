export interface Node3D {
  name: string;
  tech: string;
  icon: string;
  latency: string;
  plain: string;
  desc: string;
  ha: string;
}

export interface SpecRow {
  parameter: string;
  tier1: string;
  tier2: string;
  tier3: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface UseCaseItem {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceData {
  headline: string;
  subtext: string;
  heroSubtext: string;
  deliverables: string[];
  useCases: UseCaseItem[];
  faqs: FaqItem[];
  specsDescription: string;
  specs: SpecRow[];
  nodes3d: Node3D[];
}

export const SERVICES_DATA: Record<string, ServiceData> = {
  "ai-agents": {
    "headline": "Autonomous AI Agents.",
    "subtext": "We build multi-agent autonomous swarms that reason, delegate complex tasks, and execute real-world business decisions directly across your enterprise APIs.",
    "heroSubtext": "We build AI systems that handle repetitive work, answer customer questions, qualify leads, and connect with your existing business tools — so your team can focus on what matters.",
    "deliverables": [
      "Customer Support Autonomous Agents with Ticket Escalation",
      "Automated Market Research & Lead Scraping Agents",
      "Multi-Agent Code Review & Security Auditing Bots",
      "Internal HR & IT Operational Workflow Automation"
    ],
    "useCases": [
      { "icon": "💬", "title": "Customer Support Automation", "description": "Handle repetitive customer questions and route complex issues to your team automatically." },
      { "icon": "🎯", "title": "Lead Qualification", "description": "Automatically understand incoming leads and identify high-intent prospects for your sales team." },
      { "icon": "🤖", "title": "Internal AI Assistants", "description": "Give employees quick access to company information, policies, and workflows through conversational AI." },
      { "icon": "📧", "title": "Sales & Presales Automation", "description": "Automate research, follow-ups, proposal drafts, and repetitive sales tasks." },
      { "icon": "⚙️", "title": "Workflow Automation", "description": "Connect repetitive business processes across tools and reduce manual work." },
      { "icon": "📄", "title": "Document Processing", "description": "Extract and organize useful information from invoices, contracts, and business documents." }
    ],
    "faqs": [
      {
        "question": "Who owns the intellectual property (IP) and code?",
        "answer": "You own 100% of the IP, source code, and custom agent weights. We deliver clean, commented codebases directly to your GitHub repository."
      },
      {
        "question": "What APIs and systems can the AI agents integrate with?",
        "answer": "Our AI agents can integrate with any system exposing a REST or GraphQL API, including Salesforce, HubSpot, Stripe, Slack, and custom internal databases."
      },
      {
        "question": "How do you ensure the agent doesn't take destructive actions?",
        "answer": "We implement strict Human-in-the-Loop (HITL) workflows and RBAC guardrails, ensuring that high-stakes actions like payments or database deletions require explicit human approval."
      },
      {
        "question": "What happens if an agent fails a task?",
        "answer": "Our LangGraph stateful architecture includes automatic retry mechanisms, error logging, and circuit breakers to pause operations and alert your team if persistent failures occur."
      },
      {
        "question": "Can the agents run locally on our own servers?",
        "answer": "Yes, we support deploying agents inside private VPCs or entirely on-premises using containerized Docker deployments to ensure maximum data privacy."
      }
    ],
    "specsDescription": "See how an AI solution can evolve from a focused workflow to a more advanced and scalable system.",
    "specs": [
      {
        "parameter": "AI Workflows",
        "tier1": "Single Workflow",
        "tier2": "Multi-Step Workflows",
        "tier3": "Advanced Agent Systems"
      },
      {
        "parameter": "Knowledge & Memory",
        "tier1": "Basic Context",
        "tier2": "Persistent Knowledge",
        "tier3": "Private Knowledge Systems"
      },
      {
        "parameter": "Human Approval",
        "tier1": "Manual Approval",
        "tier2": "Configurable Approval",
        "tier3": "Advanced Access Controls"
      },
      {
        "parameter": "Integrations",
        "tier1": "Essential Tools",
        "tier2": "Multiple Business Tools",
        "tier3": "Custom Integrations"
      },
      {
        "parameter": "Deployment",
        "tier1": "Cloud Environment",
        "tier2": "Dedicated Environment",
        "tier3": "Private / Custom Infrastructure"
      }
    ],
    "nodes3d": [
      {
        "name": "FastAPI Ingress Gateway",
        "tech": "FastAPI / NGINX",
        "icon": "\ud83d\udeaa",
        "latency": "< 2ms",
        "plain": "Captures all incoming customer messages instantly and prevents crashes even when thousands of users text at once.",
        "desc": "Intercepts incoming Webhooks, verifies TLS certificates, and dispatches requests to Redis async queue.",
        "ha": "Multi-AZ Auto-scaling (N+1 Redundancy)"
      },
      {
        "name": "LangGraph Agent Brain",
        "tech": "LangGraph / Python",
        "icon": "\ud83e\udde0",
        "latency": "< 120ms",
        "plain": "The intelligent brain that reads customer requirements and delegates work to AI specialized worker bots.",
        "desc": "Executes stateful multi-agent DAG task graph. Evaluates agent prompts and coordinates parallel agent steps.",
        "ha": "Stateless Container Pool with Redis Checkpoints"
      },
      {
        "name": "Pinecone Vector Memory",
        "tech": "Pinecone HNSW",
        "icon": "\ud83d\uddc4\ufe0f",
        "latency": "< 8ms",
        "plain": "Super-fast memory store that searches through 10,000+ records in milliseconds to find perfect context matches.",
        "desc": "Stores 3072-dimensional vector embeddings for listing data and past conversation memory state.",
        "ha": "Distributed Replica Sharding (99.99% Uptime)"
      },
      {
        "name": "Action Dispatch Engine",
        "tech": "Twilio / Stripe API",
        "icon": "\u26a1",
        "latency": "< 45ms",
        "plain": "Automatically triggers real-world actions like booking calendars, processing payments, and updating CRMs.",
        "desc": "Executes human-in-the-loop approved API webhooks, updates CRM tables, and sends WhatsApp messages.",
        "ha": "Circuit Breaker Pattern with Retry Queue"
      }
    ]
  },
  "gen-ai": {
    "headline": "Generative AI Solutions.",
    "subtext": "We deploy private, zero-hallucination RAG pipelines and custom fine-tuned LLMs that turn 100,000+ enterprise documents into actionable knowledge.",
    "heroSubtext": "We build AI systems that understand your business documents, answer questions from your knowledge base, and generate content — keeping your data private and secure.",
    "deliverables": [
      "Enterprise Document Search & Knowledge Base Chatbots (RAG)",
      "Legal & Compliance Contract Auditing LLMs",
      "Custom Fine-Tuned Llama 3 & Mistral Domain Models",
      "Automated Multi-Format Content Generation Pipelines"
    ],
    "useCases": [
      { "icon": "🔍", "title": "Internal Knowledge Search", "description": "Let your team search across company documents, policies, and data using natural language questions." },
      { "icon": "📑", "title": "Document Intelligence", "description": "Automatically understand, summarize, and extract insights from complex business documents." },
      { "icon": "✍️", "title": "Content Generation", "description": "Generate reports, summaries, emails, and marketing content grounded in your business data." },
      { "icon": "⚖️", "title": "Compliance & Audit", "description": "Automatically review contracts and documents for compliance risks and regulatory issues." },
      { "icon": "💡", "title": "Customer-Facing AI Assistants", "description": "Build AI chat interfaces that answer customer questions using your product knowledge base." },
      { "icon": "📊", "title": "Research & Analysis", "description": "Analyze large volumes of text data to surface patterns, trends, and actionable insights." }
    ],
    "faqs": [
      {
        "question": "Is our sensitive company data sent to third-party public AI models?",
        "answer": "No. We build private RAG systems that can be hosted inside your own AWS/Azure VPC or air-gapped private servers so data never leaves your perimeter."
      },
      {
        "question": "How do you prevent the AI from hallucinating incorrect facts?",
        "answer": "We use strict Retrieval-Augmented Generation (RAG) with citation tracking and automated fact-checking guardrails to ensure every claim is grounded in your source documents."
      },
      {
        "question": "Can the system ingest complex files like scanned PDFs or legal contracts?",
        "answer": "Yes, our ingestion engine uses advanced OCR and unstructured data parsing to accurately extract text, tables, and metadata from highly complex documents."
      },
      {
        "question": "Do you use open-source or proprietary LLMs?",
        "answer": "We can build with proprietary models like OpenAI's GPT-4 or Anthropic's Claude, as well as deploy private open-source models like Llama 3 or Mistral directly in your environment."
      },
      {
        "question": "How is access control handled for different documents?",
        "answer": "We implement role-based access control (RBAC) at the vector database level, ensuring users can only retrieve and chat with documents they have permission to view."
      }
    ],
    "specsDescription": "Start with focused AI knowledge tools and evolve toward secure, enterprise-ready knowledge systems.",
    "specs": [
      {
        "parameter": "Knowledge Retrieval",
        "tier1": "Basic Document Search",
        "tier2": "Advanced Knowledge Retrieval",
        "tier3": "Enterprise Knowledge Systems"
      },
      {
        "parameter": "Knowledge Base",
        "tier1": "Small Knowledge Base",
        "tier2": "Large Knowledge Base",
        "tier3": "Enterprise-Scale Knowledge"
      },
      {
        "parameter": "AI Customization",
        "tier1": "Prompt & Context Design",
        "tier2": "Domain-Specific AI",
        "tier3": "Advanced Model Customization"
      },
      {
        "parameter": "Response Grounding",
        "tier1": "Source-Based Responses",
        "tier2": "Citation & Context Checks",
        "tier3": "Advanced Guardrails"
      },
      {
        "parameter": "Hosting",
        "tier1": "Managed Cloud",
        "tier2": "Dedicated Environment",
        "tier3": "Private / Custom Infrastructure"
      }
    ],
    "nodes3d": [
      {
        "name": "Doc Ingestion Engine",
        "tech": "LlamaIndex / Unstructured",
        "icon": "\ud83d\udcc4",
        "latency": "< 15ms",
        "plain": "Reads through thousands of complex 500-page legal PDFs and splits them into clean readable sections.",
        "desc": "Extracts raw text, table structures, and metadata from enterprise PDFs, DOCX, and Confluence pages.",
        "ha": "Parallel Celery Worker Pipeline"
      },
      {
        "name": "Hybrid Embedding Index",
        "tech": "text-embedding-3 / BM25",
        "icon": "\ud83d\udcc9",
        "latency": "< 25ms",
        "plain": "Translates legal text into mathematical codes so the system can understand deep context and legal concepts.",
        "desc": "Generates 3072-dimensional vector arrays combined with sparse BM25 keyword indices for high-recall precision.",
        "ha": "Distributed Batch Embedding Queue"
      },
      {
        "name": "Cohere v3 Re-Ranker",
        "tech": "Cohere Rerank API",
        "icon": "\ud83d\uddc4\ufe0f",
        "latency": "< 10ms",
        "plain": "Filters out irrelevant clauses and isolates the top 5 exact contract sections needed to answer your query.",
        "desc": "Re-ranks top 25 retrieved vector chunks down to the top 5 most relevant legal clauses using cross-encoder scoring.",
        "ha": "Redundant Regional API Endpoints"
      },
      {
        "name": "Grounded Llama 3 LLM",
        "tech": "vLLM / Llama 3 70B",
        "icon": "\ud83d\udcac",
        "latency": "< 250ms",
        "plain": "Writes clear compliance summaries with exact page number citations so legal teams can verify every word.",
        "desc": "Synthesizes compliance audit report with exact page-level citations and zero hallucination risk.",
        "ha": "Air-Gapped Private GPU Cluster"
      }
    ]
  },
  "machine-learning": {
    "headline": "Predictive Machine Learning.",
    "subtext": "We train custom deep learning models and 60 FPS computer vision pipelines accelerated with NVIDIA TensorRT for sub-5ms real-time inference.",
    "heroSubtext": "We build prediction systems that help your business forecast demand, detect risks, reduce churn, and make smarter decisions — all using your own data.",
    "deliverables": [
      "Sales, Inventory & Demand Forecasting Engines",
      "Real-Time Transactional Fraud Detection Systems",
      "Manufacturing Defect Detection via Computer Vision (60 FPS)",
      "Predictive Customer Churn & Retention Analytics"
    ],
    "useCases": [
      { "icon": "📈", "title": "Demand Forecasting", "description": "Predict future sales, inventory needs, and resource requirements using historical business data." },
      { "icon": "🛡️", "title": "Fraud Detection", "description": "Identify suspicious transactions and unusual patterns in real-time to protect your business." },
      { "icon": "🔄", "title": "Customer Churn Prediction", "description": "Identify at-risk customers before they leave and take action to improve retention." },
      { "icon": "🔬", "title": "Quality Inspection", "description": "Automatically detect defects, anomalies, and quality issues using computer vision." },
      { "icon": "⭐", "title": "Recommendation Systems", "description": "Suggest relevant products, content, or actions to users based on their behavior and preferences." },
      { "icon": "⚠️", "title": "Risk Assessment", "description": "Score and prioritize risks across operations, lending, insurance, or compliance workflows." }
    ],
    "faqs": [
      {
        "question": "What is the real-time inference latency guaranteed by your models?",
        "answer": "Our NVIDIA TensorRT optimized computer vision models execute inference in < 5ms. REST ML models execute in < 50ms."
      },
      {
        "question": "How do you handle concept drift when data patterns change over time?",
        "answer": "We build automated MLflow tracking and telemetry pipelines that alert you when data drifts, and can trigger continuous retraining pipelines to keep models accurate."
      },
      {
        "question": "Do we need a massive dataset to get started?",
        "answer": "While more data is better, we can often build highly effective MVP models using transfer learning, data augmentation, or synthetic data generation from smaller datasets."
      },
      {
        "question": "What hardware is required to run the deployed models?",
        "answer": "Our solutions are highly optimized. We can deploy on CPU-based cloud instances, massive GPU clusters, or even edge devices like NVIDIA Jetson using TensorRT."
      },
      {
        "question": "Can you explain how the model makes its predictions?",
        "answer": "Yes, we integrate explainable AI (XAI) techniques like SHAP or LIME to provide clear, interpretable reports on which features drove a specific prediction."
      }
    ],
    "specsDescription": "Choose the level of machine learning infrastructure based on your data, workflow and production requirements.",
    "specs": [
      {
        "parameter": "Predictive Models",
        "tier1": "Standard ML Models",
        "tier2": "Advanced ML Models",
        "tier3": "Custom AI Models"
      },
      {
        "parameter": "Inference",
        "tier1": "Standard Inference",
        "tier2": "Real-Time Inference",
        "tier3": "Optimized Inference"
      },
      {
        "parameter": "Model Operations",
        "tier1": "Managed Model Workflow",
        "tier2": "Tracked ML Pipeline",
        "tier3": "Automated ML Operations"
      },
      {
        "parameter": "Deployment",
        "tier1": "Cloud Deployment",
        "tier2": "Production Deployment",
        "tier3": "Cloud / Edge Deployment"
      },
      {
        "parameter": "Monitoring",
        "tier1": "Periodic Model Review",
        "tier2": "Automated Monitoring",
        "tier3": "Continuous Model Monitoring"
      }
    ],
    "nodes3d": [
      {
        "name": "60 FPS RTSP Video Ingestion",
        "tech": "OpenCV / GStreamer",
        "icon": "\ud83d\udce6",
        "latency": "< 1.2ms",
        "plain": "Captures 60 high-definition camera frames every second from factory assembly lines.",
        "desc": "Ingests 4K camera streams at 60 FPS directly into shared GPU memory buffers without CPU bottlenecks.",
        "ha": "Dual Redundant Camera Feeds"
      },
      {
        "name": "CUDA Tensor Normalizer",
        "tech": "PyTorch / CUDA C++",
        "icon": "\ud83e\uddf9",
        "latency": "< 0.8ms",
        "plain": "Cleans and enhances image contrast on graphics chips so defects stand out clearly.",
        "desc": "Executes parallel pixel normalization, matrix cropping, and tensor batching directly on NVIDIA CUDA cores.",
        "ha": "Double-Buffered Frame Ring"
      },
      {
        "name": "NVIDIA TensorRT Neural Core",
        "tech": "TensorRT 10.0 / YOLOv8",
        "icon": "\ud83d\udda5\ufe0f",
        "latency": "< 3.8ms",
        "plain": "AI computer vision engine that detects scratches, dents, or defects in 3.8 milliseconds.",
        "desc": "Runs FP16 quantized deep neural network inference to detect manufacturing defects in real-time.",
        "ha": "Dual NVIDIA RTX 4090 GPU Cluster"
      },
      {
        "name": "Hardware PLC Ejection Signal",
        "tech": "Industrial Modbus / REST",
        "icon": "\ud83c\udfaf",
        "latency": "< 1.0ms",
        "plain": "Fires a physical robot arm to push defective items off the conveyor belt immediately.",
        "desc": "Sends high-speed hardware pulse signal to conveyor pneumatic arm to eject defective products.",
        "ha": "Fail-Safe Hardware Circuit"
      }
    ]
  },
  "data-engineering": {
    "headline": "Data Engineering.",
    "subtext": "We construct 5,000+ event/sec Kafka streaming pipelines, Airflow DAGs, and Snowflake cloud lakehouses with automated dbt data quality verification.",
    "heroSubtext": "We build reliable data systems that bring your scattered information together, automate reporting, and give your team clear, real-time insights for better decisions.",
    "deliverables": [
      "Automated Cloud Data Warehouses (Snowflake / BigQuery)",
      "Real-Time Event Streaming Pipelines (Kafka / Spark)",
      "Custom Apache Airflow ETL/ELT DAG Workflows",
      "Executive Business Intelligence & Looker Dashboards"
    ],
    "useCases": [
      { "icon": "🔗", "title": "Data Consolidation", "description": "Bring scattered data from multiple tools, databases, and spreadsheets into one reliable source of truth." },
      { "icon": "⚡", "title": "Real-Time Analytics", "description": "Process and analyze business events as they happen for up-to-the-minute decision-making insights." },
      { "icon": "📊", "title": "Automated Reporting", "description": "Replace manual spreadsheet work with automated dashboards and scheduled business reports." },
      { "icon": "✅", "title": "Data Quality Management", "description": "Detect and fix data issues automatically before they affect your business decisions." },
      { "icon": "📉", "title": "Business Intelligence", "description": "Build interactive dashboards that help leadership track KPIs and make data-driven decisions." },
      { "icon": "🔄", "title": "Data Migration", "description": "Safely move your data between systems, databases, or cloud platforms without disruption." }
    ],
    "faqs": [
      {
        "question": "Which data warehouses do you support?",
        "answer": "We build for Snowflake, Google BigQuery, AWS Redshift, and Databricks Delta Lakehouses."
      },
      {
        "question": "How do you ensure data quality and prevent bad data from breaking dashboards?",
        "answer": "We implement automated dbt tests and Great Expectations checks within our pipelines to halt processing or alert teams immediately if data anomalies are detected."
      },
      {
        "question": "Can you handle real-time streaming data as well as batch processing?",
        "answer": "Absolutely. We build real-time event streaming architectures using Apache Kafka and Spark, alongside traditional batch processing workflows via Apache Airflow."
      },
      {
        "question": "How is sensitive PII (Personally Identifiable Information) handled?",
        "answer": "We apply strict data masking, hashing, and role-based tokenization before data lands in the warehouse to ensure compliance with GDPR, HIPAA, and SOC2."
      },
      {
        "question": "Will we be locked into a specific cloud provider?",
        "answer": "No. We utilize open-source standards and containerized workflows (like Docker, dbt, and Airflow) to ensure your data infrastructure remains cloud-agnostic."
      }
    ],
    "specsDescription": "Build a reliable data foundation that can grow from simple business reporting to high-volume data systems.",
    "specs": [
      {
        "parameter": "Data Pipelines",
        "tier1": "Automated Data Sync",
        "tier2": "Managed Data Pipelines",
        "tier3": "Real-Time Data Systems"
      },
      {
        "parameter": "Data Storage",
        "tier1": "PostgreSQL / MySQL",
        "tier2": "Cloud Data Warehouse",
        "tier3": "Enterprise Data Platform"
      },
      {
        "parameter": "Data Quality",
        "tier1": "Basic Data Validation",
        "tier2": "Automated Data Testing",
        "tier3": "Advanced Data Quality"
      },
      {
        "parameter": "Data Processing",
        "tier1": "Growing Data Workloads",
        "tier2": "High-Volume Workloads",
        "tier3": "Enterprise-Scale Workloads"
      },
      {
        "parameter": "Data Security",
        "tier1": "Basic Data Protection",
        "tier2": "Role-Based Access",
        "tier3": "Advanced Data Governance"
      }
    ],
    "nodes3d": [
      {
        "name": "Kafka Streaming Ingress",
        "tech": "Apache Kafka / Confluent",
        "icon": "\ud83c\udf10",
        "latency": "< 4ms",
        "plain": "Handles 5,000 transaction events per second without dropping a single payment record.",
        "desc": "Handles 5,000 financial transaction events per second across multi-broker Kafka topics.",
        "ha": "3-Node Broker Cluster (Replication Factor 3)"
      },
      {
        "name": "Airflow & dbt Auto-Transforms",
        "tech": "Airflow 2.8 / dbt",
        "icon": "\u2699\ufe0f",
        "latency": "< 12s Batch",
        "plain": "Cleans, organizes, and checks financial data for errors before saving to executive reports.",
        "desc": "Orchestrates complex SQL data models, automated schema migrations, and zero-null data quality checks.",
        "ha": "Airflow Celery Executor on Kubernetes"
      },
      {
        "name": "Snowflake Cloud Lakehouse",
        "tech": "Snowflake Enterprise",
        "icon": "\ud83c\udfe2",
        "latency": "< 15ms Query",
        "plain": "Secure cloud data warehouse that stores terabytes of financial history safely.",
        "desc": "Stores multi-terabyte transactional histories with automated micro-partitioning and role-based data masking.",
        "ha": "Multi-Region Cloud Replication"
      },
      {
        "name": "Tableau & Looker BI Sync",
        "tech": "Looker / Tableau",
        "icon": "\ud83d\udca1",
        "latency": "Real-Time Sync",
        "plain": "Real-time charts and reports for CEOs and executives to track revenue live.",
        "desc": "Streams analytics data to executive dashboard portals and downstream machine learning feature stores.",
        "ha": "Cached BI Gateway Layers"
      }
    ]
  },
  "ai-product-engineering": {
    "headline": "High-Performance Web Applications.",
    "subtext": "We engineer sub-second Next.js 19 multi-tenant SaaS applications and high-converting glassmorphic portals deeply integrated with Python FastAPI backends.",
    "heroSubtext": "We build production-ready web applications, SaaS platforms, dashboards, and AI-powered products — from initial idea to live deployment.",
    "deliverables": [
      "Full-Stack Multi-Tenant SaaS Platforms",
      "High-Converting Animated Product Landing Pages",
      "Internal Enterprise Operations & Analytics Dashboards",
      "AI-Integrated Dynamic Web Applications"
    ],
    "useCases": [
      { "icon": "🚀", "title": "AI-Powered SaaS Products", "description": "Build subscription-based software products with AI features, user management, and billing." },
      { "icon": "📊", "title": "Internal Dashboards", "description": "Custom operations dashboards that give your team real-time visibility into business metrics." },
      { "icon": "🌐", "title": "Customer Portals", "description": "Secure web portals where customers can access services, track orders, and manage their accounts." },
      { "icon": "🔧", "title": "API & Backend Systems", "description": "Reliable backend services and APIs that connect your frontend, data, and third-party tools." },
      { "icon": "✨", "title": "Landing Pages & Marketing Sites", "description": "High-converting, SEO-optimized websites that showcase your brand and drive leads." },
      { "icon": "💡", "title": "MVP Development", "description": "Turn your product idea into a working prototype quickly to test, validate, and iterate." }
    ],
    "faqs": [
      {
        "question": "Which modern web frameworks do you specialize in?",
        "answer": "We specialize in Next.js 19 (React), FastAPI (Python), Node.js, TailwindCSS, and Three.js 3D graphics."
      },
      {
        "question": "Do you build SEO-friendly applications?",
        "answer": "Yes, we leverage Next.js Server-Side Rendering (SSR) and Static Site Generation (SSG) to ensure your web applications rank highly and load instantly for search engines."
      },
      {
        "question": "How do you handle website performance and load times?",
        "answer": "We optimize everything from image compression and code splitting to utilizing Edge CDNs (like Vercel and Cloudflare) to consistently achieve 95+ Lighthouse performance scores."
      },
      {
        "question": "Are your web applications mobile-responsive?",
        "answer": "100%. Every interface we build is designed mobile-first, ensuring a seamless, native-feeling experience across smartphones, tablets, and desktop displays."
      },
      {
        "question": "Can you integrate the frontend with our existing legacy backend?",
        "answer": "Yes, our API gateway layer can aggregate and translate data from your existing legacy systems to serve modern, lightning-fast interfaces without rewriting your core backend."
      }
    ],
    "specsDescription": "Move from an initial product idea to a production-ready application designed to grow with your business.",
    "specs": [
      {
        "parameter": "Product Build",
        "tier1": "Product MVP",
        "tier2": "Production Web Application",
        "tier3": "Scalable AI Product"
      },
      {
        "parameter": "Backend",
        "tier1": "REST API",
        "tier2": "Production API Services",
        "tier3": "Scalable Backend Architecture"
      },
      {
        "parameter": "Performance",
        "tier1": "Optimized Web Experience",
        "tier2": "Production Performance",
        "tier3": "Advanced Performance Optimization"
      },
      {
        "parameter": "Payments",
        "tier1": "Basic Payment Integration",
        "tier2": "Subscriptions & Webhooks",
        "tier3": "Custom Payment Workflows"
      },
      {
        "parameter": "Deployment",
        "tier1": "Managed Cloud Deployment",
        "tier2": "Production Cloud Deployment",
        "tier3": "Custom Cloud Infrastructure"
      }
    ],
    "nodes3d": [
      {
        "name": "Next.js 19 SSR Frontend Engine",
        "tech": "Next.js 19 / React",
        "icon": "\ud83d\udcbb",
        "latency": "< 80ms TTFB",
        "plain": "Delivers lightning-fast web pages to customers worldwide in under 1 second with smooth animations.",
        "desc": "Renders dynamic HTML on edge servers using React Server Components (RSC) and TailwindCSS.",
        "ha": "Global Vercel Edge Network"
      },
      {
        "name": "FastAPI Async API Gateway",
        "tech": "FastAPI / Python",
        "icon": "\ud83d\udeaa",
        "latency": "< 4ms",
        "plain": "Secure doorway that logs users in safely and connects the web app to backend databases.",
        "desc": "Handles async REST routes, enforces CORS, and verifies JWT user session tokens.",
        "ha": "Containerized Gunicorn Pool"
      },
      {
        "name": "PostgreSQL & Redis Warm Cache",
        "tech": "PostgreSQL / Redis",
        "icon": "\u2601\ufe0f",
        "latency": "< 1.5ms Cache",
        "plain": "Stores user accounts and billing data safely with instant memory caching.",
        "desc": "Stores multi-tenant data in PostgreSQL with warm Redis query caching to eliminate DB latency.",
        "ha": "Managed AWS RDS Multi-AZ + Redis Cluster"
      },
      {
        "name": "Vercel Global Edge CDN",
        "tech": "Edge Middleware",
        "icon": "\ud83c\udf0d",
        "latency": "< 10ms",
        "plain": "Global server network that keeps your website active 24/7 anywhere on earth.",
        "desc": "Serves static assets and edge functions from 300+ global data centers with 99+ Lighthouse performance.",
        "ha": "Global CDN Anycast Routing"
      }
    ]
  }
};

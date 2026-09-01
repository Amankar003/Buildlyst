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

export interface ServiceData {
  headline: string;
  subtext: string;
  deliverables: string[];
  faqs: FaqItem[];
  specs: SpecRow[];
  nodes3d: Node3D[];
}

export const SERVICES_DATA: Record<string, ServiceData> = {
  "ai-agents": {
    "headline": "Autonomous AI Agents.",
    "subtext": "We build multi-agent autonomous swarms that reason, delegate complex tasks, and execute real-world business decisions directly across your enterprise APIs.",
    "deliverables": [
      "Customer Support Autonomous Agents with Ticket Escalation",
      "Automated Market Research & Lead Scraping Agents",
      "Multi-Agent Code Review & Security Auditing Bots",
      "Internal HR & IT Operational Workflow Automation"
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
    "specs": [
      {
        "parameter": "Agent Architecture",
        "tier1": "Single-Task Agent",
        "tier2": "Multi-Agent Swarm",
        "tier3": "Custom Orchestrated Graph"
      },
      {
        "parameter": "Memory Vector Store",
        "tier1": "In-Memory / Redis",
        "tier2": "Pinecone / Postgres",
        "tier3": "Dedicated Private Qdrant"
      },
      {
        "parameter": "Human-in-the-Loop",
        "tier1": "Manual Confirmation",
        "tier2": "Configurable UI Guardrail",
        "tier3": "Granular RBAC + Audit Logs"
      },
      {
        "parameter": "Target SLA Uptime",
        "tier1": "99.0%",
        "tier2": "99.9%",
        "tier3": "99.99% Guaranteed SLA"
      },
      {
        "parameter": "Deployment Environment",
        "tier1": "Shared Cloud Edge",
        "tier2": "Isolated Docker Container",
        "tier3": "Private VPC / On-Prem"
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
    "deliverables": [
      "Enterprise Document Search & Knowledge Base Chatbots (RAG)",
      "Legal & Compliance Contract Auditing LLMs",
      "Custom Fine-Tuned Llama 3 & Mistral Domain Models",
      "Automated Multi-Format Content Generation Pipelines"
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
    "specs": [
      {
        "parameter": "Retrieval Architecture",
        "tier1": "Naive RAG",
        "tier2": "Hybrid RAG (BM25 + Dense)",
        "tier3": "Multi-Stage Re-Ranked RAG"
      },
      {
        "parameter": "Document Scale",
        "tier1": "Up to 1,000 PDFs",
        "tier2": "Up to 100,000 Documents",
        "tier3": "Unlimited Enterprise Silos"
      },
      {
        "parameter": "Model Customization",
        "tier1": "Prompt Engineering",
        "tier2": "Domain Fine-Tuned Llama 3",
        "tier3": "Quantized Self-Hosted Model"
      },
      {
        "parameter": "Hallucination Mitigation",
        "tier1": "Basic Grounding",
        "tier2": "Strict Citation Verification",
        "tier3": "Automated Fact-Checking Guard"
      },
      {
        "parameter": "Hosting Model",
        "tier1": "Public API Gateway",
        "tier2": "Private Cloud VPC",
        "tier3": "Air-Gapped On-Premises"
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
    "deliverables": [
      "Sales, Inventory & Demand Forecasting Engines",
      "Real-Time Transactional Fraud Detection Systems",
      "Manufacturing Defect Detection via Computer Vision (60 FPS)",
      "Predictive Customer Churn & Retention Analytics"
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
    "specs": [
      {
        "parameter": "Model Architecture",
        "tier1": "Scikit-Learn / XGBoost",
        "tier2": "PyTorch / TensorFlow Neural Net",
        "tier3": "Custom TensorRT GPU Model"
      },
      {
        "parameter": "Inference Latency",
        "tier1": "&lt; 200ms",
        "tier2": "&lt; 50ms Real-Time",
        "tier3": "&lt; 5ms Micro-Latency"
      },
      {
        "parameter": "MLOps Pipeline",
        "tier1": "Manual Script Run",
        "tier2": "MLflow Tracked Pipeline",
        "tier3": "Automated CI/CD Kubeflow"
      },
      {
        "parameter": "Edge AI Support",
        "tier1": "Not Supported",
        "tier2": "Mobile ONNX Export",
        "tier3": "NVIDIA Jetson / Edge TensorRT"
      },
      {
        "parameter": "Monitoring & Drift",
        "tier1": "Periodic Reports",
        "tier2": "Automated Data Drift Alerting",
        "tier3": "Continuous Real-Time Retraining"
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
    "deliverables": [
      "Automated Cloud Data Warehouses (Snowflake / BigQuery)",
      "Real-Time Event Streaming Pipelines (Kafka / Spark)",
      "Custom Apache Airflow ETL/ELT DAG Workflows",
      "Executive Business Intelligence & Looker Dashboards"
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
    "specs": [
      {
        "parameter": "Pipeline Architecture",
        "tier1": "Single Script Batch Sync",
        "tier2": "Apache Airflow DAG Suite",
        "tier3": "Kafka Real-Time Event Stream"
      },
      {
        "parameter": "Data Warehouse Target",
        "tier1": "PostgreSQL / MySQL",
        "tier2": "Snowflake / Redshift",
        "tier3": "Databricks Lakehouse Delta"
      },
      {
        "parameter": "Data Quality Testing",
        "tier1": "Manual Schema Check",
        "tier2": "Automated dbt Tests",
        "tier3": "Continuous Great Expectations"
      },
      {
        "parameter": "Throughput Capacity",
        "tier1": "Up to 10GB / Day",
        "tier2": "Up to 5TB / Day",
        "tier3": "100TB+ Scalable Lakehouse"
      },
      {
        "parameter": "Data Anonymization",
        "tier1": "Basic Hash Masking",
        "tier2": "Role-Based Masking (RBAC)",
        "tier3": "SOC2 Compliant Tokenization"
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
  "web-development": {
    "headline": "Website Development.",
    "subtext": "We engineer sub-second Next.js 19 multi-tenant SaaS applications and high-converting glassmorphic portals deeply integrated with Python FastAPI backends.",
    "deliverables": [
      "Full-Stack Multi-Tenant SaaS Platforms",
      "High-Converting Animated Product Landing Pages",
      "Internal Enterprise Operations & Analytics Dashboards",
      "AI-Integrated Dynamic Web Applications"
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
    "specs": [
      {
        "parameter": "Frontend Stack",
        "tier1": "Single Page React",
        "tier2": "Next.js SSR / SSG",
        "tier3": "Next.js + Three.js 3D WebGL"
      },
      {
        "parameter": "Backend Architecture",
        "tier1": "Simple REST Server",
        "tier2": "FastAPI Async Microservices",
        "tier3": "Distributed Redis Microservices"
      },
      {
        "parameter": "Lighthouse Speed Score",
        "tier1": "90+",
        "tier2": "98+",
        "tier3": "99 - 100 Perfect Score"
      },
      {
        "parameter": "Payment Integration",
        "tier1": "Basic Stripe Checkout",
        "tier2": "Stripe Subscription & Webhooks",
        "tier3": "Custom Multi-Currency Gateways"
      },
      {
        "parameter": "Deployment Edge",
        "tier1": "Vercel Hobby",
        "tier2": "Vercel Pro CDN Edge",
        "tier3": "AWS CloudFront + Global Edge"
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

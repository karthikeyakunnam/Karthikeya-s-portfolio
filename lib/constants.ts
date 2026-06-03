// Constants for portfolio content

export const PORTFOLIO_DATA = {
  name: "Unnam Karthikeya",
  title: "GenAI Engineer",
  subtitle: "Building Autonomous AI Systems",
  tagline: "Transforming complex workflows into intelligent autonomous agents.",
  email: "karthikeyaunnam1364@gmail.com",
  phone: "+91 86880 84787",
};

export const NAVIGATION = [
  { label: "Home", href: "#" },
  { label: "Agents", href: "#agents" },
  { label: "Projects", href: "#projects" },
  { label: "Skills & Education", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

// ─── Agent Architecture ───

export interface Agent {
  id: number;
  name: string;
  role: string;
  purpose: string;
  tools: string[];
  capabilities: string[];
  tech: string[];
  color: string;
}

export const AGENTS: Agent[] = [
  {
    id: 0,
    name: "Planner",
    role: "Orchestrator",
    purpose:
      "Decomposes complex tasks into executable sub-plans and coordinates agent workflows.",
    tools: ["Task Decomposition", "DAG Builder", "Priority Queue"],
    capabilities: [
      "Multi-step planning",
      "Dependency resolution",
      "Dynamic re-planning",
    ],
    tech: ["LangGraph", "Python", "State Machines"],
    color: "#00E5FF",
  },
  {
    id: 1,
    name: "Research",
    role: "Intelligence",
    purpose:
      "Gathers information from multiple sources and synthesizes findings.",
    tools: ["Web Search", "API Queries", "Document Analysis"],
    capabilities: [
      "Multi-hop reasoning",
      "Source verification",
      "Knowledge synthesis",
    ],
    tech: ["LangChain", "Tavily", "LlamaIndex"],
    color: "#7C3AED",
  },
  {
    id: 2,
    name: "Retriever",
    role: "Memory Access",
    purpose:
      "Performs hybrid retrieval across vector stores and structured databases.",
    tools: ["Vector Search", "BM25", "SQL Queries"],
    capabilities: ["Semantic search", "Hybrid retrieval", "Re-ranking"],
    tech: ["Pinecone", "LlamaIndex", "SQLite"],
    color: "#00FFC8",
  },
  {
    id: 3,
    name: "Critic",
    role: "Quality Assurance",
    purpose: "Evaluates outputs for accuracy, completeness, and safety.",
    tools: ["LLM Judge", "Fact Checker", "Safety Filter"],
    capabilities: [
      "Self-evaluation",
      "Confidence scoring",
      "Hallucination detection",
    ],
    tech: ["OpenAI", "Anthropic", "LangSmith"],
    color: "#FF6B6B",
  },
  {
    id: 4,
    name: "Memory",
    role: "State Management",
    purpose:
      "Maintains persistent context and learning across agent interactions.",
    tools: ["Context Store", "Conversation Buffer", "Knowledge Graph"],
    capabilities: [
      "Long-term memory",
      "Session persistence",
      "Knowledge accumulation",
    ],
    tech: ["SQLite", "Redis", "Vector DBs"],
    color: "#FFD93D",
  },
  {
    id: 5,
    name: "Execution",
    role: "Action Engine",
    purpose:
      "Executes code, API calls, and system commands with safety constraints.",
    tools: ["Code Executor", "API Client", "File System"],
    capabilities: ["Sandboxed execution", "Error recovery", "Retry logic"],
    tech: ["Python", "FastAPI", "Docker"],
    color: "#FF8C42",
  },
  {
    id: 6,
    name: "Verifier",
    role: "Validation",
    purpose: "Runs tests, validates outputs, and ensures production readiness.",
    tools: ["Test Runner", "Schema Validator", "Integration Tests"],
    capabilities: [
      "Automated testing",
      "Output validation",
      "Regression checks",
    ],
    tech: ["Pytest", "LangSmith", "CI/CD"],
    color: "#6BCB77",
  },
];

// Agent workflow connections (directed edges: from → to)
export const AGENT_CONNECTIONS: [number, number][] = [
  [0, 1], // Planner → Research
  [0, 2], // Planner → Retriever
  [1, 3], // Research → Critic
  [2, 3], // Retriever → Critic
  [3, 4], // Critic → Memory
  [4, 5], // Memory → Execution
  [5, 6], // Execution → Verifier
  [6, 0], // Verifier → Planner (feedback loop)
];

// ─── Projects ───

export const PROJECTS = [
  {
    id: 1,
    title: "PatchForge AI",
    subtitle: "Autonomous Multi-Agent Code Repair System",
    description:
      "LangGraph-powered system that autonomously identifies and fixes code issues in repositories. Orchestrates 9 specialized agents in a complex workflow.",
    architecture: "9-node LangGraph DAG with conditional edges",
    highlights: [
      "9-node LangGraph workflow",
      "Automated GitHub issue resolution",
      "1,436 passing tests",
      "$0.35 execution cost per issue",
      "SQLite memory persistence",
      "LangSmith observability integration",
    ],
    metrics: {
      "Agents Orchestrated": 9,
      "Tests Passed": "1,436+",
      "Cost Per Issue": "$0.35",
      Accuracy: "80%",
    },
    technologies: [
      "LangGraph",
      "Python",
      "FastAPI",
      "GitHub API",
      "SQLite",
      "Docker",
      "Pinecone",
    ],
    impact:
      "Reduced debugging time by 80% through autonomous agent orchestration",
    color: "#00E5FF",
    resumeSummary:
      "Designed and deployed a multi-agent autonomous code repair system using LangGraph and Python, reducing manual debugging time by 80% with an average execution cost of $0.35 per issue.",
    businessProblem:
      "Technical debt and manual bug fixing consumed 60% of senior developer bandwidth. Traditional static analysis tools failed to resolve semantic issues, leading to product delays and developer burnout.",
    solutionArchitecture:
      "Built a 9-node cyclic multi-agent system orchestrating specialized LLM actors. Implemented a sandboxed Docker execution environment for safety and validation. Used Pinecone vector store for codebase context retrieval.",
    challenges: [
      {
        title: "Indefinite Cyclic Loops",
        challenge:
          "Agent loops would sometimes run indefinitely when resolving complex syntax issues.",
        solution:
          "Introduced a state machine token bucket algorithm and an LLM Critic judge that terminates repair attempts after 3 validation failures.",
      },
      {
        title: "Sandbox Security",
        challenge:
          "Running generated code safely required strict isolation to prevent execution of malicious commands or environment breaches.",
        solution:
          "Implemented dynamic sandboxed Docker containers with memory limits (512MB), no network access, and read-only host mounts, managing lifetimes via a FastAPI controller.",
      },
    ],
    achievements: [
      "Successfully automated 80% of repository semantic repairs.",
      "Integrated with GitHub Actions CI/CD to run tests on PRs.",
      "Reduced average cost per issue to $0.35.",
    ],
    recruiterHighlights: [
      "LangGraph Orchestration",
      "Sandboxed Docker Execution",
      "Pinecone Vector DB",
      "GitHub API Integration",
      "CI/CD Integration",
      "State Machine Controls",
    ],
    learnings:
      "LLM reasoning is highly probabilistic; strict schema validation and runtime unit tests are required as deterministic guardrails for autonomous agents.",
    github: "https://github.com/karthikeyakunnam/PatchForge_AI",
  },
  {
    id: 2,
    title: "BOWA AI Agent",
    subtitle: "Multi-Agent Enterprise Orchestrator",
    description:
      "An enterprise-grade multi-agent orchestrator that automates complex business workflows. Coordinates specialized agents for planning, execution, and validation.",
    architecture: "Hierarchical Manager-Worker Orchestration",
    highlights: [
      "Hierarchical agent layout",
      "Redis state persistence",
      "96.5% task accuracy",
      "<450ms orchestration latency",
      "Semantic memory logs",
      "Dynamic schema validation",
    ],
    metrics: {
      "Specialized Workers": 8,
      "Task Accuracy": "96.5%",
      "Response Latency": "<450ms",
      "Execution Cost": "$0.18 avg",
    },
    technologies: [
      "LangGraph",
      "Python",
      "FastAPI",
      "OpenAI",
      "LangSmith",
      "Redis",
      "Docker",
    ],
    impact:
      "Decreased process latency from 4 days to under 5 minutes with 96.5% accuracy",
    color: "#7C3AED",
    resumeSummary:
      "Built and optimized a multi-agent business process orchestrator handling enterprise planning, execution, and validation workflows with 96.5% task completion accuracy.",
    businessProblem:
      "Enterprise workflows span siloed databases, legacy APIs, and manual validation checks, resulting in average process latencies of 4 days and high operational errors.",
    solutionArchitecture:
      "Deployed a hierarchical multi-agent team (Manager-Worker pattern). The Manager orchestrator translates business requests into state DAGs, delegating tasks to worker agents specialized in SQL generation, API synthesis, and document research.",
    challenges: [
      {
        title: "Context Window Exhaustion",
        challenge:
          "Long-running workflows accumulated massive system logs, exceeding context lengths.",
        solution:
          "Designed a summarization memory agent that stores key-value state snapshots in Redis and performs semantic consolidation of long-term history.",
      },
      {
        title: "Plan Deviation",
        challenge:
          "Worker agents strayed from initial plans, causing task failure.",
        solution:
          "Created a real-time Critic verification layer that checks sub-task outputs against validation schemas before advancing execution state.",
      },
    ],
    achievements: [
      "Achieved 96.5% operational task completion accuracy.",
      "Decreased process latency from 4 days to under 5 minutes.",
      "Handled 10k+ continuous execution states via Redis persistence.",
    ],
    recruiterHighlights: [
      "Hierarchical Multi-Agent Systems",
      "Redis State Persistence",
      "Context Consolidation",
      "Semantic Memory",
      "Manager-Worker Pattern",
      "Schema Validation",
    ],
    learnings:
      "Hierarchical architectures are significantly more stable than flat choreographies for complex workflows because they isolate state scope.",
    github: "https://github.com/karthikeyakunnam/BOWA-Ai-agent",
  },
  {
    id: 3,
    title: "QueryForge AI",
    subtitle: "Production Explainable RAG Platform",
    description:
      "Enterprise-grade RAG system with hybrid retrieval, advanced security, and real-time token streaming. Production-deployed with evaluation dashboard.",
    architecture: "Hybrid retrieval pipeline with guard rails",
    highlights: [
      "Hybrid retrieval (Pinecone + BM25)",
      "SSE token streaming",
      "Prompt injection protection",
      "Evaluation dashboard",
      "Multi-source aggregation",
      "Explainability metrics",
    ],
    metrics: {
      "Production Queries": "10K+",
      "Query Accuracy": "99.2%",
      "Security Leaks": "0",
      "Response Latency": "<200ms",
    },
    technologies: [
      "Pinecone",
      "Node.js",
      "FastAPI",
      "Python",
      "React",
      "Redis",
      "Cohere",
    ],
    impact:
      "Processed 10K+ queries with 99.2% accuracy and zero security breaches",
    color: "#00FFC8",
    resumeSummary:
      "Designed an enterprise-grade explainable RAG pipeline with hybrid retrieval, cross-encoder re-ranking, and streaming outputs, maintaining 99.2% query accuracy with <200ms latency.",
    businessProblem:
      "Support agents spent 30% of their time searching for answers in unstructured documentation. Off-the-shelf RAG systems suffered from hallucination rates of 12% and lacked transparency for decision auditing.",
    solutionArchitecture:
      "Engineered a production RAG system utilizing hybrid query pipelines (sparse BM25 + dense Pinecone embeddings). Integrated Cohere rerankers and an explainability layer that prints citation indices and confidence weights.",
    challenges: [
      {
        title: "RAG Latency",
        challenge:
          "Combining sparse and dense lookups with cross-encoder re-ranking added 800ms to queries.",
        solution:
          "Solved by parallelizing retrieval calls using asyncio, implementing a Redis query cache, and streaming tokens via Server-Sent Events (SSE).",
      },
      {
        title: "Prompt Injection and Hallucinations",
        challenge:
          "Users could inject instructions to reveal system prompts or output incorrect data.",
        solution:
          "Built an input/output guardrail layer using LlamaGuard and a self-correcting retrieval loop that compares output facts against source snippets.",
      },
    ],
    achievements: [
      "Processed 10k+ production queries with zero security leaks.",
      "Reduced query latency to under 200ms for cached responses.",
      "Decreased hallucination rates to less than 0.8%.",
    ],
    recruiterHighlights: [
      "Hybrid Dense/Sparse Retrieval",
      "Pinecone Vector Database",
      "Cross-Encoder Re-ranking",
      "SSE Streaming",
      "Asyncio Concurrency",
      "LlamaGuard Guardrails",
    ],
    learnings:
      "High-quality document chunking and metadata enrichment are more critical to RAG accuracy than increasing the size of the underlying LLM.",
    github: "https://github.com/karthikeyakunnam/QueryForge_AI",
  },
];

// ─── Skills / Knowledge Network ───

export interface Skill {
  name: string;
  category: string;
  color: string;
  desc: string;
}

export const SKILLS_DATA: Skill[] = [
  {
    name: "Python",
    category: "Languages",
    color: "#00E5FF",
    desc: "Primary language used for building production-grade AI systems, LLM services, and agentic workflows.",
  },
  {
    name: "JavaScript",
    category: "Languages",
    color: "#00E5FF",
    desc: "Core scripting language used to build interactive interfaces, client-side tools, and frontend systems.",
  },
  {
    name: "TypeScript",
    category: "Languages",
    color: "#00E5FF",
    desc: "Typed superset of JavaScript ensuring build-time safety, strict interfaces, and scalable application logic.",
  },
  {
    name: "HTML5",
    category: "Languages",
    color: "#00E5FF",
    desc: "Standard markup language for structuring semantic, accessible, and high-performance web content.",
  },
  {
    name: "CSS3",
    category: "Languages",
    color: "#00E5FF",
    desc: "Style sheet language used to craft responsive, hardware-accelerated layouts and custom cyberpunk design systems.",
  },

  {
    name: "LangGraph",
    category: "AI Frameworks",
    color: "#00FFC8",
    desc: "Advanced orchestration library for building stateful, multi-agent workflows with loops and human-in-the-loop support.",
  },
  {
    name: "LangChain",
    category: "AI Frameworks",
    color: "#00FFC8",
    desc: "Framework for building applications with LLMs through composable chains, prompt templates, and output parsers.",
  },
  {
    name: "LlamaIndex",
    category: "AI Frameworks",
    color: "#00FFC8",
    desc: "Data framework for connecting private data sources to LLMs, featuring advanced indexing and retrieval strategies.",
  },
  {
    name: "LiteLLM",
    category: "AI Frameworks",
    color: "#00FFC8",
    desc: "Unified interface to call 100+ LLMs using the OpenAI format, simplifying multi-provider API calls and load balancing.",
  },
  {
    name: "OpenAI",
    category: "AI Frameworks",
    color: "#00FFC8",
    desc: "Industry-standard frontier model API for advanced reasoning, natural language understanding, and code generation.",
  },
  {
    name: "Claude API",
    category: "AI Frameworks",
    color: "#00FFC8",
    desc: "Frontier LLM API by Anthropic used for complex reasoning, tool calling, and long-context processing.",
  },

  {
    name: "FastAPI",
    category: "Web & Backend",
    color: "#7C3AED",
    desc: "High-performance Python web framework for building async, production-grade APIs and microservices.",
  },
  {
    name: "React",
    category: "Web & Backend",
    color: "#7C3AED",
    desc: "Component-based frontend library for building highly responsive, dynamic single-page web applications.",
  },
  {
    name: "Node.js",
    category: "Web & Backend",
    color: "#7C3AED",
    desc: "Chrome's V8 JavaScript engine runtime used to execute server-side applications and high-throughput tooling.",
  },
  {
    name: "Express.js",
    category: "Web & Backend",
    color: "#7C3AED",
    desc: "Minimalist web framework for Node.js used to build robust RESTful APIs and lightweight backend utilities.",
  },
  {
    name: "Docker",
    category: "Web & Backend",
    color: "#7C3AED",
    desc: "Containerization platform to package applications with their dependencies for predictable, environment-agnostic deployments.",
  },

  {
    name: "PostgreSQL",
    category: "Databases & Vector",
    color: "#00E5FF",
    desc: "Powerful, open-source object-relational database for storing structured system state and operational data.",
  },
  {
    name: "SQLite",
    category: "Databases & Vector",
    color: "#00E5FF",
    desc: "Self-contained, serverless SQL database engine ideal for lightweight data storage and local agent state databases.",
  },
  {
    name: "Pinecone",
    category: "Databases & Vector",
    color: "#00E5FF",
    desc: "Cloud-native vector database designed to index and query high-dimensional embeddings for fast similarity search.",
  },
  {
    name: "ChromaDB",
    category: "Databases & Vector",
    color: "#00E5FF",
    desc: "Developer-focused, embeddable open-source vector database used for local development and rapid RAG prototyping.",
  },
  {
    name: "FAISS",
    category: "Databases & Vector",
    color: "#00E5FF",
    desc: "Highly optimized library by Meta for dense vector similarity search and clustering of large-scale embeddings.",
  },

  {
    name: "LangSmith",
    category: "Developer Tooling",
    color: "#FF2975",
    desc: "Observability and tracing platform used to monitor, debug, and evaluate complex multi-agent LLM systems in real time.",
  },
  {
    name: "Groq",
    category: "Developer Tooling",
    color: "#FF2975",
    desc: "LPU inference engine offering ultra-high throughput and low-latency LLM execution for real-time agent workflows.",
  },
  {
    name: "Ollama",
    category: "Developer Tooling",
    color: "#FF2975",
    desc: "Tool for running open-source large language models locally on your system, supporting models like Llama 3 and Mistral.",
  },
  {
    name: "Tavily",
    category: "Developer Tooling",
    color: "#FF2975",
    desc: "Search engine optimized specifically for LLMs and autonomous agents to perform fast, structured web research.",
  },
  {
    name: "PyGithub",
    category: "Developer Tooling",
    color: "#FF2975",
    desc: "Python client library for interacting with the GitHub API, automating repository workflows and code management.",
  },

  {
    name: "Git",
    category: "Dev Tools & QA",
    color: "#FFD93D",
    desc: "Distributed version control system utilized for tracking changes in codebases and managing collaborative development branches.",
  },
  {
    name: "Pytest",
    category: "Dev Tools & QA",
    color: "#FFD93D",
    desc: "Robust Python testing framework used for writing clean, readable unit and integration tests for AI pipelines.",
  },
  {
    name: "Mypy",
    category: "Dev Tools & QA",
    color: "#FFD93D",
    desc: "Static type checker for Python to enforce type annotations, preventing runtime type-related bugs in production.",
  },
  {
    name: "Ruff",
    category: "Dev Tools & QA",
    color: "#FFD93D",
    desc: "Extremely fast, rust-based Python linter and formatter used to maintain code quality, standards, and style.",
  },
];

export const KNOWLEDGE_NODES = SKILLS_DATA.map((s) => ({
  name: s.name,
  category: s.category.toLowerCase(),
  color: s.color,
})).slice(0, 12);

export interface EducationCard {
  institution: string;
  degree?: string;
  qualification?: string;
  period: string;
}

export const EDUCATION: EducationCard[] = [
  {
    institution: "Indian Institute of Information Technology Dharwad",
    degree: "B.Tech Computer Science and Engineering",
    period: "2023 - 2027",
  },
  {
    institution: "Narayana Saraswati Bhavan, Vijayawada",
    qualification: "Intermediate (MPC)",
    period: "2021 - 2023",
  },
  {
    institution: "Gowtham Model School, Ongole",
    qualification: "SSC",
    period: "Completed 2021",
  },
];

// ─── Social ───

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/karthikeyakunnam",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/unnam-karthikeya",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:karthikeyaunnam1364@gmail.com",
    icon: "email",
  },
  {
    label: "Phone",
    href: "tel:+918688084787",
    icon: "phone",
  },
];

export const profile = {
  name: 'Aditya Shinde',
  first: 'ADITYA',
  last: 'SHINDE',
  title: 'Generative AI Engineer',
  roles: ['Generative AI Engineer', 'LLM & RAG Architect', 'AI Agent Builder', 'Deep Learning Engineer'],
  location: 'Pune, India',
  phone: '+91 8830821456',
  email: 'adityashindepvt0@gmail.com',
  linkedin: 'https://www.linkedin.com/in/adityashinde19',
  resume: '/Aditya_Shinde_Resume.pdf',
  summary:
    'Generative AI Engineer with 2+ years of hands-on experience shipping production Generative AI, Deep Learning and NLP systems on Azure and AWS. I build systems that leave the notebook: a multimodal RAG platform processing 90,000+ pages a day, a live agentic travel product serving real users, a QLoRA fine-tuned medical LLM, and computer-vision models deployed to the field.',
}

export const stats = [
  { value: 90000, suffix: '+', label: 'Pages processed / day' },
  { value: 23, suffix: '', label: 'MCP tools orchestrated' },
  { value: 95, suffix: '%', prefix: '~', label: 'Manual effort removed' },
  { value: 91, suffix: '%', label: 'Fine-tuned LLM accuracy' },
]

export type Project = {
  id: string
  index: string
  title: string
  tagline: string
  status: string
  accent: string
  bullets: string[]
  metrics: { value: string; label: string }[]
  tech: string[]
  link?: { href: string; label: string }
}

export const projects: Project[] = [
  {
    id: 'rag',
    index: '01',
    title: 'Multimodal RAG for Industrial Drawings',
    tagline: 'Ask in plain language. Land on the exact page of the exact revision.',
    status: 'Production',
    accent: '#22d3ee',
    bullets: [
      'Production RAG system that lets engineers search thousands of technical drawings and machine/floor diagrams, across revisions, in plain language and jump straight to the matching page.',
      'Custom YOLOv9 model detects engineering symbols; combined with Azure Document Intelligence and LLM-based cleanup to extract structured data from every page.',
      'Hybrid search (BM25 keyword + dense vector) with a cross-encoder reranker, so exact part numbers and natural-language questions both land on the right page.',
      'Scaled the pipeline to 90,000+ pages per day while keeping retrieval latency low.',
    ],
    metrics: [
      { value: '90K+', label: 'pages / day' },
      { value: 'YOLOv9', label: 'symbol detection' },
      { value: 'Hybrid', label: 'search + reranker' },
    ],
    tech: ['YOLOv9', 'Azure Document Intelligence', 'Azure AI Search', 'Hybrid Search', 'Reranker', 'Azure OpenAI', 'FastAPI'],
  },
  {
    id: 'agent',
    index: '02',
    title: 'Booked.ai: Agentic Corporate Travel',
    tagline: 'A fragmented booking process, collapsed into one conversation.',
    status: 'Live in production',
    accent: '#a78bfa',
    bullets: [
      'Agentic corporate travel planner built on LangChain Deep Agents that plans and books corporate travel end to end.',
      'Custom execution harness for long-running agent tasks, keeping state and context stable across extended multi-step sessions.',
      'Integrated 23 MCP tools spanning flights, hotels and travel-policy data, cutting manual effort by ~95%.',
    ],
    metrics: [
      { value: '23', label: 'MCP tools' },
      { value: '~95%', label: 'less manual effort' },
      { value: 'Live', label: 'real users' },
    ],
    tech: ['LangChain Deep Agents', 'LangGraph', 'MCP', 'Claude / GPT-4.1', 'FastAPI', 'Azure'],
    link: { href: 'https://booked.ai', label: 'Try it live at booked.ai' },
  },
  {
    id: 'hail',
    index: '03',
    title: 'AI Hail Damage Detection',
    tagline: 'Dent depth from a single phone photo. No specialist hardware.',
    status: 'Field deployed',
    accent: '#f472b6',
    bullets: [
      'Phone-based computer-vision tool built with TensorFlow / Keras that estimates hail-dent depth from a single photo.',
      'Removed the need for specialized inspection hardware by automating the damage-assessment step.',
      'Cut manual inspection effort by ~60% and per-claim cost by ~35%.',
    ],
    metrics: [
      { value: '~60%', label: 'less inspection effort' },
      { value: '~35%', label: 'lower cost / claim' },
      { value: '1', label: 'photo needed' },
    ],
    tech: ['TensorFlow', 'Keras', 'CNNs', 'Computer Vision', 'Python'],
  },
  {
    id: 'med',
    index: '04',
    title: 'Medical-Domain LLM Fine-Tuning',
    tagline: 'MedGemma 4B, sharpened with QLoRA and gated by evaluation.',
    status: 'Evaluated & rolled out',
    accent: '#34d399',
    bullets: [
      "Fine-tuned Google's MedGemma 4B with QLoRA on a medical QA dataset.",
      'Raised answer correctness from 78% to 91% and cut hallucination rate from 8.5% to 5.8%.',
      'Built a held-out eval set and benchmarked fine-tuned vs. base in LangSmith on correctness, faithfulness and hallucination, using results to gate the production rollout.',
    ],
    metrics: [
      { value: '78→91%', label: 'correctness' },
      { value: '8.5→5.8%', label: 'hallucination' },
      { value: '4B', label: 'parameters' },
    ],
    tech: ['MedGemma', 'QLoRA / PEFT', 'Hugging Face', 'PyTorch', 'LangSmith', 'CUDA'],
  },
]

export const experience = [
  {
    role: 'AI Engineer',
    company: 'Aress Software and Technology Limited',
    place: 'Pune',
    period: 'Aug 2024 — Present',
    points: [
      'Shipped a multimodal RAG platform for engineering drawings at 90K+ pages/day.',
      'Built Booked.ai, a live agentic travel planner orchestrating 23 MCP tools.',
      'Delivered field-deployed CV for hail damage and a QLoRA fine-tuned medical LLM.',
    ],
  },
  {
    role: 'B.E. Computer Engineering',
    company: 'Savitribai Phule Pune University (SPPU)',
    place: 'Pune',
    period: '2020 — 2024',
    points: ['Foundations in algorithms, systems, machine learning and software engineering.'],
  },
]

export const skillGroups = [
  { title: 'Generative AI', icon: 'sparkles', items: ['RAG', 'Agentic Workflows', 'LangChain', 'LangGraph', 'LlamaIndex', 'AutoGen', 'Google ADK', 'MCP', 'A2A Protocol', 'Prompt Engineering', 'Embeddings', 'Vector Search', 'LangSmith', 'LLMOps'] },
  { title: 'Deep Learning & ML', icon: 'brain', items: ['PyTorch', 'TensorFlow', 'Keras', 'Hugging Face', 'Transformers', 'CNNs', 'YOLOv9', 'Computer Vision', 'OCR', 'NLP', 'QLoRA / PEFT', 'GANs', 'Diffusion'] },
  { title: 'LLMs', icon: 'bot', items: ['GPT-4.1', 'GPT-3.5', 'Azure OpenAI', 'Anthropic Claude', 'Gemini', 'MedGemma', 'Llama 3', 'Mistral', 'AWS Bedrock'] },
  { title: 'Cloud & Data', icon: 'cloud', items: ['Azure AI Foundry', 'Azure AI Search', 'Cosmos DB', 'AKS', 'Azure Functions', 'Azure DevOps', 'AWS S3', 'Lambda', 'ECS / EKS', 'Neo4j', 'Vector DBs', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'] },
  { title: 'Languages & Backend', icon: 'code', items: ['Python', 'SQL', 'CUDA', 'FastAPI', 'REST APIs', 'Microservices', 'Git'] },
  { title: 'AI-Native Dev', icon: 'terminal', items: ['Claude Code', 'GitHub Copilot', 'Codex', 'MCP Dev Workflows', 'Automated Security Review'] },
]

export const marquee = ['Python', 'PyTorch', 'TensorFlow', 'LangChain', 'LangGraph', 'MCP', 'Azure OpenAI', 'Claude', 'Gemini', 'Llama 3', 'Hugging Face', 'YOLOv9', 'FastAPI', 'Docker', 'Kubernetes', 'Neo4j', 'LlamaIndex', 'AutoGen', 'AWS Bedrock', 'Terraform']

export const certifications = [
  { name: 'Azure AI Engineer Associate', code: 'AI-102', issuer: 'Microsoft Certified', url: 'https://learn.microsoft.com/en-us/users/adityashinde-5067/credentials/e7131aebccadcc2f' },
  { name: 'Claude with the Anthropic API', code: 'API', issuer: 'Anthropic Certified', url: 'https://verify.skilljar.com/c/7wgb68f3u2rd' },
  { name: 'Claude Code in Action', code: 'CODE', issuer: 'Anthropic Certified', url: 'https://verify.skilljar.com/c/xyreu49ai3m8' },
]

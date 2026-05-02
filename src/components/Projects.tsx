import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  title: string;
  description: string;
  company?: string;
  date?: string;
  location?: string;
  type: 'experience' | 'project';
  tags: string[];
  github?: string;
  live?: string;
  technicalSkills?: string;
}

const projects: Project[] = [
  {
    title: "Founder",
    company: "Aretis Labs",
    description:
      "Founded an AI automation consultancy building autonomous, human-in-the-loop systems for enterprise; scaled to 2L+ monthly revenue and 10+ production deployments in five months. Delivered AI-native marketplace and workflow automation (e.g. Polycab, Aerem Solar) with agents for procurement, supplier matching, and exception routing with full audit trails. Architected private on-prem RAG knowledge engines with source attribution; built GEO pipelines to improve brand citation rates across ChatGPT, Gemini, and Perplexity with share-of-voice KPIs.",
    date: "01/2026 - Present",
    location: "India",
    type: "experience",
    live: "https://aretislabs.com/",
    tags: ["AI Automation", "LangGraph", "RAG", "FastAPI", "Next.js"],
    technicalSkills:
      "Python, LangGraph, CrewAI, FastAPI, Next.js, PostgreSQL, Supabase, RAG, n8n, AWS",
  },
  {
    title: "Founding Engineer, Data Platforms",
    company: "VisaFriendly",
    description:
      "Built the end-to-end data platform on AWS (ECS, CloudWatch, S3, RDS): ETL for 100K+ daily job entries with quality contracts and lineage—28% downstream accuracy gain and 40% faster processing. Multi-agent CrewAI + n8n pipeline with structured tools, retries, and rubric evaluation—8K docs/month automated, 22% better interview response rates. AI-native UGC pipeline with live market context, Arcads.ai avatar video, and auto-posting to Instagram, LinkedIn, and X. Exposed ETL as an MCP server for natural-language job-catalog and pipeline queries in Claude/Cursor.",
    date: "06/2025 - Present",
    location: "India (Remote)",
    type: "experience",
    live: "https://visafriendly.com/",
    tags: ["Data Platform", "AWS", "ETL", "MCP", "Agents"],
    technicalSkills:
      "AWS (ECS, ECR, CloudWatch, S3, RDS), Python, SQL, CrewAI, n8n, Arcads.ai, MCP, ETL, LLMs",
  },
  {
    title: "Founding Engineer, SDE (ML)",
    company: "Mantrika.ai",
    description:
      "Founding engineer on the core AI HR platform—architecture, schema, and agentic infrastructure end to end. HeyGen-powered AI avatar interviews with rubric-based scoring. OpenCV proctoring with gaze tracking, anomaly flags, and tamper-resistant session logs. LangGraph workflows with LLM fallback routing—~40% latency improvement and ~20% lower cost per candidate selection.",
    date: "01/2025 - 08/2025",
    location: "India",
    type: "experience",
    live: "https://mantrika.ai/",
    tags: ["TypeScript", "Next.js", "LangGraph", "HeyGen", "OpenCV"],
    technicalSkills:
      "TypeScript, Next.js, LangGraph, LangChain, MySQL, Supabase, AWS, CrewAI, HeyGen, OpenCV",
  },
  {
    title: "NLP (ML) Engineer Intern",
    company: "AI4Education Labs",
    description:
      "Adaptive assessment combining IRT and knowledge graphs for skill gaps and difficulty—5,000+ students across 10+ schools. End-to-end NLG pipeline for personalized recommendations (entity extraction, concept-graph traversal, template-grounded generation) at ~95% accuracy; deployed on AWS EC2 with assets on S3.",
    date: "06/2024 - 07/2024",
    location: "Germany (Remote)",
    type: "experience",
    live: "https://ai4educationlabs.com/",
    tags: ["NLP", "Knowledge Graphs", "IRT", "NLG", "AWS"],
    technicalSkills:
      "Python, NLP, Knowledge Graphs, Item Response Theory, AWS (S3, EC2), NLG, Transformers",
  },
  {
    title: "Software Engineer Intern",
    company: "Drilldown",
    description:
      "Deployed multimodal AI agents on Telegram, WhatsApp, and Instagram for FMCG retail audits—image parsing, tool calls, ~35% faster turnaround. Influencer marketing platform with Instagram Graph API and LangChain: embedding-based brand-fit scoring, BigQuery analytics, Cloud Run deployment. Prompt pipelines with structured schemas and retries for consistent JSON from LLMs.",
    date: "03/2024 - 08/2024",
    location: "India",
    type: "experience",
    live: "https://drilldown.io/",
    tags: ["LangChain", "GCP", "Agents", "Multimodal AI"],
    technicalSkills:
      "Python, LangChain, Generative AI, GCP (BigQuery, Cloud Run), SQL, Prompt Engineering, REST APIs",
  },
  {
    title: "Launchy",
    description:
      "AI-native content studio for creators: six CrewAI agents with Reddit and web-search grounding, retrieval quality gates, and abstention logic. Five-by-two angle/variation matrix with one-click publish to X, LinkedIn, and Instagram; DAG introspection for observability. Ten content blocks / nine templates with versioned prompts and JSON schemas; streamed FastAPI runs with per-node artifacts; Chroma RAG with relevance scoring.",
    type: "project",
    tags: ["CrewAI", "FastAPI", "ChromaDB", "React", "Agents"],
    live: "https://launchy.aryanrajpurkar.com/",
    technicalSkills:
      "Python, CrewAI, ChromaDB, FastAPI, TypeScript, React, Vite, WebSockets, Serper API",
  },
  {
    title: "Equitas",
    description:
      "Enterprise AI evaluation layer with multi-layer detection (toxicity, bias, hallucination, jailbreak) backed by fine-tuned ToxicBERT across 500+ adversarial tests. SHAP/LIME explainability via REST for audit trails; multi-tenant guardrails per tenant.",
    type: "project",
    tags: ["FastAPI", "PyTorch", "XAI", "LLM Safety"],
    live: "https://equitas.aryanrajpurkar.com/",
    technicalSkills:
      "Python (FastAPI), React/TypeScript, MongoDB, PyTorch, Transformers, SHAP, LIME, Redis, Docker, LLMs",
  },
  {
    title: "Sahayak AI",
    description:
      "Metadata-first document intelligence: precedent relationship graphs for provenance, dependencies, and citation lineage across government documents. Hybrid RAG (BM25 + FAISS) with cross-encoder reranking; compliance checks and workflow routing via Kafka. MCP integration exposing hybrid search, metadata fetch, contradiction analysis, version chains, and grounded Q&A for IDE and LLM clients.",
    type: "project",
    tags: ["Next.js", "Neo4j", "RAG", "Kafka", "MCP"],
    live: "https://sahayak-ai.aryanrajpurkar.com/",
    technicalSkills:
      "Next.js, Python (Flask), MongoDB (GridFS), Neo4j, BM25, FAISS, Elasticsearch, OCR, Apache Kafka",
  },
];

const Projects = () => {
  const experiences = projects.filter(project => project.type === 'experience');
  const projectItems = projects.filter(project => project.type === 'project');

  return (
    <section id="projects" className="py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          <span className="gradient-text">Experience</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {experiences.map((exp, index) => (
            <Card key={index} className="border border-border bg-card/50 hover:bg-card/80 transition-all duration-300 overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{exp.company}</span>
                </div>
                <CardTitle className="font-medium">{exp.title}</CardTitle>
                <CardDescription className="text-muted-foreground mt-2 flex justify-between gap-2 flex-wrap">
                  <span>{exp.date}</span>
                  <span>{exp.location}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">{exp.description}</p>
                {exp.technicalSkills && (
                  <div className="text-xs text-muted-foreground">
                    <strong>Technical Skills:</strong> {exp.technicalSkills}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="font-mono text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              {exp.live && (
                <CardFooter>
                  <Button variant="outline" size="sm" asChild className="flex items-center gap-2 bg-violet-800">
                    <a href={exp.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 " />
                      Company
                    </a>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-8 mt-16">
          <span className="gradient-text">Projects</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectItems.map((project, index) => (
            <Card key={index} className="border border-border bg-card/50 hover:bg-card/80 transition-all duration-300 overflow-hidden">
              <CardHeader>
                <CardTitle className="font-medium">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {project.technicalSkills && (
                  <div className="text-xs text-muted-foreground mb-4">
                    <strong>Technical Skills:</strong> {project.technicalSkills}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="font-mono text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-3 flex-wrap">
                {project.github && (
                  <Button variant="outline" size="sm" asChild className="flex items-center gap-2">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      PyPI
                    </a>
                  </Button>
                )}
                {project.live && (
                  <Button variant="outline" size="sm" asChild className="flex items-center gap-2 bg-violet-800">
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 " />
                      Live
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

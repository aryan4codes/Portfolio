
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
    title: "SDE (ML) Intern",
    company: "Mentoria.ai",
    description: "Led development of AI-powered HR recruitment platform as founding engineer, implementing avatar integration and database schemas with 40% improved performance.",
    date: "01/2025 - Present",
    location: "India",
    type: "experience",
    tags: ["Python", "React", "AI"],
    technicalSkills: "MongoDB, Redis.js, LangChain, LangSmith, LangBridge, MySQL, Supabase, AWS (RedshiftJS, EC2, CloudWatch)"
  },
  {
    title: "ML Engineer Intern",
    company: "AfterShip",
    description: "Developed an AI-driven assessment platform using item response theory and knowledge graphs, impacting 5,000+ students across 50 schools in India and Germany.",
    date: "06/2024 - 07/2024",
    location: "India",
    type: "experience",
    tags: ["Machine Learning", "Knowledge Graphs", "IRT"],
    technicalSkills: "Knowledge Representation, Item Response Theory Research, AWS (S3, EC2)"
  },
  {
    title: "Technical Architect",
    company: "Ziplingo",
    description: "Single-handedly built e-menu system for WordPress, Wix, and Instagram, reducing audit times by 35% and improving analytics accuracy for FMCG industry clients by 50%.",
    date: "03/2024 - 04/2024",
    location: "India",
    type: "experience",
    tags: ["Full-Stack", "Analytics"],
    technicalSkills: "CI/CD Pipelines, GCP - BigQuery & Cloud Run, SQL, Large Language Models"
  },
  {
    title: "TransformDocs",
    description: "Intelligent Document Search and Management Platform. Manages and advises documents with AI indexing, machine-readable checks, and automated approval workflows.",
    type: "project",
    tags: ["Python", "MongoDB", "AI"],
    github: "https://github.com/aryancodes",
    technicalSkills: "Hugging Face, Python (Flask), MongoDB (GridFS), Clerk API, BM25, M2, Apache Kafka"
  },
  {
    title: "FLowSocial",
    description: "Federated Learning Social Media Platform. Privacy-centric social media platform using Federated Learning for personalized multimedia content recommendations.",
    type: "project",
    tags: ["Federated Learning", "ML", "Privacy"],
    github: "https://github.com/aryancodes",
    technicalSkills: "React, Flask, MongoDB, TensorFlow/Keras, Federated Learning, Cross-Modal Attention, Natural UI"
  },
  {
    title: "Wellnix",
    description: "AI-powered Mental Health Platform featuring mood tracking, crisis prevention, and personalized AI interventions. Implements real-time voice agents and sentiment analysis.",
    type: "project",
    tags: ["Mental Health", "AI", "NLP"],
    github: "https://github.com/aryancodes",
    live: "https://example.com",
    technicalSkills: "OpenAI/Gemini API, LangChain, Socket.io, BlandAI, Meta.js, Flask, MongoDB, WebRTC"
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
            <Card key={index} className="border border-border bg-card/50 hover:bg-card/80 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{exp.company}</span>
                </div>
                <CardTitle className="font-medium">{exp.title}</CardTitle>
                <CardDescription className="text-muted-foreground mt-2 flex justify-between">
                  <span>{exp.date}</span>
                  <span>{exp.location}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">{exp.description}</p>
                <div className="text-xs text-muted-foreground">
                  <strong>Technical Skills:</strong> {exp.technicalSkills}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="font-mono text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-8 mt-16">
          <span className="gradient-text">Projects</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectItems.map((project, index) => (
            <Card key={index} className="border border-border bg-card/50 hover:bg-card/80 transition-colors">
              <CardHeader>
                <CardTitle className="font-medium">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mb-4">
                  <strong>Technical Skills:</strong> {project.technicalSkills}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="font-mono text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-3">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon">
                      <Github className="h-4 w-4" />
                    </Button>
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
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

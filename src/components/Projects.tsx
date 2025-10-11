import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Briefcase, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectPreview from './ProjectPreview';
import WebsiteThumbnail from './WebsiteThumbnail';

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
    title: "Data Engineering Intern",
    company: "VisaFriendly",
    description:
      "Developed real-time ETL pipelines processing 100K+ daily job entries, improving accuracy by 28% and reducing processing time by 40%. Built AI agents for resume and cover-letter generation with Crewai and n8n, automating ~8K documents monthly and improving interview response rates by 22%.",
    date: "06/2025 - Present",
    location: "India",
    type: "experience",
    live: "https://visafriendly.com/",
    tags: ["Data Engineering", "AWS", "Python", "SQL", "ETL", "AI"],
    technicalSkills:
      "AWS (ECS, ECR, CloudWatch, RDS), Python, SQL, Crewai, n8n, ETL Pipelines, Data Modeling, LLMs",
  },
  {
    title: "SDE (ML) Intern",
    company: "Mantrika.ai",
    description: "Led development of AI-powered HR recruitment platform as founding engineer, implementing avatar integration and database schemas with 40% improved performance.",
    date: "01/2025 - 08/2025",
    location: "India",
    type: "experience",
    live: "https://mantrika.ai/",
    tags: ["Python", "React", "AI", "LangChain", "LangSmith", "MySQL", "Supabase", "AWS"],
    technicalSkills: "MongoDB, Redis.js, LangChain, LangSmith, MySQL, Supabase, AWS (RedshiftJS, EC2, CloudWatch)"
  },
  {
    title: "ML Engineer Intern",
    company: "AI4EducationLabs",
    description: "Developed an AI-driven assessment platform using item response theory and knowledge graphs, impacting 5,000+ students across 50 schools in India and Germany.",
    date: "06/2024 - 07/2024",
    location: "India",
    type: "experience",
    live: "https://ai4educationlabs.org/",
    tags: ["Machine Learning", "Knowledge Graphs", "IRT", "Cloud", "AI"],
    technicalSkills: "Knowledge Representation, Item Response Theory Research, AWS (S3, EC2)"
  },
  {
    title: "Technical Lead",
    company: "DrillDown",
    description: "Single-handedly built e-menu system for WordPress, Wix, and Instagram, reducing audit times by 35% and improving analytics accuracy for FMCG industry clients by 50%.",
    date: "03/2024 - 08/2024",
    location: "India",
    type: "experience",
    live: "https://drilldown.online/",
    tags: ["Full-Stack", "Analytics", "Cloud", "AI"],
    technicalSkills: "CI/CD Pipelines, GCP - BigQuery & Cloud Run, SQL, Large Language Models"
  },
  {
    title: "EduData",
    description: "Intelligent Document Search and Management Platform. Manages and advises documents with AI indexing, machine-readable checks, and automated approval workflows.",
    type: "project",
    tags: ["Python", "MongoDB", "AI"],
    live: "https://edudata.aryanrajpurkar.tech",
    technicalSkills: "Hugging Face, Python (Flask), MongoDB (GridFS), Clerk API, BM25, M2, Apache Kafka"
  },
  {
    title: "Recrutr",
    description:
      "AI-based recruitment assistant. Built AI agents for candidate shortlisting, ranking, and interview scheduling, reducing screening time by 65% and improving SLA compliance by 35%. Implemented vector-based search and AI fit analysis with 92% precision for accurate, explainable recommendations, reducing data errors by 50%.",
    type: "project",
    tags: ["AI", "Next.js", "TypeScript", "Supabase", "LangChain", "OpenAI", "AWS"],
    live: "https://recrutr.aryanrajpurkar.tech",
    technicalSkills:
      "Next.js, TypeScript, Supabase (pgvector), Vercel AI SDK, OpenAI GPT-4, LangChain, AWS"
  },
  {
    title: "Scholr",
    description:
      "AI-Powered Financial Aid Discovery and Application Platform. Matches student profiles against 10,000+ scholarships with 95% accuracy and automated verification. Features AI chat assistant, document optimization, success prediction models, and workflow management across $2.5M+ funding opportunities.",
    type: "project",
    tags: ["AI", "Scholarships", "React", "TypeScript", "Supabase", "OpenAI"],
    live: "https://scholr.aryanrajpurkar.tech",
    technicalSkills:
      "React, TypeScript, Vite, Supabase, Python (Selenium), OpenAI API, web scraping"
  },
  {
    title: "FlowSocial",
    description: "Federated Learning Social Media Platform. Privacy-centric social media platform using Federated Learning for personalized, multimedia content recommendations.",
    type: "project",
    live: "https://flowsocial.aryanrajpurkar.tech",
    tags: ["Federated Learning", "ML", "Privacy"],
    technicalSkills: "React, Flask, MongoDB, TensorFlow/Keras, Federated Learning, Cross-Modal Attention, Natural UI"
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
            <Card key={index} className="border border-border bg-card/50 hover:bg-card/80 transition-all duration-300 overflow-hidden group">
              {/* Website Thumbnail Preview for experiences with live URLs */}
              {exp.live && (
                <ProjectPreview
                  title={exp.title}
                  description={exp.description}
                  tags={exp.tags}
                  live={exp.live}
                  technicalSkills={exp.technicalSkills}
                >
                  <div className="cursor-pointer">
                    <WebsiteThumbnail 
                      url={exp.live} 
                      title={exp.title}
                      className="m-4 mb-0"
                    />
                  </div>
                </ProjectPreview>
              )}
              
              <CardHeader className={exp.live ? "pt-4" : ""}>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{exp.company}</span> 
                  {exp.live && (
                    <ProjectPreview
                      title={exp.title}
                      description={exp.description}
                      tags={exp.tags}
                      live={exp.live}
                      technicalSkills={exp.technicalSkills}
                    >
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </ProjectPreview>
                  )}
                </div>
                <CardTitle className="font-medium">{exp.title}</CardTitle>
                <CardDescription className="text-muted-foreground mt-2 flex justify-between">
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
            </Card>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-8 mt-16">
          <span className="gradient-text">Projects</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectItems.map((project, index) => (
            <Card key={index} className="border border-border bg-card/50 hover:bg-card/80 transition-all duration-300 overflow-hidden group">
              {/* Website Thumbnail Preview */}
              {project.live && (
                <ProjectPreview
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  live={project.live}
                  github={project.github}
                  technicalSkills={project.technicalSkills}
                >
                  <div className="cursor-pointer">
                    <WebsiteThumbnail 
                      url={project.live} 
                      title={project.title}
                      className="m-4 mb-0"
                    />
                  </div>
                </ProjectPreview>
              )}
              
              <CardHeader className={project.live ? "pt-4" : ""}>
                <CardTitle className="font-medium flex items-center justify-between">
                  {project.title}
                  {project.live && (
                    <ProjectPreview
                      title={project.title}
                      description={project.description}
                      tags={project.tags}
                      live={project.live}
                      github={project.github}
                      technicalSkills={project.technicalSkills}
                    >
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </ProjectPreview>
                  )}
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
              <CardFooter className="flex gap-3">
                {project.github && (
                  <Button variant="outline" size="sm" asChild className="flex items-center gap-2">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      Code
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

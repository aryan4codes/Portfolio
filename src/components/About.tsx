
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          <span className="gradient-text">About Me</span>
        </h2>
        
        <Card className="border border-border bg-card/50">
          <CardContent className="pt-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg mb-4">
                Hey there! I'm Aryan, a passionate developer with expertise in AI, Machine Learning, and Full-Stack Development.
              </p>
              
              <p className="mb-4">
                I'm currently pursuing my B.Tech in Computer Science and Engineering (Data Science) at D.J. Sanghvi College of Engineering,
                with a CGPA of 9.2.
              </p>
              
              <p className="mb-4">
                I love building intelligent systems that solve real-world problems, with experience across various domains including
                HR tech, document processing, social media analytics, and fintech.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-4">Education</h3>
              <ul className="list-disc pl-5 mb-6">
                <li>
                  <strong>B.Tech in Computer Science and Engineering (Data Science)</strong>
                  <div>D.J. Sanghvi College of Engineering - 9.2 CGPA</div>
                  <div className="text-sm text-muted-foreground">2022 - 2026</div>
                </li>
              </ul>
              
              <h3 className="text-xl font-bold mt-6 mb-4">Skills</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <h4 className="font-bold mb-2">Languages</h4>
                  <ul className="list-disc pl-5">
                    <li>Python</li>
                    <li>Java</li>
                    <li>C/C++</li>
                    <li>JavaScript/TypeScript</li>
                    <li>SQL</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">Web Development</h4>
                  <ul className="list-disc pl-5">
                    <li>React</li>
                    <li>Next.js</li>
                    <li>Flask</li>
                    <li>SpringBoot</li>
                    <li>RESTful API</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">Data & ML</h4>
                  <ul className="list-disc pl-5">
                    <li>PyTorch</li>
                    <li>TensorFlow</li>
                    <li>LangChain</li>
                    <li>Federated Learning</li>
                    <li>Computer Vision</li>
                    <li>NLP</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">DevOps</h4>
                  <ul className="list-disc pl-5">
                    <li>Git/GitHub</li>
                    <li>Docker</li>
                    <li>Kubernetes</li>
                    <li>CI/CD</li>
                    <li>Microservices</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">Cloud</h4>
                  <ul className="list-disc pl-5">
                    <li>AWS (EC2, Athena, etc.)</li>
                    <li>GCP (Cloud Run)</li>
                    <li>MongoDB</li>
                    <li>Redis</li>
                    <li>Supabase</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">Others</h4>
                  <ul className="list-disc pl-5">
                    <li>Data Analytics</li>
                    <li>Apache Kafka</li>
                    <li>Apache Spark</li>
                    <li>Logical Thinking</li>
                    <li>SQL/NoSQL</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;

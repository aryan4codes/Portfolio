
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
                Hey there! I'm Aryan, a passionate developer focused on creating elegant, user-centered digital experiences.
              </p>
              
              <p className="mb-4">
                I believe in the power of minimalism and intuitive design. My approach combines clean aesthetics with robust functionality, 
                creating products that are both beautiful and easy to use.
              </p>
              
              <p className="mb-4">
                With expertise in modern web technologies including React, TypeScript, and Next.js, I build responsive and 
                accessible applications that perform well across all devices.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-4">Skills</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <h4 className="font-bold mb-2">Languages</h4>
                  <ul className="list-disc pl-5">
                    <li>JavaScript/TypeScript</li>
                    <li>HTML/CSS</li>
                    <li>Python</li>
                    <li>SQL</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">Frameworks</h4>
                  <ul className="list-disc pl-5">
                    <li>React</li>
                    <li>Next.js</li>
                    <li>Node.js</li>
                    <li>Express</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">Tools</h4>
                  <ul className="list-disc pl-5">
                    <li>Git</li>
                    <li>Docker</li>
                    <li>Figma</li>
                    <li>AWS</li>
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

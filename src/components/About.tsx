import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code, School, Trophy, Users, Database, 
  Cpu, Globe, GitBranch, Zap, Brain, 
  BarChart, Terminal, Languages
} from 'lucide-react';

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillCard } from '@/components/ui/skill-card';
import { Timeline } from '@/components/ui/timeline';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { SectionDivider } from '@/components/ui/section-divider';
import { cn } from '@/lib/utils';

// Profile image
import speechImg from '@/assets/speech.jpg';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <section id="about" className="py-16">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 relative inline-block">
            <span className="gradient-text">About Me</span>
            <motion.div 
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Profile card */}
            <Card className="border border-border bg-card/50 overflow-hidden md:col-span-1">
              <div className="relative group">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={speechImg} 
                    alt="Aryan Rajpurkar" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold">Aryan Rajpurkar</h3>
                    <p className="text-white/80 text-sm">AI & Full-Stack Developer</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-base text-foreground/90 mb-4">
                  I'm a passionate developer with expertise in AI, Machine Learning, and Full-Stack Development,
                  building intelligent systems that solve real-world problems.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <AnimatedCounter value={9.2} symbol="" title="CGPA" />
                  <AnimatedCounter value={200} symbol="+" title="Students Mentored" />
                </div>
              </CardContent>
            </Card>
            
            {/* Main info */}
            <Card className="border border-border bg-card/50 md:col-span-2">
              <CardContent className="p-6">
                <Tabs defaultValue="personal" className="space-y-6">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal" className="space-y-6">
                    <p className="text-lg">
                      I'm currently pursuing my B.Tech in Computer Science and Engineering (Data Science) at D.J. Sanghvi College of Engineering.
                      I love building intelligent systems that solve real-world problems, with experience across various domains including
                      HR tech, document processing, social media analytics, and fintech.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Globe size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-medium">Mumbai, India</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <School size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Education</p>
                          <p className="font-medium">B.Tech in CSE (Data Science)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Users size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Leadership</p>
                          <p className="font-medium">Society of Data Science - India</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Trophy size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Achievements</p>
                          <p className="font-medium">Smart India Hackathon Winner</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="education">
                    <Timeline 
                      items={[
                        {
                          title: 'D.J. Sanghvi College of Engineering',
                          subtitle: 'B.Tech in Computer Science and Engineering (Data Science) - 9.2 CGPA',
                          date: '2022 - 2026',
                          color: 'bg-blue-500',
                          icon: <School size={10} />
                        },
                        {
                          title: 'PACE Junior Science College',
                          subtitle: 'HSC - 81%',
                          date: '2020 - 2022',
                          color: 'bg-blue-500',
                          icon: <School size={10} />
                        },
                        {
                          title : 'Swami Vivekananda International School',
                          subtitle : 'ICSE - 97.20%',
                          date : '2018 - 2020',
                          color : 'bg-blue-500',
                          icon : <School size={10} />
                        }
                      ]}
                    />
                    
                    <div className="mt-8">
                      <h4 className="text-lg font-bold mb-4">Leadership</h4>
                      <Timeline 
                        items={[
                          {
                            title: 'Chairperson - DJS-S4DS',
                            subtitle: 'Society of Data Science - India',
                            description: 'Designed and executed technical workshops and bootcamps, mentored 200+ students in machine learning, AI and data analytics',
                            date: '07/2024 - Present',
                            color: 'bg-indigo-500',
                            icon: <Users size={10} />
                          }
                        ]}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="achievements">
                    <Timeline 
                      items={[
                        {
                          title: 'Winner at Smart India Hackathon (SIH) 2024',
                          subtitle: 'National Hackathon hosted by Government of India',
                          date: '2024',
                          color: 'bg-green-500',
                        },
                        {
                          title: 'Selected Scholar, Amazon ML Summer School 2024',
                          subtitle: 'Selected out of 61,000 participants',
                          date: '2024',
                          color: 'bg-yellow-500',
                        },
                        {
                          title: 'Best Student Chair 2023',
                          subtitle: 'Society of Data Science - India',
                          date: '2023',
                          color: 'bg-purple-500',
                        },
                        {
                          title: 'Winner at SYNERGY 1.0',
                          subtitle: 'Hackathon hosted by DJSCE, Mumbai',
                          date: '2023',
                          color: 'bg-blue-500',
                        },
                        {
                          title: '2nd Runner-Up at HACKNICHE 2.0',
                          subtitle: 'Hackathon hosted by GDSC x Synapse at DJSCE Mumbai',
                          date: '2023',
                          color: 'bg-pink-500',
                        },
                        {
                          title: '1st Runner-Up at Technovate',
                          subtitle: 'Hackathon hosted by SPIT Mumbai',
                          date: '2023',
                          color: 'bg-red-500',
                        },
                        {
                          title: 'National Finalist (Top 20 - India), Regional Winner (Mumbai)',
                          subtitle: 'Microsoft Office Specialist Championship',
                          date: '2022',
                          color: 'bg-cyan-500',
                        }
                      ]}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <SectionDivider title="My Skills" icon={<Zap size={16} />} />
          
          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <SkillCard
              title="Languages"
              icon={<Languages size={24} />}
              skills={['Python', 'Java', 'C/C++', 'JavaScript/TypeScript', 'SQL']}
              iconClassName="bg-blue-500/10 text-blue-500"
              borderColor="border-blue-500/20"
            />
            
            <SkillCard
              title="Web Development"
              icon={<Globe size={24} />}
              skills={['Flask', 'React', 'Next.js', 'SpringBoot', 'RESTful API']}
              iconClassName="bg-indigo-500/10 text-indigo-500"
              borderColor="border-indigo-500/20"
            />
            
            <SkillCard
              title="Data & ML"
              icon={<Brain size={24} />}
              skills={['AWS (EC2, Athena)', 'PowerBI', 'TensorFlow', 'Computer Vision', 'Generative AI', 'Federated Learning']}
              iconClassName="bg-purple-500/10 text-purple-500"
              borderColor="border-purple-500/20"
            />
            
            <SkillCard
              title="DevOps"
              icon={<GitBranch size={24} />}
              skills={['Git', 'GitHub', 'Docker', 'Kubernetes', 'CI/CD', 'Microservices']}
              iconClassName="bg-green-500/10 text-green-500"
              borderColor="border-green-500/20"
            />
            
            <SkillCard
              title="Big Data"
              icon={<Database size={24} />}
              skills={['GCP (Cloud Run)', 'Apache (Kafka Spark Airflow)', 'MongoDB', 'Redis', 'Supabase']}
              iconClassName="bg-orange-500/10 text-orange-500"
              borderColor="border-orange-500/20"
            />
            
            <SkillCard
              title="Soft Skills"
              icon={<Users size={24} />}
              skills={['Logical Thinking', 'Problem Solving', 'Communication', 'Leadership', 'Teamwork']}
              iconClassName="bg-teal-500/10 text-teal-500"
              borderColor="border-teal-500/20"
            />
          </div>
          
          <SectionDivider />

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-br from-card to-muted/30 p-6 rounded-xl border border-border shadow-sm">
              <AnimatedCounter 
                value={200} 
                symbol="+" 
                title="Students Mentored" 
                valueClassName="text-3xl md:text-4xl"
              />
            </div>
            <div className="bg-gradient-to-br from-card to-muted/30 p-6 rounded-xl border border-border shadow-sm">
              <AnimatedCounter 
                value={7} 
                symbol="+" 
                title="Hackathon Awards" 
                valueClassName="text-3xl md:text-4xl"
              />
            </div>
            <div className="bg-gradient-to-br from-card to-muted/30 p-6 rounded-xl border border-border shadow-sm">
              <AnimatedCounter 
                value={9.2} 
                symbol="" 
                title="CGPA" 
                valueClassName="text-3xl md:text-4xl"
              />
            </div>
            <div className="bg-gradient-to-br from-card to-muted/30 p-6 rounded-xl border border-border shadow-sm">
              <AnimatedCounter 
                value={3} 
                symbol="+" 
                title="Years Experience" 
                valueClassName="text-3xl md:text-4xl"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

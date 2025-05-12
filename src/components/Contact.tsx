import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !message) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // For demonstration purposes, we'll simulate sending an email
      // In a real implementation, this would connect to a backend service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Email sent to av.rajpurkar@gmail.com');
      console.log({ name, email, message });
      
      toast.success('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          <span className="gradient-text">Get In Touch</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border border-border bg-card/50">
            <CardHeader>
              <CardTitle className="text-xl">Contact Information</CardTitle>
              <CardDescription>
                Feel free to reach out through any of these channels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <a href="mailto:av.rajpurkar@gmail.com" className="hover:underline">
                    av.rajpurkar@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-muted-foreground" />
                  <a href="https://github.com/aryan4codes" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    github.com/aryan4codes
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-muted-foreground" />
                  <a href="https://www.linkedin.com/in/aryan-rajpurkar-6b96b1b3/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    linkedin.com/in/aryan-rajpurkar-6b96b1b3/
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-5 w-5 flex items-center justify-center text-muted-foreground">📱</span>
                  <span>7718950601</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-5 w-5 flex items-center justify-center text-muted-foreground">📍</span>
                  <span>Mumbai, India</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-border bg-card/50">
            <CardHeader>
              <CardTitle className="text-xl">Send a Message</CardTitle>
              <CardDescription>
                I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input 
                    placeholder="Your Name" 
                    className="bg-background" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Your Email" 
                    className="bg-background"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
                <div>
                  <Textarea 
                    placeholder="Your Message" 
                    className="bg-background min-h-[120px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} 
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;

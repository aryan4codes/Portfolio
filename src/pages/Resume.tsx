import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Resume = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    // Create a link to download the resume
    const link = document.createElement('a');
    link.href = '/data/resume.pdf'; // Adjust the path based on your resume file name
    link.download = 'Aryan_Rajpurkar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
            <Button
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg shadow-lg overflow-hidden">
            {/* PDF Viewer */}
            <div className="w-full h-[800px] md:h-[900px]">
              <iframe
                src="/data/resume.pdf" // Adjust the path based on your resume file name
                className="w-full h-full border-none"
                title="Aryan Rajpurkar Resume"
              />
            </div>
          </div>
          
          {/* Fallback message if PDF doesn't load */}
          <div className="mt-4 text-center text-muted-foreground">
            <p className="mb-2">Having trouble viewing the resume?</p>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex items-center gap-2 mx-auto"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
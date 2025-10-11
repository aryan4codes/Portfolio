import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Eye, ExternalLink, Github, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface ProjectPreviewProps {
  title: string;
  description: string;
  tags: string[];
  live?: string;
  github?: string;
  technicalSkills?: string;
  children: React.ReactNode;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({
  title,
  description,
  tags,
  live,
  github,
  technicalSkills,
  children
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (!live) {
    return <>{children}</>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            <div className="flex gap-2">
              {github && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex items-center gap-2"
                >
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex items-center gap-2"
              >
                <a href={live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Open Live
                </a>
              </Button>
            </div>
          </div>
          <div className="text-sm text-muted-foreground mb-2">
            {description}
          </div>
          {technicalSkills && (
            <div className="text-xs text-muted-foreground mb-2">
              <strong>Technical Skills:</strong> {technicalSkills}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="font-mono text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>
        
        <div className="flex-1 relative border rounded-lg overflow-hidden bg-background">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-sm text-muted-foreground">Loading preview...</p>
              </div>
            </div>
          )}
          
          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <div className="text-center">
                <X className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Unable to load preview. This might be due to security restrictions.
                </p>
                <Button asChild variant="outline">
                  <a href={live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in New Tab
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <iframe
              src={live}
              className="w-full h-full border-none"
              title={`${title} Preview`}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectPreview;
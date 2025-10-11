import React, { useState } from 'react';
import { Eye, Globe, Code, Brain, Search, Users, Award, Building } from 'lucide-react';

interface WebsiteThumbnailProps {
  url: string;
  title: string;
  className?: string;
}

const WebsiteThumbnail: React.FC<WebsiteThumbnailProps> = ({ url, title, className = "" }) => {
  // Create custom preview cards with relevant icons based on project type
  const getProjectIcon = (title: string, url: string) => {
    const lowerTitle = title.toLowerCase();
    const lowerUrl = url.toLowerCase();
    
    if (lowerTitle.includes('recruit') || lowerTitle.includes('hr')) return Users;
    if (lowerTitle.includes('edu') || lowerTitle.includes('scholr') || lowerTitle.includes('scholar')) return Award;
    if (lowerTitle.includes('social') || lowerTitle.includes('flow')) return Users;
    if (lowerTitle.includes('data') || lowerTitle.includes('search')) return Search;
    if (lowerTitle.includes('ai') || lowerTitle.includes('ml') || lowerTitle.includes('brain')) return Brain;
    if (lowerUrl.includes('mantrika') || lowerUrl.includes('drilldown') || lowerUrl.includes('visafriendly')) return Building;
    
    return Code; // Default icon
  };

  const getGradientColors = (title: string) => {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('recruit')) return 'from-blue-500/20 to-cyan-500/20';
    if (lowerTitle.includes('edu') || lowerTitle.includes('scholr')) return 'from-green-500/20 to-emerald-500/20';
    if (lowerTitle.includes('social') || lowerTitle.includes('flow')) return 'from-purple-500/20 to-pink-500/20';
    if (lowerTitle.includes('data')) return 'from-orange-500/20 to-red-500/20';
    if (lowerTitle.includes('ai') || lowerTitle.includes('ml')) return 'from-violet-500/20 to-purple-500/20';
    if (lowerTitle.includes('mantrika') || lowerTitle.includes('drilldown')) return 'from-indigo-500/20 to-blue-500/20';
    
    return 'from-gray-500/20 to-slate-500/20'; // Default gradient
  };

  const IconComponent = getProjectIcon(title, url);
  const gradientClass = getGradientColors(title);

  return (
    <div className={`bg-gradient-to-br ${gradientClass} rounded-lg overflow-hidden group relative border border-border/50 ${className}`}>
      <div className="aspect-video flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="mb-4 p-3 rounded-full bg-background/20 backdrop-blur-sm">
            <IconComponent className="h-8 w-8 text-foreground" />
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2">{title}</h3>
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Globe className="h-3 w-3" />
            <span className="truncate max-w-[120px]">
              {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </span>
          </div>
        </div>
      </div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-center text-white">
          <Eye className="h-6 w-6 mx-auto mb-1" />
          <span className="text-xs">Click to preview</span>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
    </div>
  );
};

export default WebsiteThumbnail;
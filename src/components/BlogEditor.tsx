import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from './RichTextEditor';

interface BlogEditorProps {
  title: string;
  content: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({
  title,
  content,
  onTitleChange,
  onContentChange,
}) => {
  // Calculate word count from HTML content (strip HTML tags)
  const getWordCount = (html: string): number => {
    const text = html.replace(/<[^>]*>/g, ' ').trim();
    return text.split(/\s+/).filter(Boolean).length;
  };

  const wordCount = getWordCount(content);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-lg font-medium">
          Title
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter your blog post title..."
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="text-2xl font-serif h-auto py-3"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="content" className="text-lg font-medium">
            Content
          </Label>
          <span className="text-sm text-muted-foreground">
            {wordCount} words
          </span>
        </div>
        <RichTextEditor
          content={content}
          onChange={onContentChange}
          placeholder="Start writing your blog post..."
        />
      </div>
    </div>
  );
};

export default BlogEditor;


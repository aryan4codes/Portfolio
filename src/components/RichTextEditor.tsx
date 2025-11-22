import React, { useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Loader2,
  Link as LinkIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { uploadImage, isImageFile, fileToDataURL } from '@/lib/imageService';
import { toast } from '@/hooks/use-toast';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start writing your blog post...',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder,
      }),
      Image.configure({
        inline: true,
        allowBase64: true, // Allow base64 for immediate preview
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline hover:text-primary/80',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[500px] px-4 py-3 font-serif text-lg leading-relaxed',
      },
      handleKeyDown: (view, event) => {
        // Ctrl+K or Cmd+K to add link
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
          event.preventDefault();
          handleLinkClick();
          return true;
        }
        return false;
      },
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        
        for (const item of items) {
          if (item.type.indexOf('image') !== -1) {
            event.preventDefault();
            const file = item.getAsFile();
            if (file) {
              handleImageUpload(file);
            }
            return true;
          }
        }
        return false;
      },
      handleDrop: (view, event) => {
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
          const imageFile = Array.from(files).find(file => isImageFile(file));
          if (imageFile) {
            event.preventDefault();
            handleImageUpload(imageFile);
            return true;
          }
        }
        return false;
      },
    },
  });

  // Update editor content when prop changes (for edit mode)
  React.useEffect(() => {
    if (editor && content && content !== editor.getHTML()) {
      // Only update if content is different to avoid unnecessary updates
      const currentContent = editor.getHTML();
      if (content !== currentContent) {
        editor.commands.setContent(content, false); // false = don't emit update event
      }
    }
  }, [content, editor]);

  const handleImageUpload = async (file: File) => {
    if (!isImageFile(file)) {
      toast({
        title: 'Invalid file',
        description: 'Please upload an image file',
        variant: 'destructive',
      });
      return;
    }

    // Check file size (max 10MB before compression)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Image must be less than 10MB. Large images will be automatically compressed.',
        variant: 'destructive',
      });
      return;
    }

    // Show image immediately using data URL (instant preview)
    const dataUrl = await fileToDataURL(file);
    const imageId = `temp-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    // Insert image immediately with data URL
    editor?.chain().focus().setImage({ src: dataUrl, 'data-temp-id': imageId }).run();
    
    // Upload in background and replace with final URL
    setIsUploading(true);
    
    uploadImage(file)
      .then((imageUrl) => {
        // Get current HTML and replace the temp image
        const currentHtml = editor?.getHTML() || '';
        const tempImageRegex = new RegExp(
          `<img[^>]*data-temp-id="${imageId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`,
          'i'
        );
        
        if (tempImageRegex.test(currentHtml)) {
          const newHtml = currentHtml.replace(
            tempImageRegex,
            `<img src="${imageUrl}" alt="" />`
          );
          editor?.commands.setContent(newHtml);
        }
        
        toast({
          title: 'Success',
          description: 'Image uploaded and compressed successfully',
        });
      })
      .catch((error: any) => {
        // Remove the failed image by replacing it with empty string
        const currentHtml = editor?.getHTML() || '';
        const tempImageRegex = new RegExp(
          `<img[^>]*data-temp-id="${imageId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`,
          'i'
        );
        
        if (tempImageRegex.test(currentHtml)) {
          const newHtml = currentHtml.replace(tempImageRegex, '');
          editor?.commands.setContent(newHtml);
        }
        
        // Provide more helpful error messages
        let errorMessage = error.message || 'Failed to upload image. Please try again.';
        
        if (errorMessage.includes('quota') || errorMessage.includes('storage')) {
          errorMessage = 'Storage quota exceeded. Please delete old images or upgrade your Firebase plan. Images are now automatically compressed to save space.';
        }
        
        toast({
          title: 'Upload failed',
          description: errorMessage,
          variant: 'destructive',
        });
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLinkClick = () => {
    const { from, to } = editor!.state.selection;
    const selectedText = editor!.state.doc.textBetween(from, to);
    
    // Check if there's already a link at the selection
    const attrs = editor!.getAttributes('link');
    if (attrs.href) {
      setLinkUrl(attrs.href);
      setLinkText(selectedText || attrs.href);
    } else {
      setLinkUrl('');
      setLinkText(selectedText);
    }
    
    setIsLinkDialogOpen(true);
  };

  const handleAddLink = () => {
    if (!linkUrl.trim()) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid URL',
        variant: 'destructive',
      });
      return;
    }

    // Ensure URL has protocol
    let url = linkUrl.trim();
    if (!url.match(/^https?:\/\//)) {
      url = `https://${url}`;
    }

    if (linkText.trim()) {
      // Replace selected text with link
      editor?.chain().focus().insertContent(`<a href="${url}">${linkText}</a>`).run();
    } else {
      // Insert link at cursor
      editor?.chain().focus().setLink({ href: url }).run();
    }

    setIsLinkDialogOpen(false);
    setLinkUrl('');
    setLinkText('');
  };

  const handleRemoveLink = () => {
    editor?.chain().focus().unsetLink().run();
    setIsLinkDialogOpen(false);
    setLinkUrl('');
    setLinkText('');
  };

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title?: string;
  }) => (
    <Button
      type="button"
      variant={isActive ? 'default' : 'ghost'}
      size="icon"
      onClick={onClick}
      title={title}
      className={cn('h-8 w-8', isActive && 'bg-primary text-primary-foreground')}
    >
      {children}
    </Button>
  );

  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="border-b bg-muted/50 p-2 flex flex-wrap items-center gap-1">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Link */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <ToolbarButton
            onClick={handleLinkClick}
            isActive={editor.isActive('link')}
            title="Insert Link (Ctrl+K)"
          >
            <LinkIcon className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Image Upload */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <ToolbarButton
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            title="Insert Image"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ImageIcon className="w-4 h-4" />
            )}
          </ToolbarButton>
        </div>

        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </ToolbarButton>
        </div>
      </div>

      {/* Editor Content */}
      <div className="min-h-[500px] max-h-[800px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>

      {/* Link Dialog */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
            <DialogDescription>
              Enter the URL and optional link text. If no text is provided, the URL will be used.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                type="url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddLink();
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link-text">Link Text (optional)</Label>
              <Input
                id="link-text"
                type="text"
                placeholder="Click here"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddLink();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            {editor.isActive('link') && (
              <Button
                variant="destructive"
                onClick={handleRemoveLink}
              >
                Remove Link
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsLinkDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLink}>
              {editor.isActive('link') ? 'Update Link' : 'Add Link'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RichTextEditor;


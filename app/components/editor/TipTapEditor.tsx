"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code2,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
} from "lucide-react";

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TipTapEditor({ value, onChange }: TipTapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      Youtube.configure({
        width: 480,
        height: 320,
        HTMLAttributes: { class: "mx-auto rounded" },
      }),
      Placeholder.configure({
        placeholder: "Write something juicy…",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor)
    return <div className="min-h-[150px] border rounded p-2 bg-gray-50" />;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file); // TEMP: local preview only
    editor.chain().focus().setImage({ src: url }).run();
  };

  const handleYoutubeEmbed = () => {
    const url = prompt("Enter YouTube URL");
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  return (
    <div>
      <TooltipProvider>
        <div className="flex flex-wrap gap-1 mb-2 border rounded px-2 py-1 bg-muted">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={editor.isActive("bold") ? "secondary" : "ghost"}
                size="icon"
                onClick={() => editor.chain().focus().toggleBold().run()}
                aria-label="Bold"
              >
                <Bold className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={editor.isActive("italic") ? "secondary" : "ghost"}
                size="icon"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                aria-label="Italic"
              >
                <Italic className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={editor.isActive("underline") ? "secondary" : "ghost"}
                size="icon"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                aria-label="Underline"
              >
                <UnderlineIcon className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={
                  editor.isActive("heading", { level: 1 })
                    ? "secondary"
                    : "ghost"
                }
                size="icon"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                aria-label="Heading 1"
              >
                <Heading1 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={
                  editor.isActive("heading", { level: 2 })
                    ? "secondary"
                    : "ghost"
                }
                size="icon"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                aria-label="Heading 2"
              >
                <Heading2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
                size="icon"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                aria-label="Bullet List"
              >
                <List className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
                size="icon"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                aria-label="Ordered List"
              >
                <ListOrdered className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Ordered List</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
                size="icon"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                aria-label="Blockquote"
              >
                <Quote className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Blockquote</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={editor.isActive("codeBlock") ? "secondary" : "ghost"}
                size="icon"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                aria-label="Code Block"
              >
                <Code2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Code Block</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Insert Image"
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert Image</TooltipContent>
          </Tooltip>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleYoutubeEmbed}
                aria-label="Embed YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Embed YouTube</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <div className="border rounded min-h-[150px] p-2 bg-white prose prose-sm max-w-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

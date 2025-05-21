// app/components/forms/PostForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { TipTapEditor } from "@/app/components/editor/TipTapEditor";
import { UploadButton } from "@/app/utils/uploadthing";
import { Loader2 } from "lucide-react";

import { createPost, updatePost } from "@/app/actions/post";
import { postCreateSchema, type PostCreateInput } from "@/lib/validations/post";
import { CategoriesMultiSelect } from "./CategoriesMultiSelect";
import { CategoriesComboBox } from "./CategoriesComboBox";

type PostFormProps = {
  post?: any;
  allCategories?: { id: string; name: string }[];
  mode?: "create" | "edit";
};

export function PostForm({
  post,
  allCategories,
  mode = "create",
}: PostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState<{
    url: string;
    id: string;
  } | null>(() => {
    const featuredImage = post?.images?.find(
      (img: { type: string; url: string; id: string }) =>
        img.type === "featured"
    );
    return featuredImage
      ? { url: featuredImage.url, id: featuredImage.id }
      : null;
  });
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<PostCreateInput>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: post
      ? {
          title: post.title,
          content: post.content,
          categories: post.categories.map((c: any) => c.id),
          images: post.images ?? [],
          videos: post.videos ?? [],
          published: post.published,
        }
      : {
          title: "",
          content: "",
          categories: [],
          images: [],
          videos: [],
          published: false,
        },
  });

  async function onSubmit(data: PostCreateInput) {
    try {
      setIsLoading(true);
      if (mode === "edit" && post) {
        await updatePost(post.id, data);
        toast.success("Post updated successfully");
      } else {
        await createPost(data);
        toast.success("Post created successfully");
      }
      router.push("/admin/posts");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Use allCategories if provided, else fallback to hardcoded
  const categories = allCategories ?? [
    { id: "news", name: "News" },
    { id: "entertainment", name: "Entertainment" },
    { id: "lifestyle", name: "Lifestyle" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <TipTapEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <CategoriesComboBox
                  value={field.value}
                  onChange={field.onChange}
                  options={categories}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {currentImage && (
                    <div className="relative w-64 h-64">
                      <img
                        src={currentImage.url}
                        alt="Featured"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentImage(null);
                          field.onChange([]);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  <div className="relative">
                    <UploadButton
                      endpoint="imageUploader"
                      onUploadBegin={() => setIsUploading(true)}
                      onClientUploadComplete={(res) => {
                        setIsUploading(false);
                        if (res?.[0]) {
                          const newImage = { url: res[0].url, id: res[0].name };
                          setCurrentImage(newImage);
                          field.onChange([newImage]);
                        }
                      }}
                      onUploadError={(error: Error) => {
                        setIsUploading(false);
                        toast.error(`ERROR! ${error.message}`);
                      }}
                      className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100"
                    />
                    {isUploading && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                      </div>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Publish immediately</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? mode === "edit"
              ? "Updating..."
              : "Creating..."
            : mode === "edit"
              ? "Update Post"
              : "Create Post"}
        </Button>
      </form>
    </Form>
  );
}

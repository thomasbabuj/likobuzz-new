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

        {/* Images and Videos fields (optional, as in your create form) */}

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

import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("Upload complete for file:", file.url);
      return { uploadedBy: "user" };
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

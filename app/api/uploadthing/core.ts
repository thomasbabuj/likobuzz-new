import { createUploadthing, type FileRouter } from "uploadthing/next";
import Logger from "@/lib/logger";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      Logger.info("Upload complete for file:", file.ufsUrl);
      return { uploadedBy: "user" };
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

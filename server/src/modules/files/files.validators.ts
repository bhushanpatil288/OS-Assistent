import path from "path";
import os from "os";
import { z } from "zod";

// Define allowed root directories
export const ALLOWED_ROOTS = [
  os.homedir(),
  path.join(os.homedir(), "workspace"),
];

export const isPathAllowed = (targetPath: string): boolean => {
  const resolved = path.resolve(targetPath);
  return ALLOWED_ROOTS.some(root => resolved.startsWith(root));
};

export const pathSchema = z.object({
  path: z
    .string()
    .min(1, "Path is required")
    .transform(p => path.resolve(p))
    .refine(
      (p) => ALLOWED_ROOTS.some(root => p.startsWith(root)),
      "Access to this path is not allowed"
    ),
});

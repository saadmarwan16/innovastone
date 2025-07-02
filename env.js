import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DOMAIN: z.string().optional().default("localhost"),
  },
  client: {
    NEXT_PUBLIC_BACKEND_URL: z.string(),
    NEXT_PUBLIC_BASE_URL: z.string(),
  },
  runtimeEnv: {
    DOMAIN: process.env.DOMAIN,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});

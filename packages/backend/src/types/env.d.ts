declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof import("../env").envSchema> {}
  }
}

export {};

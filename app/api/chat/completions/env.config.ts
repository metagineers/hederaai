export const envConfig = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY ?? ``,
    baseURL: process.env.OPENAI_BASE_URL ?? `` // Ensure this environment variable is set
  },
  vapi: {
    baseUrl: process.env.VAPI_BASE_URL ?? "https://api.vapi.ai",
    apiKey: process.env.VAPI_API_KEY ?? "",
  },
};
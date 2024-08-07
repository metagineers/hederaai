import { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";
import { envConfig } from "./env.config";
import { setCors } from "./cors.utils";

const openai = new OpenAI({
  apiKey: envConfig.openai.apiKey,
  baseURL: envConfig.openai.baseURL // Add this line to set the base URL
});

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Not Found" });
  }

  setCors(res);

  try {
    const {
      model,
      messages,
      max_tokens,
      temperature,
      call,
      stream,
      metadata,
      ...restParams
    } = req.body;

    console.log(req.body);

    if (stream) {
      const completionStream = await openai.chat.completions.create({
        model: model || "tiiuae/falcon-11b",
        ...restParams,
        messages,
        max_tokens: max_tokens || 150,
        temperature: temperature || 0.7,
        stream: true,
      } as OpenAI.Chat.ChatCompletionCreateParamsStreaming);

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      for await (const chunk of completionStream) {
        const data = JSON.stringify(chunk);
        const parsedData = JSON.parse(data);
        
        // Modify the streamed data to remove "User" from content
        parsedData.choices.forEach(choice => {
          if (choice.delta && choice.delta.content) {
            choice.delta.content = choice.delta.content.replace("User", "");
          }
        });

        const modifiedData = JSON.stringify(parsedData);
        console.log(`data: ${modifiedData}\n\n`);
        res.write(`data: ${modifiedData}\n\n`);
      }
      res.end();
    } else {
      const completion = await openai.chat.completions.create({
        model: model || "tiiuae/falcon-11b",
        ...restParams,
        messages,
        max_tokens: max_tokens || 150,
        temperature: temperature || 0.7,
        stream: false,
      });

      // Modify the completion JSON to remove "\nUser:" from message content
      completion.choices.forEach(choice => {
        if (choice.message && choice.message.content) {
          choice.message.content = choice.message.content.replace("\nUser:", "");
        }
      });

      console.log(`completion: ${JSON.stringify(completion)}\n\n`);
      return res.status(200).json(completion);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

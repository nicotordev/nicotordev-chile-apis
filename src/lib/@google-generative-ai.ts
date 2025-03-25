import aiConstants from "@/constants/ai.constants";
import {
  GenerativeModel,
  GoogleGenerativeAI,
  StartChatParams,
} from "@google/generative-ai";

class GenerativeAI {
  private apiKey: string;
  private googleClient: GoogleGenerativeAI;
  private aiClient: GenerativeModel;

  constructor() {
    this.apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    this.googleClient = new GoogleGenerativeAI(this.apiKey);
    this.aiClient = this.googleClient.getGenerativeModel({
      model: aiConstants.DEFAULT_MODEL,
    });
  }

  public async sendPrompt(prompt: string, startChatParams?: StartChatParams) {
    const chat = this.aiClient.startChat(startChatParams);

    return await chat.sendMessage(prompt);
  }
}

const generativeAI = new GenerativeAI();

export default generativeAI;

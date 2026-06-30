import { NextResponse } from "next/server";
import { generateAIReply } from "@/lib/ai";
import { initialKnowledgeBase } from "@/lib/constants";

export async function POST(request: Request) {
  const body = await request.json();
  const message = body.message ?? "";
  const context = body.context ?? initialKnowledgeBase;

  const result = await generateAIReply(message, context);

  return NextResponse.json(result);
}

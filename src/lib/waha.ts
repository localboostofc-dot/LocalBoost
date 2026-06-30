import QRCode from "qrcode";

export type WahaSessionStatus = "pending" | "connected" | "disconnected";

export type WahaSession = {
  id: string;
  userId: string;
  status: WahaSessionStatus;
  qrCode?: string;
  deviceName?: string;
  updatedAt: string;
};

const sessions = new Map<string, WahaSession>();

export async function createWahaSession(userId: string): Promise<WahaSession> {
  const session: WahaSession = {
    id: crypto.randomUUID(),
    userId,
    status: "pending",
    updatedAt: new Date().toISOString(),
  };

  session.qrCode = await QRCode.toDataURL(`localboost-${session.id}`);
  sessions.set(session.id, session);
  return session;
}

export function getWahaSession(sessionId: string): WahaSession | undefined {
  return sessions.get(sessionId);
}

export function getWahaSessionByUser(userId: string): WahaSession | undefined {
  return Array.from(sessions.values()).find((session) => session.userId === userId);
}

export function updateWahaSession(sessionId: string, updates: Partial<WahaSession>): WahaSession | undefined {
  const current = sessions.get(sessionId);
  if (!current) return undefined;

  const next = { ...current, ...updates, updatedAt: new Date().toISOString() };
  sessions.set(sessionId, next);
  return next;
}

export function listLatestWebhookMessages() {
  return webhookMessages.slice(-5).reverse();
}

const webhookMessages: Array<{ id: string; timestamp: string; status: string; content: string }> = [];

export function appendWebhookMessage(status: string, content: string) {
  webhookMessages.push({ id: crypto.randomUUID(), timestamp: new Date().toISOString(), status, content });
}

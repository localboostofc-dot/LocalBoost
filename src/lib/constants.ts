export type PlanKey = "free" | "starter" | "pro" | "business";

export type Plan = {
  id: PlanKey;
  name: string;
  price: string;
  annualPrice: string;
  description: string;
  highlight?: boolean;
  trialDays: number;
  features: string[];
};

export type Contact = {
  id: number;
  name: string;
  phone: string;
  status: "Novo" | "Qualificado" | "Em negociação" | "Cliente";
  tag: string;
  lastActivity: string;
  value: string;
};

export type Campaign = {
  id: number;
  name: string;
  audience: string;
  scheduledFor: string;
  delivered: number;
  opened: number;
  status: "Ativa" | "Agendada" | "Concluída";
};

export type Conversation = {
  id: number;
  contact: string;
  preview: string;
  unread: number;
  status: "Aberta" | "Respondida" | "Em espera";
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "0",
    annualPrice: "0",
    description: "7 dias grátis para testar o LocalBoost.",
    trialDays: 7,
    features: ["1 número do WhatsApp", "1000 conversas mensais", "Automações básicas"],
  },
  {
    id: "starter",
    name: "Starter",
    price: "27",
    annualPrice: "270",
    description: "Ideal para pequenos negócios locais.",
    highlight: true,
    trialDays: 14,
    features: ["1 número do WhatsApp", "100.000 conversas/mês", "IA básica", "CRM simples"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "97",
    annualPrice: "970",
    description: "Automação completa para operação diária.",
    trialDays: 14,
    features: ["5 números do WhatsApp", "Mensagens ilimitadas", "Chatbot IA", "CRM completo"],
  },
  {
    id: "business",
    name: "Business",
    price: "247",
    annualPrice: "2470",
    description: "Plano enterprise para múltiplas equipes.",
    trialDays: 30,
    features: ["Números ilimitados", "Automações ilimitadas", "IA avançada", "API e suporte prioritário"],
  },
];

export const priceIds = {
  price_STARTER_MONTHLY_ID: "price_starter_monthly_placeholder",
  price_PRO_MONTHLY_ID: "price_pro_monthly_placeholder",
  price_BUSINESS_MONTHLY_ID: "price_business_monthly_placeholder",
};

export const heroStats = [
  { label: "Conversas abertas", value: "184" },
  { label: "Leads qualificados", value: "42" },
  { label: "Receita rastreada", value: "R$ 38.4k" },
  { label: "Taxa de resposta", value: "94%" },
];

export const featureBullets = [
  "Conexão WAHA com QR Code instantâneo",
  "IA com base de conhecimento da empresa",
  "CRM e pipeline de vendas",
  "Campanhas, automações e relatórios",
  "Stripe, PIX e faturamento recorrente",
];

export const initialContacts: Contact[] = [
  { id: 1, name: "Maria Silva", phone: "+55 11 99999-0001", status: "Qualificado", tag: "Restaurante", lastActivity: "Há 8 min", value: "R$ 320" },
  { id: 2, name: "João Mendes", phone: "+55 11 99999-0002", status: "Em negociação", tag: "Beleza", lastActivity: "Há 1h", value: "R$ 180" },
  { id: 3, name: "Ana Rocha", phone: "+55 11 99999-0003", status: "Cliente", tag: "Clínica", lastActivity: "Hoje", value: "R$ 700" },
];

export const initialCampaigns: Campaign[] = [
  { id: 1, name: "Oferta da semana", audience: "Restaurantes", scheduledFor: "Hoje 19:00", delivered: 842, opened: 612, status: "Ativa" },
  { id: 2, name: "Lembrete de agendamento", audience: "Clínicas", scheduledFor: "Amanhã 09:00", delivered: 240, opened: 108, status: "Agendada" },
];

export const initialConversations: Conversation[] = [
  { id: 1, contact: "Maria Silva", preview: "Quero reservar uma mesa para hoje.", unread: 2, status: "Aberta" },
  { id: 2, contact: "João Mendes", preview: "Me envie o orçamento do serviço.", unread: 0, status: "Respondida" },
];

export const initialKnowledgeBase = [
  "Horários: segunda a sábado das 10h às 22h.",
  "Produtos: combo premium, assinatura mensal e pacote executivo.",
  "FAQ: entregas em até 45 minutos, atendimento por WhatsApp e retirada no local.",
];

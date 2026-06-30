# LocalBoost

LocalBoost é uma plataforma SaaS premium de automação do WhatsApp, CRM, marketing, IA e gestão para negócios locais.

## Funcionalidades entregues
- Landing page premium em português
- Fluxo de login e cadastro
- Painel SaaS com overview, WhatsApp, CRM, marketing, IA, base de conhecimento, assinatura e admin
- Conexão WAHA com QR Code instantâneo na interface
- Integração de planos e assinatura com Stripe preparada para produção
- Base de conhecimento para IA

## Como rodar
```bash
npm install
npm run dev
```

## Produção
```bash
npm run build
npm run start
```

## Próximos passos para produção real
- Conectar Supabase Auth, banco e dados reais
- Configurar Webhooks WAHA e Edge Functions
- Integrar OpenAI com chave real
- Configurar Stripe com Price IDs reais
- Conectar WhatsApp Cloud API/WAHA com secrets do provedor

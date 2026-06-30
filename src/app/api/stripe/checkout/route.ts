import { NextResponse } from "next/server";
import Stripe from "stripe";

let stripeClient: Stripe | null = null;

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-06-24.dahlia",
    });
  }
  return stripeClient;
}

export async function POST(request: Request) {
  const body = await request.json();
  const priceId = body.priceId ?? "price_starter_monthly_placeholder";
  const stripe = getStripe();

  if (!stripe) {
    return NextResponse.json(
      { ok: false, message: "Configure STRIPE_SECRET_KEY para habilitar checkout real." },
      { status: 500 }
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/billing?status=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/billing?status=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}

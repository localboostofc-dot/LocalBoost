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
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";
  const stripe = getStripe();

  if (!stripe) {
    return NextResponse.json(
      { ok: false, message: "Configure STRIPE_SECRET_KEY antes de usar webhooks do Stripe." },
      { status: 500 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    console.log("Checkout completed", event.data.object);
  }

  return NextResponse.json({ received: true });
}

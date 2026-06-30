import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";

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
  try {
    const body = await request.json();
    const { priceId, userId, planId } = body;

    if (!userId) {
      return NextResponse.json(
        { ok: false, message: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { ok: false, message: "Configure STRIPE_SECRET_KEY para habilitar checkout" },
        { status: 500 }
      );
    }

    // Get or create Stripe customer
    let customerId: string;
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id, email")
      .eq("id", userId)
      .single();

    if (profile?.stripe_customer_id) {
      customerId = profile.stripe_customer_id;
    } else {
      const customer = await stripe.customers.create({
        email: profile?.email,
        metadata: {
          userId,
          planId: planId || "free",
        },
      });
      customerId = customer.id;

      // Update profile with Stripe customer ID
      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", userId);
    }

    // Map plan IDs to Stripe price IDs
    const stripePriceMap: Record<string, string> = {
      starter: process.env.STRIPE_PRICE_STARTER || "price_starter_monthly",
      pro: process.env.STRIPE_PRICE_PRO || "price_pro_monthly",
      business: process.env.STRIPE_PRICE_BUSINESS || "price_business_monthly",
    };

    const sessionPriceId = stripePriceMap[planId] || priceId;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [
        {
          price: sessionPriceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/billing?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/billing?status=cancelled`,
      metadata: {
        userId,
        planId: planId || "free",
      },
    });

    return NextResponse.json({ 
      ok: true,
      url: session.url,
      sessionId: session.id 
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    const err = error as any;
    return NextResponse.json(
      { 
        ok: false, 
        message: err.message || "Erro ao criar sessão de checkout" 
      },
      { status: 500 }
    );
  }
}

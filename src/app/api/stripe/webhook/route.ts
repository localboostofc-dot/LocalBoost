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
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";
  const stripe = getStripe();

  if (!stripe) {
    return NextResponse.json(
      { ok: false, message: "Configure STRIPE_SECRET_KEY antes de usar webhooks do Stripe." },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error) {
    const err = error as any;
    console.error("Webhook error:", err.message);
    return NextResponse.json({ ok: false, message: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;

        // Get customer metadata
        const customer = await stripe.customers.retrieve(customerId);
        const userId = (customer as Stripe.Customer).metadata?.userId;
        const planId = (customer as Stripe.Customer).metadata?.planId;

        if (userId) {
          const plan = planId || "starter";

          // Update user plan in database
          const { error } = await supabase
            .from("profiles")
            .update({
              plan,
              stripe_customer_id: customerId,
              updated_at: new Date().toISOString(),
            })
            .eq("id", userId);

          if (error) {
            console.error("Error updating profile:", error);
          }
        }
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const customer = await stripe.customers.retrieve(customerId);
        const userId = (customer as Stripe.Customer).metadata?.userId;

        if (userId) {
          const plan = getPlanFromPriceId(subscription.items.data[0].price.id);

          const { error } = await supabase
            .from("profiles")
            .update({
              plan,
              stripe_subscription_id: subscription.id,
              stripe_subscription_status: subscription.status,
              subscription_current_period_end: new Date(
                subscription.current_period_end * 1000
              ).toISOString(),
            })
            .eq("id", userId);

          if (error) {
            console.error("Error updating profile:", error);
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const customer = await stripe.customers.retrieve(customerId);
        const userId = (customer as Stripe.Customer).metadata?.userId;

        if (userId) {
          const plan = getPlanFromPriceId(subscription.items.data[0].price.id);

          const { error } = await supabase
            .from("profiles")
            .update({
              plan,
              stripe_subscription_status: subscription.status,
              subscription_current_period_end: new Date(
                subscription.current_period_end * 1000
              ).toISOString(),
            })
            .eq("id", userId);

          if (error) {
            console.error("Error updating profile:", error);
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const customer = await stripe.customers.retrieve(customerId);
        const userId = (customer as Stripe.Customer).metadata?.userId;

        if (userId) {
          const { error } = await supabase
            .from("profiles")
            .update({
              plan: "free",
              stripe_subscription_id: null,
              stripe_subscription_status: null,
            })
            .eq("id", userId);

          if (error) {
            console.error("Error updating profile:", error);
          }
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Payment succeeded for invoice:", invoice.id);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.error("Payment failed for invoice:", invoice.id);
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const err = error as any;
    console.error("Webhook processing error:", err.message);
    return NextResponse.json(
      { ok: false, message: `Webhook processing error: ${err.message}` },
      { status: 500 }
    );
  }
}

function getPlanFromPriceId(priceId: string): string {
  const planMap: Record<string, string> = {
    [process.env.STRIPE_PRICE_STARTER || "price_starter_monthly"]: "starter",
    [process.env.STRIPE_PRICE_PRO || "price_pro_monthly"]: "pro",
    [process.env.STRIPE_PRICE_BUSINESS || "price_business_monthly"]: "business",
  };

  return planMap[priceId] || "free";
}

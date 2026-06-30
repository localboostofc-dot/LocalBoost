"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { initiateCheckout } from "@/lib/stripe-helpers";

interface StripeButtonProps {
  planId: "starter" | "pro" | "business";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function StripeButton({ planId, children, className, onClick }: StripeButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    setError("");
    setLoading(true);
    onClick?.();

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        // Redirect to register if not logged in
        router.push("/register");
        return;
      }

      // Initiate checkout
      const result = await initiateCheckout({
        userId: user.id,
        planId,
      });

      if (result.success && result.url) {
        // Redirect to Stripe checkout
        window.location.href = result.url;
      } else {
        setError(result.error || "Erro ao iniciar checkout");
      }
    } catch (err) {
      const error = err as any;
      setError(error.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className={className}
      >
        {loading ? "Carregando..." : children}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </>
  );
}

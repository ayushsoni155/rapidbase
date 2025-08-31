"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SessionWatcher() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      toast.success("🎉 You are logged in!");
    }
    if (status === "unauthenticated") {
      toast.info("👋 You are logged out.");
    }
  }, [status]);

  return null; // invisible component
}

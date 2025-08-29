"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 rounded-full bg-red-500/30 blur-3xl"
          animate={{ x: [0, 50, -50, 0], y: [0, -30, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-orange-500/30 blur-3xl"
          animate={{ x: [0, -60, 60, 0], y: [0, 40, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-yellow-500/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Error Title */}
      <h1 className="text-8xl font-extrabold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,99,71,0.6)] animate-pulse">
        500
      </h1>

      <h2 className="mt-4 text-2xl font-semibold text-foreground">
        Something Went Wrong
      </h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        An unexpected error occurred. Don’t worry, our team has been notified.  
        You can try going back or refreshing the page.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <Button
          size="lg"
          className="shadow-lg shadow-red-500/40"
          onClick={() => router.back()}
        >
          Go Back
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="hover:shadow-lg hover:shadow-orange-400/30"
          onClick={() => router.refresh()}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
}

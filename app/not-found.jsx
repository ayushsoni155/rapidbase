"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient blobs */}
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary/30 blur-3xl"
          animate={{ x: [0, 50, -50, 0], y: [0, -30, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-500/30 blur-3xl"
          animate={{ x: [0, -60, 60, 0], y: [0, 40, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Glowing big 404 */}
      <h1 className="text-8xl font-extrabold bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(236,72,153,0.5)] animate-pulse">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-semibold text-foreground">
        Page Not Found
      </h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.  
        Let’s get you back on track.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <Button
          size="lg"
          className="shadow-lg shadow-primary/40"
          onClick={() => router.back()}
        >
          Go Back
        </Button>

        <Link href="/contact">
          <Button
            variant="outline"
            size="lg"
            className="hover:shadow-lg hover:shadow-primary/30"
          >
            Contact Support
          </Button>
        </Link>
      </div>
    </div>
  );
}

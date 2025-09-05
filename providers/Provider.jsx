"use client";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { SessionProvider } from "next-auth/react";
import { ProjectProvider } from "@/providers/ProjectContext";
import ClientTopLoader from "@/providers/ClientTopLoader";
import { Toaster } from "@/components/ui/sonner";
import SessionWatcher from "@/providers/SessionWatcher";

export default function Provider({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <ProjectProvider>
          <ClientTopLoader />
          <Toaster
            expand={false}
            position="top-center"
            richColors
            closeButton
          />
          <SessionWatcher />
          {children}
        </ProjectProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

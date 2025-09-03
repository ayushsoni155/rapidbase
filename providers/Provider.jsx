"use client";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { SessionProvider } from "next-auth/react";
import { ProjectProvider } from "@/providers/ProjectContext";



export default function Provider({ children }) {
  return (<ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
          <SessionProvider> <ProjectProvider>{children}</ProjectProvider></SessionProvider>
          </ThemeProvider>);
}
"use client";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { SessionProvider } from "next-auth/react";


export default function Provider({ children }) {
  return (<ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
          <SessionProvider>{children}</SessionProvider>
          </ThemeProvider>);
}
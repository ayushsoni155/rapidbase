import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import AuthProvider from "@/providers/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader
              color="hsl(var(--primary))"
              initialPosition={0.3}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
            />

            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}

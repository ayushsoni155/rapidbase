import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Provider from "@/providers/Provider";
import { Toaster } from "@/components/ui/sonner";
import SessionWatcher from "@/providers/SessionWatcher";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
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
          <Provider>
            <Toaster
              expand={false}
              position="top-center"
              richColors
              closeButton
            />
            <SessionWatcher />
            {children}
          </Provider>
        </body>
      </html>
    </>
  );
}

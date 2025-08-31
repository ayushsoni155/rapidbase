import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Provider from "@/providers/Provider";

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
            <Provider>{children}</Provider>
        </body>
      </html>
    </>
  );
}

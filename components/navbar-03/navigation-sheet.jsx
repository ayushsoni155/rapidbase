"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ArrowUpRight } from "lucide-react";
import { features, resources } from "./config";
import { Logo } from "./logo";
import Link from "next/link";
import { DialogTitle } from "@/components/ui/dialog";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";
import LoginPopup from "@/components/global/LoginPopup";

export const NavigationSheet = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleButtonClick = () => {
    if (status === "authenticated") {
      router.push("/project/create-project"); // logged in → go to project page
    } else {
      setIsLoginOpen(true); // not logged in → show popup
    }
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          {/* Mobile Menu Button */}
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 p-4">
          {/* Accessibility fix */}
          <DialogTitle className="sr-only">Navigation Menu</DialogTitle>

          {/* Logo */}
          <Logo />

          {/* Mobile-only Actions */}
          <div className="flex flex-row-reverse gap-2 md:hidden mt-4">
            <ThemeToggleButton variant="circle-blur" start="top-right" />
            <Button
              className="w-45 rounded-full"
              onClick={handleButtonClick}
            >
              {status === "authenticated" ? "Dashboard" : "Get Started"}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Links */}
          <div className="space-y-4 mt-6">
            <Link href="#">Home</Link>

            <div>
              <div className="font-bold">Features</div>
              <ul className="mt-2 space-y-2 ml-2 border-l pl-2">
                {features.map((f) => (
                  <li key={f.title}>
                    <Link href="#">
                      <f.icon className="inline-block mr-2 h-4 w-4 text-muted-foreground" />
                      {f.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-bold">Resources</div>
              <ul className="mt-2 space-y-2 ml-2 border-l pl-2">
                {resources.map((r) => (
                  <li key={r.title}>
                    <Link href="#">
                      <r.icon className="inline-block mr-2 h-4 w-4 text-muted-foreground" />
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Login Popup */}
      <LoginPopup open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </>
  );
};

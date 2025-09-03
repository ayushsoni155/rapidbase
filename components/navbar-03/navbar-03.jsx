"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // for client-side navigation
import LoginPopup from "@/components/global/LoginPopup";
import { Button } from "@/components/ui/button";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { ArrowUpRight, Bot } from "lucide-react";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";

const Navbar03Page = () => {
  const { data: session, status } = useSession();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const router = useRouter();

  const handleButtonClick = () => {
    if (status === "authenticated") {
      router.push("/project/create-project"); // redirect without refresh
    } else {
      setIsLoginOpen(true); // open login popup
    }
  };

  return (
    <>
      <div className="flex fixed top-1 justify-center items-center w-full py-2 z-50">
        <nav
          className="flex h-14 w-full max-w-5xl items-center justify-between px-3 
                border bg-background shadow-sm shadow-[0_0_15px] shadow-primary/40 dark:shadow-[0_0_20px] dark:shadow-primary/30
               transition-all"
        >
          {/* Left */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 font-semibold ml-1">
              <Bot className="h-5 w-5" /> Rapidbase
            </div>
            <NavMenu className="hidden md:block" />
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 ">
            <div className="flex items-center gap-3 hidden sm:flex">
              <Button
                className="px-4 py-2"
                onClick={handleButtonClick}
              >
                {status === "authenticated" ? "Dashboard" : "Get Started"}
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
              <ThemeToggleButton variant="circle-blur" start="top-right" />
            </div>
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </nav>
      </div>
      <LoginPopup open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </>
  );
};

export default Navbar03Page;

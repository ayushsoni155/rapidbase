
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import {
  Database,
  BarChart3,
  Users,
  Key,
  Settings,
  FileText,
  Rocket,
  Lock,
} from "lucide-react";

// RapidBase Menu Items
export const features = [
  {
    title: "Visual Schema Builder",
    icon: Database,
    description: "Create tables and columns instantly without writing SQL.",
  },
  {
    title: "Auto CRUD UI",
    icon: Settings,
    description: "Generate user-friendly interfaces for your data automatically.",
  },
  {
    title: "Dynamic Dashboards",
    icon: BarChart3,
    description: "Get real-time views with search, filtering, and analytics.",
  },
  {
    title: "Collaboration",
    icon: Users,
    description: "Invite team members and assign secure roles easily.",
  },
  {
    title: "REST API Generation",
    icon: Key,
    description: "Expose secure APIs for integration with other apps.",
  },
];

export const resources = [
  {
    title: "Documentation",
    icon: FileText,
    description: "Learn how to use RapidBase with guides and examples.",
  },
  {
    title: "Security",
    icon: Lock,
    description: "Understand our multi-tenant architecture and data safety.",
  },
  {
    title: "Roadmap",
    icon: Rocket,
    description: "See upcoming features and planned improvements.",
  },
];

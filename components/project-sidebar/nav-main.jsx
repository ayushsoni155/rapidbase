"use client"

import { ChevronRight, SquareTerminal, Table, FileCode2, Settings, ClipboardList, Plus } from "lucide-react"
import Link from "next/link"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

// Hardcoded data
const navMain = [
  {
    title: "Analytics",
    url: "#",
    icon: SquareTerminal,
  },
  {
    title: "Tables",
    url: "#",
    icon: Table,
    isActive: true,
    items: [
      { title: "View Tables", url: "#" },
      { title: "Create Table", url: "#" },
    ],
  },
  {
    title: "SQL Editor",
    url: "#",
    icon: FileCode2,
  },
  {
    title: "Project Settings",
    url: "#",
    icon: Settings,
    items: [
      { title: "General", url: "#" },
      { title: "Invite Members", url: "#" },
      { title: "API Keys", url: "#" },
    ],
  },
  {
    title: "Audit Logs",
    url: "#",
    icon: ClipboardList,
  },
]

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Project</SidebarGroupLabel>
      <SidebarMenu>
        {navMain.map((item) =>
          item.items ? (
            // Collapsible menu
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            // Single link
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}

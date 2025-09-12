"use client";

import { useState, useEffect } from "react";
import { ChevronRight, SquareTerminal, Table, FileCode2, Settings, ClipboardList, Plus, Workflow, Loader2 } from "lucide-react";
import Link from "next/link";
import { useProjects } from "@/providers/ProjectContext";
import { useTables } from "@/providers/TableContext"; // Import the new context
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

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
    hasSubMenu: true,
  },
  {
    title: "SQL Editor",
    url: "#",
    icon: FileCode2,
  },
  {
    title: "Schema Visualization",
    url: "#",
    icon: Workflow,
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

// Skeleton loading component
const SkeletonLoader = () => (
  <div className="space-y-2 p-2">
    <div className="h-4 w-4/5 rounded-md bg-gray-200 animate-pulse"></div>
    <div className="h-4 w-3/5 rounded-md bg-gray-200 animate-pulse"></div>
    <div className="h-4 w-4/6 rounded-md bg-gray-200 animate-pulse"></div>
  </div>
);

export function NavMain() {
  const { selectedProject } = useProjects();
  const { tables, isLoading, mutate } = useTables(); // Use the new context
  const [isTablesOpen, setIsTablesOpen] = useState(false);

  // Use useEffect to open the collapsible when tables data is loaded
  useEffect(() => {
    if (tables && tables.length > 0) {
      setIsTablesOpen(true);
    }
  }, [tables]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Project</SidebarGroupLabel>
      <SidebarMenu>
        {navMain.map((item) => {
          if (item.title === "Tables") {
            return (
              <Collapsible
                key={item.title}
                open={isTablesOpen}
                onOpenChange={setIsTablesOpen}
                asChild
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      <Table />
                      <span>{item.title}</span>
                      {isLoading && (
                        <Loader2 className="h-4 w-4 ml-auto animate-spin text-muted-foreground" />
                      )}
                      {!isLoading && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href={`/project/${selectedProject?.id}/create-table`} className="font-semibold text-primary hover:text-primary-foreground transition-colors duration-200">
                            <Plus size={16} />
                            <span>Create Table</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      {isLoading ? (
                        <SkeletonLoader />
                      ) : tables && tables.length > 0 ? (
                        tables.map((table) => (
                          <SidebarMenuSubItem key={table.id}>
                            <SidebarMenuSubButton asChild>
                              <Link href={`/project/${selectedProject?.id}/tables/${table.id}`}>
                                <span>{table.name}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))
                      ) : (
                        <SidebarMenuSubItem>
                          <span className="text-muted-foreground text-xs p-2">No tables found.</span>
                        </SidebarMenuSubItem>
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          // Handle regular items with or without sub-items
          if (item.items) {
            return (
              <Collapsible key={item.title} asChild className="group/collapsible">
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
            )
          }

          // Handle single links
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
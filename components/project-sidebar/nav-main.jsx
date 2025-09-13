"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  SquareTerminal,
  Table,
  FileCode2,
  Settings,
  ClipboardList,
  Plus,
  Workflow,
  Loader2,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for page redirection
import { useProjects } from "@/providers/ProjectContext";
import { useTables } from "@/providers/TableContext"; // Import the new context
import axios from "@/utils/axios";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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
];

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
  const { tables, isLoading, mutate } = useTables();
  const router = useRouter();
  const [isTablesOpen, setIsTablesOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tableToDelete, setTableToDelete] = useState(null);
  const [confirmId, setConfirmId] = useState("");

  // Use useEffect to open the collapsible when tables data is loaded
  useEffect(() => {
    if (tables && tables.length > 0) {
      setIsTablesOpen(true);
    }
  }, [tables]);

  const handleDeleteClick = (table) => {
    setTableToDelete(table);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (confirmId !== tableToDelete.id) {
      toast.error("The entered ID does not match.");
      return;
    }

    try {
      await axios.delete(
        `/table/${selectedProject.id}/tables/${tableToDelete.id}`
      );

      toast.success("Table deleted successfully.");
      setIsDeleteModalOpen(false);
      setTableToDelete(null);
      setConfirmId("");
      mutate(); // Re-fetch the tables to update the sidebar
      router.push(`/project/${selectedProject.id}/dashboard`); // Navigate away from the deleted table's page
    } catch (error) {
      // Axios automatically handles non-2xx responses by throwing an error
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete table.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
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
                            <Link
                              href={`/project/${selectedProject?.id}/create-table`}
                              className="font-semibold text-primary hover:text-primary-foreground transition-colors duration-200"
                            >
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
                              {/* The main button that contains both the link and the dropdown */}
                              <SidebarMenuSubButton asChild>
                                <div className="flex w-full items-center justify-between group">
                                  <Link
                                    href={`/project/${selectedProject?.id}/tables/${table.id}`}
                                    className="truncate flex-grow"
                                  >
                                    <span>{table.name}</span>
                                  </Link>
                                  {/* Three-dot menu for edit/delete */}
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <button className="h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground ">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={() =>
                                          toast.info(
                                            "Edit functionality coming soon!"
                                          )
                                        }
                                      >
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Edit</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => handleDeleteClick(table)}
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        <span>Delete</span>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))
                        ) : (
                          <SidebarMenuSubItem>
                            <span className="text-muted-foreground text-xs p-2">
                              No tables found.
                            </span>
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
                <Collapsible
                  key={item.title}
                  asChild
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
              );
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
            );
          })}
        </SidebarMenu>
      </SidebarGroup>

      {/* Confirmation Modal */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action **cannot be undone**. This will permanently delete the
              table named **{tableToDelete?.name}** and all of its data. To
              confirm, please type the table's ID in the input field below.
            </AlertDialogDescription>
            <div className="mt-4">
              <p className="text-sm font-medium mb-1">
                Table ID:{" "}
                <span className="text-red-500 font-mono">
                  {tableToDelete?.id}
                </span>
              </p>
              <Input
                type="text"
                placeholder="Enter table ID to confirm"
                value={confirmId}
                onChange={(e) => setConfirmId(e.target.value)}
              />
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={confirmId !== tableToDelete?.id}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

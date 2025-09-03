"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ProjectGrid } from "@/components/project/project-grid";
import { useProjects } from "@/providers/ProjectContext";

export default function ProjectsPage() {
  const { projects, error, isLoading, mutate } = useProjects();

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-48" />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Skeleton className="h-48 w-full rounded-md" />
          <Skeleton className="h-48 w-full rounded-md" />
          <Skeleton className="h-48 w-full rounded-md" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-destructive">
            Failed to Load Projects
          </h2>
          <p className="text-muted-foreground mt-2">
            Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ProjectGrid projects={projects || []} mutate={mutate} />
    </div>
  );
}

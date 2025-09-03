"use client";

import { createContext, useContext, useState } from "react";
import useSWR from "swr";
import axios from "@/utils/axios";

const ProjectContext = createContext();

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

export const ProjectProvider = ({ children }) => {
  // SWR for fetching all projects
  const { data: projects, error, isLoading, mutate } = useSWR("/projects/", fetcher);

  const [selectedProject, setSelectedProject] = useState(null);

  const selectProject = async (projectId) => {
    try {
      const res = await axios.get(`/projects/${projectId}`);
      setSelectedProject(res.data.data);
    } catch (err) {
      console.error("Failed to fetch project details", err);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        error,
        isLoading,
        mutate,
        selectedProject,
        selectProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};

"use client";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import axios from "@/utils/axios";
import { toast } from "sonner";

export function DeleteProjectAlert({ project, onSuccess }) {
    const handleDelete = async () => {
        const promise = axios.delete(`/projects/${project.id}`).then(() => onSuccess());
        
        toast.promise(promise, {
            loading: 'Deleting project...',
            success: 'Project deleted!',
            error: 'Failed to delete project.',
        });
    };

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the <strong>{project.name}</strong> project and all of its associated data.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
}
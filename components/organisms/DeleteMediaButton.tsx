"use client"

import { useState } from "react"
import { Trash2, Loader2, AlertTriangle } from "lucide-react"
import { deleteMedia } from "@/app/actions/media"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function DeleteMediaButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteMedia(id)

    if (result.success) {
      toast.success("Media deleted successfully")
      setOpen(false) // Close dialog on success
    } else {
      toast.error(result.error || "Failed to delete media")
    }
    setIsDeleting(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <button className="absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-red-500 text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 hover:bg-red-600">
          <Trash2 className="size-4" />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600 sm:mx-0">
            <AlertTriangle className="size-6" />
          </div>
          <AlertDialogTitle className="text-center sm:text-left">
            Delete this media?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center sm:text-left">
            This action cannot be undone. This will permanently delete the media
            file and remove it from the public gallery.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault() // Prevent default close to show loading
              handleDelete()
            }}
            disabled={isDeleting}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" /> Deleting...
              </>
            ) : (
              "Delete Media"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

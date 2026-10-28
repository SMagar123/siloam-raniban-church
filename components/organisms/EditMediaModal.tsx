"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Pencil, Loader2 } from "lucide-react"
import { updateMedia } from "@/app/actions/media"
import { toast } from "sonner"

interface EditMediaModalProps {
  media: {
    id: string
    title: string
    showInGallery: boolean
  }
}

export function EditMediaModal({ media }: EditMediaModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    const result = await updateMedia(media.id, formData)

    if (result.success) {
      toast.success("Media updated successfully!")
      setOpen(false)
    } else {
      toast.error(result.error || "Failed to update media")
    }
    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button
          className="absolute top-2 left-2 grid size-8 place-items-center rounded-full bg-black/50 text-white opacity-0 shadow-md backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/70"
          title="Edit Media"
        >
          <Pencil className="size-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Media</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="flex flex-col gap-4 pt-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Title</label>
            <input
              name="title"
              defaultValue={media.title}
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4">
            <input
              type="checkbox"
              name="showInGallery"
              id="showInGallery-edit"
              defaultChecked={media.showInGallery}
              className="size-4 rounded text-primary focus:ring-primary"
            />
            <label
              htmlFor="showInGallery-edit"
              className="cursor-pointer text-sm font-medium"
            >
              Show in Public Gallery
            </label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

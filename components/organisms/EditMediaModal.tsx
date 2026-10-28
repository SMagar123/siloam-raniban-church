"use client"

import { useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Pencil,
  Loader2,
  UploadCloud,
  X,
  Image as ImageIcon,
} from "lucide-react"
import { updateMedia } from "@/app/actions/media"
import { toast } from "sonner"
import Image from "next/image"

interface EditMediaModalProps {
  media: {
    id: string
    title: string
    showInGallery: boolean
    type: string
    url: string
    thumbnail: string | null
  }
}

const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB

export function EditMediaModal({ media }: EditMediaModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newFileName, setNewFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    const result = await updateMedia(media.id, formData)

    if (result.success) {
      toast.success("Media updated successfully!")
      setOpen(false)
      setNewFileName(null)
    } else {
      toast.error(result.error || "Failed to update media")
    }
    setIsSubmitting(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File is too large. Maximum size is 1MB.")
        e.target.value = ""
        setNewFileName(null)
        return
      }
      setNewFileName(file.name)
    }
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
          <DialogTitle>
            Edit {media.type === "video" ? "Video" : "Photo"}
          </DialogTitle>
        </DialogHeader>

        {/* We must include enctype for file uploads */}
        <form
          action={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col gap-4 pt-4"
        >
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Title</label>
            <input
              name="title"
              defaultValue={media.title}
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Video URL */}
          {media.type === "video" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Video Embed URL</label>
              <input
                name="videoUrl"
                type="url"
                defaultValue={media.url}
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {/* Thumbnail Update (Only for Videos) */}
          {media.type === "video" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Update Thumbnail</label>

              {/* Current Thumbnail Preview */}
              {media.thumbnail && !newFileName && (
                <div className="relative mb-2 aspect-video w-full overflow-hidden rounded-lg border border-border">
                  <Image
                    src={media.thumbnail}
                    alt="Current thumbnail"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                    <span className="text-xs font-medium text-white">
                      Current Thumbnail
                    </span>
                  </div>
                </div>
              )}

              {/* File Input Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 py-6 transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                {newFileName ? (
                  <>
                    <ImageIcon className="size-6 text-primary" />
                    <p className="text-sm font-medium text-foreground">
                      {newFileName}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setNewFileName(null)
                        if (fileInputRef.current)
                          fileInputRef.current.value = ""
                      }}
                      className="absolute top-2 right-2 rounded-full bg-red-100 p-1 text-red-500 hover:bg-red-200"
                    >
                      <X className="size-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <UploadCloud className="size-5 text-muted-foreground group-hover:text-primary" />
                    <p className="text-xs font-medium text-foreground">
                      Click to upload new thumbnail
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Max size: 1MB
                    </p>
                  </>
                )}
                <input
                  type="file"
                  name="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
          )}

          {/* Gallery Toggle */}
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

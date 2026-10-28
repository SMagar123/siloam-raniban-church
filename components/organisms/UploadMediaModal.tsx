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
  UploadCloud,
  Image as ImageIcon,
  Video,
  X,
  Loader2,
} from "lucide-react"
import { uploadMedia } from "@/app/actions/media"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB

export function UploadMediaModal() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [type, setType] = useState<"photo" | "video">("photo")
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    const result = await uploadMedia(formData)

    if (result.success) {
      toast.success("Media uploaded successfully!")
      setOpen(false)
      setFileName(null)
    } else {
      // Display the exact error message from the server
      toast.error(result.error || "Failed to upload media")
    }
    setIsSubmitting(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 3. CLIENT-SIDE SIZE CHECK
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File is too large. Maximum size is 1MB.`)
        e.target.value = "" // Reset input
        setFileName(null)
        return
      }
      setFileName(file.name)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="rounded-full">
          <UploadCloud className="mr-2 size-4" /> Upload Media
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Upload New Media
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="flex flex-col gap-6 pt-4">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Title *</label>
            <input
              name="title"
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="e.g., Sunday Worship"
            />
          </div>

          {/* Type Toggle */}
          <div className="flex gap-2 rounded-xl bg-muted p-1">
            <button
              type="button"
              onClick={() => setType("photo")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors",
                type === "photo"
                  ? "bg-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <ImageIcon className="size-4" /> Photo
            </button>
            <button
              type="button"
              onClick={() => setType("video")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors",
                type === "video"
                  ? "bg-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Video className="size-4" /> Video
            </button>
          </div>
          <input type="hidden" name="type" value={type} />

          {/* Video URL (Conditional) */}
          {type === "video" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Video Embed URL (YouTube) *
              </label>
              <input
                name="videoUrl"
                required
                type="url"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="https://www.youtube.com/embed/..."
              />
            </div>
          )}

          {/* Drag & Drop File Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              {type === "photo" ? "Upload Image *" : "Upload Thumbnail *"}
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 py-8 transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              {fileName ? (
                <>
                  <ImageIcon className="size-8 text-primary" />
                  <p className="text-sm font-medium text-foreground">
                    {fileName}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setFileName(null)
                      if (fileInputRef.current) fileInputRef.current.value = ""
                    }}
                    className="absolute top-2 right-2 rounded-full bg-red-100 p-1 text-red-500 hover:bg-red-200"
                  >
                    <X className="size-4" />
                  </button>
                </>
              ) : (
                <>
                  <div className="rounded-full bg-background p-3 shadow-sm">
                    <UploadCloud className="size-6 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Max file size: 1MB
                  </p>
                </>
              )}
              <input
                type="file"
                name="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept={type === "photo" ? "image/*" : "image/*"}
                required={type === "photo" || (type === "video" && !fileName)}
              />
            </div>
          </div>

          {/* Gallery Toggle */}
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4">
            <input
              type="checkbox"
              name="showInGallery"
              id="showInGallery"
              className="size-4 rounded text-primary focus:ring-primary"
            />
            <label
              htmlFor="showInGallery"
              className="cursor-pointer text-sm font-medium"
            >
              Show in Public Gallery
            </label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl py-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" /> Uploading...
              </>
            ) : (
              "Upload Media"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

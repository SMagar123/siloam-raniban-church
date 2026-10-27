"use client"

import { useState, useEffect } from "react"

export function SlugInput() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")

  useEffect(() => {
    // Listen to the title input and update the slug
    const titleInput = document.querySelector(
      'input[name="title"]'
    ) as HTMLInputElement

    const handleInput = (e: Event) => {
      const val = (e.target as HTMLInputElement).value
      setTitle(val)
      // Generate slug: lowercase, replace spaces with dashes, remove special chars
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
      setSlug(generated)
    }

    if (titleInput) {
      titleInput.addEventListener("input", handleInput)
    }
    return () => {
      if (titleInput) titleInput.removeEventListener("input", handleInput)
    }
  }, [])

  return (
    <input
      name="slug"
      required
      value={slug}
      onChange={(e) => setSlug(e.target.value)}
      className="rounded-md border p-2"
      placeholder="auto-generated-slug"
    />
  )
}

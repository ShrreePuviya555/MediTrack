"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DoctorLayout } from "@/components/doctor-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArticleProvider, useArticles } from "@/contexts/article-context"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Save } from "lucide-react"

function CreateArticleContent() {
  const router = useRouter()
  const { addArticle } = useArticles()
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState<"draft" | "published">("draft")
  const [tags, setTags] = useState("")
  const [doctorId, setDoctorId] = useState<string | null>(null)
  const [doctorName, setDoctorName] = useState<string | null>(null)

  useEffect(() => {
    try {
      const doctorUserStr = localStorage.getItem("doctorUser")
      if (doctorUserStr) {
        const doctorUser = JSON.parse(doctorUserStr)
        setDoctorId(doctorUser.id)
        setDoctorName(doctorUser.name)
      } else {
        // For demo purposes, use a default doctor ID if not logged in
        setDoctorId("doctor-1")
        setDoctorName("Sarah Johnson")
      }
    } catch (error) {
      console.error("Error getting doctor info:", error)
      // For demo purposes, use a default doctor ID if there's an error
      setDoctorId("doctor-1")
      setDoctorName("Sarah Johnson")
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content) {
      toast({
        title: "Error",
        description: "Title and content are required.",
        variant: "destructive",
      })
      return
    }

    addArticle({
      title,
      content,
      description,
      authorId: doctorId || "doctor-1",
      authorName: doctorName || "Dr. Sarah Johnson",
      authorType: "doctor",
      status,
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
      imageUrl: "/placeholder.svg?height=200&width=400",
      readTime: `${Math.max(1, Math.ceil(content.length / 1000))} min read`,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    })

    toast({
      title: "Article Created",
      description: "Your article has been successfully created.",
    })

    router.push("/doctor/articles")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/doctor/articles")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Create New Article</h1>
        </div>
        <Button onClick={handleSubmit} className="bg-healthcare-green hover:bg-healthcare-green/90">
          <Save className="mr-2 h-4 w-4" /> Save Article
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Article title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g., Cardiology, Nutrition"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the article"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Article content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="Comma-separated tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as "draft" | "published")}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="button" variant="outline" className="mr-2" onClick={() => router.push("/doctor/articles")}>
            Cancel
          </Button>
          <Button type="submit" className="bg-healthcare-green hover:bg-healthcare-green/90">
            Create Article
          </Button>
        </div>
      </form>
    </div>
  )
}

export default function CreateArticlePage() {
  return (
    <ArticleProvider>
      <DoctorLayout>
        <CreateArticleContent />
      </DoctorLayout>
    </ArticleProvider>
  )
}

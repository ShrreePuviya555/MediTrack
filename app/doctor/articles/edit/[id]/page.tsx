"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { DoctorLayout } from "@/components/doctor-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArticleProvider, useArticles } from "@/contexts/article-context"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Save } from "lucide-react"

function EditArticleContent() {
  const router = useRouter()
  const params = useParams()
  const { getArticleById, updateArticle } = useArticles()
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState<"draft" | "published">("draft")
  const [tags, setTags] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const article = getArticleById(params.id as string)
      if (article) {
        setTitle(article.title)
        setContent(article.content)
        setDescription(article.description || "")
        setCategory(article.category)
        setStatus(article.status)
        setTags(article.tags.join(", "))
      } else {
        router.push("/doctor/articles")
      }
    }
    setLoading(false)
  }, [params.id, getArticleById, router])

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

    updateArticle(params.id as string, {
      title,
      content,
      description,
      category,
      status,
      tags: tags.split(",").map((tag) => tag.trim()),
    })

    toast({
      title: "Article Updated",
      description: "Your article has been successfully updated.",
    })

    router.push("/doctor/articles")
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/doctor/articles")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Edit Article</h1>
        </div>
        <Button onClick={handleSubmit} className="bg-healthcare-green hover:bg-healthcare-green/90">
          <Save className="mr-2 h-4 w-4" /> Save Changes
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
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

export default function EditArticlePage() {
  return (
    <ArticleProvider>
      <DoctorLayout>
        <EditArticleContent />
      </DoctorLayout>
    </ArticleProvider>
  )
}

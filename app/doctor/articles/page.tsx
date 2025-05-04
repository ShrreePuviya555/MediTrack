"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DoctorLayout } from "@/components/doctor-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Clock, Eye } from "lucide-react"
import { ArticleProvider, useArticles } from "@/contexts/article-context"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

// Create a wrapper component that uses the context
function DoctorArticlesContent() {
  const router = useRouter()
  const { articles, deleteArticle } = useArticles()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [doctorId, setDoctorId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null)

  // Get doctor info from localStorage
  useEffect(() => {
    try {
      const doctorUserStr = localStorage.getItem("doctorUser")
      if (doctorUserStr) {
        const doctorUser = JSON.parse(doctorUserStr)
        setDoctorId(doctorUser.id)
      } else {
        // For demo purposes, use a default doctor ID if not logged in
        setDoctorId("doctor-1")
      }
    } catch (error) {
      console.error("Error getting doctor info:", error)
      // For demo purposes, use a default doctor ID if there's an error
      setDoctorId("doctor-1")
    }
  }, [])

  // Filter articles by the current doctor
  const doctorArticles = articles.filter(
    (article) =>
      article.authorType === "doctor" &&
      (doctorId ? article.authorId === doctorId : true) &&
      (searchTerm === "" ||
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.category && article.category.toLowerCase().includes(searchTerm.toLowerCase()))),
  )

  const handleDeleteClick = (id: string) => {
    setArticleToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (articleToDelete) {
      deleteArticle(articleToDelete)
      toast({
        title: "Article Deleted",
        description: "The article has been successfully deleted.",
      })
      setDeleteDialogOpen(false)
      setArticleToDelete(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Articles</h1>
          <p className="text-gray-500 mt-2">Manage your medical articles</p>
        </div>
        <Button
          onClick={() => router.push("/doctor/articles/create")}
          className="bg-healthcare-green hover:bg-healthcare-green/90"
        >
          <Plus className="mr-2 h-4 w-4" /> New Article
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search your articles..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {doctorArticles.length === 0 ? (
        <Card className="text-center p-8">
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">You haven't published any articles yet.</p>
            <Button
              onClick={() => router.push("/doctor/articles/create")}
              className="bg-healthcare-green hover:bg-healthcare-green/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Create Your First Article
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {doctorArticles.map((article) => (
            <Card key={article.id}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4">
                  <img
                    src={article.imageUrl || "/placeholder.svg?height=200&width=400"}
                    alt={article.title}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                </div>
                <div className="md:w-3/4 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <Badge>{article.category || "Uncategorized"}</Badge>
                    {article.status === "published" && (
                      <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-300">
                        Published
                      </Badge>
                    )}
                    {article.status === "draft" && (
                      <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                        Draft
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-medium text-xl mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{article.content}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center"
                      onClick={() => router.push(`/dashboard/articles/${article.id}`)}
                    >
                      <Eye className="mr-1 h-4 w-4" /> Preview
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center"
                      onClick={() => router.push(`/doctor/articles/edit/${article.id}`)}
                    >
                      <Edit className="mr-1 h-4 w-4" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteClick(article.id)}
                    >
                      <Trash2 className="mr-1 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this article? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Main page component that wraps the content with the provider
export default function DoctorArticlesPage() {
  return (
    <ArticleProvider>
      <DoctorLayout>
        <DoctorArticlesContent />
      </DoctorLayout>
    </ArticleProvider>
  )
}

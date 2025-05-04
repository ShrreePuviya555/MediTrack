"use client"

import { createContext, useState, useEffect, type ReactNode, useContext } from "react"

// Define the Article type
export interface Article {
  id: string
  title: string
  content: string
  description?: string
  authorId: string
  authorName: string
  authorType: "doctor" | "admin"
  createdAt: string
  updatedAt: string
  status: "draft" | "published"
  category: string
  tags: string[]
  imageUrl?: string
  readTime?: string
  date?: string
  featured?: boolean
}

// Define the context type
interface ArticleContextType {
  articles: Article[]
  getArticleById: (id: string) => Article | undefined
  addArticle: (article: Omit<Article, "id" | "createdAt" | "updatedAt">) => void
  updateArticle: (id: string, article: Partial<Article>) => void
  deleteArticle: (id: string) => void
  loading: boolean
}

// Create the context
const ArticleContext = createContext<ArticleContextType | undefined>(undefined)

// Sample data
const sampleArticles: Article[] = [
  {
    id: "1",
    title: "Understanding Diabetes: Symptoms, Causes, and Management",
    description: "Learn about the symptoms, causes, and how to manage diabetes effectively.",
    content:
      "Diabetes is a chronic condition that affects how your body turns food into energy. There are three main types of diabetes: type 1, type 2, and gestational diabetes. Each type has different causes and risk factors, but they all involve issues with insulin, a hormone that regulates blood sugar. Symptoms can include increased thirst, frequent urination, unexplained weight loss, fatigue, and blurred vision. Management typically involves monitoring blood sugar levels, taking medication or insulin as prescribed, maintaining a healthy diet, regular physical activity, and regular check-ups with healthcare providers.",
    authorId: "doctor-1",
    authorName: "Dr. Sarah Johnson",
    authorType: "doctor",
    createdAt: new Date(2023, 5, 15).toISOString(),
    updatedAt: new Date(2023, 5, 15).toISOString(),
    status: "published",
    category: "Chronic Conditions",
    tags: ["diabetes", "health", "chronic disease"],
    imageUrl: "/placeholder.svg?height=200&width=400",
    readTime: "8 min read",
    date: "June 15, 2023",
    featured: true,
  },
  {
    id: "2",
    title: "The Importance of Regular Exercise for Heart Health",
    description:
      "This article explores how exercise benefits your cardiovascular system and provides tips for starting a heart-healthy exercise routine.",
    content:
      "Regular physical activity is one of the best things you can do for your heart. Exercise strengthens your heart muscle, improves circulation, and helps control risk factors like high blood pressure, high cholesterol, and diabetes. Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous activity each week, plus muscle-strengthening activities at least twice a week. Start slowly if you're new to exercise, and gradually increase intensity and duration. Activities like walking, swimming, cycling, and dancing are excellent for heart health. Always consult with your healthcare provider before starting a new exercise program, especially if you have existing heart conditions.",
    authorId: "doctor-1",
    authorName: "Dr. Sarah Johnson",
    authorType: "doctor",
    createdAt: new Date(2023, 6, 22).toISOString(),
    updatedAt: new Date(2023, 6, 22).toISOString(),
    status: "published",
    category: "Cardiovascular Health",
    tags: ["exercise", "heart health", "fitness"],
    imageUrl: "/placeholder.svg?height=200&width=400",
    readTime: "6 min read",
    date: "July 22, 2023",
  },
  {
    id: "3",
    title: "Mental Health During the Pandemic: Coping Strategies",
    description: "This article discusses effective coping strategies and when to seek professional help.",
    content:
      "The COVID-19 pandemic has had a significant impact on mental health worldwide. Increased stress, anxiety, depression, and feelings of isolation have affected many people. Effective coping strategies include maintaining a routine, staying connected with loved ones virtually, limiting news consumption, practicing mindfulness and relaxation techniques, getting regular exercise, and ensuring adequate sleep. It's important to recognize when you need professional help. Signs include persistent sadness or anxiety, difficulty sleeping or concentrating, changes in appetite, loss of interest in activities you once enjoyed, and thoughts of self-harm. Many mental health professionals now offer telehealth services, making it easier to access care while maintaining social distancing.",
    authorId: "admin-1",
    authorName: "Admin User",
    authorType: "admin",
    createdAt: new Date(2023, 7, 5).toISOString(),
    updatedAt: new Date(2023, 7, 5).toISOString(),
    status: "published",
    category: "Mental Health",
    tags: ["mental health", "pandemic", "coping strategies"],
    imageUrl: "/placeholder.svg?height=200&width=400",
    readTime: "7 min read",
    date: "August 5, 2023",
  },
  {
    id: "4",
    title: "Nutrition Basics: Building a Balanced Diet",
    description:
      "Learn about the different food groups, portion sizes, and how to create nutritious meals for you and your family.",
    content:
      "A balanced diet is essential for good health. It should include a variety of foods from all food groups: fruits, vegetables, grains, protein foods, and dairy. Fruits and vegetables provide vitamins, minerals, and fiber. Aim for at least 5 servings per day, with a variety of colors. Whole grains like brown rice, whole wheat bread, and oats provide fiber and nutrients. Choose lean proteins such as poultry, fish, beans, nuts, and seeds. Dairy products provide calcium and vitamin D for bone health. Limit added sugars, sodium, and saturated fats. Portion control is also important; use smaller plates, read nutrition labels, and be mindful of serving sizes. Stay hydrated by drinking water throughout the day, and limit sugary beverages.",
    authorId: "doctor-1",
    authorName: "Dr. Sarah Johnson",
    authorType: "doctor",
    createdAt: new Date(2023, 8, 10).toISOString(),
    updatedAt: new Date(2023, 8, 10).toISOString(),
    status: "draft",
    category: "Nutrition",
    tags: ["nutrition", "diet", "healthy eating"],
    imageUrl: "/placeholder.svg?height=200&width=400",
    readTime: "5 min read",
    date: "September 10, 2023",
  },
  {
    id: "5",
    title: "Understanding Vaccines: How They Work and Why They're Important",
    description: "Learn about the science behind vaccines and their crucial role in public health.",
    content:
      "Vaccines are one of the most effective tools for preventing infectious diseases. They work by training your immune system to recognize and fight specific pathogens without causing the disease itself. When you get vaccinated, your body produces antibodies against the pathogen, creating immunological memory. If you're later exposed to the actual disease-causing organism, your immune system can quickly recognize and neutralize it before you become ill. Vaccines have successfully reduced or eliminated many serious diseases that once caused widespread death and disability, including smallpox, polio, and diphtheria. High vaccination rates in a community also create 'herd immunity,' which helps protect those who cannot be vaccinated due to age or medical conditions. Despite myths and misinformation, vaccines undergo rigorous testing for safety and effectiveness before approval, and serious side effects are extremely rare.",
    authorId: "doctor-1",
    authorName: "Dr. Sarah Johnson",
    authorType: "doctor",
    createdAt: new Date(2023, 9, 5).toISOString(),
    updatedAt: new Date(2023, 9, 5).toISOString(),
    status: "published",
    category: "Immunology",
    tags: ["vaccines", "immunization", "public health"],
    imageUrl: "/placeholder.svg?height=200&width=400",
    readTime: "9 min read",
    date: "October 5, 2023",
    featured: true,
  },
]

// Create the provider component
export function ArticleProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>(sampleArticles)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const getArticleById = (id: string) => {
    return articles.find((article) => article.id === id)
  }

  const addArticle = (article: Omit<Article, "id" | "createdAt" | "updatedAt">) => {
    const newArticle: Article = {
      ...article,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setArticles((prevArticles) => [...prevArticles, newArticle])
  }

  const updateArticle = (id: string, article: Partial<Article>) => {
    setArticles((prevArticles) =>
      prevArticles.map((existingArticle) =>
        existingArticle.id === id
          ? { ...existingArticle, ...article, updatedAt: new Date().toISOString() }
          : existingArticle,
      ),
    )
  }

  const deleteArticle = (id: string) => {
    setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id))
  }

  const value: ArticleContextType = {
    articles,
    getArticleById,
    addArticle,
    updateArticle,
    deleteArticle,
    loading,
  }

  return <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
}

// Custom hook to use the context
export function useArticles(): ArticleContextType {
  const context = useContext(ArticleContext)
  if (!context) {
    throw new Error("useArticles must be used within a ArticleProvider")
  }
  return context
}

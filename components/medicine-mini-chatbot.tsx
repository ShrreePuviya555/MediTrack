"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Minimize2, Maximize2 } from "lucide-react"
import { medicines } from "@/data/medicines"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function MedicineMiniChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I can help you find information about medicines. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [messages, isOpen, isMinimized])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Process query and generate response
    setTimeout(() => {
      const response = generateResponse(input)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 500)
  }

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    // Check if query contains medicine names
    const matchedMedicines = medicines.filter(
      (med) =>
        med.name.toLowerCase().includes(lowerQuery) ||
        (med.description && med.description.toLowerCase().includes(lowerQuery)),
    )

    if (matchedMedicines.length > 0) {
      const med = matchedMedicines[0]
      return `${med.name}: ${med.description || "No description available"}. Price: $${med.price?.toFixed(2) || "N/A"}. ${med.inStock ? "Currently in stock." : "Currently out of stock."}`
    }

    // Handle general medicine questions
    if (lowerQuery.includes("side effect") || lowerQuery.includes("reaction")) {
      return "For information about side effects, please consult your doctor or pharmacist. I can provide general information about medicines we have in our database."
    }

    if (lowerQuery.includes("dosage") || lowerQuery.includes("dose") || lowerQuery.includes("how much")) {
      return "Dosage information should be provided by your healthcare provider. Please follow the prescription or consult your doctor."
    }

    if (lowerQuery.includes("interact") || lowerQuery.includes("with other")) {
      return "Drug interactions can be complex. Please consult your pharmacist or doctor about potential interactions between medications."
    }

    // Default response
    return "I couldn't find specific information about that. Try asking about a specific medicine in our inventory, or ask general questions about medicine categories."
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className={`w-80 shadow-lg transition-all duration-300 ${isMinimized ? "h-14" : "h-96"}`}>
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center">
              <MessageCircle className="h-4 w-4 mr-2" />
              Medicine Assistant
            </CardTitle>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleMinimize}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleChat}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-3 overflow-y-auto h-[calc(100%-7rem)]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="p-3 border-t">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    ref={inputRef}
                    placeholder="Type your question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button size="icon" onClick={handleSend}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      ) : (
        <Button onClick={toggleChat} className="rounded-full h-12 w-12 flex items-center justify-center shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}

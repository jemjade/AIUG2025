"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/lib/auth"
import { getConversation, getMessages, sendMessage, markAsRead, type Message, type Conversation } from "@/lib/messages"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, MoreVertical } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"
import { useParams } from "next/navigation"

export default function ConversationPage() {
  const { user } = useAuth()
  const params = useParams()
  const conversationId = params.conversationId as string

  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadConversation = () => {
      const conv = getConversation(conversationId)
      const msgs = getMessages(conversationId)

      setConversation(conv || null)
      setMessages(msgs)
      setIsLoading(false)

      // Mark messages as read
      if (conv && user) {
        markAsRead(conversationId, user.id)
      }
    }

    loadConversation()
  }, [conversationId, user])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user || !conversation) return

    const otherParticipant = conversation.participants.find((p) => p !== user.id)
    if (!otherParticipant) return

    const message = sendMessage(conversationId, user.id, otherParticipant, newMessage.trim())
    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-16 bg-muted rounded-lg mb-4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!conversation || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">대화를 찾을 수 없습니다.</p>
          <Link href="/messages" className="text-primary hover:underline">
            메시지 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const otherParticipantIndex = conversation.participants.findIndex((p) => p !== user.id)
  const otherParticipantName = conversation.participantNames[otherParticipantIndex]
  const otherParticipantAvatar = conversation.participantAvatars[otherParticipantIndex]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-4">
          <CardHeader className="p-4">
            <div className="flex items-center gap-4">
              <Link href="/messages">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>

              <Avatar className="h-10 w-10">
                <AvatarImage src={otherParticipantAvatar || "/placeholder.svg"} alt={otherParticipantName} />
                <AvatarFallback>{otherParticipantName[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h2 className="font-semibold">{otherParticipantName}</h2>
                <p className="text-sm text-muted-foreground">온라인</p>
              </div>

              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Messages */}
        <Card className="mb-4">
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <p>아직 메시지가 없습니다.</p>
                  <p>첫 메시지를 보내보세요!</p>
                </div>
              ) : (
                messages.map((message) => {
                  const isOwnMessage = message.senderId === user.id

                  return (
                    <div key={message.id} className={`flex gap-3 ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
                        <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                      </Avatar>

                      <div className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"} max-w-xs`}>
                        <div
                          className={`rounded-lg px-3 py-2 ${
                            isOwnMessage ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(message.timestamp), {
                            addSuffix: true,
                            locale: ko,
                          })}
                        </span>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>

        {/* Message Input */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="메시지를 입력하세요..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import { getConversations, type Conversation } from "@/lib/messages"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MessageCircle } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

export default function MessagesPage() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const loadConversations = () => {
      const allConversations = getConversations()
      setConversations(allConversations)
    }

    loadConversations()
  }, [])

  const filteredConversations = conversations.filter((conversation) =>
    conversation.participantNames.some((name) => name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">로그인이 필요합니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <MessageCircle className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">메시지</h1>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="대화 상대 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Conversations List */}
        <div className="space-y-4">
          {filteredConversations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">메시지가 없습니다</h3>
                <p className="text-muted-foreground mb-4">멘토와 대화를 시작해보세요!</p>
                <Link
                  href="/mentors"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  멘토 찾기
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredConversations.map((conversation) => {
              const otherParticipantIndex = conversation.participants.findIndex((p) => p !== user.id)
              const otherParticipantName = conversation.participantNames[otherParticipantIndex]
              const otherParticipantAvatar = conversation.participantAvatars[otherParticipantIndex]

              return (
                <Link key={conversation.id} href={`/messages/${conversation.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={otherParticipantAvatar || "/placeholder.svg"} alt={otherParticipantName} />
                          <AvatarFallback>{otherParticipantName[0]}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold truncate">{otherParticipantName}</h3>
                            <div className="flex items-center gap-2">
                              {conversation.unreadCount > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(conversation.updatedAt), {
                                  addSuffix: true,
                                  locale: ko,
                                })}
                              </span>
                            </div>
                          </div>
                          {conversation.lastMessage && (
                            <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage.content}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

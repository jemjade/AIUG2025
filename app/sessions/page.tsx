"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Users,
  Calendar,
  Clock,
  Star,
  MessageCircle,
  Video,
  ArrowLeft,
  CheckCircle,
  XCircle,
  PlayCircle,
} from "lucide-react"
import Link from "next/link"
import { getSessionsByMenteeId } from "@/lib/sessions"
import { getMentorById } from "@/lib/mentors"

export default function SessionsPage() {
  const { user } = useAuth()
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [feedback, setFeedback] = useState({ rating: 5, comment: "" })

  if (!user) {
    return null
  }

  // Mock user ID for demo purposes
  const menteeId = "user1"
  const sessions = getSessionsByMenteeId(menteeId)

  const scheduledSessions = sessions.filter((s) => s.status === "scheduled")
  const inProgressSessions = sessions.filter((s) => s.status === "in-progress")
  const completedSessions = sessions.filter((s) => s.status === "completed")

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Calendar className="w-4 h-4 text-blue-500" />
      case "in-progress":
        return <PlayCircle className="w-4 h-4 text-green-500" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-gray-500" />
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "scheduled":
        return "예정"
      case "in-progress":
        return "진행중"
      case "completed":
        return "완료"
      case "cancelled":
        return "취소"
      default:
        return status
    }
  }

  const SessionCard = ({ session }: { session: any }) => {
    const mentor = getMentorById(session.mentorId)

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={mentor?.image || "/placeholder.svg"} alt={mentor?.name} />
              <AvatarFallback>{mentor?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-lg font-serif">{session.topic}</CardTitle>
                <Badge variant={session.status === "completed" ? "secondary" : "default"} className="gap-1">
                  {getStatusIcon(session.status)}
                  {getStatusText(session.status)}
                </Badge>
              </div>
              <CardDescription>
                {mentor?.name} • {mentor?.company}
              </CardDescription>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(session.scheduledDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{session.duration}분</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {session.notes && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">세션 노트</h4>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{session.notes}</p>
            </div>
          )}
          {session.feedback && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">내 피드백</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < session.feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{session.feedback.rating}/5</span>
              </div>
              <p className="text-sm text-muted-foreground">{session.feedback.comment}</p>
            </div>
          )}
          <div className="flex gap-2">
            {session.status === "scheduled" && (
              <>
                <Button size="sm" className="flex-1">
                  <Video className="w-4 h-4 mr-2" />
                  세션 참여
                </Button>
                <Button variant="outline" size="sm">
                  일정 변경
                </Button>
              </>
            )}
            {session.status === "in-progress" && (
              <Button size="sm" className="flex-1">
                <Video className="w-4 h-4 mr-2" />
                세션 계속하기
              </Button>
            )}
            {session.status === "completed" && !session.feedback && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex-1">
                    <Star className="w-4 h-4 mr-2" />
                    피드백 작성
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>세션 피드백</DialogTitle>
                    <DialogDescription>멘토링 세션은 어떠셨나요? 솔직한 후기를 남겨주세요.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>평점</Label>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-6 h-6 cursor-pointer ${
                              i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                            onClick={() => setFeedback({ ...feedback, rating: i + 1 })}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="comment">후기</Label>
                      <Textarea
                        id="comment"
                        placeholder="멘토링 세션에 대한 후기를 작성해주세요"
                        value={feedback.comment}
                        onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <Button className="w-full">피드백 제출</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              메시지
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  대시보드
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-serif font-black text-primary">MentorConnect</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-black text-foreground mb-2">내 세션</h1>
          <p className="text-muted-foreground">멘토링 세션을 관리하고 진행 상황을 확인하세요</p>
        </div>

        {/* Session Tabs */}
        <Tabs defaultValue="scheduled" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="scheduled" className="gap-2">
              <Calendar className="w-4 h-4" />
              예정된 세션 ({scheduledSessions.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="gap-2">
              <PlayCircle className="w-4 h-4" />
              진행중 ({inProgressSessions.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              완료된 세션 ({completedSessions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scheduled" className="space-y-4">
            {scheduledSessions.length > 0 ? (
              <div className="grid gap-4">
                {scheduledSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <CardTitle className="mb-2">예정된 세션이 없습니다</CardTitle>
                  <CardDescription className="mb-4">새로운 멘토를 찾아 세션을 예약해보세요</CardDescription>
                  <Button asChild>
                    <Link href="/mentors">멘토 찾기</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            {inProgressSessions.length > 0 ? (
              <div className="grid gap-4">
                {inProgressSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <PlayCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <CardTitle className="mb-2">진행중인 세션이 없습니다</CardTitle>
                  <CardDescription>현재 진행중인 멘토링 세션이 없습니다</CardDescription>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedSessions.length > 0 ? (
              <div className="grid gap-4">
                {completedSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <CardTitle className="mb-2">완료된 세션이 없습니다</CardTitle>
                  <CardDescription>아직 완료된 멘토링 세션이 없습니다</CardDescription>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

"use client"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import {
  Users,
  Calendar,
  BookOpen,
  Star,
  Clock,
  TrendingUp,
  MessageCircle,
  Heart,
  Target,
  Award,
  ArrowRight,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import {
  getSessionsByMenteeId,
  getLearningGoalsByMenteeId,
  getFavoriteMentorsByMenteeId,
  getUpcomingSessions,
} from "@/lib/sessions"
import { getMentorById } from "@/lib/mentors"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="w-5 h-5 text-primary-foreground animate-pulse" />
          </div>
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Mock user ID for demo purposes
  const menteeId = "user1"
  const sessions = getSessionsByMenteeId(menteeId)
  const learningGoals = getLearningGoalsByMenteeId(menteeId)
  const favoriteMentors = getFavoriteMentorsByMenteeId(menteeId)
  const upcomingSessions = getUpcomingSessions(menteeId)

  const completedSessions = sessions.filter((s) => s.status === "completed").length
  const totalHours = sessions.reduce((acc, session) => acc + session.duration, 0) / 60
  const averageRating =
    sessions.filter((s) => s.feedback).reduce((acc, session) => acc + (session.feedback?.rating || 0), 0) /
      sessions.filter((s) => s.feedback).length || 0

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/hanwha-symbol.png" alt="Hanwha" width={32} height={32} className="h-8 w-8" />
                <div className="w-px h-6 bg-border"></div>
                <h1 className="text-xl font-serif font-bold text-primary">H-Link</h1>
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-accent font-medium">
                대시보드
              </Link>
              <Link href="/onboarding" className="text-foreground hover:text-accent transition-colors">
                온보딩
              </Link>
              <Link href="/mentors" className="text-foreground hover:text-accent transition-colors">
                멘토 찾기
              </Link>
              <Link href="/sessions" className="text-foreground hover:text-accent transition-colors">
                내 세션
              </Link>
            </nav>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-black text-foreground mb-2">안녕하세요, {user.name}님!</h1>
          <p className="text-muted-foreground">오늘도 성장을 위한 여정을 함께해요</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{completedSessions}</div>
                  <div className="text-xs text-muted-foreground">완료된 세션</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{totalHours.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">총 학습 시간</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{averageRating.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">평균 만족도</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{favoriteMentors.length}</div>
                  <div className="text-xs text-muted-foreground">즐겨찾기 멘토</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-serif flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    다가오는 세션
                  </CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/sessions">전체 보기</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingSessions.slice(0, 3).map((session) => {
                      const mentor = getMentorById(session.mentorId)
                      return (
                        <div key={session.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={mentor?.image || "/placeholder.svg"} alt={mentor?.name} />
                            <AvatarFallback>{mentor?.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">{session.topic}</div>
                            <div className="text-sm text-muted-foreground">
                              {mentor?.name} • {formatDate(session.scheduledDate)} • {session.duration}분
                            </div>
                          </div>
                          <Badge variant="secondary">{session.status === "scheduled" ? "예정" : "진행중"}</Badge>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>예정된 세션이 없습니다</p>
                    <Button className="mt-4" asChild>
                      <Link href="/mentors">멘토 찾기</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-serif flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    학습 목표
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    목표 추가
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningGoals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{goal.title}</h4>
                        <Badge variant={goal.status === "active" ? "default" : "secondary"}>
                          {goal.status === "active" ? "진행중" : goal.status === "completed" ? "완료" : "일시정지"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>진행률</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        목표일: {new Date(goal.targetDate).toLocaleDateString("ko-KR")}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg">빠른 실행</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/onboarding">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    온보딩 진행
                  </Link>
                </Button>
                <Button className="w-full justify-start" asChild>
                  <Link href="/mentors">
                    <Users className="w-4 h-4 mr-2" />
                    멘토 찾기
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/sessions">
                    <Calendar className="w-4 h-4 mr-2" />
                    세션 관리
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/messages">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    메시지
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Favorite Mentors */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-serif text-lg flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    즐겨찾기 멘토
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {favoriteMentors.length > 0 ? (
                  <div className="space-y-3">
                    {favoriteMentors.map((favorite) => {
                      const mentor = getMentorById(favorite.mentorId)
                      return (
                        <div key={favorite.id} className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={mentor?.image || "/placeholder.svg"} alt={mentor?.name} />
                            <AvatarFallback>{mentor?.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{mentor?.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{mentor?.role}</div>
                          </div>
                          <Button size="sm" variant="ghost" asChild>
                            <Link href={`/mentors/${mentor?.id}`}>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <Heart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">즐겨찾기한 멘토가 없습니다</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Achievement */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  최근 성과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-medium mb-1">첫 번째 멘토링 완료!</h4>
                  <p className="text-sm text-muted-foreground">마케팅 전략 세션을 성공적으로 마쳤습니다</p>
                  <Badge variant="secondary" className="mt-2">
                    +10 경험치
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

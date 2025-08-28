"use client"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  CheckCircle2,
  Clock,
  Calendar,
  BookOpen,
  Users,
  Settings,
  FileText,
  Video,
  LinkIcon,
  Award,
  TrendingUp,
  Building2,
  GraduationCap,
  Target,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  getOnboardingTasksByUserId,
  getOnboardingProgress,
  getCompanyCulture,
  updateTaskStatus,
  type OnboardingTask,
} from "@/lib/onboarding"

export default function OnboardingPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [tasks, setTasks] = useState<OnboardingTask[]>([])
  const [progress, setProgress] = useState<any>(null)
  const [culture, setCulture] = useState<any[]>([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      const userTasks = getOnboardingTasksByUserId(user.id)
      const userProgress = getOnboardingProgress(user.id)
      const companyCulture = getCompanyCulture()

      setTasks(userTasks)
      setProgress(userProgress)
      setCulture(companyCulture)
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-5 h-5 text-primary-foreground animate-pulse" />
          </div>
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleTaskComplete = (taskId: string) => {
    updateTaskStatus(taskId, "completed")
    const updatedTasks = getOnboardingTasksByUserId(user.id)
    const updatedProgress = getOnboardingProgress(user.id)
    setTasks(updatedTasks)
    setProgress(updatedProgress)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "documentation":
        return FileText
      case "training":
        return BookOpen
      case "setup":
        return Settings
      case "culture":
        return Building2
      case "meeting":
        return Users
      default:
        return FileText
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "document":
        return FileText
      case "link":
        return LinkIcon
      case "quiz":
        return Target
      default:
        return FileText
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/hanwha-symbol.png" alt="Hanwha" width={32} height={32} className="h-8 w-8" />
              <div className="w-px h-6 bg-border"></div>
              <h1 className="text-xl font-serif font-bold text-primary">H-Link</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-foreground hover:text-accent transition-colors">
                대시보드
              </Link>
              <Link href="/onboarding" className="text-accent font-medium">
                온보딩
              </Link>
              <Link href="/mentors" className="text-foreground hover:text-accent transition-colors">
                멘토 찾기
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Hanwha에 오신 것을 환영합니다, {user.name}님!
          </h1>
          <p className="text-muted-foreground">체계적인 온보딩 프로그램으로 Hanwha의 일원이 되어보세요</p>
        </div>

        {/* Progress Overview */}
        {progress && (
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{progress.overallProgress}%</div>
                    <div className="text-xs text-muted-foreground">전체 진행률</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{progress.completedTasks}</div>
                    <div className="text-xs text-muted-foreground">완료된 작업</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {progress.totalTasks - progress.completedTasks}
                    </div>
                    <div className="text-xs text-muted-foreground">남은 작업</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{progress.currentWeek}주차</div>
                    <div className="text-xs text-muted-foreground">현재 진행</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tasks">온보딩 작업</TabsTrigger>
            <TabsTrigger value="culture">회사 문화</TabsTrigger>
            <TabsTrigger value="progress">진행 현황</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  온보딩 체크리스트
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => {
                    const IconComponent = getCategoryIcon(task.category)
                    return (
                      <div
                        key={task.id}
                        className={`p-4 border rounded-lg transition-all ${
                          task.status === "completed"
                            ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                            : task.status === "in-progress"
                              ? "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
                              : "bg-card border-border"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex items-center gap-3 flex-1">
                            <Checkbox
                              checked={task.status === "completed"}
                              onCheckedChange={() => {
                                if (task.status !== "completed") {
                                  handleTaskComplete(task.id)
                                }
                              }}
                              className="mt-1"
                            />
                            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-accent" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4
                                  className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                                >
                                  {task.title}
                                </h4>
                                <Badge
                                  variant={
                                    task.status === "completed"
                                      ? "default"
                                      : task.status === "in-progress"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {task.status === "completed"
                                    ? "완료"
                                    : task.status === "in-progress"
                                      ? "진행중"
                                      : "대기"}
                                </Badge>
                                <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                                  {task.priority === "high" ? "높음" : task.priority === "medium" ? "보통" : "낮음"}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {task.estimatedTime}분
                                </span>
                                {task.dueDate && (
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(task.dueDate).toLocaleDateString("ko-KR")}
                                  </span>
                                )}
                                {task.completedDate && (
                                  <span className="flex items-center gap-1 text-green-600">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {new Date(task.completedDate).toLocaleDateString("ko-KR")} 완료
                                  </span>
                                )}
                              </div>
                              {task.resources && task.resources.length > 0 && (
                                <div className="mt-3 space-y-2">
                                  <div className="text-xs font-medium text-muted-foreground">관련 자료:</div>
                                  <div className="flex flex-wrap gap-2">
                                    {task.resources.map((resource, index) => {
                                      const ResourceIcon = getResourceIcon(resource.type)
                                      return (
                                        <Button
                                          key={index}
                                          variant="outline"
                                          size="sm"
                                          className="h-8 text-xs bg-transparent"
                                          asChild
                                        >
                                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                            <ResourceIcon className="w-3 h-3 mr-1" />
                                            {resource.title}
                                          </a>
                                        </Button>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="culture" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {culture.map((item) => (
                <Card key={item.id} className={item.completed ? "bg-green-50 dark:bg-green-950" : ""}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-serif text-lg flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        {item.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {item.isRequired && (
                          <Badge variant="destructive" className="text-xs">
                            필수
                          </Badge>
                        )}
                        {item.completed && (
                          <Badge variant="default" className="text-xs">
                            완료
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        읽기 시간: {item.readTime}분
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {item.category === "values"
                          ? "핵심가치"
                          : item.category === "policies"
                            ? "정책"
                            : item.category === "benefits"
                              ? "복리후생"
                              : "역사"}
                      </Badge>
                    </div>
                    <p className="text-sm leading-relaxed mb-4">{item.content}</p>
                    <Button variant={item.completed ? "outline" : "default"} size="sm" className="w-full">
                      {item.completed ? "다시 읽기" : "읽기 시작"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    전체 진행률
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {progress && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>온보딩 완료율</span>
                          <span>{progress.overallProgress}%</span>
                        </div>
                        <Progress value={progress.overallProgress} className="h-3" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">{progress.completedTasks}</div>
                          <div className="text-xs text-muted-foreground">완료</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-muted-foreground">
                            {progress.totalTasks - progress.completedTasks}
                          </div>
                          <div className="text-xs text-muted-foreground">남은 작업</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    주간 진행 현황
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {progress && (
                    <div className="space-y-4">
                      {progress.weeklyProgress.map((week: any) => (
                        <div key={week.week} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{week.week}주차</span>
                            <span>
                              {week.tasksCompleted}/{week.totalTasks}
                            </span>
                          </div>
                          <Progress value={(week.tasksCompleted / week.totalTasks) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  다음 단계
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h4 className="font-medium mb-2">이번 주 목표</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      직속 상사와의 1:1 미팅을 완료하고 팀 소개 시간을 가져보세요
                    </p>
                    <Button size="sm" asChild>
                      <Link href="#tasks">작업 확인하기</Link>
                    </Button>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2">추천 멘토</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      온보딩 과정에서 도움을 받을 수 있는 멘토를 찾아보세요
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/mentors">멘토 찾기</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

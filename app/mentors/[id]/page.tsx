"use client"

import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Clock, MessageCircle, Calendar, Users, Award, Globe, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getMentorById } from "@/lib/mentors"
import { useAuth } from "@/lib/auth"
import { createConversation } from "@/lib/messages"
import { useRouter } from "next/navigation"

interface MentorProfilePageProps {
  params: {
    id: string
  }
}

export default function MentorProfilePage({ params }: MentorProfilePageProps) {
  const { user } = useAuth()
  const router = useRouter()

  const mentor = getMentorById(params.id)

  if (!mentor) {
    notFound()
  }

  const handleSendMessage = () => {
    if (!user) {
      router.push("/login")
      return
    }

    const conversation = createConversation(mentor.id, user.id, mentor.name, user.name)

    router.push(`/messages/${conversation.id}`)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/mentors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  멘토 목록
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
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/login">로그인</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/signup">회원가입</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
                    <AvatarFallback className="text-2xl">{mentor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-serif mb-2">{mentor.name}</CardTitle>
                    <CardDescription className="text-lg mb-3">
                      {mentor.role} • {mentor.company}
                    </CardDescription>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{mentor.rating}</span>
                        <span>({mentor.totalReviews}개 리뷰)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{mentor.sessions}회 멘토링</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>경력 {mentor.experience}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{mentor.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>응답시간 {mentor.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        <span>{mentor.languages.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">소개</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{mentor.bio}</p>
              </CardContent>
            </Card>

            {/* Expertise */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">전문 분야</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">가능 시간</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mentor.availability.map((time, index) => (
                    <Badge key={index} variant="outline">
                      {time}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">리뷰</CardTitle>
                <CardDescription>멘티들의 후기를 확인해보세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>리뷰 기능은 곧 추가될 예정입니다</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{formatPrice(mentor.hourlyRate)}원</div>
                  <div className="text-sm text-muted-foreground">시간당</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  멘토링 예약하기
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={handleSendMessage}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  메시지 보내기
                </Button>
                <Separator />
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">가입일</span>
                    <span>{formatDate(mentor.joinedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">총 멘토링</span>
                    <span>{mentor.sessions}회</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">평균 평점</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{mentor.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Mentors */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg">비슷한 멘토</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4 text-muted-foreground">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">추천 멘토 기능은 곧 추가될 예정입니다</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, BookOpen, TrendingUp, ArrowRight, Building2, GraduationCap, MessageSquare } from "lucide-react"
import { useAuth } from "@/lib/auth"
import Link from "next/link"
import Image from "next/image"
import { Chatbot } from "@/components/chatbot"

export default function HomePage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src="/hanwha-symbol.png" alt="Hanwha" width={36} height={36} className="h-9 w-9" />
              <div className="w-px h-7 bg-border/30"></div>
              <h1 className="font-black text-primary tracking-tight font-sans text-3xl">H-Link</h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#onboarding" className="text-foreground hover:text-accent transition-colors">
                온보딩
              </a>
              <a href="#mentors" className="text-foreground hover:text-accent transition-colors">
                멘토 찾기
              </a>
              <a href="#learning" className="text-foreground hover:text-accent transition-colors">
                학습 진도
              </a>
              {user && (
                <Link href="/messages" className="text-foreground hover:text-accent transition-colors">
                  메시지
                </Link>
              )}
            </nav>
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard">대시보드</Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={logout}>
                    로그아웃
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/login">로그인</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/signup">시작하기</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30"></div>
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-5xl font-black text-foreground mb-8 leading-tight font-sans border-0 md:text-6xl">
              Hanwha와 함께하는
              <span className="luxury-gradient block mt-2 leading-[3.5rem]">성장의 시작</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              신입사원 온보딩부터 전문 멘토링까지. H-Link에서 Hanwha의 일원으로 성장하는 여정을 시작하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 shadow-none">
              {user ? (
                <>
                  <Button
                    size="lg"
                    className="text-lg px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                    asChild
                  >
                    <Link href="/dashboard">
                      내 대시보드 <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-10 py-4 rounded-xl font-semibold glass-effect hover:bg-primary/5 transition-all bg-transparent"
                    asChild
                  >
                    <Link href="/mentors">멘토 찾기</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="text-lg px-10 py-4 rounded-xl font-semibold hover:shadow-xl transition-all shadow-xl"
                    asChild
                  >
                    <Link href="/signup">
                      온보딩 시작하기 <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-10 py-4 rounded-xl font-semibold glass-effect hover:bg-primary/5 transition-all bg-orange-200"
                    asChild
                  >
                    <Link href="/mentors">멘토 되기</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
                <Input
                  placeholder="부서, 직무, 기술 스택을 검색해보세요 (예: 마케팅, React, 프로젝트 관리)"
                  className="pl-16 py-6 text-lg rounded-2xl border-2 border-border/50 focus:border-primary/50 shadow-sm hover:shadow-md transition-all font-medium"
                />
                <Button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-xl px-6 font-semibold"
                  asChild
                >
                  <Link href="/mentors">검색</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif font-black text-foreground mb-6">H-Link 핵심 기능</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-medium">
              효과적인 온보딩과 지속적인 성장을 위한 통합 플랫폼
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "스마트 온보딩",
                description: "개인 맞춤형 온보딩 프로그램으로 빠른 적응을 도와드립니다",
                icon: GraduationCap,
                color: "text-accent",
              },
              {
                title: "멘토 매칭",
                description: "AI 기반 매칭으로 최적의 멘토를 추천해드립니다",
                icon: Users,
                color: "text-primary",
              },
              {
                title: "학습 진도 추적",
                description: "실시간으로 학습 진도를 확인하고 목표를 관리하세요",
                icon: TrendingUp,
                color: "text-accent",
              },
              {
                title: "회사 문화 가이드",
                description: "Hanwha의 핵심 가치와 문화를 체계적으로 학습하세요",
                icon: Building2,
                color: "text-primary",
              },
              {
                title: "지식 공유",
                description: "동료들과 경험과 노하우를 공유하며 함께 성장하세요",
                icon: BookOpen,
                color: "text-accent",
              },
              {
                title: "실시간 소통",
                description: "멘토와 동료들과 언제든지 소통할 수 있습니다",
                icon: MessageSquare,
                color: "text-primary",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl transition-all duration-300 border-2 border-border/50 hover:border-primary/20 rounded-2xl group"
              >
                <CardHeader className="text-center pb-6">
                  <div
                    className={`w-20 h-20 ${feature.color} bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-10 h-10" />
                  </div>
                  <CardTitle className="text-xl font-serif font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <CardDescription className="text-base leading-relaxed font-medium">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Mentors */}
      <section id="mentors" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold text-foreground mb-4">사내 멘토</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hanwha의 다양한 분야 전문가들이 여러분의 성장을 도와드립니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "김민수",
                role: "시니어 개발자",
                department: "디지털혁신팀",
                experience: "8년",
                rating: 4.9,
                sessions: 47,
                tags: ["React", "클라우드", "DevOps"],
                image: "/korean-male-developer.png",
              },
              {
                name: "박지영",
                role: "마케팅 팀장",
                department: "브랜드전략팀",
                experience: "10년",
                rating: 4.8,
                sessions: 32,
                tags: ["브랜딩", "디지털마케팅", "전략기획"],
                image: "/placeholder-ev20u.png",
              },
              {
                name: "이창호",
                role: "사업개발 이사",
                department: "신사업개발팀",
                experience: "12년",
                rating: 4.9,
                sessions: 56,
                tags: ["사업기획", "투자", "리더십"],
                image: "/korean-ceo.png",
              },
            ].map((mentor, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
                      <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-serif">{mentor.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {mentor.role} • {mentor.department}
                      </CardDescription>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>경력 {mentor.experience}</span>
                        <span>{mentor.sessions}회 멘토링</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href="/mentors">프로필 보기</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/5 via-background to-accent/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto text-center">
            {[
              { number: "500+", label: "사내 멘토" },
              { number: "2,400+", label: "완료된 온보딩" },
              { number: "4.9/5", label: "만족도" },
              { number: "15+", label: "사업부" },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl md:text-5xl font-serif font-black luxury-gradient mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-semibold text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
            Hanwha에서의 성장을 시작하세요
          </h3>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            체계적인 온보딩과 전문 멘토링으로 Hanwha의 핵심 인재로 성장해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/dashboard">내 대시보드</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                  <Link href="/mentors">멘토 찾기</Link>
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/signup">온보딩 시작하기</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                  <Link href="/login">로그인</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 glass-effect py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Image src="/hanwha-symbol.png" alt="Hanwha" width={28} height={28} className="h-7 w-7" />
                <div className="w-px h-6 bg-border/30"></div>
                <h4 className="text-xl font-sans font-black text-primary">H-Link</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Hanwha 사내 멘토링 및 온보딩 통합 플랫폼
              </p>
            </div>
            <div>
              <h5 className="font-serif font-bold text-foreground mb-4">서비스</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    온보딩 프로그램
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    멘토 매칭
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    학습 진도 추적
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-serif font-bold text-foreground mb-4">지원</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    도움말
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    문의하기
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-serif font-bold text-foreground mb-4">회사</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Hanwha 소개
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    채용정보
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    사내 블로그
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground">
            <p className="font-medium">&copy; 2025 hanwha H-link all rights reserved</p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}

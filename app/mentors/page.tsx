"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Grid, List } from "lucide-react"
import Link from "next/link"
import { MentorCard } from "@/components/mentor-card"
import { MentorSearch } from "@/components/mentor-search"
import { searchMentors, filterMentors } from "@/lib/mentors"

interface SearchFilters {
  expertise: string[]
  experience: string
  rating: number
  priceRange: [number, number]
  availability: string[]
}

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<SearchFilters>({
    expertise: [],
    experience: "",
    rating: 0,
    priceRange: [0, 200000],
    availability: [],
  })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredMentors = useMemo(() => {
    const searchResults = searchMentors(searchQuery)
    return filterMentors(searchResults, filters)
  }, [searchQuery, filters])

  const popularTags = ["React", "TypeScript", "디지털마케팅", "창업", "UX디자인", "Python", "AWS"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-serif font-black text-primary">MentorConnect</h1>
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/mentors" className="text-primary font-medium">
                멘토 찾기
              </Link>
              <Link href="/#how-it-works" className="text-foreground hover:text-primary transition-colors">
                이용방법
              </Link>
              <Link href="/#about" className="text-foreground hover:text-primary transition-colors">
                소개
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                로그인
              </Button>
              <Button size="sm">회원가입</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-black text-foreground mb-2">멘토 찾기</h1>
          <p className="text-muted-foreground">{filteredMentors.length}명의 전문 멘토가 여러분의 성장을 도와드립니다</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <MentorSearch onSearch={setSearchQuery} onFilter={setFilters} searchQuery={searchQuery} filters={filters} />
        </div>

        {/* Popular Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-serif font-bold text-foreground mb-4">인기 분야</h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => {
                  if (!filters.expertise.includes(tag)) {
                    setFilters({ ...filters, expertise: [...filters.expertise, tag] })
                  }
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-muted-foreground">
            {filteredMentors.length}명의 멘토를 찾았습니다
            {searchQuery && ` "${searchQuery}" 검색 결과`}
          </div>
          <div className="flex items-center gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mentors Grid/List */}
        {filteredMentors.length > 0 ? (
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} variant={viewMode === "list" ? "default" : "default"} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardHeader>
              <CardTitle className="text-xl font-serif">검색 결과가 없습니다</CardTitle>
              <CardDescription>다른 검색어를 시도하거나 필터를 조정해보세요</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setFilters({
                    expertise: [],
                    experience: "",
                    rating: 0,
                    priceRange: [0, 200000],
                    availability: [],
                  })
                }}
              >
                모든 멘토 보기
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

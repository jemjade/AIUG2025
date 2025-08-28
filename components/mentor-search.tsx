"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface SearchFilters {
  expertise: string[]
  experience: string
  rating: number
  priceRange: [number, number]
  availability: string[]
}

interface MentorSearchProps {
  onSearch: (query: string) => void
  onFilter: (filters: SearchFilters) => void
  searchQuery: string
  filters: SearchFilters
}

const expertiseOptions = [
  "React",
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "Spring",
  "AWS",
  "디지털마케팅",
  "브랜딩",
  "UX디자인",
  "UI디자인",
  "창업",
  "투자유치",
  "머신러닝",
  "데이터분석",
]

const availabilityOptions = ["평일 오전", "평일 오후", "평일 저녁", "주말 오전", "주말 오후", "주말"]

export function MentorSearch({ onSearch, onFilter, searchQuery, filters }: MentorSearchProps) {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters)

  const handleExpertiseChange = (expertise: string, checked: boolean) => {
    const newExpertise = checked
      ? [...localFilters.expertise, expertise]
      : localFilters.expertise.filter((e) => e !== expertise)

    const newFilters = { ...localFilters, expertise: newExpertise }
    setLocalFilters(newFilters)
    onFilter(newFilters)
  }

  const handleAvailabilityChange = (availability: string, checked: boolean) => {
    const newAvailability = checked
      ? [...localFilters.availability, availability]
      : localFilters.availability.filter((a) => a !== availability)

    const newFilters = { ...localFilters, availability: newAvailability }
    setLocalFilters(newFilters)
    onFilter(newFilters)
  }

  const handleRatingChange = (rating: number[]) => {
    const newFilters = { ...localFilters, rating: rating[0] }
    setLocalFilters(newFilters)
    onFilter(newFilters)
  }

  const handlePriceRangeChange = (priceRange: number[]) => {
    const newFilters = { ...localFilters, priceRange: [priceRange[0], priceRange[1]] as [number, number] }
    setLocalFilters(newFilters)
    onFilter(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      expertise: [],
      experience: "",
      rating: 0,
      priceRange: [0, 200000],
      availability: [],
    }
    setLocalFilters(clearedFilters)
    onFilter(clearedFilters)
  }

  const activeFiltersCount =
    localFilters.expertise.length +
    localFilters.availability.length +
    (localFilters.rating > 0 ? 1 : 0) +
    (localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 200000 ? 1 : 0)

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          placeholder="멘토 이름, 전문분야, 회사명으로 검색하세요"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-12 py-3 text-base"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                필터
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>검색 필터</SheetTitle>
                <SheetDescription>원하는 조건으로 멘토를 찾아보세요</SheetDescription>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                {/* Expertise Filter */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">전문 분야</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {expertiseOptions.map((expertise) => (
                      <div key={expertise} className="flex items-center space-x-2">
                        <Checkbox
                          id={expertise}
                          checked={localFilters.expertise.includes(expertise)}
                          onCheckedChange={(checked) => handleExpertiseChange(expertise, checked as boolean)}
                        />
                        <Label htmlFor={expertise} className="text-sm">
                          {expertise}
                        </Label>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Rating Filter */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">최소 평점</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Slider
                        value={[localFilters.rating]}
                        onValueChange={handleRatingChange}
                        max={5}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="text-center text-sm text-muted-foreground">
                        {localFilters.rating > 0 ? `${localFilters.rating}점 이상` : "모든 평점"}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Price Range Filter */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">시간당 요금</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Slider
                        value={localFilters.priceRange}
                        onValueChange={handlePriceRangeChange}
                        max={200000}
                        min={0}
                        step={10000}
                        className="w-full"
                      />
                      <div className="text-center text-sm text-muted-foreground">
                        {new Intl.NumberFormat("ko-KR").format(localFilters.priceRange[0])}원 -{" "}
                        {new Intl.NumberFormat("ko-KR").format(localFilters.priceRange[1])}원
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Availability Filter */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">가능 시간</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {availabilityOptions.map((availability) => (
                      <div key={availability} className="flex items-center space-x-2">
                        <Checkbox
                          id={availability}
                          checked={localFilters.availability.includes(availability)}
                          onCheckedChange={(checked) => handleAvailabilityChange(availability, checked as boolean)}
                        />
                        <Label htmlFor={availability} className="text-sm">
                          {availability}
                        </Label>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Clear Filters */}
                <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
                  <X className="w-4 h-4 mr-2" />
                  필터 초기화
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              필터 초기화
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {localFilters.expertise.map((expertise) => (
            <Badge key={expertise} variant="secondary" className="gap-1">
              {expertise}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleExpertiseChange(expertise, false)} />
            </Badge>
          ))}
          {localFilters.availability.map((availability) => (
            <Badge key={availability} variant="secondary" className="gap-1">
              {availability}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleAvailabilityChange(availability, false)} />
            </Badge>
          ))}
          {localFilters.rating > 0 && (
            <Badge variant="secondary" className="gap-1">
              {localFilters.rating}점 이상
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleRatingChange([0])} />
            </Badge>
          )}
          {(localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 200000) && (
            <Badge variant="secondary" className="gap-1">
              {new Intl.NumberFormat("ko-KR").format(localFilters.priceRange[0])}원 -{" "}
              {new Intl.NumberFormat("ko-KR").format(localFilters.priceRange[1])}원
              <X className="w-3 h-3 cursor-pointer" onClick={() => handlePriceRangeChange([0, 200000])} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

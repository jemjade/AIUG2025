import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Clock, MessageCircle } from "lucide-react"
import Link from "next/link"
import type { Mentor } from "@/lib/mentors"

interface MentorCardProps {
  mentor: Mentor
  variant?: "default" | "compact"
}

export function MentorCard({ mentor, variant = "default" }: MentorCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price)
  }

  if (variant === "compact") {
    return (
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
              <AvatarFallback>{mentor.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base font-serif truncate">{mentor.name}</CardTitle>
              <CardDescription className="text-sm truncate">
                {mentor.role} • {mentor.company}
              </CardDescription>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">{mentor.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{mentor.sessions}회</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1 mb-3">
            {mentor.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {mentor.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{mentor.tags.length - 2}
              </Badge>
            )}
          </div>
          <Button size="sm" className="w-full" asChild>
            <Link href={`/mentors/${mentor.id}`}>프로필 보기</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
            <AvatarFallback>{mentor.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg font-serif">{mentor.name}</CardTitle>
            <CardDescription className="text-sm">
              {mentor.role} • {mentor.company}
            </CardDescription>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span>경력 {mentor.experience}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{mentor.rating}</span>
              </div>
              <span>{mentor.sessions}회 멘토링</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">{formatPrice(mentor.hourlyRate)}원</div>
            <div className="text-xs text-muted-foreground">시간당</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{mentor.bio}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {mentor.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{mentor.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>응답시간 {mentor.responseTime}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="flex-1" asChild>
            <Link href={`/mentors/${mentor.id}`}>프로필 보기</Link>
          </Button>
          <Button variant="outline" size="icon">
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

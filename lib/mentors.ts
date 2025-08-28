export interface Mentor {
  id: string
  name: string
  role: string
  company: string
  experience: string
  rating: number
  sessions: number
  tags: string[]
  image: string
  bio: string
  expertise: string[]
  hourlyRate: number
  availability: string[]
  languages: string[]
  location: string
  responseTime: string
  totalReviews: number
  joinedDate: string
}

export const mentors: Mentor[] = [
  {
    id: "1",
    name: "김민수",
    role: "시니어 프론트엔드 개발자",
    company: "네이버",
    experience: "8년",
    rating: 4.9,
    sessions: 127,
    tags: ["React", "TypeScript", "Next.js"],
    image: "/korean-male-developer.png",
    bio: "8년차 시니어 프론트엔드 개발자로, React와 TypeScript를 활용한 대규모 웹 애플리케이션 개발 경험이 풍부합니다. 네이버에서 메인 서비스 개발을 담당하고 있으며, 주니어 개발자들의 성장을 돕는 것을 좋아합니다.",
    expertise: ["React", "TypeScript", "Next.js", "JavaScript", "웹 성능 최적화", "코드 리뷰"],
    hourlyRate: 80000,
    availability: ["평일 저녁", "주말"],
    languages: ["한국어", "영어"],
    location: "서울",
    responseTime: "1시간 이내",
    totalReviews: 89,
    joinedDate: "2022-03-15",
  },
  {
    id: "2",
    name: "박지영",
    role: "마케팅 디렉터",
    company: "카카오",
    experience: "10년",
    rating: 4.8,
    sessions: 89,
    tags: ["디지털마케팅", "브랜딩", "성장전략"],
    image: "/placeholder-ev20u.png",
    bio: "10년간 다양한 스타트업과 대기업에서 마케팅 전략을 수립하고 실행해온 전문가입니다. 특히 디지털 마케팅과 브랜드 구축에 강점을 가지고 있으며, 데이터 기반의 성장 전략 수립을 전문으로 합니다.",
    expertise: ["디지털마케팅", "브랜딩", "성장전략", "콘텐츠 마케팅", "소셜미디어", "데이터 분석"],
    hourlyRate: 90000,
    availability: ["평일 오후", "주말 오전"],
    languages: ["한국어", "영어"],
    location: "서울",
    responseTime: "2시간 이내",
    totalReviews: 67,
    joinedDate: "2021-11-20",
  },
  {
    id: "3",
    name: "이창호",
    role: "스타트업 CEO",
    company: "테크스타트업",
    experience: "12년",
    rating: 4.9,
    sessions: 156,
    tags: ["창업", "투자유치", "팀빌딩"],
    image: "/korean-ceo.png",
    bio: "3번의 창업 경험을 가진 시리얼 앙트러프러너입니다. 총 50억원의 투자를 유치했으며, 현재는 AI 기반 스타트업을 운영하고 있습니다. 창업 초기부터 스케일업까지 전 과정에 대한 실무 경험을 공유합니다.",
    expertise: ["창업", "투자유치", "팀빌딩", "사업계획서", "피칭", "리더십"],
    hourlyRate: 120000,
    availability: ["평일 오전", "평일 저녁"],
    languages: ["한국어", "영어", "중국어"],
    location: "서울",
    responseTime: "30분 이내",
    totalReviews: 124,
    joinedDate: "2020-08-10",
  },
  {
    id: "4",
    name: "정수연",
    role: "UX/UI 디자이너",
    company: "토스",
    experience: "6년",
    rating: 4.7,
    sessions: 73,
    tags: ["UX디자인", "UI디자인", "프로토타이핑"],
    image: "/korean-female-designer.png",
    bio: "토스에서 핀테크 서비스의 UX/UI를 담당하고 있는 6년차 디자이너입니다. 사용자 중심의 디자인 사고와 데이터 기반의 디자인 의사결정을 중요하게 생각합니다.",
    expertise: ["UX디자인", "UI디자인", "프로토타이핑", "사용자 리서치", "디자인 시스템", "Figma"],
    hourlyRate: 70000,
    availability: ["평일 저녁", "주말 오후"],
    languages: ["한국어", "영어"],
    location: "서울",
    responseTime: "1시간 이내",
    totalReviews: 56,
    joinedDate: "2022-01-25",
  },
  {
    id: "5",
    name: "최민호",
    role: "백엔드 개발자",
    company: "쿠팡",
    experience: "7년",
    rating: 4.8,
    sessions: 94,
    tags: ["Java", "Spring", "AWS"],
    image: "/korean-male-backend-developer.png",
    bio: "대규모 이커머스 플랫폼에서 백엔드 시스템을 설계하고 개발하는 7년차 개발자입니다. 마이크로서비스 아키텍처와 클라우드 인프라에 대한 깊은 이해를 바탕으로 멘토링을 제공합니다.",
    expertise: ["Java", "Spring Boot", "AWS", "마이크로서비스", "데이터베이스", "시스템 설계"],
    hourlyRate: 85000,
    availability: ["평일 저녁", "주말"],
    languages: ["한국어", "영어"],
    location: "서울",
    responseTime: "2시간 이내",
    totalReviews: 71,
    joinedDate: "2021-09-12",
  },
  {
    id: "6",
    name: "한소희",
    role: "데이터 사이언티스트",
    company: "네이버",
    experience: "5년",
    rating: 4.9,
    sessions: 68,
    tags: ["Python", "머신러닝", "데이터분석"],
    image: "/korean-female-data-scientist.png",
    bio: "네이버에서 추천 시스템과 검색 알고리즘을 개발하는 데이터 사이언티스트입니다. 머신러닝과 딥러닝을 활용한 실무 프로젝트 경험을 바탕으로 실용적인 멘토링을 제공합니다.",
    expertise: ["Python", "머신러닝", "딥러닝", "데이터분석", "TensorFlow", "PyTorch"],
    hourlyRate: 95000,
    availability: ["평일 오후", "주말 오전"],
    languages: ["한국어", "영어"],
    location: "서울",
    responseTime: "1시간 이내",
    totalReviews: 52,
    joinedDate: "2022-06-08",
  },
]

export function getMentorById(id: string): Mentor | undefined {
  return mentors.find((mentor) => mentor.id === id)
}

export function searchMentors(query: string): Mentor[] {
  if (!query) return mentors

  const lowercaseQuery = query.toLowerCase()
  return mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(lowercaseQuery) ||
      mentor.role.toLowerCase().includes(lowercaseQuery) ||
      mentor.company.toLowerCase().includes(lowercaseQuery) ||
      mentor.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      mentor.expertise.some((skill) => skill.toLowerCase().includes(lowercaseQuery)),
  )
}

export function filterMentors(
  mentors: Mentor[],
  filters: {
    expertise?: string[]
    experience?: string
    rating?: number
    priceRange?: [number, number]
    availability?: string[]
  },
): Mentor[] {
  return mentors.filter((mentor) => {
    if (filters.expertise && filters.expertise.length > 0) {
      const hasExpertise = filters.expertise.some((skill) =>
        mentor.expertise.some((mentorSkill) => mentorSkill.toLowerCase().includes(skill.toLowerCase())),
      )
      if (!hasExpertise) return false
    }

    if (filters.rating && mentor.rating < filters.rating) {
      return false
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      if (mentor.hourlyRate < min || mentor.hourlyRate > max) {
        return false
      }
    }

    if (filters.availability && filters.availability.length > 0) {
      const hasAvailability = filters.availability.some((time) =>
        mentor.availability.some((mentorTime) => mentorTime.includes(time)),
      )
      if (!hasAvailability) return false
    }

    return true
  })
}

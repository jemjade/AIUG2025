export interface MentoringSession {
  id: string
  mentorId: string
  menteeId: string
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  scheduledDate: string
  duration: number // in minutes
  topic: string
  notes?: string
  feedback?: {
    rating: number
    comment: string
    date: string
  }
  createdAt: string
  updatedAt: string
}

export interface LearningGoal {
  id: string
  menteeId: string
  title: string
  description: string
  targetDate: string
  progress: number // 0-100
  status: "active" | "completed" | "paused"
  createdAt: string
  updatedAt: string
}

export interface FavoriteMentor {
  id: string
  menteeId: string
  mentorId: string
  addedAt: string
}

// Mock data for demonstration
export const mockSessions: MentoringSession[] = [
  {
    id: "1",
    mentorId: "1",
    menteeId: "user1",
    status: "scheduled",
    scheduledDate: "2024-12-25T14:00:00Z",
    duration: 60,
    topic: "React 컴포넌트 설계 패턴",
    createdAt: "2024-12-20T10:00:00Z",
    updatedAt: "2024-12-20T10:00:00Z",
  },
  {
    id: "2",
    mentorId: "2",
    menteeId: "user1",
    status: "completed",
    scheduledDate: "2024-12-18T16:00:00Z",
    duration: 90,
    topic: "마케팅 전략 수립",
    notes: "브랜드 포지셔닝과 타겟 고객 분석에 대해 논의했습니다.",
    feedback: {
      rating: 5,
      comment: "매우 유익한 시간이었습니다. 구체적인 예시와 함께 설명해주셔서 이해하기 쉬웠어요.",
      date: "2024-12-18T17:30:00Z",
    },
    createdAt: "2024-12-15T09:00:00Z",
    updatedAt: "2024-12-18T17:30:00Z",
  },
  {
    id: "3",
    mentorId: "3",
    menteeId: "user1",
    status: "in-progress",
    scheduledDate: "2024-12-22T10:00:00Z",
    duration: 120,
    topic: "스타트업 사업계획서 검토",
    createdAt: "2024-12-19T14:00:00Z",
    updatedAt: "2024-12-22T10:00:00Z",
  },
]

export const mockLearningGoals: LearningGoal[] = [
  {
    id: "1",
    menteeId: "user1",
    title: "React 마스터하기",
    description: "React의 고급 패턴과 성능 최적화 기법을 익혀 실무에 적용할 수 있는 수준까지 도달하기",
    targetDate: "2025-03-01",
    progress: 65,
    status: "active",
    createdAt: "2024-11-01T00:00:00Z",
    updatedAt: "2024-12-20T00:00:00Z",
  },
  {
    id: "2",
    menteeId: "user1",
    title: "개인 브랜딩 구축",
    description: "SNS와 블로그를 통한 개인 브랜딩 전략 수립 및 실행",
    targetDate: "2025-02-15",
    progress: 40,
    status: "active",
    createdAt: "2024-11-15T00:00:00Z",
    updatedAt: "2024-12-18T00:00:00Z",
  },
  {
    id: "3",
    menteeId: "user1",
    title: "창업 아이디어 구체화",
    description: "AI 기반 서비스 아이디어를 구체화하고 MVP 개발 계획 수립",
    targetDate: "2025-04-01",
    progress: 25,
    status: "active",
    createdAt: "2024-12-01T00:00:00Z",
    updatedAt: "2024-12-19T00:00:00Z",
  },
]

export const mockFavoriteMentors: FavoriteMentor[] = [
  {
    id: "1",
    menteeId: "user1",
    mentorId: "1",
    addedAt: "2024-12-10T00:00:00Z",
  },
  {
    id: "2",
    menteeId: "user1",
    mentorId: "4",
    addedAt: "2024-12-15T00:00:00Z",
  },
]

export function getSessionsByMenteeId(menteeId: string): MentoringSession[] {
  return mockSessions.filter((session) => session.menteeId === menteeId)
}

export function getLearningGoalsByMenteeId(menteeId: string): LearningGoal[] {
  return mockLearningGoals.filter((goal) => goal.menteeId === menteeId)
}

export function getFavoriteMentorsByMenteeId(menteeId: string): FavoriteMentor[] {
  return mockFavoriteMentors.filter((favorite) => favorite.menteeId === menteeId)
}

export function getUpcomingSessions(menteeId: string): MentoringSession[] {
  return mockSessions
    .filter((session) => session.menteeId === menteeId && session.status === "scheduled")
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
}

export function getRecentSessions(menteeId: string, limit = 5): MentoringSession[] {
  return mockSessions
    .filter((session) => session.menteeId === menteeId && session.status === "completed")
    .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
    .slice(0, limit)
}

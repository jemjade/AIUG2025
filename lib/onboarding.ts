export interface OnboardingTask {
  id: string
  title: string
  description: string
  category: "documentation" | "training" | "setup" | "culture" | "meeting"
  status: "pending" | "in-progress" | "completed"
  priority: "high" | "medium" | "low"
  estimatedTime: number // in minutes
  dueDate?: string
  completedDate?: string
  resources?: {
    type: "document" | "video" | "link" | "quiz"
    title: string
    url: string
  }[]
}

export interface OnboardingProgress {
  userId: string
  startDate: string
  currentWeek: number
  totalTasks: number
  completedTasks: number
  overallProgress: number
  weeklyProgress: {
    week: number
    tasksCompleted: number
    totalTasks: number
  }[]
}

export interface CompanyCulture {
  id: string
  title: string
  description: string
  category: "values" | "policies" | "benefits" | "history"
  content: string
  readTime: number
  isRequired: boolean
  completed: boolean
}

// Mock data for onboarding tasks
export const onboardingTasks: OnboardingTask[] = [
  {
    id: "task1",
    title: "Hanwha 회사 소개 영상 시청",
    description: "Hanwha의 역사, 비전, 핵심 가치에 대해 학습합니다",
    category: "culture",
    status: "completed",
    priority: "high",
    estimatedTime: 30,
    completedDate: "2024-01-15",
    resources: [
      {
        type: "video",
        title: "Hanwha 회사 소개",
        url: "/videos/company-intro",
      },
    ],
  },
  {
    id: "task2",
    title: "IT 계정 설정 및 보안 교육",
    description: "사내 시스템 접근을 위한 계정 설정과 보안 정책 학습",
    category: "setup",
    status: "completed",
    priority: "high",
    estimatedTime: 45,
    completedDate: "2024-01-16",
    resources: [
      {
        type: "document",
        title: "IT 보안 가이드",
        url: "/docs/security-guide",
      },
    ],
  },
  {
    id: "task3",
    title: "직속 상사와 1:1 미팅",
    description: "팀 소개 및 업무 목표 설정을 위한 첫 미팅",
    category: "meeting",
    status: "in-progress",
    priority: "high",
    estimatedTime: 60,
    dueDate: "2024-01-20",
  },
  {
    id: "task4",
    title: "사내 복리후생 안내",
    description: "건강보험, 휴가제도, 교육지원 등 복리후생 제도 학습",
    category: "documentation",
    status: "pending",
    priority: "medium",
    estimatedTime: 20,
    dueDate: "2024-01-22",
    resources: [
      {
        type: "document",
        title: "복리후생 가이드",
        url: "/docs/benefits",
      },
    ],
  },
  {
    id: "task5",
    title: "팀 소개 및 동료 만나기",
    description: "팀원들과의 소개 시간 및 업무 협업 방식 이해",
    category: "meeting",
    status: "pending",
    priority: "high",
    estimatedTime: 90,
    dueDate: "2024-01-25",
  },
  {
    id: "task6",
    title: "업무 프로세스 교육",
    description: "부서별 업무 프로세스 및 도구 사용법 학습",
    category: "training",
    status: "pending",
    priority: "high",
    estimatedTime: 120,
    dueDate: "2024-01-30",
  },
]

export const companyCulture: CompanyCulture[] = [
  {
    id: "culture1",
    title: "Hanwha 핵심 가치",
    description: "도전, 헌신, 정도경영의 핵심 가치 이해",
    category: "values",
    content: "Hanwha는 도전 정신, 헌신적 자세, 정도경영을 통해 지속가능한 성장을 추구합니다...",
    readTime: 5,
    isRequired: true,
    completed: true,
  },
  {
    id: "culture2",
    title: "조직문화 및 소통 방식",
    description: "수평적 소통문화와 협업 방식에 대한 이해",
    category: "values",
    content: "Hanwha는 열린 소통과 상호 존중을 바탕으로 한 협업 문화를 지향합니다...",
    readTime: 7,
    isRequired: true,
    completed: false,
  },
  {
    id: "culture3",
    title: "인사 정책 및 평가 제도",
    description: "성과 평가, 승진, 교육 기회에 대한 안내",
    category: "policies",
    content: "공정하고 투명한 평가 시스템을 통해 개인의 성장과 회사의 발전을 함께 추구합니다...",
    readTime: 10,
    isRequired: true,
    completed: false,
  },
  {
    id: "culture4",
    title: "Hanwha의 역사와 미래 비전",
    description: "회사의 성장 과정과 미래 전략 방향",
    category: "history",
    content: "1952년 창립 이후 70년간 지속적인 혁신과 도전으로 글로벌 기업으로 성장해왔습니다...",
    readTime: 8,
    isRequired: false,
    completed: false,
  },
]

export function getOnboardingTasksByUserId(userId: string): OnboardingTask[] {
  return onboardingTasks
}

export function getOnboardingProgress(userId: string): OnboardingProgress {
  const tasks = getOnboardingTasksByUserId(userId)
  const completedTasks = tasks.filter((task) => task.status === "completed").length

  return {
    userId,
    startDate: "2024-01-15",
    currentWeek: 1,
    totalTasks: tasks.length,
    completedTasks,
    overallProgress: Math.round((completedTasks / tasks.length) * 100),
    weeklyProgress: [
      { week: 1, tasksCompleted: 2, totalTasks: 3 },
      { week: 2, tasksCompleted: 0, totalTasks: 2 },
      { week: 3, tasksCompleted: 0, totalTasks: 1 },
    ],
  }
}

export function getCompanyCulture(): CompanyCulture[] {
  return companyCulture
}

export function updateTaskStatus(taskId: string, status: OnboardingTask["status"]): void {
  const task = onboardingTasks.find((t) => t.id === taskId)
  if (task) {
    task.status = status
    if (status === "completed") {
      task.completedDate = new Date().toISOString().split("T")[0]
    }
  }
}

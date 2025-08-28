export interface Message {
  id: string
  conversationId: string
  senderId: string
  receiverId: string
  content: string
  type: "text" | "file" | "session-request"
  timestamp: string
  isRead: boolean
  senderName: string
  senderAvatar: string
}

export interface Conversation {
  id: string
  participants: string[]
  participantNames: string[]
  participantAvatars: string[]
  lastMessage?: Message
  updatedAt: string
  unreadCount: number
}

// Mock data for conversations
export const mockConversations: Conversation[] = [
  {
    id: "1",
    participants: ["user1", "mentor1"],
    participantNames: ["김민수", "이지영"],
    participantAvatars: ["/korean-male-developer.png", "/korean-female-designer.png"],
    lastMessage: {
      id: "msg1",
      conversationId: "1",
      senderId: "mentor1",
      receiverId: "user1",
      content: "안녕하세요! 프론트엔드 개발에 대해 궁금한 점이 있으시면 언제든 물어보세요.",
      type: "text",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      isRead: false,
      senderName: "이지영",
      senderAvatar: "/korean-female-designer.png",
    },
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    unreadCount: 2,
  },
  {
    id: "2",
    participants: ["user1", "mentor2"],
    participantNames: ["김민수", "박준호"],
    participantAvatars: ["/korean-male-developer.png", "/korean-ceo.png"],
    lastMessage: {
      id: "msg2",
      conversationId: "2",
      senderId: "user1",
      receiverId: "mentor2",
      content: "네, 감사합니다! 다음 주에 시간 되실 때 한 번 더 상담받고 싶습니다.",
      type: "text",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      isRead: true,
      senderName: "김민수",
      senderAvatar: "/korean-male-developer.png",
    },
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    unreadCount: 0,
  },
]

// Mock data for messages in a conversation
export const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "msg1-1",
      conversationId: "1",
      senderId: "user1",
      receiverId: "mentor1",
      content: "안녕하세요! 프론트엔드 개발을 배우고 싶어서 연락드렸습니다.",
      type: "text",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      isRead: true,
      senderName: "김민수",
      senderAvatar: "/korean-male-developer.png",
    },
    {
      id: "msg1-2",
      conversationId: "1",
      senderId: "mentor1",
      receiverId: "user1",
      content: "안녕하세요! 반갑습니다. 어떤 부분을 중점적으로 배우고 싶으신가요?",
      type: "text",
      timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
      isRead: true,
      senderName: "이지영",
      senderAvatar: "/korean-female-designer.png",
    },
    {
      id: "msg1-3",
      conversationId: "1",
      senderId: "user1",
      receiverId: "mentor1",
      content: "React와 TypeScript를 활용한 실무 프로젝트 경험을 쌓고 싶습니다.",
      type: "text",
      timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
      isRead: true,
      senderName: "김민수",
      senderAvatar: "/korean-male-developer.png",
    },
    {
      id: "msg1-4",
      conversationId: "1",
      senderId: "mentor1",
      receiverId: "user1",
      content: "안녕하세요! 프론트엔드 개발에 대해 궁금한 점이 있으시면 언제든 물어보세요.",
      type: "text",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      isRead: false,
      senderName: "이지영",
      senderAvatar: "/korean-female-designer.png",
    },
  ],
  "2": [
    {
      id: "msg2-1",
      conversationId: "2",
      senderId: "mentor2",
      receiverId: "user1",
      content: "안녕하세요! 창업에 관심이 있으시다고 들었습니다.",
      type: "text",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      isRead: true,
      senderName: "박준호",
      senderAvatar: "/korean-ceo.png",
    },
    {
      id: "msg2-2",
      conversationId: "2",
      senderId: "user1",
      receiverId: "mentor2",
      content: "네, 감사합니다! 다음 주에 시간 되실 때 한 번 더 상담받고 싶습니다.",
      type: "text",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      isRead: true,
      senderName: "김민수",
      senderAvatar: "/korean-male-developer.png",
    },
  ],
}

export function getConversations(): Conversation[] {
  return mockConversations
}

export function getConversation(id: string): Conversation | undefined {
  return mockConversations.find((conv) => conv.id === id)
}

export function getMessages(conversationId: string): Message[] {
  return mockMessages[conversationId] || []
}

export function sendMessage(conversationId: string, senderId: string, receiverId: string, content: string): Message {
  const newMessage: Message = {
    id: `msg-${Date.now()}`,
    conversationId,
    senderId,
    receiverId,
    content,
    type: "text",
    timestamp: new Date().toISOString(),
    isRead: false,
    senderName: "김민수", // In real app, get from user data
    senderAvatar: "/korean-male-developer.png",
  }

  if (!mockMessages[conversationId]) {
    mockMessages[conversationId] = []
  }
  mockMessages[conversationId].push(newMessage)

  // Update conversation's last message
  const conversation = mockConversations.find((conv) => conv.id === conversationId)
  if (conversation) {
    conversation.lastMessage = newMessage
    conversation.updatedAt = newMessage.timestamp
  }

  return newMessage
}

export function markAsRead(conversationId: string, userId: string): void {
  const messages = mockMessages[conversationId] || []
  messages.forEach((message) => {
    if (message.receiverId === userId) {
      message.isRead = true
    }
  })

  // Update unread count
  const conversation = mockConversations.find((conv) => conv.id === conversationId)
  if (conversation) {
    conversation.unreadCount = 0
  }
}

export function createConversation(
  mentorId: string,
  menteeId: string,
  mentorName: string,
  menteeName: string,
): Conversation {
  const newConversation: Conversation = {
    id: `conv-${Date.now()}`,
    participants: [menteeId, mentorId],
    participantNames: [menteeName, mentorName],
    participantAvatars: ["/korean-male-developer.png", "/korean-female-designer.png"],
    updatedAt: new Date().toISOString(),
    unreadCount: 0,
  }

  mockConversations.unshift(newConversation)
  return newConversation
}

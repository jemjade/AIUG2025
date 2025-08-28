"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: string[]
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "안녕하세요! H-Link AI 어시스턴트입니다. 🤖\n\n다음과 같은 도움을 드릴 수 있어요:\n• 멘토 추천 및 매칭\n• 사내 복지 및 제도 안내\n• 승진 및 평가 기준 설명\n• 온보딩 프로세스 가이드\n\n무엇을 도와드릴까요?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: [
        "프론트엔드 개발 멘토 추천해줘",
        "승진 평가 기준이 궁금해",
        "사내 복지 제도 알려줘",
        "온보딩 일정 확인하고 싶어",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (message?: string) => {
    const messageToSend = message || inputValue.trim()
    if (!messageToSend) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(messageToSend)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()

    let response = ""
    let suggestions: string[] = []

    if (lowerMessage.includes("멘토") && (lowerMessage.includes("추천") || lowerMessage.includes("찾"))) {
      response = `멘토 추천을 도와드리겠습니다! 🎯\n\n현재 요청하신 조건에 맞는 멘토들을 찾았어요:\n\n**추천 멘토:**\n• 김민수 (시니어 개발자) - React, 클라우드 전문\n• 박지영 (마케팅 팀장) - 브랜딩, 디지털마케팅\n• 이창호 (사업개발 이사) - 사업기획, 리더십\n\n더 구체적인 조건이 있으시면 말씀해주세요!`
      suggestions = ["김민수 멘토 상세 정보", "다른 분야 멘토 찾기", "멘토링 신청 방법"]
    } else if (lowerMessage.includes("승진") || lowerMessage.includes("평가")) {
      response = `승진 및 평가 제도에 대해 안내드리겠습니다! 📈\n\n**승진 평가 기준:**\n• 업무 성과 (40%): KPI 달성도, 프로젝트 기여도\n• 역량 평가 (30%): 전문성, 리더십, 협업 능력\n• 동료 평가 (20%): 팀워크, 커뮤니케이션\n• 자기계발 (10%): 교육 이수, 자격증 취득\n\n**필요 점수:** 총 80점 이상 (S등급 이상)\n\n더 자세한 정보가 필요하시면 말씀해주세요!`
      suggestions = ["등급별 상세 기준", "자기계발 프로그램", "평가 일정 확인"]
    } else if (lowerMessage.includes("복지") || lowerMessage.includes("제도")) {
      response = `Hanwha 사내 복지 제도를 안내드리겠습니다! 🏢\n\n**주요 복지 혜택:**\n• 건강관리: 종합건강검진, 의료비 지원\n• 휴가제도: 연차, 리프레시 휴가, 육아휴직\n• 교육지원: 사내외 교육비, 어학연수 지원\n• 생활지원: 주택자금 대출, 경조사비\n• 여가활동: 동호회 지원, 체육시설 이용\n\n각 제도별 자세한 신청 방법을 알려드릴까요?`
      suggestions = ["휴가 신청 방법", "교육비 지원 절차", "주택자금 대출 조건"]
    } else if (lowerMessage.includes("온보딩")) {
      response = `온보딩 프로세스를 안내드리겠습니다! 🚀\n\n**온보딩 일정 (4주 과정):**\n\n**1주차:** 회사 소개 및 기본 교육\n• Hanwha 역사 및 비전\n• 조직문화 및 핵심가치\n• 기본 시스템 사용법\n\n**2주차:** 부서별 전문 교육\n• 담당 업무 소개\n• 팀 소개 및 역할 분담\n• 멘토 배정\n\n**3-4주차:** 실무 적응\n• 프로젝트 참여\n• 정기 피드백\n• 적응도 평가\n\n현재 어느 단계에 계신가요?`
      suggestions = ["멘토 배정 신청", "교육 자료 다운로드", "온보딩 진도 확인"]
    } else {
      response = `죄송합니다. 좀 더 구체적으로 질문해주시면 더 정확한 답변을 드릴 수 있어요! 😊\n\n다음 중 하나를 선택해주세요:`
      suggestions = ["멘토 추천받기", "승진 기준 알아보기", "복지 제도 확인하기", "온보딩 가이드 보기"]
    }

    return {
      id: Date.now().toString(),
      content: response,
      sender: "bot",
      timestamp: new Date(),
      suggestions,
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-16 h-16 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-primary to-accent hover:scale-110"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 transition-all duration-300 shadow-2xl border-2 ${isMinimized ? "h-16" : "h-[600px]"}`}>
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">H-Link AI</CardTitle>
              <p className="text-xs opacity-90">사내 전문 어시스턴트</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 p-1 h-8 w-8"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[536px]">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback className="bg-primary text-white text-xs">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`max-w-[280px] ${message.sender === "user" ? "order-1" : ""}`}>
                      <div
                        className={`p-3 rounded-2xl whitespace-pre-wrap text-sm leading-relaxed ${
                          message.sender === "user" ? "bg-primary text-white ml-auto" : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="cursor-pointer hover:bg-primary hover:text-white transition-colors text-xs"
                              onClick={() => handleSend(suggestion)}
                            >
                              {suggestion}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    {message.sender === "user" && (
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback className="bg-accent text-white text-xs">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-primary text-white text-xs">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 rounded-xl"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className="rounded-xl px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Users, Eye, EyeOff, UserCheck, GraduationCap } from "lucide-react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "mentee", // "mentor" or "mentee"
    bio: "",
    expertise: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }
    // TODO: Implement actual signup logic
    console.log("Signup attempt:", formData)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-serif font-black text-primary">MentorConnect</span>
          </Link>
          <h1 className="text-2xl font-serif font-black text-foreground mb-2">회원가입</h1>
          <p className="text-muted-foreground">새 계정을 만들어 멘토링을 시작하세요</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-serif">계정 만들기</CardTitle>
            <CardDescription>아래 정보를 입력하여 계정을 생성하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label>가입 유형</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem value="mentee" id="mentee" className="peer sr-only" />
                    <Label
                      htmlFor="mentee"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <GraduationCap className="mb-3 h-6 w-6" />
                      <div className="text-center">
                        <div className="font-medium">멘티</div>
                        <div className="text-xs text-muted-foreground">배우고 싶어요</div>
                      </div>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="mentor" id="mentor" className="peer sr-only" />
                    <Label
                      htmlFor="mentor"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <UserCheck className="mb-3 h-6 w-6" />
                      <div className="text-center">
                        <div className="font-medium">멘토</div>
                        <div className="text-xs text-muted-foreground">가르치고 싶어요</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Basic Info */}
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="8자 이상 입력하세요"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={8}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="비밀번호를 다시 입력하세요"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Additional Info for Mentors */}
              {formData.role === "mentor" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="expertise">전문 분야</Label>
                    <Input
                      id="expertise"
                      type="text"
                      placeholder="예: 프론트엔드 개발, 마케팅, 창업"
                      value={formData.expertise}
                      onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                      required={formData.role === "mentor"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">간단한 소개</Label>
                    <Textarea
                      id="bio"
                      placeholder="경력과 멘토링 가능한 분야에 대해 간단히 소개해주세요"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={3}
                      required={formData.role === "mentor"}
                    />
                  </div>
                </>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-ring"
                  required
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                  <Link href="/terms" className="text-primary hover:underline">
                    이용약관
                  </Link>
                  과{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    개인정보처리방침
                  </Link>
                  에 동의합니다
                </Label>
              </div>

              <Button type="submit" className="w-full">
                계정 만들기
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="my-4" />
              <div className="text-center text-sm text-muted-foreground">
                이미 계정이 있으신가요?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  로그인
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

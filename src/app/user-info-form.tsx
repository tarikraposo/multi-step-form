'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSubscription } from "./subscription-provider"

export function UserInfoForm() {
  const { state, setUserInfo, setStep } = useSubscription()
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
 
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}

    if (!state.userInfo.name) newErrors.name = "Name is required"
    if (!state.userInfo.email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(state.userInfo.email)) newErrors.email = "Email is invalid"
    if (!state.userInfo.phone) newErrors.phone = "Phone number is required"
    

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setStep(state.currentStep + 1)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo({ ...state.userInfo, [name]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Personal info</h2>
        <p className="text-gray-500">Please provide your name, email address, and phone number.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={state.userInfo.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={state.userInfo.email}
            onChange={handleChange}
            placeholder="example@email.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={state.userInfo.phone}
            onChange={handleChange}
            placeholder="99 9999-9999"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="flex justify-end pt-6">
          <Button type="submit">
            Next Step
          </Button>
        </div>
      </form>
    </div>
  )
}


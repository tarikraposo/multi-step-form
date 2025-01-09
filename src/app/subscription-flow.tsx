'use client'

import { Card } from "@/components/ui/card"
import { UserInfoForm } from "./user-info-form"
import { PlanSelection } from "./plan-selection"
import { AddOnSelection } from "./add-on-selection"
import { ThankYou } from "./thank-you"
import { useSubscription } from "./subscription-provider"
import { Confirmation } from "./confirmation"

export function SubscriptionFlow() {
  const { state } = useSubscription()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="flex justify-center mb-8">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mx-2 
                ${state.currentStep === step 
                  ? 'bg-blue-100 border-blue-500 text-blue-500' 
                  : 'border-gray-300 text-gray-500'}`}
            >
              {step}
            </div>
          ))}
        </div>

        {state.currentStep === 1 && <UserInfoForm />}
        {state.currentStep === 2 && <PlanSelection />}
        {state.currentStep === 3 && <AddOnSelection />}
        {state.currentStep === 4 && <Confirmation />}
        {state.currentStep === 5 && <ThankYou />}
      </Card>
    </div>
  )
}


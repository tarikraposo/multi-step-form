'use client'

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { GamepadIcon, MonitorIcon, TrophyIcon } from 'lucide-react'
import { useSubscription } from "./subscription-provider"
import { PlanType } from "./types"

const PLANS = [
  {
    type: 'Arcade' as PlanType,
    price: { monthly: 9, yearly: 90 },
    icon: GamepadIcon,
    color: 'bg-orange-100 text-orange-500'
  },
  {
    type: 'Advanced' as PlanType,
    price: { monthly: 12, yearly: 120 },
    icon: MonitorIcon,
    color: 'bg-pink-100 text-pink-500'
  },
  {
    type: 'Pro' as PlanType,
    price: { monthly: 15, yearly: 150 },
    icon: TrophyIcon,
    color: 'bg-indigo-100 text-indigo-500'
  }
]

export function PlanSelection() {
  const { state, setPlan, setBillingCycle, setStep } = useSubscription()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Select your plan</h2>
        <p className="text-gray-500">You have the option of monthly or yearly billing.</p>
      </div>

      <div className="space-y-4">
        {PLANS.map((plan) => {
          const Icon = plan.icon
          return (
            <button
              key={plan.type}
              onClick={() => setPlan(plan.type)}
              className={`w-full p-4 rounded-lg border-2 flex items-center space-x-4
                ${state.plan === plan.type ? 'border-blue-500' : 'border-gray-200'}`}
            >
              <div className={`p-3 rounded-lg ${plan.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-medium">{plan.type}</div>
                <div className="text-gray-500">
                  ${state.billingCycle === 'monthly' 
                    ? `${plan.price.monthly}/mo`
                    : `${plan.price.yearly}/yr`}
                </div>
                {state.billingCycle === 'yearly' && (
                  <div className="text-sm text-blue-500">2 months free</div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-center space-x-4 py-4 bg-gray-50 rounded-lg">
        <span className={state.billingCycle === 'monthly' ? 'font-medium' : 'text-gray-500'}>
          Monthly
        </span>
        <Switch
          checked={state.billingCycle === 'yearly'}
          onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
        />
        <span className={state.billingCycle === 'yearly' ? 'font-medium' : 'text-gray-500'}>
          Yearly
        </span>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          variant="ghost"
          onClick={() => setStep(state.currentStep - 1)}
          disabled={state.currentStep === 1}
        >
          Go Back
        </Button>
        <Button
          onClick={() => setStep(state.currentStep + 1)}
          disabled={!state.plan}
        >
          Next Step
        </Button>
      </div>
    </div>
  )
}


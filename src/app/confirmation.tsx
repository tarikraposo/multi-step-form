'use client'

import { Button } from "@/components/ui/button"
import { useSubscription } from "./subscription-provider"
import { GamepadIcon, MonitorIcon, TrophyIcon } from 'lucide-react'

const PLANS = [
  {
    type: 'Arcade' as const,
    price: { monthly: 9, yearly: 90 },
    icon: GamepadIcon,
    color: 'bg-orange-100 text-orange-500'
  },
  {
    type: 'Advanced' as const,
    price: { monthly: 12, yearly: 120 },
    icon: MonitorIcon,
    color: 'bg-pink-100 text-pink-500'
  },
  {
    type: 'Pro' as const,
    price: { monthly: 15, yearly: 150 },
    icon: TrophyIcon,
    color: 'bg-indigo-100 text-indigo-500'
  }
]

const ADD_ONS = [
  {
    id: 'online',
    title: 'Online service',
    description: 'Access to multiplayer games',
    price: { monthly: 1, yearly: 10 }
  },
  {
    id: 'storage',
    title: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    price: { monthly: 2, yearly: 20 }
  },
  {
    id: 'profile',
    title: 'Customizable profile',
    description: 'Custom theme on your profile',
    price: { monthly: 2, yearly: 20 }
  }
]

export function Confirmation() {
  const { state, setStep } = useSubscription()
  
  const selectedPlan = PLANS.find(p => p.type === state.plan)
  const planPrice = selectedPlan?.price[state.billingCycle] ?? 0
  
  const selectedAddOns = ADD_ONS.filter(addon => state.addOns.includes(addon.id))
  const addOnsTotal = selectedAddOns.reduce((sum, addon) => 
    sum + addon.price[state.billingCycle], 0
  )

  const total = planPrice + addOnsTotal

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Confirm your subscription</h2>
        <p className="text-gray-500">Please review your subscription details before finalizing.</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Personal Information</h3>
          <p>Name: {state.userInfo.name}</p>
          <p>Email: {state.userInfo.email}</p>
          <p>Phone: {state.userInfo.phone}</p>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">Subscription Details</h3>
          <div className="flex justify-between items-center pb-2">
            <div>
              <div className="font-medium">
                {state.plan} ({state.billingCycle})
              </div>
            </div>
            <div className="font-medium">
              ${planPrice}/{state.billingCycle === 'monthly' ? 'mo' : 'yr'}
            </div>
          </div>

          {selectedAddOns.map((addon) => (
            <div key={addon.id} className="flex justify-between text-gray-500">
              <div>{addon.title}</div>
              <div>
                +${addon.price[state.billingCycle]}/{state.billingCycle === 'monthly' ? 'mo' : 'yr'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
        <div className="text-gray-700">
          Total (per {state.billingCycle === 'monthly' ? 'month' : 'year'})
        </div>
        <div className="text-xl font-bold text-blue-500">
          ${total}/{state.billingCycle === 'monthly' ? 'mo' : 'yr'}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          variant="ghost"
          onClick={() => setStep(state.currentStep - 1)}
        >
          Go Back
        </Button>
        <Button
          onClick={() => setStep(state.currentStep + 1)}
        >
          Confirm Subscription
        </Button>
      </div>
    </div>
  )
}


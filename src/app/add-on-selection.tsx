'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useSubscription } from "./subscription-provider"

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

export function AddOnSelection() {
    const { state, toggleAddOn, setStep } = useSubscription()

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">
                    Pick add-ons
                </h2>
                <p className="text-gray-500">
                    Add-ons help enhance your gaming experience.
                </p>
            </div>

            <div className="space-y-4">
                {ADD_ONS.map((addOn) => (
                    <label key={addOn.id} className={`flex items-center space-x-4 cursor-pointer
                        ${state.addOns.includes(addOn.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                        <Checkbox
                            checked={state.addOns.includes(addOn.id)}
                            onChange={() => toggleAddOn(addOn.id)}
                        />
                        <div>
                            <div className="font-medium">{addOn.title}</div>
                            <div className="text-gray-500">
                                ${state.billingCycle === 'monthly' ? `${addOn.price.monthly}/mo` : `${addOn.price.yearly}/yr`}
                            </div>
                        </div>
                    </label>
               ) )}
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
          Next Step
        </Button>
      </div>
    </div>
    )
}
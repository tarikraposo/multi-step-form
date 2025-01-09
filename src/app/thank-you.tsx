'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { useSubscription } from './subscription-provider'


export function ThankYou(){
    const {state, setStep, resetInfo} = useSubscription();

    const handleHomeClick = () => {
        resetInfo();
        setStep(1)
    }

    return(
    <div className="text-center py-8 space-y-4">
      <div className="flex justify-center">
        <CheckCircle className="w-16 h-16 text-pink-500" />
      </div>
      <h2 className="text-2xl font-bold">Thank you!</h2>
      <p className="text-gray-500 max-w-sm mx-auto">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        https://www.frontendmentor.io/.
      </p>
      <Button
          onClick={() =>handleHomeClick()}
          disabled={!state.plan}
        >
          Home
        </Button>
    </div>
    )



}
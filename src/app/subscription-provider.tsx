'use client'

import {createContext, useContext, useState} from 'react';
import { BillingCycle,PlantType, SubscriptionState, UserInfo } from './types';

interface SubscriptionContextType {
    state: SubscriptionState;
    setStep: (step: number) => void;
    setUserInfo: (info: UserInfo) => void;
    setPlan: (plan: PlantType) => void;
    setBillingCycle: (cycle: BillingCycle) => void;
    toggleAddOn: (addOnId: string) => void;
    resetInfo: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({children} : {children: React.ReactNode}){
    const [state, setState] = useState<SubscriptionState>({
        currentStep: 1,
        userInfo: {name: '', email: '', phone: ''},
        plan: null,
        billingCycle: 'monthly',
        addOns: []
    })

    const setStep = (step: number) => {
        setState(prev => ({...prev, currentStep: step}));
    }

    const setUserInfo = (userInfo: UserInfo) => {
        setState(prev => ({...prev, userInfo: userInfo}));
    }

    const setPlan = (plan : PlantType) => {
        setState(prev => ({...prev, plan}));
    };

    const resetInfo = () => setState ((prev) => ({
        ...prev,
        userInfo: {name: '', email: '', phone: ''},
        addOns: []
    }))

    const setBillingCycle = (billingCycle: BillingCycle) => {
        setState(prev => ({...prev, billingCycle}));
    }

    const toggleAddOn = (addOnId: string) => {
        setState(prev => ({
          ...prev,
          addOns: prev.addOns.includes(addOnId)
            ? prev.addOns.filter(id => id !== addOnId)
            : [...prev.addOns, addOnId]
        }))
      }

    return(
        <SubscriptionContext.Provider value={{state, setStep, setUserInfo, setPlan, setBillingCycle, toggleAddOn, resetInfo}}>
            {children}
            </SubscriptionContext.Provider>
    )
}

export const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    if (!context) throw new Error ('useSubscription must be used within a SubscriptionProvider');
    return context;
}
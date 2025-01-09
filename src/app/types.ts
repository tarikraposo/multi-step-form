export type PlanType = 'Arcade' | 'Advanced' | 'Pro';
export type BillingCycle = 'monthly' | 'yearly';

export interface Plan {
    type: PlanType;
    price: {
        monthly: number;
        yearly: number;
    }
    icon: string;
}

export interface AddOn {
    id: string;
    title: string;
    description: string;
    price: {
        monthly: number;
        yearly: number;
    }
}

export interface UserInfo {
    name: string;
    email: string;
    phone: string;
}

export interface SubscriptionState {
    currentStep: number;
    userInfo: UserInfo;
    plan: PlanType | null;
    billingCycle: BillingCycle;
    addOns: string[];
}
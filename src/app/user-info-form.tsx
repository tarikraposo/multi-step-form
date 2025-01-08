'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSubscription } from "./subscription-provider"

export function UserInfoForm(){
    const {state, setUserInfo, setStep} = useSubscription();
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const validationExpressionPhone = /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}-[0-9]{4}$/


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: {[key: string]: string} = {};

        if (!state.userInfo.name) newErrors.name = "Name is required";
        if (!state.userInfo.email) newErrors.email = "Email is required";
        else if (!state.userInfo.email.includes('@')) newErrors.email = "Invalid email";
        if (!state.userInfo.phone) newErrors.phone = "Phone is required";
        else if (!validationExpressionPhone.test(state.userInfo.phone)) newErrors.phone = "Invalid phone number";

    }


}

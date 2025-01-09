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

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
        setStep(state.currentStep + 1)
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserInfo({...state.userInfo, [name]: value});
    }

    return(

        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">
                    Personal Info
                </h2>
                <p>
                    Please provide your name, email adress, and phone number.
                </p>
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
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={state.userInfo.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={state.userInfo.phone}
                        onChange={handleChange}
                        placeholder="(99) 99999-9999"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className="flex justify-end pt-6">
                    <Button type="submit">Next step</Button>
                </div>

            </form>

        </div>

    )

}

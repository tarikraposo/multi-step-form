import { SubscriptionProvider } from "./subscription-provider";
import { UserInfoForm } from "./user-info-form";

export default function Home() {
  return (
    <SubscriptionProvider>
      <UserInfoForm />
   </SubscriptionProvider>
  );
}

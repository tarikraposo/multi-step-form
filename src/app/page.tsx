import { SubscriptionFlow } from "./subscription-flow";
import { SubscriptionProvider } from "./subscription-provider";


export default function Page() {
  return (
    <SubscriptionProvider>
      <SubscriptionFlow />
    </SubscriptionProvider>
  )
}


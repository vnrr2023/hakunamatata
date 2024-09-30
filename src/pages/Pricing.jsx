// import { ShootingStars } from "../components/ui/shooting-stars"
// import { StarsBackground } from "../components/ui/stars-background"
// import { CheckIcon } from "lucide-react"

// const pricingPlans = [
//   {
//     name: "Basic",
//     price: "Free",
//     features: ["Limited searches", "Basic results", "Standard support"],
//     cta: "Get Started",
//     highlighted: false,
//   },
//   {
//     name: "Pro",
//     price: "$19",
//     features: ["Unlimited searches", "Advanced results", "Priority support", "Custom filters"],
//     cta: "Upgrade to Pro",
//     highlighted: true,
//   },
//   {
//     name: "Enterprise",
//     price: "Custom",
//     features: ["Dedicated support", "Custom integration", "Advanced analytics", "SLA guarantee"],
//     cta: "Contact Sales",
//     highlighted: false,
//   },
// ]

export default function Pricing() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-neutral-800">
      {/* <div className="absolute inset-0 z-0">
        <ShootingStars />
        <StarsBackground />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Choose Your Plan
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-xl text-gray-300">
          Select the perfect plan for your needs and unlock the full potential of CSGPT
        </p>
        <div className="mt-24 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl bg-neutral-800 bg-opacity-50 p-8 shadow-lg ring-1 ring-white/10 backdrop-blur-lg transition-all hover:bg-opacity-70 hover:shadow-xl ${
                plan.highlighted ? "lg:scale-110" : ""
              }`}
            >
              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <p className="mt-4 flex items-baseline text-white">
                <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                {plan.price !== "Custom" && <span className="ml-1 text-xl font-semibold">/month</span>}
              </p>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckIcon className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-300">{feature}</p>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  plan.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600"
                    : "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}

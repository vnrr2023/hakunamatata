import { ShootingStars } from "../components/ui/shooting-stars";
import { StarsBackground } from "../components/ui/stars-background";
export default function Pricing() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-neutral-800">
    <div className="absolute inset-0 z-0">
      <ShootingStars />
      <StarsBackground />
    </div>
     {/* Write from here */}
</div>
  )
}

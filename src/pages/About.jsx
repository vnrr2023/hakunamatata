import { ShootingStars } from "../components/ui/shooting-stars"
import { StarsBackground } from "../components/ui/stars-background"
import { Github, Linkedin } from "lucide-react"
import Vivek from './../assets/Vivek.jpg'
import Nishi from './../assets/Nishi.jpg'
import Rehan from './../assets/Rehan.jpg'
import Rohit from './../assets/Rohit.jpg'

const teamMembers = [
  {
    name: "Vivek Chouhan",
    role: "Backend Developer",
    image: Vivek,
    github: "https://github.com/vivi",
    linkedin: "https://linkedin.com/in/vivi",
  },
  {
    name: "Nishikant Raut",
    role: "FullStack Developer",
    image: Nishi,
    github: "https://github.com/Nishikant00",
    linkedin: "https://linkedin.com/in/nishi",
  },
  {
    name: "Rehan Sayyed",
    role: "FullStack Developer",
    image: Rehan,
    github: "https://github.com/rsayyed591",
    linkedin: "https://linkedin.com/in/rehan42",
  },
  {
    name: "Rohit Deshmukh",
    role: "UX Designer",
    image: Rohit,
    github: "https://github.com/ardie",
    linkedin: "https://linkedin.com/in/rohit",
  },
]

export default function About() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-neutral-800">
      <div className="absolute inset-0 z-0">
        <ShootingStars />
        <StarsBackground />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">About Us</h1>
        <p className="mx-auto mb-16 max-w-3xl text-center text-lg text-gray-300">
          At CSGPT, we&apos;re passionate about revolutionizing the way people search and access information. Our team of
          dedicated professionals combines expertise in artificial intelligence, data analysis, and user experience
          design to create a cutting-edge search platform. We believe in the power of technology to make knowledge more
          accessible and empower individuals to find the answers they need quickly and efficiently.
        </p>
        <h2 className="mb-12 text-center text-3xl font-bold text-white">Meet Our Team</h2>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center rounded-lg bg-neutral-800 bg-opacity-50 p-6 text-center shadow-lg transition-all hover:bg-opacity-70 hover:shadow-xl"
            >
              <img
                src={member.image}
                alt={member.name}
                className="mb-4 h-32 w-32 rounded-full object-cover"
                width={128}
                height={128}
              />
              <h3 className="mb-1 text-xl font-semibold text-white">{member.name}</h3>
              <p className="mb-4 text-sm text-gray-400">{member.role}</p>
              <div className="flex space-x-4">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

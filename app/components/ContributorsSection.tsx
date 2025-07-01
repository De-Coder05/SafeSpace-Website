"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, Linkedin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

gsap.registerPlugin(ScrollTrigger)

const contributors = [
  {
    name: "Dr. Sarah Chen",
    role: "Lead AI Researcher",
    github: "sarahchen",
    linkedin: "sarah-chen-ai",
    gradient: "from-blue-500 to-teal-500",
    initials: "SC",
  },
  {
    name: "Michael Johnson",
    role: "Edge Computing Specialist",
    github: "mjohnson",
    linkedin: "michael-johnson-iot",
    gradient: "from-teal-500 to-purple-500",
    initials: "MJ",
  },
  {
    name: "Emily Parker",
    role: "Signal Processing Engineer",
    github: "emilyparker",
    linkedin: "emily-parker-signals",
    gradient: "from-purple-500 to-pink-500",
    initials: "EP",
  },
  {
    name: "David Liu",
    role: "Voice Analysis Researcher",
    github: "davidliu",
    linkedin: "david-liu-audio",
    gradient: "from-green-500 to-blue-500",
    initials: "DL",
  },
  {
    name: "Aisha Rodriguez",
    role: "UX/UI Designer",
    github: "aisharodriguez",
    linkedin: "aisha-rodriguez-design",
    gradient: "from-orange-500 to-red-500",
    initials: "AR",
  },
  {
    name: "James Kim",
    role: "Full Stack Developer",
    github: "jameskim",
    linkedin: "james-kim-fullstack",
    gradient: "from-indigo-500 to-purple-500",
    initials: "JK",
  },
  {
    name: "Lisa Thompson",
    role: "Clinical Psychologist",
    github: "lisathompson",
    linkedin: "lisa-thompson-psych",
    gradient: "from-cyan-500 to-teal-500",
    initials: "LT",
  },
]

export default function ContributorsSection() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contributor-card",
        { scale: 0.8, opacity: 0, y: 60 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".contributors-grid",
            start: "top 85%",
          },
        },
      )

      gsap.fromTo(
        ".team-stats",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".team-stats-container",
            start: "top 85%",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 sm:top-40 right-4 sm:right-20 w-48 sm:w-80 h-48 sm:h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-1/4 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto mb-4 sm:mb-6 md:mb-8"></div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light">
            The brilliant minds behind SafeSpace AI
          </p>
        </div>

        {/* Contributors Grid - 4+3 Layout */}
        <div className="contributors-grid space-y-6 sm:space-y-8 mb-12 sm:mb-16 md:mb-20">
          {/* First Row - 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {contributors.slice(0, 4).map((contributor, index) => (
              <Card
                key={index}
                className="contributor-card group border-0 bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2 rounded-xl sm:rounded-2xl overflow-hidden"
              >
                <CardContent className="p-4 sm:p-6 md:p-8 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-r ${contributor.gradient} rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 md:mb-6 flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-shadow duration-300`}
                    >
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                        {contributor.initials}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-white group-hover:text-blue-200 transition-colors">
                      {contributor.name}
                    </h3>

                    <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 md:mb-6 font-medium">
                      {contributor.role}
                    </p>

                    <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4">
                      <a
                        href={`https://github.com/${contributor.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 sm:p-3 bg-gray-800/50 hover:bg-gray-700/70 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 group/link"
                      >
                        <Github
                          size={16}
                          className="sm:w-5 sm:h-5 text-gray-300 group-hover/link:text-white transition-colors"
                        />
                      </a>
                      <a
                        href={`https://linkedin.com/in/${contributor.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 sm:p-3 bg-blue-600/50 hover:bg-blue-500/70 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 group/link"
                      >
                        <Linkedin
                          size={16}
                          className="sm:w-5 sm:h-5 text-blue-200 group-hover/link:text-white transition-colors"
                        />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Second Row - 3 Cards (Centered) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            {contributors.slice(4, 7).map((contributor, index) => (
              <Card
                key={index + 4}
                className="contributor-card group border-0 bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2 rounded-xl sm:rounded-2xl overflow-hidden"
              >
                <CardContent className="p-4 sm:p-6 md:p-8 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-r ${contributor.gradient} rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 md:mb-6 flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-shadow duration-300`}
                    >
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                        {contributor.initials}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-white group-hover:text-blue-200 transition-colors">
                      {contributor.name}
                    </h3>

                    <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 md:mb-6 font-medium">
                      {contributor.role}
                    </p>

                    <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4">
                      <a
                        href={`https://github.com/${contributor.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 sm:p-3 bg-gray-800/50 hover:bg-gray-700/70 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 group/link"
                      >
                        <Github
                          size={16}
                          className="sm:w-5 sm:h-5 text-gray-300 group-hover/link:text-white transition-colors"
                        />
                      </a>
                      <a
                        href={`https://linkedin.com/in/${contributor.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 sm:p-3 bg-blue-600/50 hover:bg-blue-500/70 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 group/link"
                      >
                        <Linkedin
                          size={16}
                          className="sm:w-5 sm:h-5 text-blue-200 group-hover/link:text-white transition-colors"
                        />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <div className="team-stats-container grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
          <div className="team-stats bg-white/5 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/10">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-1 sm:mb-2 md:mb-3">7</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-300 font-medium">Team Members</div>
          </div>
          <div className="team-stats bg-white/5 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/10">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-400 mb-1 sm:mb-2 md:mb-3">3</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-300 font-medium">PhD Researchers</div>
          </div>
          <div className="team-stats bg-white/5 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/10">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400 mb-1 sm:mb-2 md:mb-3">5+</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-300 font-medium">Years Experience</div>
          </div>
          <div className="team-stats bg-white/5 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/10">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-400 mb-1 sm:mb-2 md:mb-3">12</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-300 font-medium">Publications</div>
          </div>
        </div>
      </div>
    </section>
  )
}

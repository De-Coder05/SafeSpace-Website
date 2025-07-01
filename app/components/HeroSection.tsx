"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, Zap, Shield } from "lucide-react"

interface HeroSectionProps {
  onLearnMore: () => void
}

export default function HeroSection({ onLearnMore }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animations
      gsap.fromTo(
        ".hero-title",
        { y: 80, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
      )

      gsap.fromTo(
        ".hero-subtitle",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" },
      )

      gsap.fromTo(
        ".hero-buttons",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power3.out" },
      )

      // Floating icons animation
      gsap.fromTo(
        ".floating-icon",
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.5,
          delay: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
      )

      // Continuous floating animation
      gsap.to(".floating-icon", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.3,
      })

      // Background orbs animation
      gsap.to(".bg-orb", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      })

      gsap.to(".bg-orb-2", {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: "none",
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Large animated orbs */}
        <div className="bg-orb absolute -top-40 -left-40 w-80 h-80 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="bg-orb-2 absolute -bottom-40 -right-40 w-96 h-96 md:w-[500px] md:h-[500px] bg-teal-500/20 rounded-full blur-3xl"></div>
        <div className="bg-orb absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsUnVsZT0iZXZlbm9kZCI+PGcgZmlsbD0iI2ZmZmZmZiIgZmlsbE9wYWNpdHk9IjAuMDMiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      </div>

      {/* Floating Icons */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <div className="floating-icon absolute top-20 left-8 md:top-32 md:left-20">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl">
            <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
        </div>
        <div className="floating-icon absolute top-32 right-8 md:top-40 md:right-24">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-teal-400 to-green-400 rounded-xl flex items-center justify-center shadow-2xl">
            <Zap className="w-5 h-5 md:w-7 md:h-7 text-white" />
          </div>
        </div>
        <div className="floating-icon absolute bottom-32 left-12 md:bottom-40 md:left-32">
          <div className="w-11 h-11 md:w-15 md:h-15 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-2xl">
            <Shield className="w-5 h-5 md:w-7 md:h-7 text-white" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="space-y-6 md:space-y-8">
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
            <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              Your Mental Health,
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mt-2">
              Empowered by AI
            </span>
          </h1>

          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-100 max-w-4xl mx-auto font-light leading-relaxed px-2">
            Detect stress through voice, sensors, and psychology with cutting-edge multimodal AI technology.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4 md:pt-8">
            <Link href="/check" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border-0"
              >
                Check Yours Now
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={onLearnMore}
              className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-semibold rounded-full bg-white/5 backdrop-blur-sm hover:scale-105 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

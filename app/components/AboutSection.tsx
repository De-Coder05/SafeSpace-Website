"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mic, Activity, FileText, Brain, Cpu, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".info-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".info-title",
            start: "top 85%",
          },
        },
      )

      gsap.fromTo(
        ".feature-card",
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".feature-cards",
            start: "top 85%",
          },
        },
      )

      gsap.fromTo(
        ".about-section",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 85%",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="info-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">
            What is SafeSpace AI?
          </h2>
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto mb-6 sm:mb-8 md:mb-10"></div>
        </div>

        {/* Hero Description */}
        <div className="about-content mb-12 sm:mb-16 md:mb-20">
          <div className="about-section grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
            <div className="space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1">
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                SafeSpace AI is a revolutionary real-time stress detection system that combines{" "}
                <strong className="text-blue-600">accuracy, interpretability, and deployability</strong>. Recognizing
                that stress is complex and varies between individuals and contexts, our platform takes a comprehensive
                multimodal approach.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                By integrating physiological signals, voice-based emotional cues, and self-reported assessments,
                SafeSpace captures a fuller picture of stress than traditional single-modality systems.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aesthetic-frame bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl sm:rounded-3xl aspect-square flex items-center justify-center border-2 border-dashed border-blue-300 hover:border-solid transition-all duration-300">
                <div className="text-center text-blue-600 p-4">
                  <Activity className="w-12 h-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 opacity-60" />
                  <p className="text-sm sm:text-base md:text-lg font-semibold">Multimodal Stress Detection</p>
                  <p className="text-xs sm:text-sm opacity-70 mt-1 sm:mt-2">Real-time Analysis System</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Approach */}
          <div className="about-section mb-12 sm:mb-16 md:mb-20">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-10 md:mb-12 text-center">
              Our Multimodal Approach
            </h3>
            <div className="feature-cards grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
              <Card className="feature-card border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-3 bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-6 sm:p-8 md:p-10 text-center">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 shadow-lg">
                    <Activity className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900">
                    Physiological Signals
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    WESAD dataset integration with EDA, ECG, temperature, and accelerometry for autonomic arousal
                    detection.
                  </p>
                  <div className="text-xs sm:text-sm text-blue-600 font-semibold bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                    Real-time biosignal processing
                  </div>
                </CardContent>
              </Card>

              <Card className="feature-card border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-3 bg-gradient-to-br from-white to-teal-50">
                <CardContent className="p-6 sm:p-8 md:p-10 text-center">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 shadow-lg">
                    <Mic className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900">
                    Voice Analysis
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    RAVDESS and IEMOCAP datasets for emotional cue detection through pitch jitter and harmonic analysis.
                  </p>
                  <div className="text-xs sm:text-sm text-teal-600 font-semibold bg-teal-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                    Advanced speech processing
                  </div>
                </CardContent>
              </Card>

              <Card className="feature-card border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-3 bg-gradient-to-br from-white to-purple-50 md:col-span-2 lg:col-span-1">
                <CardContent className="p-6 sm:p-8 md:p-10 text-center">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 shadow-lg">
                    <FileText className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900">
                    Self-Assessment
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    DASS-21 questionnaire integration for capturing subjective stress experiences and psychological
                    context.
                  </p>
                  <div className="text-xs sm:text-sm text-purple-600 font-semibold bg-purple-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                    Clinical validation
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Explainable AI Section */}
          <div className="about-section grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
            <div className="order-2 lg:order-1">
              <div className="aesthetic-frame bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl sm:rounded-3xl aspect-square flex items-center justify-center border-2 border-dashed border-purple-300 hover:border-solid transition-all duration-300">
                <div className="text-center text-purple-600 p-4">
                  <Brain className="w-12 h-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 opacity-60" />
                  <p className="text-sm sm:text-base md:text-lg font-semibold">Explainable AI</p>
                  <p className="text-xs sm:text-sm opacity-70 mt-1 sm:mt-2">XAI Dashboard</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6 md:space-y-8 order-1 lg:order-2">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Explainable AI Integration</h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                A central goal of SafeSpace is not only to apply explainable AI (XAI), but to compare techniques such as{" "}
                <strong className="text-purple-600">SHAP, LIME, and Integrated Gradients</strong> to understand which
                best aligns with our system structure.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-gray-700 font-medium">
                    SHAP (SHapley Additive exPlanations) for feature importance
                  </span>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-teal-50 rounded-lg sm:rounded-xl">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-teal-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-gray-700 font-medium">
                    LIME for local interpretable model explanations
                  </span>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-purple-50 rounded-lg sm:rounded-xl">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-gray-700 font-medium">
                    Integrated Gradients for deep learning interpretability
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Edge Computing Section */}
          <div className="about-section grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Edge Computing & Real-time Processing
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                Designed for real-world deployment, SafeSpace runs on an{" "}
                <strong className="text-green-600">ESP32-based edge device</strong> with cloud connectivity via
                Firebase, enabling low-latency, secure, and scalable deployment.
              </p>
              <div className="bg-gradient-to-r from-gray-50 to-green-50 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-green-200">
                <h4 className="font-bold text-gray-900 mb-4 sm:mb-6 text-lg sm:text-xl">Technical Specifications:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm sm:text-base text-gray-700">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>ESP32 microcontroller</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Firebase cloud integration</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Low-latency inference</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Enhanced privacy protection</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Real-time data processing</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Scalable architecture</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="aesthetic-frame bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl sm:rounded-3xl aspect-square flex items-center justify-center border-2 border-dashed border-green-300 hover:border-solid transition-all duration-300">
                <div className="text-center text-green-600 p-4">
                  <Cpu className="w-12 h-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 opacity-60" />
                  <p className="text-sm sm:text-base md:text-lg font-semibold">ESP32 Edge Device</p>
                  <p className="text-xs sm:text-sm opacity-70 mt-1 sm:mt-2">Hardware Setup</p>
                </div>
              </div>
            </div>
          </div>

          {/* Research Impact */}
          <div className="about-section bg-gradient-to-r from-blue-50 via-teal-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-blue-200">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                Research Impact & Innovation
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Our experiments demonstrate that thoughtful integration of multimodal data and XAI not only increases
                accuracy but also builds trust, making SafeSpace a significant step toward stress detection tools that
                are as understandable as they are effective.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="text-center bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-2 sm:mb-3">95%+</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Detection Accuracy</div>
              </div>
              <div className="text-center bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-600 mb-2 sm:mb-3">&lt;100ms</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Response Latency</div>
              </div>
              <div className="text-center bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg sm:col-span-3 lg:col-span-1">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-600 mb-2 sm:mb-3">3</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Modalities Integrated</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Mic, MicOff, Wifi, WifiOff, Activity, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

const DASS21_QUESTIONS = [
  "I found it hard to wind down",
  "I was aware of dryness of my mouth",
  "I couldn't seem to experience any positive feeling at all",
  "I experienced breathing difficulty",
  "I found it difficult to work up the initiative to do things",
  "I tended to over-react to situations",
  "I experienced trembling",
  "I felt that I was using a lot of nervous energy",
  "I was worried about situations in which I might panic",
  "I felt that I had nothing to look forward to",
  "I found myself getting agitated",
  "I found it difficult to relax",
  "I felt down-hearted and blue",
  "I was intolerant of anything that kept me from getting on",
  "I felt I was close to panic",
  "I was unable to become enthusiastic about anything",
  "I felt I wasn't worth much as a person",
  "I felt that I was rather touchy",
  "I was aware of the action of my heart without physical exertion",
  "I felt scared without any good reason",
  "I felt that life was meaningless",
]

export default function CheckPage() {
  const [deviceConnected, setDeviceConnected] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [dass21Responses, setDass21Responses] = useState<number[]>(new Array(21).fill(0))
  const [stressResult, setStressResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [allDataReady, setAllDataReady] = useState(false)

  const pageRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".check-section",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      )
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (stressResult && resultsRef.current) {
      gsap.fromTo(
        resultsRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" },
      )
    }
  }, [stressResult])

  // Check if all three modalities have data
  useEffect(() => {
    const hasPhysiological = uploadedFile !== null
    const hasAudio = audioFile !== null || isRecording
    const hasQuestionnaire = dass21Responses.some((response) => response > 0)

    setAllDataReady(hasPhysiological && hasAudio && hasQuestionnaire)
  }, [uploadedFile, audioFile, isRecording, dass21Responses])

  const handleDass21Change = (index: number, value: number) => {
    const newResponses = [...dass21Responses]
    newResponses[index] = value
    setDass21Responses(newResponses)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAudioFile(file)
    }
  }

  const simulateDeviceConnection = () => {
    setDeviceConnected(!deviceConnected)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false)
        setAudioFile(new File([""], "recorded_audio.wav", { type: "audio/wav" }))
      }, 3000)
    }
  }

  const analyzeAllModalities = async () => {
    if (!allDataReady) return

    setIsLoading(true)
    try {
      // Create comprehensive analysis payload
      const analysisData = {
        physiological: uploadedFile ? { filename: uploadedFile.name, size: uploadedFile.size } : null,
        audio: audioFile ? { filename: audioFile.name, duration: "30s" } : null,
        questionnaire: dass21Responses,
        timestamp: new Date().toISOString(),
      }

      const response = await fetch("/api/predict/comprehensive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(analysisData),
      })

      const result = await response.json()
      setStressResult(result)
    } catch (error) {
      console.error("Error analyzing comprehensive data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStressColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      case "moderate":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getCompletionPercentage = () => {
    let completed = 0
    if (uploadedFile) completed += 33
    if (audioFile || isRecording) completed += 33
    if (dass21Responses.some((response) => response > 0)) completed += 34
    return completed
  }

  return (
    <main
      ref={pageRef}
      id="check-page-main"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 py-4 sm:py-6 md:py-8 pt-[120px] scroll-mt-[120px]"
      style={{ scrollMarginTop: '120px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="pt-8 sm:pt-12 md:pt-16"></div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
            Comprehensive Stress Analysis
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
            Complete all three assessments for accurate multimodal stress detection
          </p>

          {/* Progress Indicator */}
          <div className="max-w-md mx-auto mb-6 sm:mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Assessment Progress</span>
              <span>{getCompletionPercentage()}%</span>
            </div>
            <Progress value={getCompletionPercentage()} className="h-2 sm:h-3" />
          </div>

          {!allDataReady && (
            <Alert className="max-w-2xl mx-auto mb-6 sm:mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm sm:text-base">
                Please complete all three modalities (Physiological Data, Voice Recording, and Questionnaire) for
                comprehensive analysis.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column - Input Methods */}
          <div className="space-y-6 sm:space-y-8">
            {/* Hardware Integration Section */}
            <Card className="check-section border-0 shadow-lg sm:shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl md:text-2xl">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-600" />
                  <span>Physiological Data</span>
                  {uploadedFile && <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl sm:rounded-2xl border">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    {deviceConnected ? (
                      <Wifi className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-600" />
                    ) : (
                      <WifiOff className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-400" />
                    )}
                    <span
                      className={`text-sm sm:text-base font-semibold ${deviceConnected ? "text-green-600" : "text-gray-600"}`}
                    >
                      {deviceConnected ? "Device Connected ✅" : "No Device Connected"}
                    </span>
                  </div>
                  <Button
                    onClick={simulateDeviceConnection}
                    variant={deviceConnected ? "destructive" : "default"}
                    size="sm"
                    className="rounded-lg sm:rounded-xl text-xs sm:text-sm"
                  >
                    {deviceConnected ? "Disconnect" : "Connect"}
                  </Button>
                </div>

                <div>
                  <Label
                    htmlFor="file-upload"
                    className="block text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-4"
                  >
                    Upload Physiological Data (CSV/JSON)
                  </Label>
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".csv,.json"
                      onChange={handleFileUpload}
                      className="flex-1 p-3 sm:p-4 text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl"
                    />
                  </div>
                  {uploadedFile && (
                    <p className="text-green-600 mt-2 font-medium text-sm sm:text-base flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>{uploadedFile.name} uploaded</span>
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Voice Recording Section */}
            <Card className="check-section border-0 shadow-lg sm:shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl md:text-2xl">
                  <Mic className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-teal-600" />
                  <span>Voice Analysis</span>
                  {(audioFile || isRecording) && <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="text-center space-y-4 sm:space-y-6">
                  <Button
                    onClick={toggleRecording}
                    className={`w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full text-white font-bold text-base sm:text-lg md:text-xl ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600 animate-pulse shadow-2xl shadow-red-500/50"
                        : "bg-teal-600 hover:bg-teal-700 shadow-2xl shadow-teal-500/50"
                    } transition-all duration-300 hover:scale-105`}
                  >
                    {isRecording ? (
                      <div className="flex flex-col items-center">
                        <MicOff className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 mb-1 sm:mb-2" />
                        <span className="text-xs sm:text-sm">Recording...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Mic className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 mb-1 sm:mb-2" />
                        <span className="text-xs sm:text-sm">Start</span>
                      </div>
                    )}
                  </Button>
                  <p className="text-gray-600 font-medium text-sm sm:text-base">
                    {isRecording ? "Recording your voice... Click to stop" : "Click to start voice recording"}
                  </p>
                </div>

                <div className="border-t pt-4 sm:pt-6">
                  <Label
                    htmlFor="audio-upload"
                    className="block text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-4"
                  >
                    Or Upload Audio File
                  </Label>
                  <Input
                    id="audio-upload"
                    type="file"
                    accept=".wav,.mp3,.m4a"
                    onChange={handleAudioUpload}
                    className="p-3 sm:p-4 text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl"
                  />
                  {audioFile && audioFile.name !== "recorded_audio.wav" && (
                    <p className="text-green-600 mt-2 font-medium text-sm sm:text-base flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>{audioFile.name} uploaded</span>
                    </p>
                  )}
                  {audioFile && audioFile.name === "recorded_audio.wav" && (
                    <p className="text-green-600 mt-2 font-medium text-sm sm:text-base flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Voice recorded successfully</span>
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* DASS-21 Questionnaire */}
            <Card className="check-section border-0 shadow-lg sm:shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl md:text-2xl">
                  <span>DASS-21 Questionnaire</span>
                  {dass21Responses.some((response) => response > 0) && (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  )}
                </CardTitle>
                <p className="text-gray-600 font-medium text-sm sm:text-base">
                  Rate each statement: 0 = Never, 1 = Sometimes, 2 = Often, 3 = Almost Always
                </p>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 max-h-80 sm:max-h-96 overflow-y-auto">
                {DASS21_QUESTIONS.map((question, index) => (
                  <div key={index} className="space-y-2 sm:space-y-3 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                    <Label className="font-medium text-gray-800 text-sm sm:text-base">
                      {index + 1}. {question}
                    </Label>
                    <div className="flex space-x-2 sm:space-x-3">
                      {[0, 1, 2, 3].map((value) => (
                        <Button
                          key={value}
                          variant={dass21Responses[index] === value ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleDass21Change(index, value)}
                          className="w-10 h-8 sm:w-12 sm:h-10 md:w-16 md:h-12 text-sm sm:text-base md:text-lg font-semibold rounded-lg sm:rounded-xl"
                        >
                          {value}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Analysis & Results */}
          <div className="space-y-6 sm:space-y-8">
            {/* Analysis Button */}
            <Card className="check-section border-0 shadow-lg sm:shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8 text-center">
                <Button
                  onClick={analyzeAllModalities}
                  disabled={!allDataReady || isLoading}
                  className="w-full py-4 sm:py-6 text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 hover:from-blue-700 hover:via-teal-700 hover:to-purple-700 text-white rounded-xl sm:rounded-2xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    "Analyze Comprehensive Stress Level"
                  )}
                </Button>
                {!allDataReady && (
                  <p className="text-gray-500 mt-3 sm:mt-4 text-sm sm:text-base">
                    Complete all three assessments to enable analysis
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            {stressResult && (
              <Card
                ref={resultsRef}
                className={`check-section border-2 shadow-2xl ${getStressColor(stressResult.level)} bg-white/90 backdrop-blur-sm`}
              >
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-center text-xl sm:text-2xl font-bold">
                    Comprehensive Stress Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <div className="text-5xl sm:text-6xl md:text-7xl font-bold mb-3 sm:mb-4">{stressResult.score}%</div>
                    <div className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{stressResult.level} Stress Level</div>
                    <Progress value={stressResult.score} className="w-full h-4 sm:h-6 rounded-full" />
                  </div>

                  {/* Modality Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
                    <div className="p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl">
                      <div className="text-xl sm:text-2xl font-bold text-blue-600">{stressResult.physiological}%</div>
                      <div className="text-xs sm:text-sm text-gray-600">Physiological</div>
                    </div>
                    <div className="p-3 sm:p-4 bg-teal-50 rounded-lg sm:rounded-xl">
                      <div className="text-xl sm:text-2xl font-bold text-teal-600">{stressResult.voice}%</div>
                      <div className="text-xs sm:text-sm text-gray-600">Voice</div>
                    </div>
                    <div className="p-3 sm:p-4 bg-purple-50 rounded-lg sm:rounded-xl">
                      <div className="text-xl sm:text-2xl font-bold text-purple-600">{stressResult.questionnaire}%</div>
                      <div className="text-xs sm:text-sm text-gray-600">Questionnaire</div>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <h4 className="font-bold text-base sm:text-lg">Recommendations:</h4>
                    <ul className="list-disc list-inside space-y-1 sm:space-y-2">
                      {stressResult.recommendations?.map((rec: string, index: number) => (
                        <li key={index} className="text-gray-700 text-sm sm:text-base">
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-center text-xs sm:text-sm text-gray-500 border-t pt-3 sm:pt-4">
                    Analysis completed at {new Date(stressResult.timestamp).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            )}

            {!stressResult && !isLoading && (
              <Card className="check-section border-0 shadow-lg sm:shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 sm:p-10 md:p-12 text-center">
                  <Activity className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 text-gray-400 mx-auto mb-4 sm:mb-6" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-600 mb-3 sm:mb-4">
                    Ready for Comprehensive Analysis
                  </h3>
                  <p className="text-gray-500 text-base sm:text-lg">
                    Complete all three assessment methods to receive your detailed multimodal stress analysis.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

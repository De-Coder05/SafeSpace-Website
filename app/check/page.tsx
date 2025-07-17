"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Mic, Upload, Activity, FileText, Brain, Zap, BarChart3 } from "lucide-react"

// Sample XAI images arrays (you can replace these with actual image URLs)
const xaiImages = {
  voice: [
    "/placeholder.svg?height=300&width=400&text=Voice+XAI+Graph+1",
    "/placeholder.svg?height=300&width=400&text=Voice+XAI+Graph+2",
    "/placeholder.svg?height=300&width=400&text=Voice+XAI+Graph+3",
  ],
  physiological: [
    "/placeholder.svg?height=300&width=400&text=Physiological+XAI+Graph+1",
    "/placeholder.svg?height=300&width=400&text=Physiological+XAI+Graph+2",
    "/placeholder.svg?height=300&width=400&text=Physiological+XAI+Graph+3",
  ],
  lateFusion: [
    "/placeholder.svg?height=300&width=400&text=Late+Fusion+XAI+Graph+1",
    "/placeholder.svg?height=300&width=400&text=Late+Fusion+XAI+Graph+2",
    "/placeholder.svg?height=300&width=400&text=Late+Fusion+XAI+Graph+3",
  ],
  questionnaire: [
    "/placeholder.svg?height=300&width=400&text=Questionnaire+XAI+Graph+1",
    "/placeholder.svg?height=300&width=400&text=Questionnaire+XAI+Graph+2",
    "/placeholder.svg?height=300&width=400&text=Questionnaire+XAI+Graph+3",
  ],
}

const stressQuestions = [
  "I found it hard to wind down",
  "I was aware of dryness of my mouth",
  "I couldn't seem to experience any positive feeling at all",
  "I experienced breathing difficulty (eg, excessively rapid breathing, breathlessness in the absence of physical exertion)",
  "I found it difficult to work up the initiative to do things",
  "I tended to over-react to situations",
  "I experienced trembling (eg, in the hands)",
]

export default function CheckPage() {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [physiologicalData, setPhysiologicalData] = useState("")
  const [questionnaire, setQuestionnaire] = useState<Record<string, string>>({})
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any>(null)
  const [selectedXaiImages, setSelectedXaiImages] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file)
    }
  }

  const handleQuestionnaireChange = (questionIndex: number, value: string) => {
    setQuestionnaire((prev) => ({
      ...prev,
      [questionIndex]: value,
    }))
  }

  const getRandomXaiImages = () => {
    return {
      voice: xaiImages.voice[Math.floor(Math.random() * xaiImages.voice.length)],
      physiological: xaiImages.physiological[Math.floor(Math.random() * xaiImages.physiological.length)],
      lateFusion: xaiImages.lateFusion[Math.floor(Math.random() * xaiImages.lateFusion.length)],
      questionnaire: xaiImages.questionnaire[Math.floor(Math.random() * xaiImages.questionnaire.length)],
    }
  }

  const generateHardcodedResults = () => {
    const isHighStress = Math.random() > 0.5
    const stressLevel = isHighStress ? "High Stress" : "Low Stress"
    const score = isHighStress
      ? Math.floor(Math.random() * 31) + 70 // 70-100%
      : Math.floor(Math.random() * 41) + 10 // 10-50%

    return {
      overallStress: stressLevel,
      stressScore: score,
      recommendations: isHighStress
        ? [
            "Consider taking regular breaks throughout your day",
            "Practice deep breathing exercises or meditation",
            "Engage in physical activity to reduce stress hormones",
            "Ensure you're getting adequate sleep (7-9 hours)",
            "Consider speaking with a mental health professional",
          ]
        : [
            "Maintain your current stress management practices",
            "Continue with regular exercise and healthy habits",
            "Keep up good sleep hygiene",
            "Stay connected with supportive friends and family",
            "Consider mindfulness practices to maintain balance",
          ],
    }
  }

  const handleAnalyze = async () => {
    if (!audioFile || !physiologicalData.trim() || Object.keys(questionnaire).length < stressQuestions.length) {
      alert("Please complete all three sections before analyzing.")
      return
    }

    setIsAnalyzing(true)
    setProgress(0)
    setResults(null)

    // Select random XAI images
    const randomImages = getRandomXaiImages()
    setSelectedXaiImages(randomImages)

    // Simulate 60-second analysis with progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setResults(generateHardcodedResults())
          return 100
        }
        return prev + 100 / 60 // Increment by ~1.67% per second for 60 seconds
      })
    }, 1000)
  }

  const isFormComplete =
    audioFile && physiologicalData.trim() && Object.keys(questionnaire).length === stressQuestions.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Stress Analysis</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete all three sections below for a comprehensive stress analysis using our advanced AI technology.
          </p>
        </div>

        {!isAnalyzing && !results && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Audio Input Section */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mic className="w-5 h-5 text-blue-600" />
                  <span>Voice Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="audio-upload">Upload Audio File</Label>
                  <div className="mt-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="audio/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="audio-upload"
                    />
                    <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      {audioFile ? audioFile.name : "Choose Audio File"}
                    </Button>
                  </div>
                </div>
                {audioFile && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">✓ Audio file uploaded successfully</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Physiological Data Section */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-red-600" />
                  <span>Physiological Data</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="physio-data">Sensor Data (JSON format)</Label>
                  <Textarea
                    id="physio-data"
                    placeholder='{"heartRate": 75, "skinConductance": 0.5, "temperature": 98.6}'
                    value={physiologicalData}
                    onChange={(e) => setPhysiologicalData(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                {physiologicalData.trim() && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">✓ Physiological data entered</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Questionnaire Section */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span>Stress Questionnaire</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {stressQuestions.map((question, index) => (
                  <div key={index} className="space-y-2">
                    <Label className="text-sm font-medium">{question}</Label>
                    <RadioGroup
                      value={questionnaire[index] || ""}
                      onValueChange={(value) => handleQuestionnaireChange(index, value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id={`q${index}-0`} />
                        <Label htmlFor={`q${index}-0`} className="text-sm">
                          Never
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id={`q${index}-1`} />
                        <Label htmlFor={`q${index}-1`} className="text-sm">
                          Sometimes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id={`q${index}-2`} />
                        <Label htmlFor={`q${index}-2`} className="text-sm">
                          Often
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3" id={`q${index}-3`} />
                        <Label htmlFor={`q${index}-3`} className="text-sm">
                          Always
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}
                {Object.keys(questionnaire).length === stressQuestions.length && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">✓ Questionnaire completed</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analysis Button */}
        {!isAnalyzing && !results && (
          <div className="text-center mb-8">
            <Button onClick={handleAnalyze} disabled={!isFormComplete} size="lg" className="px-8 py-3 text-lg">
              <Brain className="w-5 h-5 mr-2" />
              Analyze Stress Level
            </Button>
            {!isFormComplete && (
              <p className="text-sm text-gray-500 mt-2">Please complete all three sections to enable analysis</p>
            )}
          </div>
        )}

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Brain className="w-16 h-16 mx-auto text-blue-600 animate-pulse mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Analyzing Your Stress Level</h3>
                <p className="text-gray-600">
                  Our AI is processing your multimodal data. This may take up to 60 seconds.
                </p>
              </div>
              <div className="max-w-md mx-auto">
                <Progress value={progress} className="h-3 mb-2" />
                <p className="text-sm text-gray-500">{Math.round(progress)}% Complete</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {results && (
          <div className="space-y-8">
            {/* Overall Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <span>Analysis Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Stress Level</h3>
                    <p
                      className={`text-3xl font-bold ${
                        results.overallStress === "High Stress" ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {results.overallStress}
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Stress Score</h3>
                    <p
                      className={`text-3xl font-bold ${results.stressScore >= 70 ? "text-red-600" : "text-green-600"}`}
                    >
                      {results.stressScore}%
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Recommendations</h4>
                  <ul className="space-y-2">
                    {results.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* XAI Graphs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <span>Explainable AI Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <Mic className="w-5 h-5 text-blue-600" />
                      <span>XAI Graph for Voice</span>
                    </h4>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={selectedXaiImages.voice || "/placeholder.svg"}
                        alt="Voice XAI Analysis"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-red-600" />
                      <span>XAI Graph for Physiological</span>
                    </h4>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={selectedXaiImages.physiological || "/placeholder.svg"}
                        alt="Physiological XAI Analysis"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-yellow-600" />
                      <span>XAI Graph for Late Fusion</span>
                    </h4>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={selectedXaiImages.lateFusion || "/placeholder.svg"}
                        alt="Late Fusion XAI Analysis"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      <span>XAI Graph for Questionnaire</span>
                    </h4>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={selectedXaiImages.questionnaire || "/placeholder.svg"}
                        alt="Questionnaire XAI Analysis"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* New Analysis Button */}
            <div className="text-center">
              <Button
                onClick={() => {
                  setResults(null)
                  setProgress(0)
                  setSelectedXaiImages({})
                }}
                variant="outline"
                size="lg"
              >
                Run New Analysis
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

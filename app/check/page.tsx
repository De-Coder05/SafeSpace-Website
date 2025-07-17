"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mic, Activity, FileText, Brain, Zap, Shield, Heart, Upload, CheckCircle, AlertCircle } from "lucide-react"

// Sample XAI images for each modality
const xaiImages = {
  voice: [
    "/placeholder.svg?height=200&width=300&text=Voice+XAI+Graph+1",
    "/placeholder.svg?height=200&width=300&text=Voice+XAI+Graph+2",
    "/placeholder.svg?height=200&width=300&text=Voice+XAI+Graph+3",
  ],
  physiological: [
    "/placeholder.svg?height=200&width=300&text=Physiological+XAI+Graph+1",
    "/placeholder.svg?height=200&width=300&text=Physiological+XAI+Graph+2",
    "/placeholder.svg?height=200&width=300&text=Physiological+XAI+Graph+3",
  ],
  latefusion: [
    "/placeholder.svg?height=200&width=300&text=Late+Fusion+XAI+Graph+1",
    "/placeholder.svg?height=200&width=300&text=Late+Fusion+XAI+Graph+2",
    "/placeholder.svg?height=200&width=300&text=Late+Fusion+XAI+Graph+3",
  ],
  questionnaire: [
    "/placeholder.svg?height=200&width=300&text=Questionnaire+XAI+Graph+1",
    "/placeholder.svg?height=200&width=300&text=Questionnaire+XAI+Graph+2",
    "/placeholder.svg?height=200&width=300&text=Questionnaire+XAI+Graph+3",
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
  const [physiologicalFile, setPhysiologicalFile] = useState<File | null>(null)
  const [heartRate, setHeartRate] = useState("")
  const [bloodPressure, setBloodPressure] = useState("")
  const [skinConductance, setSkinConductance] = useState("")
  const [useManualInput, setUseManualInput] = useState(true)
  const [questionnaire, setQuestionnaire] = useState<number[]>(new Array(7).fill(0))
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<any>(null)

  const handleQuestionnaireChange = (index: number, value: number) => {
    const newQuestionnaire = [...questionnaire]
    newQuestionnaire[index] = value
    setQuestionnaire(newQuestionnaire)
  }

  const handlePhysiologicalFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.type === "text/csv" || file.name.endsWith(".csv"))) {
      setPhysiologicalFile(file)
      // Clear manual inputs when file is uploaded
      setHeartRate("")
      setBloodPressure("")
      setSkinConductance("")
    } else {
      alert("Please upload a valid CSV file")
    }
  }

  const isFormValid = () => {
    const hasAudio = audioFile !== null
    const hasPhysiological = useManualInput ? heartRate && bloodPressure && skinConductance : physiologicalFile !== null
    const hasQuestionnaire = questionnaire.every((answer) => answer > 0)

    return hasAudio && hasPhysiological && hasQuestionnaire
  }

  const handleAnalyze = async () => {
    if (!isFormValid()) {
      alert("Please complete all sections before analyzing.")
      return
    }

    setIsAnalyzing(true)
    setProgress(0)
    setResult(null)

    // Progress bar animation over 60 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 100 / 600 // 60 seconds = 600 intervals of 100ms
      })
    }, 100)

    // Generate result after 60 seconds
    setTimeout(() => {
      const isHighStress = Math.random() > 0.5
      const stressLevel = isHighStress ? "High Stress" : "Low Stress"
      const score = isHighStress ? Math.floor(Math.random() * 31) + 70 : Math.floor(Math.random() * 41) + 10

      // Select random XAI images
      const selectedXaiImages = {
        voice: xaiImages.voice[Math.floor(Math.random() * 3)],
        physiological: xaiImages.physiological[Math.floor(Math.random() * 3)],
        latefusion: xaiImages.latefusion[Math.floor(Math.random() * 3)],
        questionnaire: xaiImages.questionnaire[Math.floor(Math.random() * 3)],
      }

      setResult({
        stressLevel,
        score,
        xaiImages: selectedXaiImages,
        recommendations: isHighStress
          ? [
              "Consider taking regular breaks throughout your day",
              "Practice deep breathing exercises or meditation",
              "Engage in physical activity to reduce stress hormones",
              "Ensure you get adequate sleep (7-9 hours per night)",
              "Consider speaking with a mental health professional",
            ]
          : [
              "Maintain your current stress management practices",
              "Continue regular exercise and healthy sleep habits",
              "Stay connected with friends and family",
              "Keep practicing mindfulness or relaxation techniques",
              "Monitor your stress levels regularly",
            ],
      })

      setIsAnalyzing(false)
      clearInterval(progressInterval)
    }, 60000)
  }

  const resetForm = () => {
    setResult(null)
    setAudioFile(null)
    setPhysiologicalFile(null)
    setHeartRate("")
    setBloodPressure("")
    setSkinConductance("")
    setQuestionnaire(new Array(7).fill(0))
    setProgress(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Stress Analysis</h1>
          <p className="text-xl text-gray-600">Upload your data for multimodal stress detection</p>
        </div>

        {!result && !isAnalyzing && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Audio Analysis */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-blue-600" />
                  Voice Analysis
                  {audioFile && <CheckCircle className="h-4 w-4 text-green-500" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <Label htmlFor="audio" className="cursor-pointer">
                      <span className="text-sm font-medium">Upload Audio File</span>
                      <p className="text-xs text-gray-500 mt-1">MP3, WAV, M4A supported</p>
                    </Label>
                    <Input
                      id="audio"
                      type="file"
                      accept="audio/*"
                      onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </div>
                  {audioFile && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800">{audioFile.name}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Physiological Data */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-red-600" />
                  Physiological Data
                  {(physiologicalFile || (heartRate && bloodPressure && skinConductance)) && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Toggle between file upload and manual input */}
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <Button
                      variant={useManualInput ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setUseManualInput(true)
                        setPhysiologicalFile(null)
                      }}
                    >
                      Manual Input
                    </Button>
                    <Button
                      variant={!useManualInput ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setUseManualInput(false)
                        setHeartRate("")
                        setBloodPressure("")
                        setSkinConductance("")
                      }}
                    >
                      CSV Upload
                    </Button>
                  </div>

                  {useManualInput ? (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
                        <Input
                          id="heartRate"
                          type="number"
                          placeholder="e.g., 72"
                          value={heartRate}
                          onChange={(e) => setHeartRate(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                        <Input
                          id="bloodPressure"
                          placeholder="e.g., 120/80"
                          value={bloodPressure}
                          onChange={(e) => setBloodPressure(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="skinConductance">Skin Conductance (μS)</Label>
                        <Input
                          id="skinConductance"
                          type="number"
                          step="0.1"
                          placeholder="e.g., 2.5"
                          value={skinConductance}
                          onChange={(e) => setSkinConductance(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <Label htmlFor="physiological-csv" className="cursor-pointer">
                          <span className="text-sm font-medium">Upload CSV File</span>
                          <p className="text-xs text-gray-500 mt-1">
                            CSV with heart rate, blood pressure, skin conductance data
                          </p>
                        </Label>
                        <Input
                          id="physiological-csv"
                          type="file"
                          accept=".csv"
                          onChange={handlePhysiologicalFileUpload}
                          className="hidden"
                        />
                      </div>
                      {physiologicalFile && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-800">{physiologicalFile.name}</span>
                        </div>
                      )}
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-xs">
                          CSV should contain columns: heart_rate, blood_pressure_systolic, blood_pressure_diastolic,
                          skin_conductance
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Questionnaire */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Stress Questionnaire
                  {questionnaire.every((answer) => answer > 0) && <CheckCircle className="h-4 w-4 text-green-500" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {stressQuestions.map((question, index) => (
                    <div key={index} className="space-y-2">
                      <Label className="text-sm font-medium">
                        {index + 1}. {question}
                      </Label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((value) => (
                          <button
                            key={value}
                            onClick={() => handleQuestionnaireChange(index, value)}
                            className={`px-2 py-1 text-xs rounded transition-colors ${
                              questionnaire[index] === value
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 mt-4 p-2 bg-gray-50 rounded">
                    <strong>Scale:</strong> 1 = Never, 2 = Sometimes, 3 = Often, 4 = Almost Always
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Analyzing Your Data...</h3>
                <p className="text-gray-600">
                  Our AI is processing your multimodal data for comprehensive stress analysis
                </p>
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-gray-500">{Math.round(progress)}% Complete</p>
                <p className="text-xs text-gray-400">
                  This process takes approximately 60 seconds for accurate results
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8">
            {/* Main Result */}
            <Card className="border-2 border-blue-200">
              <CardContent className="p-8 text-center">
                <div
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xl font-bold mb-4 ${
                    result.stressLevel === "High Stress" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                  }`}
                >
                  {result.stressLevel === "High Stress" ? (
                    <Shield className="h-6 w-6" />
                  ) : (
                    <Heart className="h-6 w-6" />
                  )}
                  {result.stressLevel}
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{result.score}%</p>
                <p className="text-gray-600">Stress Level Score</p>
              </CardContent>
            </Card>

            {/* XAI Graphs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Explainable AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <h4 className="font-semibold mb-2 flex items-center justify-center gap-2">
                      <Mic className="h-4 w-4 text-blue-600" />
                      XAI Graph for Voice
                    </h4>
                    <img
                      src={result.xaiImages.voice || "/placeholder.svg"}
                      alt="Voice XAI Analysis"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold mb-2 flex items-center justify-center gap-2">
                      <Activity className="h-4 w-4 text-red-600" />
                      XAI Graph for Physiological
                    </h4>
                    <img
                      src={result.xaiImages.physiological || "/placeholder.svg"}
                      alt="Physiological XAI Analysis"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold mb-2 flex items-center justify-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-600" />
                      XAI Graph for Late Fusion
                    </h4>
                    <img
                      src={result.xaiImages.latefusion || "/placeholder.svg"}
                      alt="Late Fusion XAI Analysis"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold mb-2 flex items-center justify-center gap-2">
                      <FileText className="h-4 w-4 text-green-600" />
                      XAI Graph for Questionnaire
                    </h4>
                    <img
                      src={result.xaiImages.questionnaire || "/placeholder.svg"}
                      alt="Questionnaire XAI Analysis"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {result.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* New Analysis Button */}
            <div className="text-center">
              <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                Start New Analysis
              </Button>
            </div>
          </div>
        )}

        {/* Analyze Button */}
        {!result && !isAnalyzing && (
          <div className="text-center">
            <Button
              onClick={handleAnalyze}
              disabled={!isFormValid()}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 px-8 py-3 text-lg font-semibold"
            >
              <Brain className="h-5 w-5 mr-2" />
              Analyze Stress Level
            </Button>
            {!isFormValid() && (
              <p className="text-red-600 text-sm mt-2">Please complete all three sections to proceed</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Camera, FileUp, Upload } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function StudentPage() {
  const [activeTab, setActiveTab] = useState("upload")
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [evaluationComplete, setEvaluationComplete] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleUpload = () => {
    if (files.length === 0) return

    setIsUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
        setIsEvaluating(true)

        // Simulate evaluation process
        setTimeout(() => {
          setIsEvaluating(false)
          setEvaluationComplete(true)
        }, 3000)
      }
    }, 500)
  }

  const activateCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
      setStream(mediaStream)
      setCameraActive(true)
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  const deactivateCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setCameraActive(false)
  }

  const captureImage = () => {
    // In a real app, this would capture the image from the video stream
    deactivateCamera()
    setIsUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
        setIsEvaluating(true)

        // Simulate evaluation process
        setTimeout(() => {
          setIsEvaluating(false)
          setEvaluationComplete(true)
        }, 3000)
      }
    }, 500)
  }

  const resetForm = () => {
    setFiles([])
    setIsUploading(false)
    setUploadProgress(0)
    setIsEvaluating(false)
    setEvaluationComplete(false)
    deactivateCamera()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

          {!evaluationComplete ? (
            <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Upload Files</TabsTrigger>
                <TabsTrigger value="camera">Use Camera</TabsTrigger>
              </TabsList>
              <TabsContent value="upload" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Answer Sheet</CardTitle>
                    <CardDescription>Upload your answer sheet as an image or PDF file.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isUploading ? (
                      <div className="space-y-4">
                        <p>Uploading your files...</p>
                        <Progress value={uploadProgress} className="h-2 w-full" />
                      </div>
                    ) : isEvaluating ? (
                      <div className="space-y-4 text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="text-lg font-medium">Evaluating your answer sheet...</p>
                        <p className="text-sm text-gray-500">This may take a few moments.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center w-full">
                          <Label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <FileUp className="w-10 h-10 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PDF, PNG, JPG or JPEG (MAX. 10MB)
                              </p>
                            </div>
                            {files.length > 0 && (
                              <div className="mt-4 text-center">
                                <p className="text-sm font-medium">
                                  {files.length} file{files.length > 1 ? "s" : ""} selected
                                </p>
                                <ul className="mt-2 text-xs text-gray-500">
                                  {files.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            <Input
                              id="file-upload"
                              type="file"
                              accept=".pdf,.png,.jpg,.jpeg"
                              multiple
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </Label>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={resetForm} disabled={isUploading || isEvaluating}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpload} disabled={files.length === 0 || isUploading || isEvaluating}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload for Evaluation
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="camera" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Capture Answer Sheet</CardTitle>
                    <CardDescription>Use your camera to capture your answer sheet.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isUploading ? (
                      <div className="space-y-4">
                        <p>Uploading your image...</p>
                        <Progress value={uploadProgress} className="h-2 w-full" />
                      </div>
                    ) : isEvaluating ? (
                      <div className="space-y-4 text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="text-lg font-medium">Evaluating your answer sheet...</p>
                        <p className="text-sm text-gray-500">This may take a few moments.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cameraActive ? (
                          <div className="relative">
                            <video
                              ref={(videoElement) => {
                                if (videoElement && stream) {
                                  videoElement.srcObject = stream
                                  videoElement.play()
                                }
                              }}
                              className="w-full h-64 bg-black rounded-lg"
                              autoPlay
                              playsInline
                            />
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                              <Button onClick={captureImage} variant="secondary" className="mx-2">
                                Capture
                              </Button>
                              <Button onClick={deactivateCamera} variant="destructive" className="mx-2">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                            onClick={activateCamera}
                          >
                            <Camera className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to activate camera</span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Make sure your answer sheet is clearly visible
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={resetForm} disabled={isUploading || isEvaluating}>
                      Cancel
                    </Button>
                    {!cameraActive && (
                      <Button onClick={activateCamera} disabled={isUploading || isEvaluating}>
                        <Camera className="mr-2 h-4 w-4" />
                        Activate Camera
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Evaluation Results</CardTitle>
                <CardDescription>Here are the results of your answer sheet evaluation.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center py-4">
                    <div className="inline-flex items-center justify-center rounded-full w-24 h-24 bg-green-100 text-green-800 mb-4">
                      <span className="text-3xl font-bold">85%</span>
                    </div>
                    <h3 className="text-xl font-bold">Great job!</h3>
                    <p className="text-gray-500">Your answer sheet has been evaluated successfully.</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Score Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Question 1</span>
                        <span className="font-medium">10/10</span>
                      </div>
                      <Progress value={100} className="h-2" />
                      <p className="text-sm text-green-600">Perfect answer! Well explained with all key points.</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Question 2</span>
                        <span className="font-medium">8/10</span>
                      </div>
                      <Progress value={80} className="h-2" />
                      <p className="text-sm text-amber-600">
                        Good answer, but missed some important details about the second concept.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Question 3</span>
                        <span className="font-medium">7/10</span>
                      </div>
                      <Progress value={70} className="h-2" />
                      <p className="text-sm text-amber-600">
                        Partially correct. The explanation could be more comprehensive.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Question 4</span>
                        <span className="font-medium">10/10</span>
                      </div>
                      <Progress value={100} className="h-2" />
                      <p className="text-sm text-green-600">Excellent work! All calculations are correct.</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Question 5</span>
                        <span className="font-medium">8/10</span>
                      </div>
                      <Progress value={80} className="h-2" />
                      <p className="text-sm text-amber-600">Good attempt, but the conclusion could be stronger.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Areas for Improvement</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Work on providing more comprehensive explanations for theoretical concepts.</li>
                      <li>Include more supporting evidence in your arguments.</li>
                      <li>Pay attention to the conclusion sections of your answers.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetForm}>
                  Evaluate Another
                </Button>
                <Button>Download Report</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}


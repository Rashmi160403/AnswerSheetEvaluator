"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, Plus, FileText, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TeacherPage() {
  const [activeTab, setActiveTab] = useState("answer-key")
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [evaluationComplete, setEvaluationComplete] = useState(false)
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")

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

  const resetForm = () => {
    setFiles([])
    setIsUploading(false)
    setUploadProgress(0)
    setIsEvaluating(false)
    setEvaluationComplete(false)
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
          <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>

          {!evaluationComplete ? (
            <Tabs defaultValue="answer-key" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="answer-key">Upload Answer Key</TabsTrigger>
                <TabsTrigger value="student-sheets">Student Answer Sheets</TabsTrigger>
              </TabsList>
              <TabsContent value="answer-key" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Answer Key</CardTitle>
                    <CardDescription>Upload or create an answer key for your assessment.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isUploading ? (
                      <div className="space-y-4">
                        <p>Uploading your answer key...</p>
                        <Progress value={uploadProgress} className="h-2 w-full" />
                      </div>
                    ) : isEvaluating ? (
                      <div className="space-y-4 text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="text-lg font-medium">Processing your answer key...</p>
                        <p className="text-sm text-gray-500">This may take a few moments.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="class">Class/Grade</Label>
                            <Select value={selectedClass} onValueChange={setSelectedClass}>
                              <SelectTrigger id="class">
                                <SelectValue placeholder="Select class" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Polytechnic">Polytechnic</SelectItem>
                                <SelectItem value="B.tech">B.Tech</SelectItem>
                                <SelectItem value="M.Tech">M.Tech</SelectItem>
                                <SelectItem value="Phd">Phd</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="assessment-title" placeholder="Enter Subject" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="assessment-title">Assessment Title</Label>
                          <Input id="assessment-title" placeholder="Midterm Exam, Final Test, etc." />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="file-upload">Upload Answer Key</Label>
                            <Button variant="outline" size="sm" className="h-8">
                              <Plus className="h-4 w-4 mr-1" /> Create New
                            </Button>
                          </div>
                          <div className="flex items-center justify-center w-full">
                            <Label
                              htmlFor="file-upload"
                              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <FileText className="w-10 h-10 mb-3 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  PDF, DOCX, or TXT (MAX. 10MB)
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
                                accept=".pdf,.docx,.txt"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                            </Label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes">Additional Notes</Label>
                          <Textarea id="notes" placeholder="Any special instructions or notes about grading criteria" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={resetForm} disabled={isUploading || isEvaluating}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleUpload}
                      disabled={(!files.length && (!selectedClass || !selectedSubject)) || isUploading || isEvaluating}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Save Answer Key
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="student-sheets" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Student Answer Sheets</CardTitle>
                    <CardDescription>Upload answer sheets from your students for batch evaluation.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isUploading ? (
                      <div className="space-y-4">
                        <p>Uploading student answer sheets...</p>
                        <Progress value={uploadProgress} className="h-2 w-full" />
                      </div>
                    ) : isEvaluating ? (
                      <div className="space-y-4 text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="text-lg font-medium">Evaluating answer sheets...</p>
                        <p className="text-sm text-gray-500">This may take a few moments.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="class-select">Class/Grade</Label>
                            <Select value={selectedClass} onValueChange={setSelectedClass}>
                              <SelectTrigger id="class-select">
                                <SelectValue placeholder="Select class" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Polytechnic">Polytechnic</SelectItem>
                                <SelectItem value="B.tech">B.tech</SelectItem>
                                <SelectItem value="M.tech">M.tech</SelectItem>
                                <SelectItem value="Phd">Phd</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="assessment">Assessment</Label>
                            <Select>
                              <SelectTrigger id="assessment">
                                <SelectValue placeholder="Select assessment" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="midterm">Midterm Exam</SelectItem>
                                <SelectItem value="final">Final Exam</SelectItem>
                                <SelectItem value="quiz1">Quiz 1</SelectItem>
                                <SelectItem value="assignment2">Assignment 2</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="student-sheets-upload">Upload Student Answer Sheets</Label>
                            <span className="text-sm text-gray-500">Upload multiple files at once</span>
                          </div>
                          <div className="flex items-center justify-center w-full">
                            <Label
                              htmlFor="student-sheets-upload"
                              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Users className="w-10 h-10 mb-3 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  PDF, PNG, JPG or JPEG (MAX. 10MB per file)
                                </p>
                              </div>
                              {files.length > 0 && (
                                <div className="mt-4 text-center">
                                  <p className="text-sm font-medium">
                                    {files.length} file{files.length > 1 ? "s" : ""} selected
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {files.length} student answer sheet{files.length > 1 ? "s" : ""} ready for
                                    evaluation
                                  </p>
                                </div>
                              )}
                              <Input
                                id="student-sheets-upload"
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg"
                                multiple
                                className="hidden"
                                onChange={handleFileChange}
                              />
                            </Label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="naming-convention">File Naming Convention</Label>
                          <Select defaultValue="student-id">
                            <SelectTrigger id="naming-convention">
                              <SelectValue placeholder="Select naming convention" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student-id">Student ID</SelectItem>
                              <SelectItem value="student-name">Student Name</SelectItem>
                              <SelectItem value="custom">Custom Format</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500 mt-1">
                            This helps us match answer sheets to the correct students
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={resetForm} disabled={isUploading || isEvaluating}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleUpload}
                      disabled={files.length === 0 || !selectedClass || isUploading || isEvaluating}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload for Evaluation
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Batch Evaluation Results</CardTitle>
                <CardDescription>Evaluation completed for {files.length} student answer sheets.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center py-4">
                    <div className="inline-flex items-center justify-center rounded-full w-24 h-24 bg-green-100 text-green-800 mb-4">
                      <span className="text-3xl font-bold">100%</span>
                    </div>
                    <h3 className="text-xl font-bold">Evaluation Complete</h3>
                    <p className="text-gray-500">All answer sheets have been successfully evaluated.</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Class Performance Summary</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Class Average</span>
                        <span className="font-medium">76%</span>
                      </div>
                      <Progress value={76} className="h-2" />

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="border rounded-lg p-4 text-center">
                          <p className="text-sm text-gray-500">Highest Score</p>
                          <p className="text-2xl font-bold">98%</p>
                          <p className="text-sm">Student ID: S12345</p>
                        </div>
                        <div className="border rounded-lg p-4 text-center">
                          <p className="text-sm text-gray-500">Lowest Score</p>
                          <p className="text-2xl font-bold">52%</p>
                          <p className="text-sm">Student ID: S54321</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Question Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Question 1</span>
                        <span className="font-medium">92% correct</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Question 2</span>
                        <span className="font-medium">78% correct</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Question 3</span>
                        <span className="font-medium">45% correct</span>
                      </div>
                      <Progress value={45} className="h-2" />
                      <p className="text-sm text-red-600">This question was challenging for most students.</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Question 4</span>
                        <span className="font-medium">88% correct</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Question 5</span>
                        <span className="font-medium">67% correct</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Recommendations</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Review the concepts in Question 3 as many students struggled with this topic.</li>
                      <li>Consider providing additional practice on topics related to Questions 3 and 5.</li>
                      <li>
                        The class performed well on Questions 1 and 4, indicating strong understanding of these topics.
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetForm}>
                  Evaluate Another Batch
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">Individual Reports</Button>
                  <Button>Download Class Report</Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}


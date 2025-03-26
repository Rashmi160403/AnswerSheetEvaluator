import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-6 w-6" />
            <span>Answer Sheet Evaluator</span>
          </Link>
          <nav className="ml-auto flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Automated Answer Sheet Evaluation Made Simple
                </h1>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Upload your answer sheets as images or PDFs, or capture them with your camera. Our system evaluates
                  them instantly, providing scores and personalized feedback.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/student">
                    <Button className="w-full min-[400px]:w-auto">
                      I'm a Student
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/teacher">
                    <Button variant="outline" className="w-full min-[400px]:w-auto">
                      I'm a Teacher
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-xl opacity-20 animate-pulse"></div>
                <img
                  src="/vector.jpg"
                  alt="Answer Sheet Evaluation"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full relative"
                  width={550}
                  height={550}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes answer sheet evaluation efficient and accurate for both students and teachers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">For Students</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        1
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-medium">Upload Your Answer Sheet</h4>
                        <p className="text-gray-500 dark:text-gray-400">
                          Upload images or PDFs of your completed answer sheets, or use your camera to capture them
                          directly.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        2
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-medium">Automated Evaluation</h4>
                        <p className="text-gray-500 dark:text-gray-400">
                          Our system analyzes your answers against the correct solutions and evaluates your work.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        3
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-medium">Get Personalized Feedback</h4>
                        <p className="text-gray-500 dark:text-gray-400">
                          Receive your score along with detailed feedback on areas for improvement.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">For Teachers</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        1
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-medium">Upload Answer Keys</h4>
                        <p className="text-gray-500 dark:text-gray-400">
                          Create and upload correct answer keys for your assessments.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        2
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-medium">Batch Process Student Submissions</h4>
                        <p className="text-gray-500 dark:text-gray-400">
                          Upload multiple student answer sheets at once for efficient grading.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        3
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-medium">Review Evaluation Results</h4>
                        <p className="text-gray-500 dark:text-gray-400">
                          Get comprehensive reports on student performance and identify common areas of difficulty.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers a range of features to make answer sheet evaluation efficient and accurate.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Multiple File Formats</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Upload answer sheets as images, PDFs, or capture them directly with your camera.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Batch Processing</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Evaluate multiple answer sheets at once for efficient grading.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Secure & Private</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Your answer sheets and evaluation data are kept secure and private.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Detailed Feedback</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Receive comprehensive feedback on areas for improvement.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Performance Analytics</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Track progress over time with detailed performance analytics.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m4.93 4.93 4.24 4.24" />
                    <path d="m14.83 9.17 4.24-4.24" />
                    <path d="m14.83 14.83 4.24 4.24" />
                    <path d="m9.17 14.83-4.24 4.24" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">AI-Powered Evaluation</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Our advanced AI algorithms ensure accurate and consistent evaluation.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to transform your answer sheet evaluation process?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of students and teachers who are already using our platform.
              </p>
            </div>
            <div className="mx-auto flex flex-col gap-4 min-[400px]:flex-row justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full min-[400px]:w-auto">
                  Get Started for Free
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                  Request a Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 dark:text-gray-400 md:text-left">
            © {new Date().getFullYear()} Answer Sheet Evaluator. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


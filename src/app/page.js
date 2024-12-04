import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { FaDumbbell, FaCalculator, FaUtensils } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Your Journey to a
          <span className="text-primary"> Healthier You </span>
          Starts Here
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Calculate your BMR, track your progress, and get personalized meal plans tailored to your fitness goals.
        </p>
        <div className="mt-10">
          <Link href="/auth/signup">
            <Button size="lg" className="text-lg px-8">
              Start Your Journey
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 gap-12 sm:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="rounded-lg bg-primary/10 p-4">
              <FaCalculator className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">BMR Calculator</h2>
            <p className="mt-2 text-gray-600">
              Get accurate calculations of your Basal Metabolic Rate
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="rounded-lg bg-primary/10 p-4">
              <FaUtensils className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">Meal Plans</h2>
            <p className="mt-2 text-gray-600">
              Receive personalized meal plans based on your goals
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="rounded-lg bg-primary/10 p-4">
              <FaDumbbell className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">Workout Tracking</h2>
            <p className="mt-2 text-gray-600">
              Track your workouts and monitor your progress
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

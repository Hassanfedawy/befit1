'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { calculateBMR, calculateAMR, calculateMacros } from '@/utils/calculations'
import { ProgressChart } from '@/components/ui/ProgressChart'
import { WeightLogForm } from '@/components/ui/WeightLogForm'
import { MealPlan } from '@/components/ui/MealPlan'
import { WorkoutPlan } from '@/components/ui/WorkoutPlan'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user')
        const data = await response.json()
        setUserData(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session?.user) {
      fetchUserData()
    }
  }, [session])

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  const bmr = calculateBMR(userData.weight, userData.height, userData.age, userData.gender)
  const amr = calculateAMR(bmr, userData.activityLevel)
  const macros = calculateMacros(amr, userData.goal, userData.weight)

  const handleWeightLog = async (data) => {
    try {
      const response = await fetch('/api/user/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to log weight')

      // Refresh user data
      const updatedUser = await fetch('/api/user').then(res => res.json())
      setUserData(updatedUser)
    } catch (error) {
      console.error('Error logging weight:', error)
    }
  }

  const handleUpdateMetrics = async (data) => {
    try {
      const response = await fetch('/api/user/progress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to update metrics')

      // Refresh user data
      const updatedUser = await fetch('/api/user').then(res => res.json())
      setUserData(updatedUser)
    } catch (error) {
      console.error('Error updating metrics:', error)
    }
  }

  const progressData = {
    labels: userData.progressHistory.map(p => new Date(p.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Weight Progress',
        data: userData.progressHistory.map(p => p.weight),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userData.name}!</h1>
          <p className="text-gray-600">Here's your fitness dashboard</p>
        </div>

        {/* Progress Chart */}
        <div className="mb-8">
          <ProgressChart data={progressData} title="Weight Progress" />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold">BMR</h3>
            <p className="text-2xl">{Math.round(bmr)} <span className="text-sm text-gray-500">kcal/day</span></p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold">Daily Calories</h3>
            <p className="text-2xl">{Math.round(amr)} <span className="text-sm text-gray-500">kcal/day</span></p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold">Current Weight</h3>
            <p className="text-2xl">{userData.weight} <span className="text-sm text-gray-500">kg</span></p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold">Goal</h3>
            <p className="text-2xl">{userData.goal.replace('_', ' ')}</p>
          </div>
        </div>

        {/* Weight Log Form */}
        <div className="mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Log Weight</h3>
            <WeightLogForm onSubmit={handleWeightLog} />
          </div>
        </div>

        {/* Macros Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h3 className="text-lg font-semibold mb-4">Daily Macro Nutrients</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Protein</span>
                <span>{macros.protein}g</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${(macros.protein * 4 / macros.calories) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Carbs</span>
                <span>{macros.carbs}g</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(macros.carbs * 4 / macros.calories) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Fats</span>
                <span>{macros.fats}g</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${(macros.fats * 9 / macros.calories) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Meal and Workout Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <MealPlan macros={macros} />
          <WorkoutPlan goal={userData.goal} />
        </div>
      </div>
    </div>
  )
}

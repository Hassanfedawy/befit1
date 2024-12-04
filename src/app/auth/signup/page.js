'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function SignUp() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activityLevel: 'sedentary',
    goal: 'weight_loss'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }

    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      router.push('/auth/signin')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-medium text-primary hover:text-primary/90">
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <Input
                name="name"
                type="text"
                placeholder="Full name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Input
                name="age"
                type="number"
                placeholder="Age"
                required
                value={formData.age}
                onChange={handleChange}
              />
              <Input
                name="weight"
                type="number"
                placeholder="Weight (in kg)"
                required
                value={formData.weight}
                onChange={handleChange}
              />
              <Input
                name="height"
                type="number"
                placeholder="Height (in cm)"
                required
                value={formData.height}
                onChange={handleChange}
              />
              <select
                name="gender"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <select
                name="activityLevel"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={formData.activityLevel}
                onChange={handleChange}
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="very_active">Very Active (hard exercise daily)</option>
              </select>

              <select
                name="goal"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={formData.goal}
                onChange={handleChange}
              >
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creating account...' : step < 3 ? 'Next' : 'Create Account'}
            </Button>
          </div>

          {step > 1 && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Back to previous step
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { authOptions } from '../../auth/[...nextauth]/route'

export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const headersList = headers()
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'You must be logged in.' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { weight, date, measurements } = body

    await connectDB()

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found.' },
        { status: 404 }
      )
    }

    // Add new progress entry
    user.progressHistory.push({
      date: new Date(date),
      weight,
      measurements
    })

    // Update current weight
    user.weight = weight

    await user.save()

    return NextResponse.json({ message: 'Progress updated successfully' })
  } catch (error) {
    console.error('Error in POST /api/user/progress:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}

export async function PUT(req) {
  try {
    const headersList = headers()
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'You must be logged in.' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { age, weight, height, activityLevel, goal } = body

    await connectDB()

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found.' },
        { status: 404 }
      )
    }

    // Update user metrics
    if (age) user.age = age
    if (weight) user.weight = weight
    if (height) user.height = height
    if (activityLevel) user.activityLevel = activityLevel
    if (goal) user.goal = goal

    await user.save()

    return NextResponse.json({ message: 'User metrics updated successfully' })
  } catch (error) {
    console.error('Error in PUT /api/user/progress:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}

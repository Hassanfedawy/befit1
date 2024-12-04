import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { authOptions } from '../auth/[...nextauth]/route'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const headersList = headers()
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'You must be logged in.' },
        { status: 401 }
      )
    }

    await connectDB()

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found.' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error in GET /api/user:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}

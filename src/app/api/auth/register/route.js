import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      email,
      password,
      name,
      age,
      weight,
      height,
      gender,
      activityLevel,
      goal
    } = body;

    await connectDB();

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      age,
      weight,
      height,
      gender,
      activityLevel,
      goal,
      progressHistory: [{
        date: new Date(),
        weight,
        measurements: {
          chest: 0,
          waist: 0,
          hips: 0,
          arms: 0,
          legs: 0,
        },
      }],
    });

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  }
}

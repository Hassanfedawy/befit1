'use client'

export function WorkoutPlan({ goal }) {
  const workouts = {
    weight_loss: [
      {
        day: 'Monday',
        type: 'Cardio + Full Body',
        exercises: [
          { name: 'Treadmill Running', duration: '30 mins', intensity: 'Moderate' },
          { name: 'Bodyweight Squats', sets: '3', reps: '15' },
          { name: 'Push-ups', sets: '3', reps: '10-15' },
          { name: 'Dumbbell Rows', sets: '3', reps: '12' },
          { name: 'Plank', duration: '3 x 30 secs' }
        ]
      },
      {
        day: 'Wednesday',
        type: 'HIIT',
        exercises: [
          { name: 'Jump Rope', duration: '20 mins', intensity: 'High' },
          { name: 'Burpees', sets: '4', reps: '10' },
          { name: 'Mountain Climbers', duration: '3 x 30 secs' },
          { name: 'Jumping Jacks', duration: '3 x 45 secs' }
        ]
      },
      {
        day: 'Friday',
        type: 'Strength + Cardio',
        exercises: [
          { name: 'Cycling', duration: '20 mins', intensity: 'Moderate' },
          { name: 'Lunges', sets: '3', reps: '12 each leg' },
          { name: 'Dumbbell Press', sets: '3', reps: '12' },
          { name: 'Core Circuit', duration: '15 mins' }
        ]
      }
    ],
    muscle_gain: [
      {
        day: 'Monday',
        type: 'Push Day',
        exercises: [
          { name: 'Bench Press', sets: '4', reps: '8-10' },
          { name: 'Shoulder Press', sets: '4', reps: '8-10' },
          { name: 'Tricep Dips', sets: '3', reps: '12' },
          { name: 'Lateral Raises', sets: '3', reps: '12-15' }
        ]
      },
      {
        day: 'Wednesday',
        type: 'Pull Day',
        exercises: [
          { name: 'Barbell Rows', sets: '4', reps: '8-10' },
          { name: 'Pull-ups/Lat Pulldowns', sets: '4', reps: '8-10' },
          { name: 'Bicep Curls', sets: '3', reps: '12' },
          { name: 'Face Pulls', sets: '3', reps: '15' }
        ]
      },
      {
        day: 'Friday',
        type: 'Leg Day',
        exercises: [
          { name: 'Squats', sets: '4', reps: '8-10' },
          { name: 'Romanian Deadlifts', sets: '4', reps: '8-10' },
          { name: 'Leg Press', sets: '3', reps: '12' },
          { name: 'Calf Raises', sets: '4', reps: '15' }
        ]
      }
    ],
    maintain: [
      {
        day: 'Monday',
        type: 'Full Body + Cardio',
        exercises: [
          { name: 'Bodyweight Circuit', duration: '20 mins' },
          { name: 'Dumbbell Squats', sets: '3', reps: '12' },
          { name: 'Push-ups', sets: '3', reps: '12' },
          { name: 'Rowing Machine', duration: '15 mins' }
        ]
      },
      {
        day: 'Wednesday',
        type: 'Strength',
        exercises: [
          { name: 'Deadlifts', sets: '3', reps: '10' },
          { name: 'Bench Press', sets: '3', reps: '10' },
          { name: 'Pull-ups', sets: '3', reps: '8-10' },
          { name: 'Core Work', duration: '15 mins' }
        ]
      },
      {
        day: 'Friday',
        type: 'Functional Fitness',
        exercises: [
          { name: 'Circuit Training', duration: '30 mins' },
          { name: 'Kettlebell Swings', sets: '3', reps: '15' },
          { name: 'Box Jumps', sets: '3', reps: '10' },
          { name: 'Mobility Work', duration: '15 mins' }
        ]
      }
    ]
  }

  const currentWorkout = workouts[goal] || workouts.maintain

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Weekly Workout Plan</h3>
      <div className="space-y-6">
        {currentWorkout.map((day) => (
          <div key={day.day} className="border-b pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{day.day}</h4>
              <span className="text-sm text-primary">{day.type}</span>
            </div>
            <div className="space-y-2">
              {day.exercises.map((exercise, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{exercise.name}</span>
                    <span className="text-sm text-gray-600">
                      {exercise.sets && exercise.reps
                        ? `${exercise.sets} x ${exercise.reps}`
                        : exercise.duration}
                    </span>
                  </div>
                  {exercise.intensity && (
                    <span className="text-xs text-gray-500">
                      Intensity: {exercise.intensity}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

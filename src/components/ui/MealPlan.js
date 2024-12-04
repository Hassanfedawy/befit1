'use client'

export function MealPlan({ macros }) {
  // Sample meal plan based on macros
  const meals = [
    {
      name: 'Breakfast',
      calories: Math.round(macros.calories * 0.3),
      suggestions: [
        {
          name: 'Oatmeal with Protein',
          items: [
            '1 cup oatmeal',
            '1 scoop protein powder',
            '1 banana',
            '1 tbsp honey'
          ]
        },
        {
          name: 'Egg Breakfast',
          items: [
            '3 whole eggs',
            '2 slices whole grain bread',
            '1 avocado',
            'Spinach'
          ]
        }
      ]
    },
    {
      name: 'Lunch',
      calories: Math.round(macros.calories * 0.35),
      suggestions: [
        {
          name: 'Chicken and Rice',
          items: [
            '150g chicken breast',
            '1 cup brown rice',
            'Mixed vegetables',
            '1 tbsp olive oil'
          ]
        },
        {
          name: 'Tuna Salad',
          items: [
            '1 can tuna',
            '2 cups mixed greens',
            '1/2 cup quinoa',
            'Olive oil dressing'
          ]
        }
      ]
    },
    {
      name: 'Dinner',
      calories: Math.round(macros.calories * 0.35),
      suggestions: [
        {
          name: 'Salmon Dinner',
          items: [
            '200g salmon',
            '1 sweet potato',
            'Steamed broccoli',
            '1 tbsp olive oil'
          ]
        },
        {
          name: 'Lean Beef Bowl',
          items: [
            '150g lean beef',
            '1 cup rice',
            'Stir-fried vegetables',
            'Soy sauce'
          ]
        }
      ]
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Suggested Meal Plan</h3>
      <div className="space-y-6">
        {meals.map((meal) => (
          <div key={meal.name} className="border-b pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{meal.name}</h4>
              <span className="text-sm text-gray-500">{meal.calories} kcal</span>
            </div>
            <div className="space-y-4">
              {meal.suggestions.map((suggestion, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <p className="font-medium text-sm mb-2">{suggestion.name}</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {suggestion.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

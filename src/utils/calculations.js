export const calculateBMR = (weight, height, age, gender) => {
  // Using Mifflin-St Jeor Equation
  const bmr = gender === 'male'
    ? (10 * weight) + (6.25 * height) - (5 * age) + 5
    : (10 * weight) + (6.25 * height) - (5 * age) - 161;
  return Math.round(bmr);
};

export const calculateAMR = (bmr, activityLevel) => {
  const activityMultipliers = {
    sedentary: 1.2,      // Little or no exercise
    light: 1.375,        // Light exercise/sports 1-3 days/week
    moderate: 1.55,      // Moderate exercise/sports 3-5 days/week
    active: 1.725,       // Hard exercise/sports 6-7 days/week
    very_active: 1.9     // Very hard exercise/sports & physical job or training
  };

  return Math.round(bmr * activityMultipliers[activityLevel]);
};

export const calculateMacros = (amr, goal, weight) => {
  let calories = amr;
  let proteinMultiplier = 2.4; // Increased base protein from 2.2 to 2.4g per kg
  
  switch (goal) {
    case 'weight_loss':
      calories = amr - 500; // 500 calorie deficit
      proteinMultiplier = 2.6; // Increased from 2.4 to 2.6g for better muscle preservation
      break;
    case 'muscle_gain':
      calories = amr + 300; // 300 calorie surplus
      proteinMultiplier = 2.8; // Increased from 2.6 to 2.8g for enhanced muscle building
      break;
    // maintenance uses default values
  }

  const weightInKg = weight * 0.453592; // Convert lbs to kg
  const protein = Math.round(weightInKg * proteinMultiplier);
  const fats = Math.round((calories * 0.20) / 9); // Reduced from 25% to 20% of calories from fat
  const carbs = Math.round((calories - (protein * 4) - (fats * 9)) / 4);

  return {
    calories,
    protein,
    carbs,
    fats,
  };
};

function percentMaker(a, b){
  return(
    parseFloat(((a / b) * 100).toFixed(2))
  )
}
// 백분율 계산기

function calculateSums(data) {
    const sums = {
        carb: 0,
        protein: 0,
        fat: 0,
        calorie: 0
    };

    data.forEach(item => {
        sums.carb += parseFloat(item.carb);
        sums.protein += parseFloat(item.protein);
        sums.fat += parseFloat(item.fat);
        sums.calorie += parseFloat(item.calorie);
    });

    return {
        carb: parseFloat(sums.carb.toFixed()),
        protein: parseFloat(sums.protein.toFixed()),
        fat: parseFloat(sums.fat.toFixed()),
        calorie: parseFloat(sums.calorie.toFixed())
    };
}

// 영양소별 총 섭취량

function nutrientRatio(dailyTotal, setTotal) {
  return parseFloat(percentMaker(dailyTotal, setTotal).toFixed(2));
}
// 영양소별 섭취 달성률

function personalNutrients(gender, age, height){

  let weight;
  let BMR;
  
  // 한국 성인의 표준 체중 계산
  if (gender == '남') {
    weight = (height - 100) * 0.9; // 남성의 표준 체중
  }else if (gender == '여') {
    weight = (height - 100) * 0.85; // 여성의 표준 체중
  }else {
    throw new Error("Invalid gender. Please use 'male' or 'female'.");
  }
  // Mifflin-St Jeor 방정식에 따라 BMR 계산
  if (gender == '남') {
    BMR = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  // 하루 권장 섭취 칼로리 계산
  let dailyCalories = BMR * 1.25;
  // 보통의 활동을 하는 경우 * 1.25

  let carbRatio = 0.5;
  let proteinRatio = 0.3;
  let fatRatio = 0.2;
  // 보통의 활동을 하는 경우 일 탄,단,지 섭취 비율
  let carb = (dailyCalories * carbRatio) / 4;
  let protein = (dailyCalories * proteinRatio) / 4;
  let fat = (dailyCalories * fatRatio) / 9;
  // 일 섭취 칼로리 * 섭취비율 / g당 칼로리

  return {
    dailyCalories: Math.round(dailyCalories),
    // 하루 권장 섭취 칼로리
    nutrients: {
      carbs: Math.round(carb), // 하루 권장 섭취 탄수화물
      protein: Math.round(protein), // 하루 권장 섭취 단백질
      fat: Math.round(fat), // 하루 권장 섭취 지방
    },
  };
}

export { percentMaker, calculateSums, nutrientRatio, personalNutrients }
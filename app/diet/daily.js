'use client'

import ChartPie from "../../components/chart/chartPie";
import { calculateSums, nutrientRatio, percentMaker, personalNutrients } from "../../components/calculator";
import { useEffect, useState } from "react";
import { addDays, format, startOfToday, subDays } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Modal from "../../components/modal";

export default function Daily({morning, lunch, dinner}){

  let today = format(startOfToday(), "yyyy-MM-dd");
  // 오늘의 날짜
  let [currentDate, setCurrentDate] = useState(today);
  // State에 저장
  let previous = () => {
    setCurrentDate(format(subDays(new Date(currentDate), 1), "yyyy-MM-dd"));
  };
  // 어제 날짜로 변경
  let next = () => {
    setCurrentDate(format(addDays(new Date(currentDate), 1), "yyyy-MM-dd"));
  };
  // 내일 날짜로 변경
  let newMorning = morning.filter(e => e.time2.includes(currentDate));
  let newLunch = lunch.filter(e => e.time2.includes(currentDate));
  let newDinner = dinner.filter(e => e.time2.includes(currentDate));
  // db에서 가져온 diet를 오늘 날짜에 해당하는 Object만 뽑아 새 Array 생성
  let [morningData, setMorningData] = useState(newMorning);
  let [lunchData, setLunchData] = useState(newLunch);
  let [dinnerData, setDinnerData] = useState(newDinner);
  // 새로 생성된 Array를 State에 저장
   useEffect(() => {
    setMorningData(newMorning);
  }, [morning, currentDate]);

  useEffect(() => {
    setLunchData(newLunch);
  }, [lunch, currentDate]);

  useEffect(() => {
    setDinnerData(newDinner);
  }, [dinner, currentDate]);
  // db에서 가져온 data와 날짜가 변경될 때 마다 State 변경

  let [morningTotal, setMorningTotal] = useState(calculateSums(morningData));
  let [lunchTotal, setLunchTotal] = useState(calculateSums(lunchData));
  let [dinnerTotal, setDinnerTotal] = useState(calculateSums(dinnerData));
  // // 일일 섭취 영양소 별 합계

  useEffect(() => {
    setMorningTotal(calculateSums(morningData));
  }, [morningData])

  useEffect(() => {
    setLunchTotal(calculateSums(lunchData));
  }, [lunchData])

  useEffect(() => {
    setDinnerTotal(calculateSums(dinnerData));
  }, [dinnerData])
  // db에서 가져온 data가 변경될 때 마다 State 변경

  let session = useSession();
  // 회원 가입 시 입력한 개인정보 불러오기 훅

  let [maxCal, setMaxCal] = useState(2182);
  let [nutrientGoals, setNutrientGoals] = useState({ carbs: 273, protein: 164, fat: 48 });
  // 비로그인 시 하루 섭취 칼로리 및 영양소 기본값 지정

  useEffect(() => {

    let personal;
    let personal2;
  
    if(session.status == 'loading'){
      personal = 0;
      personal2 = {carbs : 0, protein : 0, fat :0}
    }else if(session.status == 'authenticated'){
      personal = personalNutrients(session.data.user.gender, session.data.user.age, session.data.user.height).dailyCalories;
      personal2 = personalNutrients(session.data.user.gender, session.data.user.age, session.data.user.height).nutrients;
    }else{
      personal = 2182;
      personal2 = { carbs: 273, protein: 164, fat: 48 }
    }
    setMaxCal(personal);
    setNutrientGoals({
      carbs: personal2.carbs,
      protein: personal2.protein,
      fat: personal2.fat
    });
    console.log(personal2)
  },[session.status])
  // 회원가입 시 입력한 성별, 나이, 키를 토대로 하루 섭취 칼로리 및 영양소 계산 후 useEffect를 이용

  let [currentCal, setcurrentCal] = useState(morningTotal.calorie + lunchTotal.calorie + dinnerTotal.calorie);
  // 현재 섭취한 하루 칼로리

  useEffect(() => {
    setcurrentCal(morningTotal.calorie + lunchTotal.calorie + dinnerTotal.calorie);
  }, [morningTotal.calorie, lunchTotal.calorie, dinnerTotal.calorie]);
  // db에서 가져온 data가 변경될 때 마다 State 변경

  let [percentage, setPercentage] = useState(0);
  
  useEffect(() => {
    setPercentage(percentMaker(currentCal, maxCal));
  }, [currentCal, maxCal]);
  // 일일 칼로리 달성률 % 

  let carb = nutrientRatio((morningTotal.carb + lunchTotal.carb + dinnerTotal.carb) , (nutrientGoals.carbs + nutrientGoals.protein + nutrientGoals.fat));
  let protein = nutrientRatio((morningTotal.protein + lunchTotal.protein + dinnerTotal.protein) , (nutrientGoals.carbs + nutrientGoals.protein + nutrientGoals.fat));
  let fat = nutrientRatio((morningTotal.fat + lunchTotal.fat + dinnerTotal.fat) , (nutrientGoals.carbs + nutrientGoals.protein + nutrientGoals.fat));
  // 일일 탄단지 비율

  let carb2 = nutrientRatio((morningTotal.carb + lunchTotal.carb + dinnerTotal.carb) , nutrientGoals.carbs);
  let protein2 = nutrientRatio((morningTotal.protein + lunchTotal.protein + dinnerTotal.protein) , nutrientGoals.protein);
  let fat2 = nutrientRatio((morningTotal.fat + lunchTotal.fat + dinnerTotal.fat) , nutrientGoals.fat);
  // 일일 탄단지 목표 달성률

  let chartCarb = Math.floor((carb / 10));
  let chartProtein = Math.floor((protein / 10));
  let chartFat = Math.floor((fat / 10));
  // 1/ 10 후 반올림

  let [modal, setModal] = useState(false);
  
  useEffect(() => {
    let modalState = sessionStorage.getItem('modalState');
    if (modalState == 'false') {
      setModal(false);
    } else {
      setModal(true);
    }
  }, []);

  return(
    <>
    {
      modal && <Modal setModal={setModal}/>
    }
    <div className="daily-header">
        <button onClick={previous} className="prevbtn">어제</button>
      <p>{format(currentDate, "MMM d일", { locale: ko })}</p>
        <button onClick={next} className="nextbtn">내일</button>
    </div>
    <div className="daily-body">     
      <div className="calorie-bar">
        <div className="calorie-box">
          <p>현재까지</p>
          <p>{currentCal} kcal</p>
        </div>
        <div className="maxCal">
          <div className="currentCal" style={{ width : `${percentage}%`, minWidth : '7%', maxWidth : "100%" }}>
            <p>{percentage} %</p>
          </div>
        </div>
        <div className="calorie-box">
          <p>총 칼로리</p>
          <p>{maxCal}kcal</p>
        </div>
      </div>
      <div className="daily-main">
        <ul className="daily-left">
          <li>
            <h4>{morningData[0]?.time || "아침"}</h4>
            <p>{morningTotal?.calorie || 0} kcal</p>
            <Link href={`/diet/morning/${currentDate}`}>+</Link>
          </li>
          <li>
            <h4>{lunchData[0]?.time || "점심"}</h4>
            <p>{lunchTotal?.calorie || 0} kcal</p>
            <Link href={`/diet/lunch/${currentDate}`}>+</Link>
          </li>
          <li>
            <h4>{dinnerData[0]?.time || "저녁"}</h4>
            <p>{dinnerTotal?.calorie || 0} kcal</p>
            <Link href={`/diet/dinner/${currentDate}`}>+</Link>
          </li>
        </ul>
        <div className="daily-right">
          <div className="chart2">
            <h2>탄 단 지 비율</h2>
            <ChartPie chartCarb={chartCarb || 1} chartProtein={chartProtein || 1} chartFat={chartFat || 1}/>
          </div>
          <div className="nutrients">
            <div>
              <h4>탄수화물</h4>
              <div className="maxCal2">
                <div className="currentCal2" style={{ width : `${carb2}%` }}>
                </div>
              </div>
              <p>{morningTotal.carb + lunchTotal.carb + dinnerTotal.carb} / {nutrientGoals.carbs}g</p>
            </div>
            <div>
              <h4>단백질</h4>
              <div className="maxCal2">
                <div className="currentCal2" style={{ width : `${protein2}%` }}>
                  </div>
                </div>
              <p>{morningTotal.protein + lunchTotal.protein + dinnerTotal.protein} / {nutrientGoals.protein}g</p>
            </div>
            <div>
              <h4>지방</h4>
              <div className="maxCal2">
                <div className="currentCal2" style={{ width : `${fat2}%` }}>
                </div>
              </div>
              <p>{morningTotal.fat + lunchTotal.fat + dinnerTotal.fat} / {nutrientGoals.fat}g</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
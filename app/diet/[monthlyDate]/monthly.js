import { format, parse } from "date-fns";
import React from "react"

export default function Monthly({diet}){

  let morning = diet.filter((time) => time.time == "아침");
  let lunch = diet.filter((time) => time.time == "점심");
  let dinner = diet.filter((time) => time.time == "저녁");

  return(
    <>
    <div className="monthly-record">
      <h2>아침</h2>
      {
        morning.map((e, i) => {
          const parsedTime = parse(e.time2, "yyyy-MM-dd-HH-mm-ss", new Date());
          const formatTime = format(parsedTime, "HH시 mm분");
          return(
            <div className="monthly-record-detail" key={i}>
              <p>{e.food}</p>
              <p>{e.calorie} kcal</p>
              <p>{formatTime}</p>
            </div>
          )
        })
      }
    </div>
    <div className="monthly-record">
      <h2>점심</h2>
      {
        lunch.map((e, i) => {
          const parsedTime = parse(e.time2, "yyyy-MM-dd-HH-mm-ss", new Date());
          const formatTime = format(parsedTime, "HH시 mm분");
          return(
            <div className="monthly-record-detail">
              <p>{e.food}</p>
              <p>{e.calorie} kcal</p>
              <p>{formatTime}</p>
            </div>
          )
        })
      }
    </div>
    <div className="monthly-record">
      <h2>저녁</h2>
      {
        dinner.map((e, i) => {
          const parsedTime = parse(e.time2, "yyyy-MM-dd-HH-mm-ss", new Date());
          const formatTime = format(parsedTime, "HH시 mm분");
          return(
            <div className="monthly-record-detail">
              <p>{e.food}</p>
              <p>{e.calorie} kcal</p>
              <p>{formatTime}</p>
            </div>
          )
        })
      }
    </div>
    </>
  )
}
import { connectDB } from "../../../util/database";
import Weekly from "./weekly";

export default async function MongoDb(){

  const client = await connectDB;
  const db = client.db('workit');

  let start = "2024-06-30";
  let end = "2024-07-07";
  // start, end에 매주를 동적으로 기록하는 기능 필요

  let weeklydata = await db.collection('weekly').find({
    date : {
      $gte : start,
      $lt : end 
    }
  }).toArray();
  
  let data = [
    {
        "days": "일",
        "date": "2024-06-30",
        "carb": 100,
        "protein" : 55,
        "fat" : 79
    },
    {
        "days": "월",
        "date": "2024-06-24",
        "carb": 0,
        "protein" : 0,
        "fat" : 0
    },
    {
        "days": "화",
        "date": "2024-06-25",
        "carb": 0,
        "protein" : 0,
        "fat" : 0
    },
    {
        "days": "수",
        "date": "2024-06-26",
        "carb": 0,
        "protein" : 0,
        "fat" : 0
    },
    {
        "days": "목",
        "date": "2024-06-27",
        "carb": 0,
        "protein" : 0,
        "fat" : 0
    },
    {
        "days": "금",
        "date": "2024-06-28",
        "carb": 0,
        "protein" : 0,
        "fat" : 0
    },
    {
        "days": "토",
        "date": "2024-06-29",
        "carb": 0,
        "protein" : 0,
        "fat" : 0
    }
    ]

  return(
    <>
      <Weekly weeklydata={data}/>
    </>
  )
}
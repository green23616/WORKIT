import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { connectDB } from "../../../util/database";
import { format, parse } from "date-fns";
import { getServerSession } from "next-auth";
import React from "react";

export default async function DinnerFood(props) {

  const client = await connectDB;
  const db = client.db('workit');
  
  let session = await getServerSession(authOptions);
  let userName = session ? session.user.name : 'demo';
  let currentDate = props.currentDate;
  let food = await db.collection('diet').find({ time : "저녁", time2: { $regex: currentDate }, user: userName }).toArray();

  return(
    <div className="record-right">    
      <h2>{userName}님의 저녁</h2>
      {
        food.map((e, i) => {
          const parsedTime = parse(e.time2, "yyyy-MM-dd-HH-mm-ss", new Date());
          const formatTime = format(parsedTime, "HH시 mm분");
          return(
          <div key={i}>
            <div className="record-right-item">
              <p>{e.food}</p>
              <p>{e.quantity}g</p>
              <p>{formatTime}</p>
            </div>
          </div>
          )
        })
      }
    </div>
  )
};
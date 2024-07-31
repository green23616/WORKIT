import { connectDB } from "../../util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import SessionP from "./sessionp";

export default async function MongoDb(){

  const client = await connectDB;
  const db = client.db('workit');

  let session = await getServerSession(authOptions);
  let userName = session ? session.user.name : 'demo';

  let morning = await db.collection('diet').find({time : "아침", user : userName}).toArray();
  let lunch = await db.collection('diet').find({time : "점심", user : userName}).toArray();
  let dinner = await db.collection('diet').find({time : "저녁", user : userName}).toArray();

  morning = JSON.parse(JSON.stringify(morning));
  lunch = JSON.parse(JSON.stringify(lunch));
  dinner = JSON.parse(JSON.stringify(dinner));

  return(
    <>
    <SessionP morning={morning} lunch={lunch} dinner={dinner}/>
    </>
  )
}
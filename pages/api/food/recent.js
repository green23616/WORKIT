import { connectDB } from "../../../util/database"

export default async function handler(req, res) {
  
  const client = await connectDB;
  const db = client.db('workit'); 

  let result = await db.collection('diet').find().sort({time2 : -1}).limit(5).toArray();
  res.status(200).json(result)
  } 
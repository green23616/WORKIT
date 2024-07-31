import { connectDB } from "../../../util/database"

export default async function handler(req, res) {

  const client = await connectDB;
  const db = client.db('workit'); 

  let search = await db.collection('food').find({
    title : req.body
  }).toArray();
  res.status(200).json(search)
}
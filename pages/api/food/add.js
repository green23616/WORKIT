import { connectDB } from "../../../util/database";

export default async function handler(req, res){

  if(req.method == 'POST'){

    const client = await connectDB;
    const db = client.db('workit');

    try{
      await db.collection('food').insertOne({
      title : req.body.title,
      carb : req.body.carb,
      protein : req.body.protein,
      fat : req.body.fat,
      calorie : req.body.calorie,
      });
      res.redirect(302, '/food')
    }catch(err){
      res.status(500).json(err)
    }
  }else{
    return res.status(405).send('POST Only')
  }
}
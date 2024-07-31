import { connectDB } from "../../../util/database";

export default async function handler(req, res){

  if(req.method == 'POST'){

    const client = await connectDB;
    const db = client.db('workit');

    if(req.body.food == '' || req.body.quantity == '' || req.body.carb == '' || req.body.protein == '' || req.body.fat == '' || req.body.calorie == ''){
      return res.status(400).json('공백이 있습니다')
    }
    try{
      await db.collection('diet').insertOne({
      time : req.body.time1,
      time2 : req.body.time2,
      user : req.body.user,
      food : req.body.food,
      quantity : req.body.quantity,
      carb : req.body.carb,
      protein : req.body.protein,
      fat : req.body.fat,
      calorie : req.body.calorie,
      });
      res.redirect(302, '/diet')
    }catch(err){
      res.status(500).json(err)
    }
  }else{
    return res.status(405).send('POST Only')
  }
}
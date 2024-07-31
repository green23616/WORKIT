import { connectDB } from '../../../util/database';
import bcrypt from 'bcrypt';

export default async function handler(req, res){
  if(req.method == 'POST'){
    let hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    let db = (await connectDB).db('workit');
    let nameCheck = await db.collection('user_cred').findOne({ name : req.body.name });
    let emailCheck = await db.collection('user_cred').findOne({ email : req.body.email });

    if(nameCheck){
      return res.status(400).json("이미 존재하는 닉네임입니다")
    }
    if(emailCheck){
      return res.status(400).json("이미 존재하는 이메일입니다")
    }
    
    await db.collection('user_cred').insertOne(req.body);
    res.redirect('/register/hello')
  }
}
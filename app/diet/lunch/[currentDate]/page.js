import { format } from "date-fns"
import LunchFood from "../lunchfood";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";

export default async function currentLunch(props){

  let now = format(new Date(), 'yyyy-MM-dd-HH-mm-ss');
  let currentDate = props.params.currentDate;
  let session = await getServerSession(authOptions);

  return(
    <>
    <div className="daily-record">
      <div className="record-left">
        <h2>점심으로 뭘 먹었나요?</h2>
        <form action="/api/diet/new" method="POST">
          <input name="time1" defaultValue="점심" style={{ display : "none" }}/>
          <input name="time2" defaultValue={now} style={{ display : "none" }}/>
          <input name="user" defaultValue={session ? session.user.name : 'demo'} style={{ display : "none" }}/>
          <input name="food" placeholder="음식"/>
        <p>g 단위 <span style={{ fontWeight : "Bold", fontStyle : "oblique" }}>숫자만</span> 입력해주세요</p>
          <input name="quantity" placeholder="양" type="number"/>
          <input name="carb" placeholder="탄수화물" type="number"/>
          <input name="protein" placeholder="단백질" type="number"/>
          <input name="fat" placeholder="지방" type="number"/>
          <input name="calorie" placeholder="칼로리" type="number"/>
          <button type="submit">등록하기</button>
        </form>
      </div>
      <LunchFood currentDate={currentDate}/>
    </div>
    </>
  )
}
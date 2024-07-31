'use client'

import { personalNutrients } from "../../components/calculator";
import { useSession } from "next-auth/react";

export default function Personal({setModal}){

  let session = useSession();

  if(session.data){
    console.log(session.data.user)
  }
  
  return(
      <div className="personal-main">
        <div className="personal-wrapper">
          <h1 className="hello-hello3">{session.data ? session.data.user.name : 'guest'}님의 1일 영양소 필요량은?</h1>
          <div className="personal2">
            <p>성별 : {session.data ? session.data.user.gender : '남'}</p>
            <p>키 : {session.data ? session.data.user.height : '183'}</p>
            <p>나이 : {session.data ? session.data.user.age : 30}</p>
          </div>
          <div className="personal3">
            <p>일반적으로 하루 { session.data ? personalNutrients(session.data.user.gender, session.data.user.age, session.data.user.height).dailyCalories : 2182 } kcal 섭취가 권장되며,</p>
            <p>탄수화물 { session.data ? personalNutrients(session.data.user.gender, session.data.user.age, session.data.user.height).nutrients.carbs : 273 }g,</p>
            <p>단백질 { session.data ? personalNutrients(session.data.user.gender, session.data.user.age, session.data.user.height).nutrients.protein : 164 }g 그리고</p>
            <p>지방 { session.data ? personalNutrients(session.data.user.gender, session.data.user.age, session.data.user.height).nutrients.fat : 48}g 식사를 통해</p>
            <p>탄단지 5:3:2 비율로 영양을 섭취할 수 있습니다.</p>
          </div>
          <p className="modal-btn" onClick={() => {setModal(false);}}>체험하기</p>
          <p className="modal-btn2" onClick={() => {sessionStorage.setItem('modalState', 'false');setModal(false)}}>다시보지않기</p>
        </div>
      </div>
  )
}
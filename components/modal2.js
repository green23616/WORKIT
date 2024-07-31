'use client'

export default function Modal2({setModal}){

  return(
    <>
    <div className="modal2-main">
      <div className="modal2">
        <form className="record-left2" action="/api/food/add" method="POST" >
          <h1>음식을 추가해주세요</h1>
          <input type="text" name="title" placeholder="음식 이름" required step="0.01" min="0" />
          <input type="number" name="carb" placeholder="탄수화물" required step="0.01" min="0" />
          <input type="number" name="protein" placeholder="단백질" required step="0.01" min="0" />
          <input type="number" name="fat" placeholder="지방" required step="0.01" min="0" />
          <input type="number" name="calorie" placeholder="칼로리" required step="0.01" min="0" />
          <button className="modal2-btn1" onClick={() => {
            setModal(false)
          }}>취소하기</button>
          <button className="modal2-btn2" type="submit">등록하기</button>
        </form>
      </div>
    </div>
    </>
  )
}
'use client'

import { useEffect, useState } from "react"
import Modal2 from "../../components/modal2";

export default function Detail(){

  let [recent, setRecent] = useState([]);
  let [list, setList] = useState([]);
  let [food, setFood] = useState('');
  let [search, setSearch] = useState([]);
  let [modal, setModal] = useState(false)

  useEffect(() => {
    fetch('/api/food/recent')
    .then( r => r.json())
    .then((result) => {
      setRecent(result)
    })
  },[])

  useEffect(() => {
    fetch('/api/food/list')
    .then( r => r.json())
    .then((result) => {
      setList(result)
    })
  },[])

  return(
    <>
    {
      modal && <Modal2 setModal={setModal} />
    }
    <div className="food-more">
      <h3 className="title3">현재 추가된 음식</h3>
      { 
        list.map((e, i) => {
          return <p key={i}>{e.title}</p>
        })
      }
    </div>
    <div className="search-area">
      <input type="text" className="inputarea" placeholder="내가 먹은 음식의 영양성분은?" onChange={(e) => {setFood(e.target.value)}}/>
      <button className="search-button" onClick={ () => {
        if (!food.trim()) {
          alert("공백입니다");
          return;
        }
        fetch('/api/food/search', { method : 'POST', body : food })
        .then( r => r.json())
        .then((result) => {
          setSearch(result)
        })
      }}>🔍</button>
    </div>
    <div className="recent-menu">
      <h2>최근 메뉴</h2>
      { 
        recent.map((e, i) => {
          return(
            <p className="recent-food" key={i} onClick={ () => {
              fetch('/api/food/search', { method : 'POST', body : e.food })
              .then( r => r.json())
              .then((result) => {
                setSearch(result)
              })
            }}>{e.food}</p>
          )
        })
      }
    </div>
    <div className="info-main">
      <div className="info-wrapper">
        { search.length > 0 ?
          search.map((e, i) => {
            return(
              <div className="info" key={i}>
                <h1 className="title3">{e.title} (100g 기준)</h1>
                <p>칼로리 : {e.calorie} kcal</p>
                <p>탄수화물 : {e.carb} g</p>
                <p>단백질 : {e.protein} g</p>
                <p>지방 : {e.fat} g</p>
              </div>
            )
          })
        : <>
          <h2>데이터 추가 중입니다</h2>
          <p>검색결과가 없을 수 있습니다</p>
          </>
        }
        <p className="food-add" onClick={() => {
          setModal(true);
        }}>데이터 추가 +</p>
      </div>
    </div>
    </>
  )
}
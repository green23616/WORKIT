'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Hello(){

  let router = useRouter();
  let [number, setNumber] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNumber(number - 1)
    },1000);
    return () => clearTimeout(timer)
  },[number])

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return(
    <div className="register-main">
      <div className="hello-wrapper">
        <h1 className="hello-hello">회원이 되어주셔서 감사합니다</h1>
        <div className="hello-hello2">
          <p>WORKIT에서 하루의 식단을 기록하고 시각화하세요</p>
          <p>먹은 음식의 영양 정보를 검색해보세요</p>
          <p>헬스 커뮤니티에서 정보를 얻고 유저들과 공유해보세요 (준비중입니다)</p>
        </div>
        <h2 className="hello-hello3">{number}초 후 메인페이지로 이동합니다</h2>
        <h4 className="hello-hello4" onClick={() => {router.push('/')}}>바로 이동</h4>
      </div>
    </div>
  )
}
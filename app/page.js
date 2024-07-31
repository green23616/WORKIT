import ChartPie2 from "../components/chart/chartPie2";
import { faCarrot, faClipboardUser, faFileWaveform } from "@fortawesome/free-solid-svg-icons";
import { faCommentMedical } from "@fortawesome/free-solid-svg-icons/faCommentMedical";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Login from "../components/login";
import LogOut from "../components/logout";
import Image from "next/image";
import logo from "../public/images/logo.png";

export default async function Home() {

  let session = await getServerSession(authOptions);

  return (
    <>
    <div className="navbar">
      <div className="nav-wrapper">
        <div>
          <Link href="/">
            <Image src={logo} alt="logo" width={200} priority={true} quality={100}/>
          </Link>
        </div>
        <div className="navbar-2">
          <Link href="/diet">건강기록</Link>
          <Link href="/food">음식검색</Link>
          <Link href="/workout">헬스</Link>
        </div>
        <div className="navbar-3">
        {
          session && <p className="hihi">{session.user.name} 님</p>
        }
        {
          session ? <LogOut/> : 
          <>
          <Login/>
          </>
        }
        </div>
      </div>
    </div>
    <div className="main-main">
      <div className="main-wrapper">
        <h1 className="title">매일의 건강을 기록하고<br/>자신을 찾아보세요</h1>
        <div className="chart">
          <h3>탄 단 지 섭취 비율</h3>
          <ChartPie2 />
          <div className="zone1">
            <FontAwesomeIcon icon={faClipboardUser} size="10x" color="#95dfdd"/>
            <h4>키, 몸무게, 나이 등 기본 정보를 입력하면 맞춤형 건강 정보를 제공해요</h4>
          </div>  
          <div className="zone2">
            <FontAwesomeIcon icon={faCarrot} size="10x" color="#f55d17"/>
            <h4>음식의 영양소 정보를 제공하며 섭취한 식단을 손쉽게 기록할 수 있어요</h4>
          </div>  
          <div className="zone3">
            <FontAwesomeIcon icon={faFileWaveform} size="10x" color="#b8ef16"/>
            <h4>일간 및 주간의 통계를 확인하고 나만의 다이어트 식단을 구성해보세요</h4>
          </div>  
          <div className="zone4">
            <FontAwesomeIcon icon={faCommentMedical} size="10x" color="#7f29b4"/>
            <h4>여러 데이터를 바탕으로 전문가의 코칭을 제공해요</h4>
          </div> 
        </div>
        {
          !session
          ? 
            <Link href="/register" className="register-btn">회원가입</Link>
          : <div className="loggedin"></div>
        }
      </div>
    </div>
    </>
  );
}
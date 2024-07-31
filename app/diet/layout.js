import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Login from "../../components/login";
import LogOut from "../../components/logout";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function Diet({children}) {

  let session = await getServerSession(authOptions);

  return(
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
    <div className="diet-main">
      <div className="diet-wrapper">
        <ul className="diet-navigation">
          <li><FontAwesomeIcon icon={faCommentDots} />채팅상담</li>
          <li><Link href="/diet">오늘</Link></li>
          <li><Link href="/diet/weekly">주간</Link></li>
          <li><Link href="/diet/monthly">월간</Link></li>
          <li><Link href="/diet/weight">체중</Link></li>
        </ul>
          <div className="diet-body">
            {children}
          </div>
      </div>
    </div>
    </>
  )
};
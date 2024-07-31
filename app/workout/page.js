import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Login from "../../components/login";
import LogOut from "../../components/logout";
import Image from "next/image";
import logo from "../../public/images/logo.png";


export default async function Health(){

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
    <div className="main-main">
      <div className="main-wrapper">
        <h1 className="title">준비중입니다</h1>
      </div>
    </div>
    
    </>
  )
}
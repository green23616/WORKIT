import Image from "next/image";
import Link from "next/link";

export default function Register() {

  return (
    <div className="register-main">
      <div className="register-wrapper">
        <div className="register-left">
          <div className="register-hello">
            <h2>반갑습니다</h2>
            <h4>건강을 기록하고 찾아보세요</h4>
          </div>
          <div className="register-form">
            <form method="POST" action="/api/auth/signup">
              <input name="name" type="text" placeholder="닉네임" required/>
              <input name="email" type="email" placeholder="이메일주소" required/>
              <input name="password" type="password" placeholder="비밀번호" required/>
              <div className="register-gender">
                <h4>성별</h4>
                <label><input type="radio" name="gender" value="남" required/>남</label>
                <label><input type="radio" name="gender" value="여" required/>여</label>
                <input name="height" type="number" placeholder="키" required/>
                <input name="age" type="number" placeholder="나이" required/>
              </div>
              <Link className="gomin" href={'/'}>다음에</Link>
              <button type="submit" className="gogo">가입하기</button>
            </form>
          </div>
        </div>
        <div className="register-right">
          <Image src="/images/register.jpg" alt="register" width={810} height={550} />
        </div>
      </div>
    </div>
  );
}
'use client'

import { signIn } from "next-auth/react"

export default function Login(){
  
  return(
    <p onClick={() => {signIn()}} style={{ cursor : "pointer" }}>로그인</p>
  )
}
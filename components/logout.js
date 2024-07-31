'use client'

import { signOut } from "next-auth/react"

export default function LogOut(){
  
  return(
    <>
    <p onClick={() => {signOut()}} style={{ cursor : "pointer" }}>로그아웃</p>
    </>
  )
}
'use client'

import { SessionProvider } from "next-auth/react";
import Daily from "./daily";

export default function SessionP({morning, lunch, dinner,children}){

  return(
    <SessionProvider>
      <Daily morning={morning} lunch={lunch} dinner={dinner}></Daily>
      {children}
    </SessionProvider>
  )
}
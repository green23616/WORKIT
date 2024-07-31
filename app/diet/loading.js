'use client'

import { Oval } from "react-loader-spinner";

export default function Loading(){
  return (
    <div className="loading">
      <Oval 
      height={200}
      width={200}
      />
    </div>
  )
}
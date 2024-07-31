'use client'

import { Oval } from "react-loader-spinner";

export default function Loading(){
  return (
    <div className="loading2">
      <Oval 
      height={200}
      width={200}
      color="grey"
      secondaryColor="white"
      />
    </div>
  )
}
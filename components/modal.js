'use client'

import PersonalLayout from "./personal/layout";
import Personal from "./personal/page";

export default function Modal({setModal}){

  return(
    <>
      <div className="modal">
        <PersonalLayout>
          <Personal setModal={setModal}/>
        </PersonalLayout>
      </div>
    </>
  )
}
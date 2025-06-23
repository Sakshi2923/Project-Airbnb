'use client';
import Modal from "./Modal";
import { useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";
const LoginModal=()=>{
  const LoginModal= useLoginModal()
  const content=(
    <>
    
    <form className="space-y-4" > 
       <input  placeholder="your e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl " />
       <input  placeholder="your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl " />
        
        <div className="p-5 bg-rose-500 text-white rounded-xl opacity-80">
          the eror 
        </div>

       <CustomButton
          label="Submit"
          onClick={()=> console.log('Test')}/>

    </form>
    </>
  )
  return(
    <Modal
       isOpen={LoginModal.isOpen}
       close={LoginModal.close}
       label="Log in"
       content={content}/>
  )

}
export default LoginModal;
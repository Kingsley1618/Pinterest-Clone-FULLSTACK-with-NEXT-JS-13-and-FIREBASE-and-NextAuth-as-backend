'use client'
import React, { useEffect } from 'react'
import {ImSearch} from "react-icons/im"
import {RiNotificationFill} from "react-icons/ri"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { doc, setDoc } from 'firebase/firestore'
import {db} from "@/firebase/config"
import { useSession, signIn, signOut } from "next-auth/react"
import {AiFillMessage} from "react-icons/ai"
function Navbar() {
  const router = useRouter()
  const { data: session } = useSession()

useEffect(()=>{
  saveUserInfo();
},[session])

  const saveUserInfo=async()=>{
    if(session?.user)
    {
      await setDoc(doc(db, "users", session?.user?.email), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image
      });
    }
  }

const onCreateClick=()=>{
  if(session)
  {
    router.push('/pin-builder')
  }
  else{
    signIn()
  }
}
  return (
    <div className='flex items-center px-3 h-[70px] items-center md:gap-x-3 md:justify-center justify-between'>
<img src = "/logo.png" alt= "logo" className="w-[40px] h-[40px] hover:bg-[rgb(233,233,213)] cursor-pointer p-2 rounded-full" onClick={()=>router.push('/')}/>
<button type='button' className="text-white bg-[black] py-2 px-3 rounded-full" onClick={()=>router.push('/')}>Home</button>
<button type='button' className="text-black py-2 px-3 font-bold rounded-full hover:bg-[rgb(233,233,213)]"onClick={()=>onCreateClick()}>Create</button>
   <div className="md:flex hidden items-center bg-[rgb(225,225,225)] w-full md:p-2 rounded-full space-x-2">

   <ImSearch className="text-[22px] font-bold text-[rgb(95,95,95)] font-bold"/>

<input type="text" className='flex  w-full outline-none bg-[transparent]' placeholder='Search' />
   </div>
   <ImSearch className="flex md:hidden text-[22px] font-bold text-[rgb(95,95,95)] font-bold"/>
   
   <RiNotificationFill className="text-[rgb(95,95,95)] sm:flex hidden font-bold md:text-[30px] text-[24px] cursor-pointer" />
   <AiFillMessage className="text-[rgb(95,95,95)] sm:flex hidden md:text-[30px] text-[24px]  cursor-pointer"/>
   { !session ? <button type='button' onClick = {()=> signIn()} className="text-black py-2 px-3 text-[14px] font-bold rounded-full hover:bg-[rgb(233,233,213)]">Login</button>
   :<img src = {session?.user?.image} onClick={()=>router.push('/'+session.user.email)}  className="w-[40px] h-[40px] cursor-pointer rounded-full"/>}
    </div>
  )
}

export default Navbar
'use client'
import React,{useState} from 'react'
import UserTag from "./UserTag"
import UploadImage from "./UploadImage"
import firebase from 'firebase/compat/app'
import { db } from '@/firebase/config'
import 'firebase/compat/storage';
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage } from '@/firebase/config'
import { useSession, signIn, signOut } from "next-auth/react"
import {useRouter} from "next/navigation"
function Form() {
    const [file,setFile]=useState()
    const router = useRouter()
    const [desc,setDesc]=useState();
    const [percent, setPercent] = useState()
    const [selectedFile,setSelectedFile]=useState();
    const [loading,setLoading] =useState(false)
    const {data:session}=useSession();
const [title, setTitle] = useState()
const [link, setLink] = useState()
const [pin, setPin] = useState()
const postId=Date.now().toString();
    function handleUpload() {
        setLoading(true)
        if (!file) {
          alert('Please choose a file first!');
        }
    
        const storageRef = firebase.storage().ref(`/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        storageRef.put(file).on(
          'state_changed',
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
    
            // update progress
            setPercent(percent);
          },
          (err) => console.log(err),
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
              
           
              const postData={
                title:title,
                desc:desc,
                link:link,
                image:url,
                userName:session.user.name,
                email:session.user.email,
                userImage:session.user.image,
                id:postId
            }

            await setDoc(doc(db,'posts',postId),
            postData).then(resp=>{
                console.log("Saved")
                setLoading(true);
                router.push("/")
            })


              
            });
          }
        );
      }
    
    
       
  return (
    <div className=' bg-white p-16 rounded-2xl '>
    <div className='flex justify-end mb-6'>
        <button  onClick = {handleUpload}
         className='bg-red-500 p-2
        text-white font-semibold px-3 
        rounded-lg'>
      
       {loading ?<img src="loading-indicator.png" className="animate-spin w-[20px] h-[20px]" alt="loader"/> : <span>Save</span>}</button> 
    </div>
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
       
        <UploadImage file= {file} setFile = {setFile} imageHandler = {handleUpload} selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
      
   <div className="col-span-2">
   <div className='w-[100%]'>
    <input type="text" onChange={(event)=> setTitle(event.target.value)} placeholder='Add your title'
   value = {title}
    className='text-[35px] outline-none font-bold w-full
    border-b-[2px] border-gray-400 placeholder-gray-400'/>
    <h2 className='text-[12px] mb-8 w-full  text-gray-400'>The first 40 Charaters are 
    what usually show up in feeds</h2>
    <UserTag user={session?.user} />
    <textarea type="text"
    value = {pin} 
     onChange={(event)=> setDesc(event.target.value)}
        placeholder='Tell everyone what your pin is about' 
    className=' outline-none  w-full mt-8 pb-4 text-[14px]
    border-b-[2px] border-gray-400 placeholder-gray-400'/>
      <input type="text"
      value = {link}
     onChange={(event)=> setLink(event.target.value)}
       placeholder='Add a Destination Link' 
    className=' outline-none  w-full  pb-4 mt-[90px]
    border-b-[2px] border-gray-400 placeholder-gray-400'/>
</div>
   </div>

    </div>
</div>
  )
}

export default Form
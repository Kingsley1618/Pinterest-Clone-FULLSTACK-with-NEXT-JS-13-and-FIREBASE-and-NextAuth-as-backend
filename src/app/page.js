'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import PinList from '@/components/Pins/PinList';
export default function Home() {
  const [listOfPins,setListOfPins]=useState([]);
    
  useEffect(()=>{
    getAllPins();
  },[])

  const getAllPins=async()=>{
    setListOfPins([])
      const q=query(collection(db,
        'posts')
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
       
       
      setListOfPins((listOfPins)=>
      [...listOfPins,doc.data()]);
      });
  }
  return (
    <main className="">
       <PinList listOfPins={listOfPins} />
    </main>
  )
}

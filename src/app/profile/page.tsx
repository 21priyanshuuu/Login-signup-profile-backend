"use client"

import React from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

function page(params:any) {
  const router = useRouter();
const Logout=async()=>{
  try {
    await axios.get('/api/user/logout')
    router.push('/login')
    
  } catch (error:any) {
    console.log(error.message);
    toast.error('Error in Logout');
  }

  }
  return (
    <div>
      <h1>Profile</h1>
      <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default page

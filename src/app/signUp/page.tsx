"use client";
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

function page() {
  const router=useRouter();
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    })
    const [buttonDisabled,setButtonDisabled]=useState(false)
    const [loading,setLoading]=useState(false)
    const onSignUp=async ()=>{
      try{
        setLoading(true);
      const responce= await axios.post("/api/user/signup",user);
      console.log("signUp success",responce);
      router.push("/login");

      }catch(err:any){
        console.log("sign up failed",err.message )
        toast.error(err.message)

      }finally{
        setLoading(false)
      }
    }
    useEffect(()=>{
      if(user.name.length>0&&user.email.length>0&&user.password.length>0){
        setButtonDisabled(false)
    }
    else{
        setButtonDisabled(true)
    }
    },[user])
    return (
        <><div>
        <h1 className="text-center text-2xl">{loading ? "processing" : "signup"}</h1>
      </div>
      <div className="flex flex-col items-center justify-center ">
          <input
            type="text"
            placeholder="Username"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="border border-gray-300 text-black rounded-md p-2 mt-2" />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border border-gray-300 text-black rounded-md p-2 mt-2" />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="border border-gray-300 rounded-md text-black p-2 mt-2" />
          <button     onClick={onSignUp} className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 mt-4">{buttonDisabled ? "no Sign up" : "signUp"}</button>
          <Link href="/login">Login Page</Link>
        </div></>
      );
    }
    
    export default page;
"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';
import bcrypt from 'bcryptjs';

function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e:any) => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    });
};
  const onLogin = async (e:any) => {
    e.preventDefault();
    
    try{
        setLoading(true);
        
        const responce= await axios.post("/api/user/login",{email:credentials.email,password:credentials.password});
        console.log("login success",responce);
        toast.success("login success");
        router.push("/profile");

    }catch(err:any){
        console.log(credentials)
        console.log("login failed",err )
        toast.error(err.message)
    }finally{
        setLoading(false)
    }

  };
  useEffect(() => {
    if (credentials.email.length > 0 && credentials.password.length > 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(true);
    }
  },[credentials]);
    return (
        <>
        <div>
            <h1 className="text-center text-2xl mb-4">{loading ? "processing" : "Login"}</h1>
            <form className="flex flex-col items-center justify-center" >
                <input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    className="border border-gray-300 rounded-md p-2 mt-2 text-black"
                />
                <input 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="border border-gray-300 rounded-md p-2 mt-2 text-black"
                />
                <button type="submit" onClick={onLogin}  className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 mt-4">{loading ? "Loading..." : "Login"}</button>
                <Link href="/signUp" className="mt-3">
        signUp Page </Link>
            </form>
           
        </div>
        
        </>
    );
}

export default Login;

import React from 'react'
import { Navigate } from 'react-router-dom'
import Myhack from './Myhack';
import { useState,useEffect } from 'react';


const Code = () => {
  const userId = localStorage.getItem('name');
  const [data,setData] = useState([]);
  
  const getData = async() =>{
    let req = await fetch(`http://localhost:3000/teaminfo:${userId}`)
    let d =await req.json()
    if(d){
      setData(d);
    }
    
  }

  useEffect(()=>{
    getData();
  },[])
  return (
    <div>
      
      {userId ? <div className='bg-hack w-full flex flex-col'>
        <h1 className='text-4xl font-mono font-bold text-white  mt-4 ml-4'>Hello {userId}!</h1>
        <h1 className='text-6xl font-extrabold mt-6 text-slate-300 text-center mb-16'>Coding Workspace</h1>
        <div className='flex flex-col'>
        {data.map((item,key) =>{
                return(
                <Myhack key = {key} title = {item.id} id = {item.h_id} leader = {item.data.leader} teamname = {item.data.teamname}/>
                )
              })}
        <h1 className='text-3xl text-white mt-20 mx-8 mb-48'> */ Clicking on code will open your coding platform. <br />*/ You can also add members to your team if you are a leader and can code along with them. <br />*/ Please share your github link for evaluation once the code is done . 
         <br />*/ You can call/chat and build amazing tech through this platform.
        </h1>
        </div>

      </div> :  <Navigate to="/login"/>
      }
    </div>
  )
}

export default Code

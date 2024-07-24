import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate ,useNavigate} from 'react-router-dom';
import Hackprof from './Hackprof';





const Profile = () => {

  const userId = localStorage.getItem('name');
  const emailId = localStorage.getItem('email');
  const codenavigator = useNavigate();
  const [points,setPoints] = useState(0);
  const [data,setData] = useState([]);
  const [log,setLog] = useState(false)
  const logout = ()=>{
    localStorage.clear();
    alert('logout');
    setLog(true);
    
  }
  const getData = async() =>{
    let req = await fetch(`http://localhost:3000/teaminfo:${userId}`)
    let d =await req.json()
    if(d){
      setData(d);
    }
    
  }

  const getPoints = async() =>{
    let req = await fetch(`http://localhost:3000/userpoints:${userId}`)
    let d =await req.json()
    if(d){
      setPoints(d);
    }
    
  }

  useEffect(()=>{
    getData();
    getPoints();
  },[])
  

  return (
    <div>
      
      {log ? <Navigate to={'/'}/> :
      <div className='flex flex-col w-full bg-hack bg-cover pl-12 pr-12 pb-12'>
        <div className='bg-[rgb(23,23,23)] mt-12 w-full text-white flex flex-col pb-4' >
        <h1 className='text-6xl font-extrabold mt-12 ml-24 text-slate-100'>Profile</h1>
        <h2 className='mt-12 ml-24 text-2xl font-mono '>username: {userId}</h2>
        <h2 className='mt-4 ml-24 text-2xl font-mono '>gmail: {emailId}</h2>
        <h2 className='mt-4 ml-24 text-2xl font-mono '>league: {points.points <10 ? "Syntax Voyager" : (points.points<30 ? "Code Alchemist" : (points.points < 60 ? "Dev Dynamo" :(points.points <100 ? "Digital Architect":"Cyber Sage"))) } ~ {points.points} points</h2>

        <h1 className='text-4xl font-extrabold mt-12 ml-16 text-slate-100'>My Hackathons</h1>


        
       <table className='mt-8 ml-6 mr-6'>
          <thead>
            <tr className='border-collapse bg-[rgb(22,19,19)] text-white h-12 text-2xl font-mono font-bold  pl-8 pr-8'>
                  <td >Hackathon</td>
                  <td>Team</td>
                  <td>Position</td>
                  <td>Link</td>
            </tr>
            </thead>
            <tbody>
              {data.map((item,key) =>{
                return(
                <Hackprof key = {key} title = {item.id} teamname ={item.data.teamname}  link = {item.data.link} project = {item.data.project}/>
                )
              })}
            </tbody>

          
       </table>
       <div className='flex mt-12'>
        <button onClick={()=>codenavigator('/code')} className='h-10 w-24 bg-[rgb(40,39,39)] rounded-lg ml-[70vw] hover:bg-white hover:text-[rgb(40,39,39)] transition-colors'>Code</button>
       <button  onClick={logout} className='h-10 w-24 bg-[rgb(65,57,57)] rounded-lg  ml-4 hover:bg-[rgb(48,47,47)]'>Log out</button>
       </div>
       </div>
      </div>}
      
    </div>
  )
}


export default Profile

import React from 'react'
import { useState,useEffect } from 'react'
import Hackcard from './Hackcard'

const Hackathons = () => {
  const user = (localStorage.getItem('name'))
  const [hack,setHack]=useState([])
  const [isEmpty,setIsEmpty] = useState(true)
  
  const getHack = async() =>{
    let req = await fetch("http://localhost:3000/")
    let data =await req.json()
    if(data){
      setHack(data)
      setIsEmpty(false);

    }
  }

  useEffect(()=>{
    getHack();
  },[])

  
  return (
    <section className=' flex absolute w-full bg-hack bg-cover items-center justify-center '>
      <div className='w-full ml-12 mb-24 flex flex-col mr-12'>
        <h1 className='text-6xl font-extrabold mt-12 ml-24 text-slate-100'>Hackathons</h1>
        {
          hack.map((item,key)=>{
            const obj = item.data;
            const id = item.id;
            return(
            <Hackcard key = {key} title={obj.title} desc={obj.desc} prize={obj.prize} min={obj.min} max={obj.max} duration={obj.duration} date={obj.date} id={id}/>
            
            )
          })
        }

      {isEmpty && <div className='h-[37vh] text-3xl font-extrabold mt-12 ml-24 text-slate-100 text-center mb-24'>No hackathons available! Come later for more.</div>}
      
      </div>
      
    </section>

  )
}

export default Hackathons

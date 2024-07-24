import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCalendarAlt, faClock, faPeopleArrows, faTrophy } from '@fortawesome/free-solid-svg-icons'
import Form from './Form'


const Hackcard = (props) => {
const [form,setForm] = useState(false)  
  return (
    <div className='pb-10 w-[90vw] mx-12 mr-12 bg-[rgb(28,26,26)] mt-24 rounded-2xl border-solid shadow-sm'>
        <h1 className='text-6xl mx-12 mt-12 font-[arial] font-extrabold text-slate-300'>{props.title}</h1>
        <p className='mx-8 mt-4 text-white'>{props.desc}</p>
        <div className='flex mt-8'>
        <div className='text-3xl text-white font-bold flex items-center justify-evenly w-[80vw]'>
            <div className='h-[8vh] w-[16vw] flex flex-row'><h1 className='text-6xl'><FontAwesomeIcon icon={faTrophy} /></h1><h1 className='ml-2'>Prize Pool <span className='text-slate-300'>{props.prize}</span> </h1></div>
            <div className='h-[8vh] w-[16vw] flex flex-row'><h1 className='text-6xl'><FontAwesomeIcon icon={faPeopleArrows} /></h1><h1 className='ml-2'>Team <span className='text-slate-300'><br />{props.min} to {props.max}</span> </h1></div>
            <div className='h-[8vh] w-[16vw] flex flex-row'><h1 className='text-6xl'><FontAwesomeIcon icon={faClock} /></h1><h1 className='ml-2'>Duration <span className='text-slate-300'><br />{props.duration}</span> </h1></div>
            <div className='h-[8vh] w-[16vw] flex flex-row'><h1 className='text-6xl'><FontAwesomeIcon icon={faCalendarAlt} /></h1><h1 className='ml-2'>Date <span className='text-slate-300'><br />{props.date}</span> </h1></div>


        </div>
        </div>
        <div className='flex justify-end mr-48 w-[85vw] mt-8'>
            <button onClick = {()=>{setForm(true)}} disabled={form} className='h-12 w-[15vw] bg-slate-400 text-xl text-white font-bold rounded-2xl hover:text-slate-600 hover:bg-slate-300 transition-colors disabled:bg-gray-500 disabled:text-gray-700'>Register</button>
        </div>
        {form && <Form id = {props.id} title ={props.title}/>}
        

    </div>
  )
}

export default Hackcard

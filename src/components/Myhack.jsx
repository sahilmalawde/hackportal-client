import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Portal from './Portal'

const Myhack = (props) => {
    const userId = localStorage.getItem('name')
    const [add,setAdd] = useState(false);
    const [p,setP] = useState(true);
    const [sub,setSub] = useState(false);
    const [form,setForm] = useState({'teamname':props.teamname,'name':'',id: props.id,'link':''});
  const [loading,setLoading] = useState(false);
  const handleChange = (e) =>{
    e.preventDefault()
  
    const { name,value} = e.target
    
    setForm({...form, [name]:value})
  }
  const valid = async() =>{
    let req = await fetch(`http://localhost:3000/chkusr:${props.id}:${form.name}`)
    let data = await req.json();
    return data.value;
    
  }

  
  
  

  const handleSubmit = async(e) =>{
    
    e.preventDefault();
    const val = await valid();
    if(val == 0){
       setLoading(!loading)
    
    let a = await fetch(`http://localhost:3000/add`,{
        headers : {"Content-type":"application/json"},
        method : "POST",
        body:JSON.stringify(form)
    }).then(()=>{
      setLoading(false);
      alert("success")
    }).catch((error)=>{
      alert(error);
    })
}
    else{

      alert("Already registered in some team")
    }
  }

  const handleSubmit2 = async(e) =>{
    
    e.preventDefault();
    
       setLoading(!loading)
    
    let a = await fetch(`http://localhost:3000/sub`,{
        headers : {"Content-type":"application/json"},
        method : "POST",
        body:JSON.stringify(form)
    }).then(()=>{
      setLoading(false);
      alert("success")
    }).catch((error)=>{
      alert(error);
    })

  }

  return (
    
    <div>
    
    {p ? <div className='bg-[rgb(33,33,33)] h-[10vh]  flex items-center justify-between ml-8 mr-8 pr-8 pl-8 '>
      <h1 className='text-3xl text-slate-100 font-bold'>{props.title}</h1>
      <div className='flex '>
        <button onClick={()=>{setP(!p)}} className='h-10 w-24  rounded-lg  bg-white text-[rgb(40,39,39)] transition-colors ' disabled = {add}>Code</button>
        <button onClick={()=>{setSub(!sub)}} className='h-10 px-2  bg-[rgb(65,57,57)] text-white rounded-lg  ml-4 hover:bg-[rgb(48,47,47)] disabled:bg-[rgb(38,37,37)] ' disabled = {add}>Submission</button>

       <button onClick={()=>{setAdd(!add)}}  className='h-10 px-2  bg-[rgb(65,57,57)] text-white rounded-lg  ml-4 hover:bg-[rgb(48,47,47)] disabled:bg-[rgb(38,37,37)]  ' disabled= {!(userId === props.leader)}>Add member</button>
       
       </div>
       
    </div> : <Portal roomid = {props.teamname} />}
    {add ? <div className='absolute top-[30vh] left-[18vw] h-[30vh] w-[60vw] bg-[rgb(29,27,27)] rounded-2xl border-2 '>
        <div className='mt-2 ml-4 flex justify-between items-center px-4'>
        <h1 className=' text-4xl text-slate-300 font-bold '>Add member</h1>
        <button onClick = {()=>{setAdd(!add)}} className=' h-6 w-6 rounded-full bg-white text-center'><FontAwesomeIcon icon = {faClose}/></button>
        </div>
        <form 
      id='myform'
      
      
    //   onSubmit={handleSubmit}
      className='flex flex-col mt-3'>
        <input type="text" name="name" value={form.name}
        placeholder={`Member name`} onChange={handleChange}
        className='bg-[rgb(50,49,49)] py-4 px-8 mt-3 mx-3
        placeholder:text-secondary
        text-white rounded-lg outlined-none
        border-none font-medium' />

        <div className='flex flex-row items-center gap-5'>
        <input type="submit" onClick={handleSubmit} 
        className='h-10 w-20 bg-white mt-6 mx-2 rounded-2xl hover:cursor-pointer' content='Submit'/>
        {loading && <div className='w-5 h-5 rounded-full border-secondary border-4 border-dotted animate-spin' />}
        </div>

      </form>
    </div> : ''}

    {sub ? <div className='absolute top-[30vh] left-[18vw] h-[30vh] w-[60vw] bg-[rgb(29,27,27)] rounded-2xl border-2 '>
        <div className='mt-2 ml-4 flex justify-between items-center px-4'>
        <h1 className=' text-4xl text-slate-300 font-bold '>Add your github deployed link</h1>
        <button onClick = {()=>{setSub(!sub)}} className=' h-6 w-6 rounded-full bg-white text-center'><FontAwesomeIcon icon = {faClose}/></button>
        </div>
        <form 
      id='myform'
      
      
    //   onSubmit={handleSubmit}
      className='flex flex-col mt-3'>
        <input type="text" name="link" value={form.link}
        placeholder={`github link`} onChange={handleChange}
        className='bg-[rgb(50,49,49)] py-4 px-8 mt-3 mx-3
        placeholder:text-secondary
        text-white rounded-lg outlined-none
        border-none font-medium' />

        <div className='flex flex-row items-center gap-5'>
        <input type="submit" onClick={handleSubmit2} 
        className='h-10 w-20 bg-white mt-6 mx-2 rounded-2xl hover:cursor-pointer' content='Submit'/>
        {loading && <div className='w-5 h-5 rounded-full border-secondary border-4 border-dotted animate-spin' />}
        </div>

      </form>
    </div> : ''}

    </div>
  )
}

export default Myhack

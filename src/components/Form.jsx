import React, { useEffect } from 'react'
import { useRef,useState } from 'react';

    
  

const Form = (props) => {
  
  
  // if((localStorage.getItem('name'))){
  //   var userId = (localStorage.getItem('name'))
  // }
  // else{
  //   var userId = 'guest';
  // }
  const userId = (localStorage.getItem('name'))
  const id = props.id;
  const formRef = useRef();
  const [form,setForm] = useState({'teamname':'','leader':userId,'idea':'','project':''});
  const [loading,setLoading] = useState(false);
  const handleChange = (e) =>{
    e.preventDefault()
  
    const { name,value} = e.target
    
    setForm({...form, [name]:value})
  }
  const valid = async() =>{
    let req = await fetch(`http://localhost:3000/chkusr:${id}:${form.leader}`)
    let data = await req.json();
    console.log(data.value);
    return data.value;
    
  }

  
  
  

  const handleSubmit = async(e) =>{
    
    e.preventDefault();
    const val = await valid();
    if(val == 0){
      setLoading(!loading)
    
    let a = await fetch(`http://localhost:3000/form:${id}`,{
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

      alert("already registered")
    }
    
    
    
    
    

  }

  

  return (
    <div className='pt-6 pl-6 pr-6  w-[70vw] bg-[rgb(22,20,20)] ml-12 mt-12'>
      <h1 className='text-3xl text-white font-bold font-[poppins]'>Team Details</h1>
      <form 
      id='myform'
      ref={formRef}
      onSubmit={handleSubmit}
    //   onSubmit={handleSubmit}
      className='flex flex-col mt-12'>
        <input type="text" name="teamname" value={form.teamname} onChange={handleChange} required={true}
        placeholder={`Team Name`}
        className='bg-[rgb(50,49,49)] py-4 px-8 
        placeholder:text-secondary
        text-white rounded-lg outlined-none
        border-none font-medium' />

        <input type="text" name="leader" value={form.leader} onChange={handleChange} required={true}
        placeholder="Your name(Leader)" disabled = {true}
        className='bg-[rgb(50,49,49)] py-4 px-8 mt-4
        placeholder:text-secondary
        disabled:bg-[rgb(30,30,30)]
        text-white rounded-lg outlined-none
        border-none font-medium' />

<input type="text" name="project" value={form.project} onChange={handleChange} required={true}
        placeholder="Project Name" 
        className='bg-[rgb(50,49,49)] py-4 px-8 mt-4
        placeholder:text-secondary
        disabled:bg-[rgb(30,30,30)]
        text-white rounded-lg outlined-none
        border-none font-medium' />

<input type="text" name="idea" value={form.idea} onChange={handleChange} required={true}
        placeholder="Idea in brief" 
        className='bg-[rgb(50,49,49)] py-4 px-8 mt-4
        placeholder:text-secondary
        disabled:bg-[rgb(30,30,30)]
        text-white rounded-lg outlined-none
        border-none font-medium' />


        

        

        <div className='flex flex-row items-center gap-5'>
        <input type="submit" onClick={handleSubmit} 
        className='h-10 w-20 bg-white my-8 rounded-2xl hover:cursor-pointer' content='Submit'/>
        {loading && <div className='w-5 h-5 rounded-full border-secondary border-4 border-dotted animate-spin' />}
        </div>

      </form>
    </div>
  )
}

export default Form

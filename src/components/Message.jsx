import React from 'react'


function Message(props){
if(props.admin == 'n'){
  if(props.type == 'self') {
    return (
      <>
      <div className='ml-[59%] pt-[2px] px-4 pb-4 w-[40%] text-right bg-slate-800 mt-4 rounded-lg ' >
      <h4 className='text-[11px] text-white'>You</h4>
        <h1 className='text-xl  text-white font-mono'> {props.text}</h1>
          
      </div>
      
      </>
    )
  }
  else{
    return (
      <>
      <div className='ml-[1vw] pt-[2px] px-4 pb-4 max-w-[40%]  text-left bg-[rgb(48,48,48)] mt-4 rounded-lg '>
      <h4 className='text-[11px] text-white'>{props.user}</h4>
      <h1 className='text-xl  text-white font-mono'> {props.text}</h1>
      
      </div>
      
      </>
    )
  }
  
}

else{
    return (
        <>
        <div className='ml-[32%] pt-[2px] px-4 pb-4 w-[40%] text-left bg-[rgb(77,57,57)] mt-4 rounded-xl '>
        <h4 className='text-[11px] text-white'>Admin</h4>
        <h1 className='text-xl  text-white font-mono text-center'> {props.text}</h1>
  
        </div>
        
        </>
      )
}
}
export default Message;

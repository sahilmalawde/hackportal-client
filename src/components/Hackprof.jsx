import React from 'react'

const Hackprof = (props) => {
  return (
    
    <tr className='border-collapse bg-[rgb(39,39,39)] text-white h-12 text-2xl font-mono font-bold  pl-8 pr-8'>
      <td>{props.title}</td>
      <td>{props.teamname}</td>
      
      <td>{props.position ? props.position : 'participant'}</td>
      <td>{props.link ? <a target ="_blank" href={`${props.link}`}>{props.project}</a> : 'no submission'}</td>
    </tr>
  )
}

export default Hackprof

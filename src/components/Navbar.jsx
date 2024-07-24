import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full bg-black text-slate-400 h-[15vh] flex  items-center px-10'>
      <h2 className="text-center text-4xl font-semibold font-[poppins] text-slate-400">
        {"<HAcKer'$ PoRtaL/>".split("").map((child, idx) => (
          <span className='transition-all hover:text-white hover:font-bold' key={idx}>
            {child}
          </span>
        ))}
      </h2>
    </div>
  )
}

export default Navbar

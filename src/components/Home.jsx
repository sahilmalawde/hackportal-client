import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComputer, faUser, faCode, faMessage } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Home = () => {
  const user = localStorage.getItem('name') || 'Guest';
  return (
    <section className='relative w-full bg-hero bg-cover h-[85vh] flex flex-col justify-between'>
      <div className='flex justify-between items-center w-full px-16 py-12'>
        <div className='text-left text-white'>
          <h1 className='text-4xl font-bold mb-4'>Welcome {user}!</h1>
          <p className='text-xl'>Explore the world of hackathons and coding challenges</p>
        </div>
        <div className='grid grid-cols-2 gap-8'>
          <Link to="/Hackathons">
            <div className='p-4 text-white h-[200px] w-[200px] rounded-lg bg-gradient-to-r from-purple-900 via-purple-800 to-purple-700 hover:scale-105 transition-transform duration-300 hover:shadow-lg flex justify-center items-center flex-col text-[3rem] hover:cursor-pointer'>
              <FontAwesomeIcon icon={faCode} />
              <span className='text-lg mt-4'>Hackathons</span>
            </div>
          </Link>
          <Link to="/Profile">
            <div className='p-4 text-white h-[200px] w-[200px] rounded-lg bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 hover:scale-105 transition-transform duration-300 hover:shadow-lg flex justify-center items-center flex-col text-[3rem] hover:cursor-pointer'>
              <FontAwesomeIcon icon={faUser} />
              <span className='text-lg mt-4'>Profile</span>
            </div>
          </Link>
          <Link to="/Code">
            <div className='p-4 text-white h-[200px] w-[200px] rounded-lg bg-gradient-to-r from-green-900 via-green-800 to-green-700 hover:scale-105 transition-transform duration-300 hover:shadow-lg flex justify-center items-center flex-col text-[3rem] hover:cursor-pointer'>
              <FontAwesomeIcon icon={faComputer} />
              <span className='text-lg mt-4'>Code</span>
            </div>
          </Link>
          <Link to="/Contribute">
            <div className='p-4 text-white h-[200px] w-[200px] rounded-lg bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 hover:scale-105 transition-transform duration-300 hover:shadow-lg flex justify-center items-center flex-col text-[3rem] hover:cursor-pointer'>
              <FontAwesomeIcon icon={faMessage} />
              <span className='text-lg mt-4'>Community</span>
            </div>
          </Link>
        </div>
      </div>
      <footer className='w-full text-center py-4 bg-gray-900 text-white'>
        <p>&copy; 2024 Hackathon Platform. All rights reserved.</p>
      </footer>
    </section>
  )
}

export default Home

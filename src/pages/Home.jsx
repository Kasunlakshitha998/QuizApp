import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>Home
        <div className='text-blue-500 text-2xl m-5 p-5'>
        <Link to="/dashboard">Dashboard</Link>
        </div>
    </div>
  )
}

export default Home
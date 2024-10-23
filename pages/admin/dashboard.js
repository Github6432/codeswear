import React, { useEffect } from 'react'
import Adminmenu from './adminmenu';
import { useRouter } from 'next/router';

const Dashboard = ({user}) => {
  const router = useRouter();
  useEffect(() => {
    if(user.role != 'admin'){
      router.push('/')
    }
  }, [])
  
  return (
    <>
      <div>
        <h2 className='text-center my-2 text-pink-400 text-4xl uppercase'>Dashboard</h2>
      </div>
      <div className="flex w-full my-8 p-6 mx-4 bg-white border shadow-xl rounded-lg overflow-hidden">
        <div className="w-1/6"><Adminmenu /></div>
        <div className="w-5/6 mx-4 bg-green-100 p-4 rounded-lg">
          <div>
            <h3 className='text-center my-2 text-pink-400 text-2xl uppercase'>Dashboard</h3>
          </div>
          <h3 className="text-xl font-semibold">Right Side (B)</h3>
          <p className="mt-4">This is the right column content, which has more space than the left side.</p>
        </div>

      </div>
    </>
  )
}

export default Dashboard

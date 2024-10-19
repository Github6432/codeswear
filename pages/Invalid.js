import Link from 'next/link'
import React from 'react'

const Invalid = () => {
  return (
    <div className="h-96 flex flex-col items-center justify-center text-center font-system-ui">
      <div className="leading-[48px] flex flex-col items-center space-y-2">
        <h1 className="text-[48px] font-bold">404</h1>
        <h2 className="text-[18px] font-medium">Product not found.</h2>
        <Link href="/" legacyBehavior>
          <a className="text-[16px] font-normal text-blue-500 hover:underline">
            Go back Home
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Invalid
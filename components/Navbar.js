import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const Navbar = () => {
  return (
    <div className='flex flex-col justify-center items-center md:justify-start md:flex-row shadow-xl my-1 sticky top-0 z-50 bg-white '>
      <div className="logo mx-5">
        <Link href={'/'}>
          <Image className='pb-1' src="/assets/nav.png" alt="" width={200} height={40} />
        </Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-2 font-semibold'>
          <Link href={'/tshirts'} legacyBehavior><a><li>Tshirts</li></a></Link>
          <Link href={'/hoodies'} legacyBehavior><a><li>Hoodies</li></a></Link>
          <Link href={'/stickers'} legacyBehavior><a><li>Stickers</li></a></Link>
          <Link href={'/mugs'} legacyBehavior><a><li>Mugs</li></a></Link>
        </ul>
      </div>
      <div className="cart absolute top-3 right-0 mx-5">
        <AiOutlineShoppingCart className='text-xl md:text-2xl' />
      </div>
      <div className="sidebar">
        
      </div>
    </div>
  )
}

export default Navbar
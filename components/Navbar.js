import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex flex-col justify-center items-center md:justify-start md:flex-row'>
      <div className="logo mx-5">
        <Image src="/assets/nav.png" alt="" width={200} height={40} />
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-2'>
          <Link href={'/'} legacyBehavior><a><li>Tshirts</li></a></Link>
          <Link href={'/'} legacyBehavior><a><li>Hoodies</li></a></Link>
          <Link href={'/'} legacyBehavior><a><li>Stickers</li></a></Link>
          <Link href={'/'} legacyBehavior><a><li>Mugs</li></a></Link>
          <Link href={'/'} legacyBehavior><a><li></li></a></Link>
        </ul>
      </div>
      <div className="cart absolute top-2 right-0 mx-5">Cart</div>
    </div>
  )
}

export default Navbar
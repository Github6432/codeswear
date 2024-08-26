import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { AiFillMinusSquare, AiFillPlusSquare, AiFillShopping, AiOutlineShoppingCart } from 'react-icons/ai'
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md"
import { MdDelete } from 'react-icons/md';

const Navbar = ({ cart, addToCart, removeFromCart, deleteCartItem, subTotal }) => {
  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full');
      ref.current.classList.add('translate-x-0');
    } else {
      ref.current.classList.remove('translate-x-0');
      ref.current.classList.add('translate-x-full');
    }
  }
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
      <div className="cart flex absolute top-3 right-0 mx-8 text-2xl text-pink-500  ">
        <Link href={'/login'}><MdAccountCircle className="mx-2 hover:text-pink-800" /></Link>
        <span className="relative inline-flex cursor-pointer " onClick={toggleCart}>
          <AiOutlineShoppingCart  className='text-xl md:text-2xl hover:text-pink-800' />
        </span>
      </div>
      <div ref={ref} className=" h-screen sidebar absolute overflow-y-scroll p-3 h- top-10 right-0 w-2/3 md:w-3/12 bg-pink-100 md:transform transition-transform translate-x-full">
        <h1 className='text-center font-bold'> Shoping Cart </h1>
        <IoMdCloseCircleOutline onClick={toggleCart} className='absolute cursor-pointer top-0 m-2 font-bold text-2xl text-pink-500' />
        <hr className='border-pink-800 border-2 my-2' />
        <ol className='list-decimal font-semibold mx-5'>
          {Object.keys(cart).length == 0 && <div className=' flex justify-center font-medium'>Your cart is Empty</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className='text-sm mx-1 w-56'>{cart[k].name}</div>
                <div className="w-1/3 flex font-semibold text-center content-between items-center text-lg">
                  <AiFillMinusSquare onClick={() => { removeFromCart(k, 1, cart[k].name, cart[k].size, cart[k].variant) }} className="text-pink-500 cursor-pointer" />
                  <span className="flex font-semibold mx-1 justify-center w-4">{cart[k].qty}</span>
                  <AiFillPlusSquare onClick={() => { addToCart(k, 1, cart[k].name, cart[k].size, cart[k].variant) }} className="text-pink-500 cursor-pointer" />
                  <MdDelete className='text-pink-700 cursor-pointer mx-2' onClick={() => { deleteCartItem(Object.keys(cart)[0]) }} />
                </div>
              </div>
            </li>
          })}
        </ol>
        <div className='flex justify-center'>
          <Link href={`/checkout`} legacyBehavior>
            <button
              type="button"
              className="flex text-white  bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm  mt-4 px-5 py-2  mr-2 mb-2">
              <AiFillShopping className="text-lg mx-1" />
              CHECKOUT
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
import mongoose from 'mongoose';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Product from "@/models/Product";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Invalid from '../invalid';

const Slug = ({ buyNow, addToCart, variants, product, error }) => {
    if (error == '404') {
        return (
            <><Invalid /></>
        );
    }
    const router = useRouter();
    const { slug } = router.query;
    const [pin, setPin] = useState();
    const [service, setService] = useState(null);
    const [color, setColor] = useState(product.color);
    const [size, setSize] = useState(product.size);

    const checkServiceability = async () => {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinJson = await pins.json();
        if (!(pin.length === 6)) {
            setService(false);
            toast.error('Please Enter Valid PinCode', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else if (pinJson.includes(parseInt(pin))) {
            setService(true);
            toast.success('Yay! We serve the area.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else {
            setService(false);
            toast.error('Sorry, Pin Code not Serviceable!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }
    const onChangePin = (e) => {
        setPin(e.target.value);
    }
    const refreshVariant = (newsize, newcolor) => {
        const url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]["slug"]}`;
        console.log(variants[newcolor][newsize]["slug"])
        window.location = url;
    };

    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden">
                <ToastContainer
                    position="top-center"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="container px-5 py-10 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="w-2/3 md:w-1/4 mx-auto object-cover object-center rounded" src={product.img} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">JMT BRAND</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 uppercase">{product.title} [ {product.size} / {product.color} ]</h1>
                            <hr />
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p className="leading-relaxed">{product.desc}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-3">Color</span>
                                    {Object.keys(variants).includes("red") && Object.keys(variants["red"]).includes(size) && (
                                        <button onClick={() => refreshVariant(size, "red")} className={`border-2 rounded-full bg-red-700 hover:bg-red-600 w-6 h-6 focus:outline-none ${color === "red" ? "border-black" : "border-gray-300"}`}></button>
                                    )}
                                    {Object.keys(variants).includes("blue") && Object.keys(variants["blue"]).includes(size) && (
                                        <button onClick={() => refreshVariant(size, "blue")} className={`border-2 rounded-full bg-blue-700 hover:bg-blue-600 w-6 h-6 focus:outline-none ${color === "blue" ? "border-black" : "border-gray-300"}`}></button>
                                    )}
                                    {Object.keys(variants).includes("black") && Object.keys(variants["black"]).includes(size) && (
                                        <button onClick={() => refreshVariant(size, "black")} className={`border-2 rounded-full bg-black hover:bg-black w-6 h-6 focus:outline-none ${color === "black" ? "border-pink-600" : "border-gray-300"}`}></button>
                                    )}
                                    {Object.keys(variants).includes("white") && Object.keys(variants["white"]).includes(size) && (
                                        <button onClick={() => refreshVariant(size, "white")} className={`border-2 rounded-full bg-white hover:bg-white w-6 h-6 focus:outline-none ${color === "white" ? "border-black" : "border-gray-300"}`}></button>
                                    )}
                                    {Object.keys(variants).includes("pink") && Object.keys(variants["pink"]).includes(size) && (
                                        <button onClick={() => refreshVariant(size, "pink")} className={`border-2 rounded-full bg-pink-700 hover:bg-pink-600 w-6 h-6 focus:outline-none ${color === "pink" ? "border-black" : "border-gray-300"}`}></button>
                                    )}
                                    {Object.keys(variants).includes("green") && Object.keys(variants["green"]).includes(size) && (
                                        <button onClick={() => refreshVariant(size, "green")} className={`border-2 rounded-full bg-green-700 hover:bg-green-600 w-6 h-6 focus:outline-none ${color === "green" ? "border-black" : "border-gray-300"}`}></button>
                                    )}
                                    {Object.keys(variants).includes("yellow") && Object.keys(variants["yellow"]).includes(size) && (
                                        <button onClick={() => refreshVariant(size, "yellow")} className={`border-2 rounded-full bg-yellow-400 hover:bg-yellow-500 w-6 h-6 focus:outline-none ${color === "yellow" ? "border-black" : "border-gray-300"}`}></button>
                                    )}
                                </div>
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select value={size} onChange={(e) => { refreshVariant(e.target.value, color); }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10" >
                                            {Object.keys(variants[color]).includes("S") && (<option value={"S"}>S</option>)}
                                            {Object.keys(variants[color]).includes("M") && (<option value={"M"}>M</option>)}
                                            {Object.keys(variants[color]).includes("L") && (<option value={"L"}>L</option>)}
                                            {Object.keys(variants[color]).includes("XL") && (<option value={"XL"}>XL</option>)}
                                            {Object.keys(variants[color]).includes("XXL") && (<option value={"XXL"}>XXL</option>)}
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div className='mx-6'>Available Quantity: {product.availableQty}</div>
                                </div>
                            </div>
                            <div className='flex justify-center items-center mb-2'>
                                <input type="text" onChange={onChangePin} className="p-1 border text-xs border-pink-500 rounded-md" placeholder="Enter Your Pin Code" />
                                <button onClick={checkServiceability} className='text-sm text-white bg-pink-500 border-0 w-24 h-6 mx-5 focus:outline-none hover:bg-pink-600 rounded'>Dilevry Status</button>
                            </div>
                            <div className="flex justify-center items-center mb-3">
                                {(!service && service !== null) && <div className="text-sm text-red-700 mt-1">Sorry! We do not serve the area.</div>}
                                {(service && service !== null) && <div className="text-sm text-green-700 mt-1">Yay! We serve the area.</div>}
                            </div>
                            <div className="flex">
                                {product.availableQty <= 0 && <span className="title-font font-medium text-lg text-gray-900">Out of Stock</span>}
                                {product.availableQty > 0 && <span className="title-font font-medium text-lg text-gray-900">Price : ₹{product.price}</span>}
                                <button disabled={product.availableQty <= 0} onClick={() => { buyNow(slug, 1, product.price, product.title, product.size, product.color, product.img) }} className="ml-auto text-sm text-white disabled:bg-pink-400 bg-pink-600 border-0 w-20 h-8 mx-5 focus:outline-none hover:bg-pink-800 rounded">Buy Now</button>
                                <button disabled={product.availableQty <= 0} onClick={() => { addToCart(slug, 1, product.price, product.title, product.size, product.color, product.img) }} className="ml-auto text-sm text-white disabled:bg-pink-400 bg-pink-600 border-0 w-24 h-8 mx-5 focus:outline-none hover:bg-pink-800 rounded">Add to Cart</button>

                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readystate) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    let product = await Product.findOne({ slug: context.query.slug })
    if (product == null) {
        return { props: { error: '404' } }
    }
    let variants = await Product.find({ title: product.title })
    let colorSizeSlug = {};
    for (let item of variants) {
        if (Object.keys(colorSizeSlug).includes(item.color)) {
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
        } else {
            colorSizeSlug[item.color] = {};
            colorSizeSlug[item.color][item.size] = { slug: item.slug };
        }
    }
    return {
        props: { variants: JSON.parse(JSON.stringify(colorSizeSlug)), product: JSON.parse(JSON.stringify(product)) }, // will be passed to the page component as props
    };

}

export default Slug;
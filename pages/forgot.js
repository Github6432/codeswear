import React, { useEffect, useState } from "react";
import Link from "next/link";
import Company from "../public/assets/nav.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Forgot = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.push('/')
        }
    }, [])

    const handleChange = (e) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
        else if (e.target.name == 're-type-password') {
            setRepassword(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { email, password, repassword }

        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
            method: "POST", // or 'PUT'
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(data),
        });
        let response = await res.json();
        const { message, success, err } = response;
        if (success) {
            toast.success(message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setTimeout(() => {
                router.push(`${process.env.NEXT_PUBLIC_HOST}/login`)
            }, 2100);
        } else {
            toast.error(message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <Link href={"/"}> <Image className="mx-auto" src={Company} alt="Company" width={200} height={40} /> </Link>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Forgot your account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">Or
                            <Link href="/login" className="font-medium text-pink-600 hover:text-pink-500 mx-2"> Login </Link>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="space-y-4 rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input
                                    onChange={handleChange}
                                    value={email || ""}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                onChange={handleChange}
                                value={password || ""}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>

                        <div className="ml-auto">
                            <label htmlFor="re-password" className="sr-only">
                                Re-type Password
                            </label>
                            <input
                                onChange={handleChange}
                                value={repassword || ""}
                                id="re-type-password"
                                name="re-type-password"
                                type="password"
                                autoComplete="re-type-password"
                                required
                                className="relative block w-full appearance-none rounded-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                                placeholder="Re-type Password"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                                Forgot Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Forgot;
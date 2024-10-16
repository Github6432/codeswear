import React, { useEffect, useState } from "react";
import Link from "next/link";
import Company from "../public/assets/nav.png";
import Image from "next/image";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";


const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [securityquestion, setSecurityquestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  console.log(process.env.NEXT_PUBLIC_HOST)

  // useEffect(() => {
  //   if(localStorage.getItem("token")){
  //     router.push('/')
  //   }
  // }, [])

  const handleChange = (e) => {
    if (e.target.name == 'name') { setName(e.target.value) }
    else if (e.target.name == 'lastname') { setLastname(e.target.value) }
    else if (e.target.name == 'email') { setEmail(e.target.value) }
    else if (e.target.name == 'phone') { setPhone(e.target.value) }
    else if (e.target.name == 'securityquestion') { setSecurityquestion(e.target.value) }
    else if (e.target.name == 'answer') { setAnswer(e.target.value) }
    else if (e.target.name == 'password') { setPassword(e.target.value) }
    else if (e.target.name == 're-type-password') { setRepassword(e.target.value) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { name, lastname, email, phone, securityquestion, answer, password, repassword }

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST", // or 'PUT'
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    const { massage, success, err } = response;
    if (success) {
      toast.success(massage, {
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
      toast.error(massage, {
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
    setName('');
    setEmail('');
    setPhone('');
    setSecurityquestion('');
    setAnswer('');
    setPassword('');
    setRepassword('')
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
      <div className="flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Link href={"/"}>
              <Image
                className="mx-auto"
                src={Company}
                alt="Company"
                width={200}
                height={40}
              />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign Up your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link
                href="/login"
                className="font-medium text-pink-600 hover:text-pink-500 mx-2">
                Login
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
            {/* <input type="hidden" name="remember" value="true" /> */}
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  value={name || ""}
                  onChange={handleChange}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="lastname" className="sr-only">Lastname</label>
                <input
                  value={lastname || ""}
                  onChange={handleChange}
                  id="lastname"
                  name="lastname"
                  type="text"
                  autoComplete="lastname"
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder="Your Lastname"
                />
              </div>
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
              <div>
                <label htmlFor="phone" className="sr-only">Phone </label>
                <input
                  onChange={handleChange}
                  value={phone || ""}
                  id="phone"
                  name="phone"
                  type="phone"
                  autoComplete="phone"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder="Phone"
                />
              </div>
              <div>
                <label htmlFor="securityquestion" className="sr-only">Security Question</label>
                <select
                  value={securityquestion}
                  onChange={handleChange}
                  id="securityquestion"
                  name="securityquestion"
                  required
                  className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                >
                  <option value="" disabled>Select a Security Question</option>
                  <option value="firstFriendMobile">What is your first friend or relative's mobile 4 digits ?</option>
                  <option value="favoriteSport">What is your favorite sport?</option>
                </select>
              </div>

              <div>
                <label htmlFor="answer" className="sr-only">Answer</label>
                <input
                  onChange={handleChange}
                  value={answer || ""}
                  id="answer"
                  name="answer"
                  type="answer"
                  autoComplete="answer"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder="Answer"
                />
              </div>
              <div className="flex">
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
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
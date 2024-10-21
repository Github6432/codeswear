import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Myaccount = ({ user, address }) => {
    const router = useRouter();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [userid, setUserid] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [landmark, setLandmark] = useState('');
    const [showform, setShowform] = useState(true);

    const handleChange = (e) => {
        if (e.target.name == 'name') { setName(e.target.value) }
        else if (e.target.name == 'lastname') { setLastname(e.target.value) }
        else if (e.target.name == 'email') { setEmail(e.target.value) }
        else if (e.target.name == 'phone') { setPhone(e.target.value) }
        else if (e.target.name == 'city') { setCity(e.target.value) }
        else if (e.target.name == 'state') { setState(e.target.value) }
        else if (e.target.name == 'pincode') { setPincode(e.target.value) }
        else if (e.target.name == 'landmark') { setLandmark(e.target.value) }
    }
    const updateUserAddress = async (id, name, lastname, email, phone, city, state, country, pincode, landmark) => {
        try {
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateaddress`, {
                method: "POST", // or 'PUT'
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ id, name, lastname, email, phone, city, state, country, pincode, landmark }),
            });
            let response = await res.json();
            if (response.success) {
                // console.log(response)
                window.location.reload();
            } else {
                console.log('Error fetching address:', response.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    const updateprofile = async (id, name, lastname, email, phone, city, state, country, pincode, landmark) => {
        try {
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateprofile`, {
                method: "POST", // or 'PUT'
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ id, name, lastname, email, phone }),
            });
            let response = await res.json();
            if (response.success) {
                // console.log(response)
                window.location.reload();
            } else {
                console.log('Error fetching address:', response.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const updateUserDatials = (id, name, lastname, email, phone, city, state, country, pincode, landmark) => {
        updateUserAddress(id, name, lastname, email, phone, city, state, country, pincode, landmark);
        updateprofile(id, name, lastname, email, phone);
    }
    const toggleForm = () => {
        setShowform(!showform);
    };
    useEffect(() => {
        if (user && address) {
            setName(user.name);
            setLastname(user.lastname);
            setEmail(user.email);
            setPhone(user.phone);
            setUserid(user._id);
            setCity(address.city);
            setState(address.state);
            setCountry(address.country);
            setPincode(address.pincode);
            setLandmark(address.landmark);
        }
    }, [user, address]);



    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, []);

    return (
        <>
            <div>
                <h2 className='text-center my-4 text-pink-400  text-4xl uppercase'> Profile Details</h2>
            </div>
            {!showform && <div className='max-w-5xl my-10 p-6 mx-auto bg-white border shadow-xl rounded-lg overflow-hidden'>
                <form className='px-4 md:px-48'>
                    <div className="grid gap-6 mb-6 md:grid-cols-2 ">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm  text-gray-900 ">First name</label>
                            <input type="text" name='name' id="name" onChange={handleChange} value={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Name" required />
                        </div>
                        <div>
                            <label htmlFor="lastname" className="block mb-2 text-sm  text-gray-900 ">Last name</label>
                            <input type="text" name='lastname' id="lastname" onChange={handleChange} value={lastname} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Last Name" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm  text-gray-900 ">Email</label>
                            <input type="email" name='email' id="email" onChange={handleChange} value={email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Email" required />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block mb-2 text-sm  text-gray-900 ">Phone number</label>
                            <input type="number" name='phone' id="phone" onChange={handleChange} value={phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                        </div>
                        <div>
                            <label htmlFor="city" className="block mb-2 text-sm  text-gray-900 ">City</label>
                            <input type="text" name='city' id="city" onChange={handleChange} value={city} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="City" required />
                        </div>
                        <div>
                            <label htmlFor="pincode" className="block mb-2 text-sm  text-gray-900 ">Pincode</label>
                            <input type="number" name='pincode' id="pincode" onChange={handleChange} value={pincode} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Pincode" required />
                        </div>
                        <div>
                            <label htmlFor="state" className="block mb-2 text-sm  text-gray-900 ">State</label>
                            <input type="text" name='state' id="state" onChange={handleChange} value={state} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="State" required />
                        </div>
                        <div>
                            <label htmlFor="country" className="block mb-2 text-sm  text-gray-900 ">Country</label>
                            <input type="text" name='country' disabled id="country" onChange={handleChange} value={country} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Country" required />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="landmark" className="block mb-2 text-sm  text-gray-900 ">Landmark</label>
                        <textarea type="text" name='landmark' id="landmark" onChange={handleChange} value={landmark} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" rows='2' placeholder="Landmark" required />
                    </div>
                </form >
                {<div className=' flex justify-center px-4 md:px-48'>
                    <button onClick={toggleForm} className="mx-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back </button>
                    <button onClick={() => updateUserDatials(userid, name, lastname, email, phone, city, state, country, pincode, landmark)} className="mx-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update </button>
                </div>}
            </div >}
            {showform && <div className="max-w-lg my-10 mx-auto bg-white border shadow-xl rounded-lg overflow-hidden">
                <div className="px-6">
                    <div className='flex justify-end'>
                        <button onClick={() => setShowform(!showform)} className=' relative top-8 text-pink-600 mr-3 mt-'>Edit Profile</button>
                    </div>
                    <div className="flex items-center">
                        <img
                            className="w-16 h-16 rounded-full border-2 border-white"
                            src="https://i.pravatar.cc/150?img=3"
                            alt="Profile"
                        />
                        <div className="ml-4">
                            <h1 className="text-xl font-bold text-gray-800">{user.name} {user.lastname}</h1>
                            <p className="text-sm text-gray-600 uppercase">Id: {user._id}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-700 text-base">
                            An experienced software developer specialized in building scalable web applications using Next.js and
                            modern technologies.
                        </p>
                    </div>
                </div>
                <div className="p-6 border-t border-gray-200">
                    <div className="flex justify-between mt-2">
                        <span className="text-gray-600">Phone:</span>
                        <span className="text-gray-800 font-bold">{user.phone}</span>
                    </div>
                    <div className="flex justify-between ">
                        <span className="text-gray-600">Email:</span>
                        <span className="text-gray-800 font-bold">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="text-gray-800 font-bold">{address.state}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Address:</span>
                        <span className="text-gray-800 font-bold">{address.landmark} {address.city} {address.state} {address.country} - {address.pincode}</span>
                    </div>
                </div>
            </div>
            }
        </>
    );
};

export default Myaccount;

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
const host = 'https://hospital-management-web-back.vercel.app'
export default function Signup() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    setLoading(true)
    const response = await fetch(`${host}/user/add-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken,);
      setLoading(false);
      navigate('/doctors');
      console.log('succefully signed up')
    }
    else {
      console.log('error in signup')
    }
  }

  return (
    <>
      {loading ? <Loader /> :
        <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-4">
          <div className="bg-white/30 backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={onChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={onChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={onChange} />
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  )
}

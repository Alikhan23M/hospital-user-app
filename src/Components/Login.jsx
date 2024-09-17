import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Loader from './Loader';
const host = 'https://hospital-backend-swyb.onrender.com'
// This function recives the alert function in the props
export default function Login(props) {

  // Create credential state which will store user email and password
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [loading, setLoading] = useState(false);
  
  // Create a navigate variable which we will use for navigation
  let navigate = useNavigate();

  // Handle submit function which will be called when someone submit the login form
  const handleSubmit = async (e) => {

    // prevent browser from refreshing 
    e.preventDefault();

    //After user submit the details call the login backend end point 
    setLoading(true)
    const response = await fetch(`${host}/user/login-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    // Store the response in json 
    const json = await response.json();

    // if json return success true store the auth token and display alert of success
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      setLoading(false);
      props.showAlert('You have Successfully loged in', 'success');
      navigate("/doctors");
    }
    // if success is false then show alert of wrong credentials
    else {
      console.log('Error login');
      props.showAlert('Please try with correct credentials', 'error');
    }
  }

  // This function will be called automatically when value of the form change
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
    { loading?<Loader/>:
      <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-4">
        <div className="bg-white/30 backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          
          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input required type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={onChange} />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input required minLength={5} type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={onChange} />
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Login</button>
            </div>
          </form>
          <p className='mt-2 text-center'><Link to='/signup'>Register an account</Link></p>
        </div>
      </div>
}
    </>
  )
}

import React, { useState, useEffect } from 'react';
import Loader from './Loader';
const host = 'https://hospital-backend-swyb.onrender.com'
export default function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${host}/docotors/getdoctor`);
        const data = await response.json();
        setDoctors(data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      
      <div className="container mx-auto p-8 mt-20">
  <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Our Doctors</h1>
  {loading ? (
    <Loader />
  ) : doctors.length === 0 ? (
    <p className="text-center text-gray-700">No doctors available.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {doctors.map((doctor) => (
        <div key={doctor._id} className="cursor-pointer bg-blue-100 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
          <img
            src={doctor.imageUrl}
            alt={doctor.name}
            className="w-36 h-36 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">{doctor.name}</h2>
          <p className="text-gray-600 mb-2 text-center">{doctor.specialization}</p>
          <p className="text-gray-600 text-center">Phone: {doctor.phone}</p>
        </div>
      ))}
    </div>
  )}
</div>

    </>
  );
}

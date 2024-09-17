import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Loader from './Loader';
const host = 'https://hospital-backend-swyb.onrender.com'
export default function Trackappointment() {
    const [doctorId, setDoctorId] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    let navigate = useNavigate();
    const fetchAppointments = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No auth token found');
            return;
        }
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${host}/appointments/fetch-appointment/${doctorId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setError('Failed to fetch appointments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch(`${host}/docotors/getdoctor`);
                const doctorData = await response.json();
                setDoctors(doctorData);
            } catch (error) {
                console.error('Error fetching doctors:', error);
                setError('Failed to fetch doctors');
            }
        };

        if(!localStorage.getItem('token')){
            navigate('/login');
        }

        else{
            
            fetchDoctors();
        }

    }, [doctors]);

    return (
        <div className='mt-32 container px-16'>
            <div>
                <label htmlFor="doctor">Select Doctor:</label>
                <select
                    name='doctor'
                    id="doctor"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                >
                    <option value="">Select a doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>
                            {doctor.name}
                        </option>
                    ))}
                </select>
            </div>
            <button
                onClick={fetchAppointments}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Fetch Appointments
            </button>
            {loading && <Loader/>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {appointments.map((appointment) => (
                    <div key={appointment._id} className="card p-4 mb-4 border rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold">{appointment.patient_name}</h3>
                        <p>Age: {appointment.age}</p>
                        <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>

    );
}

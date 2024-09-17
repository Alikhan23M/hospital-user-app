import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
const host = 'https://hospital-backend-swyb.onrender.com/'
export default function Appointment(props) {
    // Create state variables for storing appointment details
    const [patientName, setPatientName] = useState('');
    const [age, setAge] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [date, setDate] = useState('');
    let navigate = useNavigate();

    // Use effect hook which will be called after the body renders
    useEffect(() => {

        // This function get all the doctors because we will have to display the doctors as well while takin the appointment
        const fetchDoctors = async () => {

            try {
                const response = await fetch(`${host}/docotors/getdoctor`);
                const doctor = await response.json();
                setDoctors(doctor);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
        else {

            fetchDoctors();
        }
    }, [doctors]);

    // This function will send data from front end to our backend add apointment end point  after the form is submitted
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch(`${host}/appointments/add-appointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ patient_name: patientName, age, doctor: selectedDoctor, date })
            });
            const data = await response.json();
            props.showAlert('You have Successfully taken an appointment', 'success');
            navigate('/track-appointment')
        } catch (error) {
            props.showAlert('Error taking appointment please try again latter', 'error')
            console.error('Error saving appointment:', error);
        }
    };
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-24">
                <div className="bg-white/30 backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-6 text-center">Book an Appointment</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-4">
                            <label htmlFor="patient_name" className="block text-sm font-medium text-gray-700">Patient Name</label>
                            <input
                                name='patient_name'
                                type="text"
                                id="patient_name"
                                value={patientName}
                                // set the patient name as the value changes
                                onChange={(e) => setPatientName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                                type="number"
                                id="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Doctor</label>
                            <select
                                name='doctor'
                                id="doctor"
                                value={selectedDoctor}
                                onChange={(e) => setSelectedDoctor(e.target.value)}
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

                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Book Appointment
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </>
    )
}

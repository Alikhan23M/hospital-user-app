import React from 'react';

export default function About() {
  return (
    <div className="container mx-auto p-8 mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">About Our Hospital Management System</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to our Hospital Management System, a comprehensive solution designed to streamline and enhance the healthcare experience for both patients and doctors. Our system is built with the latest technologies to ensure a secure, efficient, and user-friendly platform.
      </p>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">User Side Features</h2>
      <ul className="list-disc list-inside mb-8 text-gray-700">
        <li>View all registered doctors with detailed profiles.</li>
        <li>Access the About page to learn more about our system.</li>
        <li>Book and track appointments with ease.</li>
        <li>Secure login and signup functionalities to protect user data.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">Doctor Side Features</h2>
      <ul className="list-disc list-inside mb-8 text-gray-700">
        <li>Secure login and signup functionalities for doctors.</li>
        <li>View and manage personal profiles with images.</li>
        <li>Access and manage all appointments efficiently.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">Technologies Used</h2>
      <p className="text-lg text-gray-700 mb-4">
        Our Hospital Management System is built using modern web technologies to ensure a robust and scalable platform:
      </p>
      <ul className="list-disc list-inside mb-8 text-gray-700">
        <li>React for building dynamic and responsive user interfaces.</li>
        <li>Node.js and Express for creating a powerful backend server.</li>
        <li>MongoDB for efficient and flexible data storage.</li>
        <li>Tailwind CSS for designing beautiful and responsive layouts.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">About the Developer</h2>
      <p className="text-lg text-gray-700">
        This project was developed by Ali Khan, a passionate software developer dedicated to creating innovative solutions that improve the healthcare experience. With a strong background in web development and a keen eye for detail, Ali Khan has crafted this system to meet the needs of both patients and doctors.
      </p>
    </div>
  );
}

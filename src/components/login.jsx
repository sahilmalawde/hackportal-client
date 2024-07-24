import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDcwlOmF9HIk3_24aKNHkJjT6FPQiwy2Mo",
    authDomain: "hacker-s-portal.firebaseapp.com",
    projectId: "hacker-s-portal",
    storageBucket: "hacker-s-portal.appspot.com",
    messagingSenderId: "848457459024",
    appId: "1:848457459024:web:7ed2c2dcd7624d39a03855",
    measurementId: "G-3D11Q02VRT"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();

const Login = () => {
    const [value, setValue] = useState('');
    const [dup, setDup] = useState(1);

    const handleSubmit = async () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');

        try {
            const result = await firebase.auth().signInWithPopup(provider);
            const { displayName, email } = result.user;
            setValue(displayName);
            localStorage.setItem("name", displayName);
            localStorage.setItem("email", email);

            const response = await fetch("http://localhost:3000/user");
            const data = await response.json();
            const existingUsers = data.map(item => item.id);

            if (existingUsers.includes(displayName)) {
                setDup(0);
            } else {
                setDup(1);
            }

            if (dup) {
                await fetch("http://localhost:3000/user", {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({ "name": displayName })
                });
                alert("User added successfully!");
            } else {
                alert('User already exists!');
            }
        } catch (error) {
            alert('Login failed. Please try again.');
            console.error(error);
        }
    }

    useEffect(() => {
        setValue(localStorage.getItem('name'));
    }, []);

    return (
        <div className='flex items-center justify-center w-full h-screen bg-login text-green-500'>
            {value ? <Navigate to='/' /> :
                <div className='bg-black border border-green-500 rounded-lg shadow-lg p-8 w-full max-w-lg mb-32'>
                    <h1 className='text-4xl font-bold text-green-500 mb-8 text-center'>
                        Welcome to the Terminal
                    </h1>
                    <div className='flex flex-col items-center'>
                        <div className='w-full mb-4'>
                            <p className='text-xl font-mono'>Login with your Google account:</p>
                        </div>
                        <button
                            className="bg-green-500 text-black rounded-lg px-6 py-3 text-xl font-semibold shadow-md hover:bg-green-400 transition duration-300"
                            onClick={handleSubmit}
                        >
                            <span className='font-mono'>login</span>
                        </button>
                        <div className='mt-4 text-center text-lg font-mono'>
                            <p>Ensure you have a Google account to proceed.</p>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Login;

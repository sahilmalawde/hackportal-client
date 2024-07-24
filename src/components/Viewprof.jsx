import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Hackprof from './Hackprof';

const Viewprof = () => {
    const { userId } = useParams(); // Correctly destructure the parameter
    const user = userId.split(':')[1];
    const [points, setPoints] = useState({});
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            let req = await fetch(`http://localhost:3000/teaminfo:${user}`); // Correct URL format
            let d = await req.json();
            if (d) {
                setData(d);
            }
        } catch (error) {
            console.error("Failed to fetch team info:", error);
        }
    };

    const getPoints = async () => {
        try {
            let req = await fetch(`http://localhost:3000/userpoints:${user}`); // Correct URL format
            let d = await req.json();
            if (d) {
                setPoints(d);
            }
        } catch (error) {
            console.error("Failed to fetch user points:", error);
        }
    };

    useEffect(() => {
        getData();
        getPoints();
    }, [userId]);

    return (
        <div>
            
                <div className='absolute flex flex-col w-full bg-hack bg-cover pl-12 pr-12 pb-48'>
                    <div className='bg-[rgb(23,23,23)] mt-12 w-full text-white flex flex-col pb-4'>
                        <h1 className='text-6xl font-extrabold mt-12 ml-24 text-slate-100'>Profile</h1>
                        <h2 className='mt-12 ml-24 text-2xl font-mono'>username: {userId}</h2>
                        <h2 className='mt-4 ml-24 text-2xl font-mono'>
                            league: {points.points < 10 ? "Syntax Voyager" : (points.points < 30 ? "Code Alchemist" : (points.points < 60 ? "Dev Dynamo" : (points.points < 100 ? "Digital Architect" : "Cyber Sage")))} ~ {points.points} points
                        </h2>

                        <h1 className='text-4xl font-extrabold mt-12 ml-16 text-slate-100'>My Hackathons</h1>

                        <table className='mt-8 ml-6 mr-6'>
                            <thead>
                                <tr className='border-collapse bg-[rgb(22,19,19)] text-white h-12 text-2xl font-mono font-bold pl-8 pr-8'>
                                    <td>Hackathon</td>
                                    <td>Team</td>
                                    <td>Position</td>
                                    <td>Link</td>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, key) => (
                                    <Hackprof
                                        key={key}
                                        title={item.id}
                                        teamname={item.data.teamname}
                                        link={item.data.link}
                                        project={item.data.project}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
};

export default Viewprof;

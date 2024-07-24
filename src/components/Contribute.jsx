import React, { useState, useEffect } from 'react';
import db from './firebase';
import Message from './Message';
import firebase from 'firebase/compat/app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Contribute = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const userId = localStorage.getItem('name');

    useEffect(() => {
        db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()));
        });
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            const snapshot = await db.collection('users').orderBy('points').get();
            const data = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
            setUsers(data.reverse());
        };
        fetchUsers();
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        db.collection('messages').add({
            user: userId,
            text: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput('');
    };

    return (
        <div className="flex overflow-hidden">
            <div className="w-[70%] flex flex-col">
                <div className="flex-grow overflow-hidden">
                    <div className="pb-24 flex flex-col-reverse min-h-[85vh] bg-[rgb(30,29,29)] w-full">
                        {messages.map((message, key) => (
                            <Message
                                key={key}
                                user={message.user}
                                text={message.text}
                                type={message.user === userId ? 'self' : 'dif'}
                                admin={message.user === 'admi@192' ? 'y' : 'n'}
                                dnt={message.timestamp}
                            />
                        ))}
                    </div>
                </div>
                <div className="fixed bottom-0 w-[70%] flex items-center">
                    <form onSubmit={sendMessage} className="w-full flex">
                        <input
                            className="px-4 w-[90%] h-12 text-xl font-mono focus:outline-none text-white bg-[rgb(48,48,48)]"
                            onChange={(event) => setInput(event.target.value)}
                            value={input}
                            type="text"
                            placeholder="Enter Your message"
                        />
                        <button
                            className="w-[10%] h-12 text-xl font-mono text-white bg-[rgb(48,48,48)]"
                            disabled={!input}
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </form>
                </div>
            </div>
            <div className="w-[30%] bg-[rgb(23,23,23)] p-4">
                {/* Leaderboard Content */}
                <h2 className='text-[6rem] text-center text-[rgb(194,198,82)]'>
                    <FontAwesomeIcon icon={faTrophy} />
                </h2>
                <h2 className="text-4xl text-center font-bold text-white mb-10">Leaderboard</h2>
                {users.map((user, index) => (
                    <Link to={`/viewprof/:${user.id}`} key={index}>
                        <div
                            className={`flex justify-between items-center p-2 mb-2 rounded-lg ${
                                index === 0
                                    ? 'bg-[rgb(130,135,19)]'
                                    : index === 1
                                    ? 'bg-[rgb(192,192,192)]'
                                    : index === 2
                                    ? 'bg-[rgb(205,127,50)]'
                                    : 'bg-[rgb(30,26,26)]'
                            }`}
                        >
                            <h2 className='text-2xl text-white font-mono'>{user.id}</h2>
                            <h2 className='text-2xl text-white font-mono'>{user.data.points}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Contribute;

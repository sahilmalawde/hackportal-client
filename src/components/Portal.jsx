import React, { useState, useRef, useEffect } from 'react';
import AceEditor from "react-ace";
import { initSocket } from './socket';
import CopyToClipboard from 'react-copy-to-clipboard';
import "ace-builds/src-noconflict/keybinding-emacs"
import "ace-builds/src-noconflict/keybinding-sublime"
import "ace-builds/src-noconflict/keybinding-vim"
import "ace-builds/src-noconflict/mode-golang"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/mode-typescript"
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/mode-css"
import "ace-builds/src-noconflict/mode-erlang"
import "ace-builds/src-noconflict/theme-monokai"
import { useNavigate } from 'react-router-dom';

const Portal = (props) => {
  const [data, setData] = useState('');
  const [users, setUsers] = useState([]);
  
  const socketRef = useRef(null);
  const userId = localStorage.getItem('name');
  const homenavigator = useNavigate();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      socketRef.current.on("joined", ({ clients, username, socketId }) => {
        setUsers(clients);
        if (username !== userId) {
          alert(`${username} joined the room`);
        }
      });

      function handleErrors(e) {
        alert('socket error ', e);
        homenavigator('/');
      }

      socketRef.current.emit('join', {
        roomId: props.roomid,
        username: userId,
      });

      socketRef.current.on('sync', ({ code, roomId }) => {
        setData(code);
      });

      socketRef.current.on('disconnect', (username) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
        if (username !== userId) {
          alert(`${username} left the room`);
        }
      });
    };
    init();
  }, []);

  useEffect(() => {
    const snr = async () => {
      socketRef.current.emit('sync', {
        code: data,
        roomId: props.roomid,
      });
    };
    snr();
  }, [data]);

  const languages = ["javascript", "python", "golang", "typescript", "java", "html", "css", "erlang"];
  const kbs = ["emacs", "sublime", "vim"];
  const [lang, setLang] = useState("javascript");
  const handleLang = (e) => {
    setLang(e.target.value);
  };

  const [kb, setKb] = useState(() => "emacs");
  const handleKb = (e) => {
    setKb(e.target.value);
  };
  const onChange = (newValue) => {
    setData(newValue);
  };
  const run = async (data) => {
    try {
      const code = eval(data);
      if (code) {
        console.log(code);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='h-[100vh] w-[90vw] mx-[5vw] bg-[rgb(28,27,27)] mt-4 pt-4 px-4 pb-4 flex gap-11'>
      <div className='flex flex-col-reverse'>
        <AceEditor
          id="editor"
          value={data}
          onChange={onChange}
          placeholder='Write your code here!'
          theme='monokai'
          mode={lang}
          keyboardHandler={kb}
          width='40vw'
          height='80vh'
          fontSize={20}
        />
        <div className='flex flex-row w-[40vw] items-center justify-between'>
          <div className='mt-2 mb-6 flex flex-col gap-2 items-center'>
            <select name="kb" id="kb" className='h-8 w-48 bg-[rgb(44,43,43)] text-white' onChange={handleKb} >
              {kbs.map((kb) => (
                <option className='h-8 w-48 bg-[rgb(62,61,61)] text-white' value={kb} key={kb}>{kb}</option>
              ))}
            </select>
            <select name="language" id="language" className='h-8 w-48 bg-[rgb(44,43,43)] text-white' onChange={handleLang} >
              {languages.map((language) => (
                <option className='h-8 w-48 bg-[rgb(62,61,61)] text-white' value={language} key={language}>{language}</option>
              ))}
            </select>
          </div>
          <div className='flex gap-3'>
            <button className='bg-[rgb(50,48,48)] h-10 w-16 rounded-lg text-white font-mono font-extrabold hover:bg-[rgb(129,128,128)] mt-12 hover:text-black transition-colors' onClick={() => run(data)}>Run</button>
            <CopyToClipboard text={data}>
              <button className='cursor-pointer bg-[rgb(50,48,48)] h-10 w-16 rounded-lg text-white font-mono font-extrabold hover:bg-[rgb(129,128,128)] mt-12 hover:text-black transition-colors'>Copy</button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
      <div className='flex flex-col mt-12'>
        <h1 className='text-3xl font-mono text-white'>Connected Users</h1>
        <ul className='mt-4 text-white'>
          {users.map((user, index) => (
            <li key={index} className='mb-2'>{user.username}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Portal

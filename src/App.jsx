import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import { useRef } from 'react';

function App() {
  const [length, setLength ] = useState(8);
  const [numbers, setNumbers] = useState(false)
  const[chars, setChars] =  useState(false);
  const [password, setPassword] = useState('');

  const generatePassword = useCallback(()=>{
    let pass = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbers) str += "123456789";
    if(chars) str += "@#$%^*&_"

    for(let i = 1; i<= length; i++) {
      const num = Math.floor(Math.random()* str.length + 1);
      pass += str.charAt(num);
    }

    setPassword(pass)
  },[length, numbers, chars])

  useEffect(()=>{
    generatePassword();
  },[length,numbers,chars])

  const passRef = useRef(null) 

  const copyPassword = () =>{
    window.navigator.clipboard.writeText(password);
    passRef.current.select()
    
  }

  return (

    <>
   <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passRef}
            
        />
        <button

        onClick={copyPassword}
        
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={20}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numbers}
          id="numberInput"
          onChange={() => {
              setNumbers((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={chars}
              id="characterInput"
              onChange={() => {
                  setChars((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
      
    </>
  )
}

export default App

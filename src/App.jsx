import React, { useState } from 'react'
import "./App.css"
import { Copy, CheckCheck} from 'lucide-react'

function App() {
  
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState('')
  const [includeUpper, setIncludeUpper] = useState(false)
  const [includeLower, setIncludeLower] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)
  
  function generatePassword(){
    let characters = '';
    if (includeUpper) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) characters += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) characters += "0123456789";
    if (includeSymbols) characters += "!@#$%^&*()_-+=;:>,<./?|";

    if (characters.length === 0){
      alert("Select Atleast One Password Type!")
      return;
    }


    let password = '';
    for (let i = 0; i<length; i++){
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += (characters[randomIndex])
    setPassword(password)
    }
  }

  function copyToClipboard(){

    if (password === ''){
      alert("Generate You Password, First!")
    }else{

      navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000);
    }
  }


  const calculateStrength = () => {
    let strength = 0;
    if (includeUpper) strength++;
    if (includeLower) strength++;
    if (includeNumbers) strength++;
    if (includeSymbols) strength++;
    if (length >= 12) strength++;
    return strength;
  };

  const strength = calculateStrength();


  return (
    <>
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-gray-800 relative">
        <h1 className="text-center text-2xl sm:text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
          Random Password Generator
        </h1>

        {/* Password Display */}
        <div className="flex items-center bg-gray-800 rounded-xl p-4 mb-5">
          <input
            type="text"
            placeholder="Your Password!"
            value={password}
            readOnly
            className="flex-1 bg-transparent outline-none md:text-lg text-gray-300 placeholder-gray-500"
          />
          <button
            onClick={copyToClipboard}
            className="hidden sm:inline-block md:ml-3 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm"
          >
            Copy
          </button>


  <button
    onClick={copyToClipboard}
    className="sm:hidden ml-2 text-gray-400 text-xl"
    >
    <Copy/>
  </button>
        </div>
    {copied && (
      <div className='text-green-300 text-sm m-2 -mt-2'>
        <CheckCheck className='inline-block'/> Password Copied Successfully
      </div>
    )}

        {/* Strength Indicator */}
        <p className="text-sm mb-2 text-gray-400">Strength</p>
        <div className="w-full h-2 bg-gray-700 rounded-full mb-4">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              strength <= 2
                ? "bg-red-500 w-1/4"
                : strength === 3
                ? "bg-yellow-500 w-2/4"
                : strength === 4
                ? "bg-blue-500 w-3/4"
                : "bg-green-500 w-full"
            }`}
          ></div>
            <p className={`text-sm font-semibold mt-1 text-center text-light ${strength <= 2
                ? "text-red-500"
                : strength === 3
                ? "text-yellow-500"
                : strength === 4
                ? "text-blue-500"
                : "text-green-500"}`}>
    {strength <= 2
      ? "Weak"
      : strength === 3
      ? "Moderate"
      : strength === 4
      ? "Strong"
      : "Very Strong"}
  </p>
        </div>

        {/* Length Slider */}
        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-400">
            Length: <span className="text-yellow-400">{length}</span>
          </label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-yellow-400"
          />
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-300">
          <label className="flex items-center gap-1 sm:gap-2">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={() => setIncludeUpper(!includeUpper)}
              className="accent-yellow-400"
            />
            Uppercase (A–Z)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={() => setIncludeLower(!includeLower)}
              className="accent-yellow-400"
            />
            Lowercase (a–z)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="accent-yellow-400"
            />
            Numbers (0–9)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
              className="accent-yellow-400"
            />
            Symbols (!@#$)
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center sm:items-stretch">
          <button
            onClick={generatePassword}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-2 px-6 rounded-lg shadow-lg"
          >
            Generate
          </button>
          <button
            onClick={generatePassword}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-3 sm:px-6 rounded-lg"
          >
            Regenerate ↻
          </button>
        </div>

        {/* Footer */}
        {/* <p className="text-gray-500 text-xs mt-6">Day 1 • Random Password Generator</p> */}
      </div>

    </div>
       <div className="footer">
        <p>
           Build With ❤️ by <a href="https://www.linkedin.com/in/kunal-raj-pal/" target="_blank">Kunal Raj Pal</a>
        </p>
    </div>
    
    </>
  )
}

export default App
import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  let [length, setlength] = useState(8);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [charaterAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");
  // console.log(password);

  let useRefer = useRef(null);

  let passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstwxyz";
    if (numberAllowed) str += "0123456789";
    if (charaterAllowed) str += "/[!@#$%^&*()_+{}[]:;<>,.?~\\/-]/";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      // console.log(char);
    }

    setPassword(pass);
    //console.log(password);
  }, [length, numberAllowed, charaterAllowed, setPassword]);

  let copyClickBord = useCallback(() => {
    useRefer.current?.select();
    useRefer.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  }, []);

  useEffect(() => {
    passwordgenerator();
  }, [length, numberAllowed, charaterAllowed, passwordgenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-20 text-orange bg-gray-700">
      <h1 className=" text-center text-white mb-2 mt-2 font-lg ">
        Password Generator
      </h1>

      <div className=" flex shadow rounded-lg overflow-hidden  mb-4">
        <input
          type="text"
          value={password}
          className="w-full py-1 px-3 outline-none font-light  text-1.5xl text-black-800"
          placeholder="password"
          readOnly
          ref={useRefer}
        />
        <button
          className="shrink-0 bg-blue-600 outline-none py-2 px-1 text-white hover:bg-blue-700"
          onClick={copyClickBord}
        >
          copy
        </button>
      </div>
           <div className="flex gap-x-1 text-sm text-white">
      <div className="flex items-center gap-x-1">
        <input
          type="range"
          min={8}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e) => {
            setlength(e.target.value);
          }}
        />
        <label>length:{length}</label>
      </div>

      <div className="flex items-center gap-x-1">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="number"
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
        />
        <label htmlFor="number">number</label>
      </div>

      <div className="flex items-center gap-x-1">
        <input
          type="checkbox"
          defaultChecked={charaterAllowed}
          id="chactear"
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
        />
        <label htmlFor="chactear">chactear</label>
        </div>
      </div>
    </div>
  );
}

export default App;

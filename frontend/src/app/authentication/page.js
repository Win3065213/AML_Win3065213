"use client";
import { useState, useRef } from "react";
import Cover from "@/components/login/cover";
import axios from "axios";
import Login from "@/components/login/form";
import { useSearchParams } from "next/navigation";


export default function Home() {
  const [email, setEmail] = useState('');
  const [pwd, setPassword] = useState('');
  const [rePWD, setRePWD] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const registerURL = "http://localhost:8000/authregister";
  const registerUser = (e) => {
    e.preventDefault();
    // console.log("register");

    // field check
    if (!email || !pwd || !rePWD) {
      return setError("All fields required.")
    }

    if (pwd != rePWD) {
      return setError("Passwords do not match.")
    }

    // regex check
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return setError("Invalid email format");
    }

    // register
    axios
      .post(registerURL, {
        email: email,
        password: pwd,
      })
      .then(() => {
        // setUserList([...userList, {email: email, password: pwd}])
        setError("");
        setSuccess("Registered Successfully.");
      }).catch(err => {
        setSuccess("");
        if(err?.response?.data?.error) {
          setError(err.response.data.error)
        } else if(err?.response?.data) {
          setError(err.response.data)
        } else {
          setError(err.message)
        }
      });
  };

  //to prevent initial animation
  const [registerClicked, setRegisterClicked] = useState(false)

  const handleCoverClick = () => {
    setRegisterClicked(!registerClicked)
  }

  return (
    <div className="p-5 w-dvw h-dvh grid grid-cols-1 lg:grid-cols-2
                  bg-black text-white">
      <div className="relative glass overflow-hidden
                      rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl">
        <Cover isRegister={false} clicked={registerClicked} onClick={() => handleCoverClick()} />
        {/* Register Form under Login Cover */}
        <form className="auth h-full flex flex-col justify-center items-center">
          {error && (
            <div className="w-[300px] bg-red-500 bg-opacity-50 rounded-lg ring-red-500 ring-2 p-3 mb-2">
            {error}
            </div>
          )}
          {success && (
            <div className="w-[300px] bg-green-500 bg-opacity-50 rounded-lg ring-green-500 ring-2 p-3 mb-2">
            {success}
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            //className="border w-full h-15 px-5 py-5 hover:outline-none focus:outline-none focus:ring-1 focus:ring-primary rounded-lg bg-white"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }} />
            
          <input
            type="password"
            placeholder="Password"
            // className="border w-full h-15 px-5 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-elanco rounded-lg bg-white"
            value={pwd}
            onChange={(e) => {
              setPassword(e.target.value)
            }} />
            
          <input
            type="password"
            placeholder="Retype Password"
            // className="border w-full h-15 px-5 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-elanco rounded-lg bg-white"
            onChange={(e) => {
              setRePWD(e.target.value);
            }} />
            
            <div>
                <button onClick={registerUser} className="bg-foreground text-background">Register</button>
            </div>
        </form>
      </div>

      <div className="relative glass overflow-hidden
                      rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl">
        <Cover isRegister={true} clicked={!registerClicked} onClick={() => handleCoverClick()} />

        {/* Login Form under Register Cover */}
        {/* <form className="form size-full p-10 md:justify-center">
          <label>Email:</label>
          <input type="text" className="Email" value={email} onChange={(e) => {
            setEmail(e.target.value)
          }}/>

          <label>Password:</label>
          <input type="text" className="password" value={pwd} onChange={(e) => {
            setPassword(e.target.value)
          }}/>

          <button onClick={loginUser} className="bg-foreground text-background">Login</button>
        </form> */}
        <Login email={email} password={pwd} setEmail={setEmail} setPassword={setPassword} />
      </div>
    </div>
  );
};
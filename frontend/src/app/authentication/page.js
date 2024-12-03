"use client";
import { useState, useRef } from "react";
import Cover from "@/components/login/cover";
import axios from "axios";
import Login from "@/components/login/form";


export default function Home() {
  const [email, setEmail] = useState('');
  const [pwd, setPassword] = useState('');
  const rePWD = useRef('');

  const registerURL = "http://localhost:8000/authentication/register";
  const registerUser = () => {
    // e.preventDefault();
    // console.log("register");
    // if (!email || !pwd || !rePWD.current) {
    //   console.log("empty")
    // } else {
    //   console.log("success");
    // }

    axios
      .post(registerURL, {
        email: email,
        password: pwd,
      })
      .then(() => {
        // setUserList([...userList, {email: email, password: pwd}])
        alert("Register Successfully");
      });
      // .catch((err) => {
      //   console.error("Error: ", err);
      //   result(err, null);
      // });
  };

  //to prevent initial animation
  const [registerClicked, setRegisterClicked] = useState(false)

  const handleCoverClick = () => {
    setRegisterClicked(!registerClicked)
  }

  return (
    <div className="p-5 w-dvw h-dvh grid grid-cols-1 md:grid-cols-2
                  bg-black text-white">
      <div className="relative glass overflow-hidden
                      rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl">
        <Cover isRegister={false} clicked={registerClicked} onClick={() => handleCoverClick()} />

        {/* Register Form under Login Cover */}
        <form className="auth h-full flex flex-col justify-center items-center">
          <input
            type="text"
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
              rePWD.current = e.target.value;
            }} />
            
            <div>
                <button onClick={registerUser} className="bg-foreground text-background">Register</button>
            </div>
        </form>
      </div>

      <div className="relative glass overflow-hidden
                      rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl">
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
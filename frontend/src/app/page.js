"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/authentication');

  const [email, setEmail] = useState('');
  const [pwd, setPassword] = useState('');
  // const [userList, setUserList] = useState([])

  const url = "http://localhost:8000/api/create";
  const createUser = () =>{
    axios
      .post(url, {
        email: email,
        password: pwd,
      })
      .then(() => {
        // setUserList([...userList, {email: email, password: pwd}])
        alert("Successfully created user");
      });
      // .catch((err) => {
      //   console.error("Error: ", err);
      //   result(err, null);
      // });
  };

  return (
    <div className="App">
      <h1 className="text-center">CRUD Prototype (Create)</h1>
      <div className="form">
        <label>Email:</label>
        <input type="text" className="Email" onChange={(e) => {
          setEmail(e.target.value)
        }}/>

        <label>Password:</label>
        <input type="text" className="password" onChange={(e) => {
          setPassword(e.target.value)
        }}/>

        <button onClick={createUser} className="bg-foreground text-background">Create</button>
      </div>
    </div>
  );
};

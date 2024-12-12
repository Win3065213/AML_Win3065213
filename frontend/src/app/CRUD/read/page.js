"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [userList, setUserList] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    
    useEffect(() => {
        // const url = "http://localhost:8000/api/read";
        const url = "http://localhost:8000/api_n_tier/read";
        axios.get(url).then((response) => {
            setUserList(response.data)
        })
    }, []);
    
    const deleteUser = async (id) => {
      const delURL = `http://localhost:8000/api_n_tier/delete/${id}`;
      try {
        const response = await axios.delete(delURL);
        setUserList(userList.filter(user => user.uid !== id));
        setSuccess(response.data.message);
      }
      catch (err) {
        console.log("Error deleting user: ",err)
        setError(err.response ? err.response.data.error : err.message);
      }
    }

  return (
    <div className="App">
      <h1 className="text-center">CRUD Prototype (Read, Delete)</h1>
      
      {success && <p className="text-green-500 mb-4">{success}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table>
        <thead>
            <tr>
                <th>UID</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
                <th></th>
            </tr>
        </thead>

        <tbody>
        {userList.map((user, index) => (
            <tr key={index}>
                <td>{user.uid}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td><a href="/">Update</a></td>
                <td><button onClick={() =>deleteUser(user.uid)}>Delete</button></td>
            </tr>
        ))}
        </tbody>
      </table>
      <button onClick={() =>deleteUser(1000)}> Testing </button>
    </div>
  );
};

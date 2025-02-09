'use client'
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
// put the async here
export default function Form ({
    email,
    password,
    setEmail,
    setPassword
}) {
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!email|| !password) {
            return setError('All fields required.');
        }

        // regex check
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) {
        return setError("Invalid email format.");
        }

        try {
            await signIn("credentials", {
                email: email,
                password: password,
            });
        } catch (error) {
            console.error('Sign in error:', error);
            setError('An unexpected error occurred');
        }
    }

    const searchParams = useSearchParams();
    const errors = searchParams ? searchParams.get("error") || "" : "";

    // // testing and referencing
    // const loginURL = "http://localhost:8000/auth/login";
    // const loginUser = (e) =>{
    //     e.preventDefault();
    //     console.log("login");
    //     console.log(email,password);
    //     // axios
    //     //   .post(loginURL, {
    //     //     email: email,
    //     //     password: pwd,
    //     //   })
    //     //   .then(() => {
    //     //     // setUserList([...userList, {email: email, password: pwd}])
    //     //     alert("Login Successful");
    //     //   });
    //     //   // .catch((err) => {
    //     //   //   console.error("Error: ", err);
    //     //   //   result(err, null);
    //     //   // });
    // };

    return (
        <div className="h-full flex flex-col justify-center">
            <form onSubmit={onSubmit} className="auth flex flex-col items-center">
                {/* for login failed */}
                {errors && !error && (
                    <div className="w-[300px] bg-red-500 bg-opacity-50 rounded-lg ring-red-500 ring-2 p-3 mb-2">
                        {errors}
                    </div>
                )}
                {/* for other types */}
                {error && (
                    <div className="w-[300px] bg-red-500 bg-opacity-50 rounded-lg ring-red-500 ring-2 p-3 mb-2">
                    {error}
                    </div>
                )}

                <input
                    type="text"
                    aria-label="email field"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }} />

                <input
                    type="password"
                    aria-label="password field"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} />

                <div>
                    <button type="submit" className="bg-foreground text-background w-20 p-2 rounded-lg hover:ring-2 hover:ring-[var(--primary)]">Login</button>
                </div>
                <a href="/pages/home" className="mt-2 hover:underline">Back to Home Page</a>
            </form>
        </div>
    )
}
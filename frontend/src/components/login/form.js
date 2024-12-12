'use client'
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
// put the async here
export default function Form ({
    email,
    password,
    setEmail,
    setPassword
}) {
    // these seems extras
    const [error, setError] = useState('');
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault()

        if (!email|| !password) {
            return;
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
    // const loginURL = "http://localhost:8000/authentication/login";
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
                {errors && (
                    <div className="w-[300px] bg-red-500 bg-opacity-50 rounded-lg ring-red-500 ring-2 p-3 mb-3">
                    Username or password is incorrect.
                    </div>
                )}

            {/* <form onSubmit = {onSubmit}> */}
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
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} />

                <div>
                    {/* <button
                        type="submit"
                        className="mt-4 border-2 border-elanco px-10 py-2 w-full hover:bg-elanco hover:text-white duration-200 rounded-lg"
                    >
                        Login
                    </button> */}
                    <button type="submit" className="bg-foreground text-background">Login</button>
                </div>
            </form>
        </div>
    )
}
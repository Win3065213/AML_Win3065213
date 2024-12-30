'use client'
import { useState, useEffect } from "react";

export default function Cover({
    isRegister,
    clicked,
    onClick
}) {
    const [isInitialRender, setIsInitialRender] = useState(true)

    useEffect(() => {
        // Set a small delay to ensure the initial render is complete
        const timer = setTimeout(() => setIsInitialRender(false), 50)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div 
          onClick={onClick}
          className={`absolute size-full flex flex-col justify-center items-center gap-4
                      bg-white text-black
                      ${!isInitialRender ? 'transition-all duration-1000 ease-in-out' : ''}
                      ${clicked ? 'animate-fade-out opacity-0 pointer-events-none' : 'animate-fade-in opacity-100'}`}>

            <div className="text-5xl font-bold">Welcome to AML</div>
            <div className="text-3xl font-semibold">{isRegister ? "Register" : "Login"} Page</div>
            <div>
                {isRegister ? "Already created account?" : "Haven't created account?"} Click here
            </div>

        </div>
    );
}
'use client'

import { signOut } from "next-auth/react"

export default function Navbar() {

    return (
        <div className="flex">
            <button onClick={() => signOut()}>Logout</button>
        </div>
    );
}
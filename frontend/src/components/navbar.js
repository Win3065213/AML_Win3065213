'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Navbar({ login, role }) {
    let links;

    if (role == "member") {
        links = [
            {
                name: "Home",
                href: "/user"
            },
            {
                name: "Media",
                href: "/pages/discover"
            },
            {
                name: "Access",
                href: "/user/access"
            },
        ];
    } else if (role == "sys_admin") {
        links = [
            {
                name: "Home",
                href: "/sys_admin"
            },
            {
                name: "Media",
                href: "/pages/discover"
            },
            {
                name: "Access",
                href: "/sys_admin/access"
            },
        ];
    } else {
        links = [
            {
                name: "Home",
                href: "#home"
            },
            {
                name: "Media",
                href: "/pages/discover"
            },
        ];
    }

    const router = useRouter();
    const redirectAuth = () => {
        router.push('/authentication');
    }

    return (
        <nav className="glass flex px-2">
            <div className="flex pl-5">
                {links.map((link, index) => (
                    <a key={index} href={link.href} className=" w-24 flex justify-center items-center
                                                                box-border border-[var(--primary)]
                                                                hover:border-b-2 hover:glass">{link.name}</a>
                ))}
            </div>
            
            <div className="ml-auto">
                {login ? 
                <button className=" px-3 py-2 m-2 border-2 border-[var(--primary)] dark:border-inherit rounded-full
                                    bg-[var(--primary)] hover:bg-inherit text-[var(--background)] hover:text-[var(--foreground)]
                                    dark:bg-[var(--foreground)]
                                    duration-500" onClick={() => signOut()}>Logout</button>
                : <button className="   px-3 py-2 m-2 border-2 border-[var(--primary)] dark:border-inherit rounded-full
                                        hover:bg-[var(--primary)] hover:text-[var(--background)]
                                        dark:bg-[var(--background)] dark:hover:bg-[var(--foreground)]
                                        duration-500" onClick={redirectAuth}>Register/Login</button>}
                
            </div>
        </nav>
    );
}
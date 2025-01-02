import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Navbar from "@/components/navbar"

export default async function SysAdminLayout({ children }) {
    const session = await getServerSession(authOptions)
    // console.log("Session: ",session);

    if (session === null) {
        // console.log("Require login");
        redirect("/authentication")
    }

    if (session?.role != "sys_admin") {
        // console.log("unauthorized");
        redirect("/authentication")
    }

    return (
        <div>
            <Navbar login={session != null} role={session?.role} />
            {children}
        </div>
    )
}
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function MemberLayout({ children }) {
    const session = await getServerSession(authOptions)
    // console.log("Session: ",session);

    if (session === null) {
        // console.log("Require login");
        redirect("/authentication")
    }

    if (session?.user.role != "admin") {
        // console.log("unauthorized");
        redirect("/authentication")
    }

    return (
    <div> {children} </div>
    )
}
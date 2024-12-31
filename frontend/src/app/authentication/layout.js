import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function AuthLayout({ children }) {
  const session = await getServerSession(authOptions)
  // console.log(session)
  if (session?.role == "member") {
    redirect("/user")
  }
  if (session?.role == "sys_admin") {
    redirect("/sys_admin")
  }

  return (
    <div> {children} </div>
  )
}
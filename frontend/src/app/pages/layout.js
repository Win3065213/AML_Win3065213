import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Navbar from "@/components/navbar"

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions)
  
  return (
    <div>
        <Navbar login={session != null} role={session?.role} />
        {children}
    </div>
  )
}
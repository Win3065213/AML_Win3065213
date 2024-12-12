import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/components/navbar";
import axios from "axios";
import { getServerSession } from "next-auth";

export default async function AdminAccess() {
  const session = await getServerSession(authOptions);
  
  const response = await axios.get("http://localhost:8000/admin/access", {
  headers: {
      Authorization: session ? `Bearer ${session.jwt}`:  `Bearer `,
      "Content-Type": "application/json",
  },
  }).catch((err) => {
    if(err.response.status == "401") {
      return {error: "Unauthorised, require login."};
    }
    if(err.response.status == "403") {
      return {error: "Forbidden, you don't have permission."};
    }
    return null;
  });
  // console.log(response);
  // console.log("Condition: ", `${response?.error ? "Yes":"No"}`);

  return (
    <div>
      <Navbar />
      {response?.error && (
        <div className="bg-red-500 bg-opacity-50 rounded-lg ring-red-500 ring-2 p-3 my-2">
          {response?.error}
        </div>
      )}

      Admin Page. The page requires admin role to access it.
    </div>
  );
};
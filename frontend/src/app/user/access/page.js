import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { getServerSession } from "next-auth";

export default async function UserAccess() {

  const session = await getServerSession(authOptions);
  
  const response = await axios.get("http://localhost:8000/member/access", {
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
    if(err.response.status == "500") {
      return {error: "Connection error."};
    }
    return null;
  });

  return (
    <div className="p-7">
      <div className="text-3xl">User Data (except hashed password)</div>
      {response.error ? (
        <div className="bg-red-500 bg-opacity-50 rounded-lg ring-red-500 ring-2 p-3 my-2">
          {response?.error}
        </div>
      ) : (
        <div className="text-lg">
          <p><span className="font-bold">AccountID:</span> {response.data.accountID}</p>
          <p><span className="font-bold">Email:</span> {response.data.email}</p>
          <p><span className="font-bold">RoleID:</span> {response.data.roleID}</p>
          <br/>
        </div>
      )}
      <p>User Data Access. The page requires member role to access data.</p>
      <p>Purpose: To simulate data request that requires token.</p>
    </div>
  );
};
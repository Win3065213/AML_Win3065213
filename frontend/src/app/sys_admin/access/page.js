import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { getServerSession } from "next-auth";

export default async function SysAdminAccess() {
  const session = await getServerSession(authOptions);
  
  const response = await axios.get("http://localhost:8000/sys_admin/access", {
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
      {response?.error && (
        <div className="bg-red-500 bg-opacity-50 rounded-lg ring-red-500 ring-2 p-3 my-2">
          {response?.error}
        </div>
      )}
      <div className="text-3xl">System Admin Data (except hashed password)</div>
      <p>AccountID: {response.data.accountID}</p>
      <p>Email: {response.data.email}</p>
      <p>RoleID: {response.data.roleID}</p>
      <br/>
      System Admin Data Page. The page requires system admin role to access data.
    </div>
  );
};
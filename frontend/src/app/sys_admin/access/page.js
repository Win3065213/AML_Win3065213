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
    if(err.response.status == "500") {
      return {error: "Connection error."};
    }
    return null;
  });
  // console.log(response);
  // console.log("Condition: ", `${response?.error ? "Yes":"No"}`);

  return (
    <div className="p-7">
      <div className="text-3xl">System Admin Data (except hashed password)</div>
      {response.error ? (
        <div className="bg-red-500 bg-opacity-50 rounded-lg ring-red-500 ring-2 p-3 my-2">
          {response?.error}
        </div>
      ) : (
        <div className="text-lg">
          <p><span className="font-bold">Email:</span> {response.data.email}</p>
          <p><span className="font-bold">Role:</span> {response.data.roleName}</p>
          <p><span className="font-bold">Contract Type:</span> {response.data.contractType}</p>
          <p><span className="font-bold">EmploymentType:</span> {response.data.employmentType}</p>
          <p><span className="font-bold">Hired Date:</span> {response.data.hireDate.slice(0, 10)}</p>
          <br/>
        </div>
      )}
      <p>System Admin Data Access. The page requires system admin role to access data.</p>
      <p>Purpose: To simulate data request that requires token.</p>
    </div>
  );
};
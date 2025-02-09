import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default  async function DashboardPage() {
    //get user and redirect
    const user =await currentUser()
    if(!user?.privateMetadata?.role || user?.privateMetadata.role === 'USER')redirect('/');
    if(user.privateMetadata.role ==='ADMIN') redirect('/dashboard/admin');
    if(user.privateMetadata.role ==='SELLER') redirect('/dashboard/seller')
    return (
      <div className="p-5">
        
        <h1 className=" text-blue-500 font-barlow">Dashboard page</h1>
        
      </div>
    );
  }
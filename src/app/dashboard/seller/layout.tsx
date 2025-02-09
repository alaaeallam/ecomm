import {ReactNode} from "react";
export default function SellerDashboardLayout({children}:{children:ReactNode}) {
  return (
    <div className="p-5">
      
      <h1 className=" text-blue-500 font-barlow">{children}</h1>
      
    </div>
  );
}
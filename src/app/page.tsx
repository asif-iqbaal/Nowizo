import Image from "next/image";
import { DBconnect } from "@/dbConfig/dbConfige";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { useEffect } from "react";
export default async function Home() {
     useEffect(() => {
     async function FirtFunction(){
          await DBconnect();
          const user = await getUser();
          if(user){
               redirect('/dashboard/home');
          }else{
          redirect('/auth/login')
          }
     }
     FirtFunction();
     },[]);
   
}

import Image from "next/image";
import { DBconnect } from "@/dbConfig/dbConfige";
import { LeftNavigation } from "@/components/shared/sideNavigation";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
export default async function Home() {
   await DBconnect();
  const user = await getUser();
  if(user){
       redirect('/dashboard/home');
  }else{
   redirect('/auth/login')
  }
}

import { DBconnect } from "@/dbConfig/dbConfige";
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

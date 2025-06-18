import Image from "next/image";
import { DBconnect } from "@/dbConfig/dbConfige";
import { LeftNavigation } from "@/components/shared/sideNavigation";
import { redirect } from "next/navigation";
export default async function Home() {
   await DBconnect();

     redirect('/dashboard/home');

}

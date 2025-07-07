"use client"

import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/ui/login-form"
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";

//import Loading from "@/components/ui/loading";
import {Loader2} from 'lucide-react'
import Image from "next/image";
export default function LoginPage() {
   const [loading,setLoading] = useState<boolean>(false);
  
   const router = useRouter();
   useEffect(() => {
    async function checkUser() {
      setLoading(true);
      const user = await getUser();
      if (user) {
        router.push("/dashboard/home");
      } else {
        setLoading(false);
      }
    }
  
    checkUser();
  }, [router]);

    if(loading){
      return(
        <>
        <div className="w-screen h-screen flex justify-center items-center text-white">
          <Loader2 />
        </div>
        </>
      )
    }
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-bold text-white">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            NOWIZO
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/nowizo.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
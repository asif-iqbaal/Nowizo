"use client";

import React,{useEffect,useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { Facebook } from "lucide-react";
import { LoginSchema } from "@/validation";
import { loginUser } from "@/lib/action/auth";
import { getUser } from "@/lib/auth";
import {toast} from "sonner";
import Spinner from "./loader";

type SignFormValues = z.infer<typeof LoginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [loading,setLoading] = useState<boolean>(false);
   const [login,setLogin] = useState<boolean>(false);

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
}, []);


  const form = useForm<SignFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignFormValues) => {
    try {
      setLogin(true);
      const user = await loginUser(data);
      if(user.message === "Incorrect password"){
        toast(user.message)
        setLogin(false);
        
      }else if(user.message === "invalid email"){
        toast(user.message)
        setLogin(false);
      }else if(user.message === "please verify youself from email verification"){
        toast(user.message)
        setLogin(false);
      }
      else{
      router.push('/dashboard/home');
       toast("Logged In Successfully")
       setLogin(false);
      };
    } catch (error) {
          if (error instanceof Error) {
        toast(error.message);
      } else {
        toast("An unexpected error occurred");
      }
      setLogin(false);
    }
  };

  if(loading){
    return(
      <>
      <div className="w-screen h-screen"><Spinner /></div>
      </>
    )
  }
  return (
    <div className={cn("w-full max-w-md space-y-6 text-white", className)}>
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold">Login your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to login your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"  {...props}>
                    
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {!login ? <Button type="submit" className="w-full">
            Sign in
          </Button> : <Button className="w-full "> <Spinner /> </Button>}
        </form>
      </Form>

      <div className="relative text-center text-sm">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <span className="relative bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="outline" className="w-full bg-black text-white">
          <FcGoogle className="mr-2" size={20} />
          Sign up with Google
        </Button>
        <Button variant="outline" className="w-full bg-black text-white">
          <Facebook className="mr-2" size={20} />
          Sign up with Facebook
        </Button>
      </div>

      <div className="text-center text-sm">
        Don't have an account?{" "}
        <a href="/auth/signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </div>
  );
}

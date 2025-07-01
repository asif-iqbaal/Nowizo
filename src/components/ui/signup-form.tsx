"use client";

import React,{useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { SignupSchema } from "@/validation";
import { createUser } from "@/lib/action/auth";
import { toast } from "sonner";
import Spinner from "./loader";

type SignFormValues = z.infer<typeof SignupSchema>;

export function SignForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading,setLoading] = useState<boolean>(false);

  const form = useForm<SignFormValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      displayName:"",
    },
  });

  const onSubmit = async (data: SignFormValues) => {
    try {
      setLoading(true)
      let user = await createUser(data)
      if(user.message === "User already exist"){
        toast(user.message);
        setLoading(false);
      }else{
        toast("Signed Up Successfully \n Please Verify yourself from email")
        setLoading(false);
      }
    } catch (error:any) {
      toast(error);
    } finally{
      setLoading(false);
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
    <div className={cn("w-full max-w-md space-y-6 text-white", className)} >
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" {...props}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="example_01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

             <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="example" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
          
          <Button type="submit" className="w-full">
            Sign up
          </Button>
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

      <div className="flex flex-col gap-2 text-black">
        <Button variant="outline" className="w-full">
          <FcGoogle className="mr-2" size={20} />
          Sign up with Google
        </Button>
        <Button variant="outline" className="w-full">
          <Facebook className="mr-2" size={20} />
          Sign up with Facebook
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/auth/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </div>
  );
}

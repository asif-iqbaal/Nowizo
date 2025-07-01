"use client"

import React,{useState} from "react"
import {
 Home,
 Inbox,
 PlusIcon,
 Search,
 User } from "lucide-react";
import 
{ 
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger
} from "../ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import 
{ Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle 
} from "../ui/dialog";
import 
{ 
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage
 } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PostContent } from "@/lib/action/createPost";
import { toast } from "sonner";
import { Logout } from "@/lib/action/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostSchema } from "@/validation";
import { z } from "zod";

const items = [
  {
    title: "Home",
    url: "/dashboard/home",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/dashboard/inbox",
    icon: Inbox,
  },
  {
    title: "Search",
    url: "/dashboard/search",
    icon: Search,
  },
  {
    title: "Create",
    url: "#",
    icon: PlusIcon,
  },
//   {
//     title: "Profile",
//     url: "/dashboard/profile",
//     icon: User,
//   },
//   {
//     title: "Settings",
//     url: "/dashboard/setting",
//     icon: Settings,
//   },
];

type PostFormValue = z.infer<typeof CreatePostSchema>

export default function MobileNavigation(){

   const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading,setLoading] = useState<boolean>(false);

  const [preview,setPreview] = useState("");
  const [step,setSteps] = useState<number>(1);
  const router = useRouter();

  const form = useForm<PostFormValue>({
    resolver: zodResolver(CreatePostSchema),
   defaultValues: {
   file: undefined,
   caption: '',
}

  })
  const handleItemClick = (title: string, url: string) => {
    if (title.toLowerCase() === "create") {
      setOpenDialog(true);
    } else {
      router.push(url);
    }
  };

   function handleStepsForward (){
    if(step < 2){
      setSteps(step + 1);
    }
  }

    function handleStepsBackward (){
    if(step > 1){
      setSteps(step - 1);
    }
  }

  const  handleSubmit = async (data:PostFormValue) =>{
      try {
        setLoading(true);
        const post  = await PostContent(data);

        if(post){
          toast(post.message);
          setSteps(1);
          setLoading(false);
          setOpenDialog(false);
        }
        
      } catch (error:any) {
        toast(error.message);
        setLoading(false);
      }finally{
        setLoading(false);
      }
  }
  
  const handleLogout = async () => {
   try {
    await Logout();
    router.push('/auth/login');
    toast("Logged out");
   } catch (error:any) {
    toast(error.message);
   }
  }
    return(
        <>
        <div className="flex justify-between w-full bottom-0 fixed bg-black">
            {items.map((item) => (
            <div className="text-white"
            key={item.title}
              onClick={() => handleItemClick(item.title, item.url)}>
                <div className="p-5">
                    <item.icon size={15}/>
                </div>
            </div>
           ))}
            <DropdownMenu>
            <DropdownMenuTrigger className="text-white pr-8 text-sm" ><User  size={20}/></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href="/dashboard/profile">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="/dashboard/setting" >Setting</Link></DropdownMenuItem>
                <DropdownMenuItem><Button variant="destructive" className="text-center w-full" onClick={handleLogout}>Logout</Button></DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>

        {/* Dialog */}
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Post</DialogTitle>
                    <DialogDescription>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(() => handleSubmit)}>
                     { step == 1 &&
                     <>
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Choose Image</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const previewURL = URL.createObjectURL(file);
                                  setPreview(previewURL);
                                  form.setValue("file", file); // ✅ Correct way to set the value manually
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
        
                      <div className="text-right flex justify-end">
                        <p className="cursor-pointer w-[15%] bg-black text-center p-2 m-1 rounded-md font-medium text-white"
                        onClick={handleStepsForward}
                        >Next</p>
                      </div>
                      </>
                      }
                      {step == 2 && 
                      <>
                      <div>
                       {preview && (
                          <div className="mb-4">
                            <img
                              src={preview}
                              alt="Preview"
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          </div>
                        )}
        
                      </div>
                       <FormField
                                  control={form.control}
                                  name="caption"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Caption</FormLabel>
                                      <FormControl>
                                        <Input placeholder="caption" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                      <div className="text-right flex justify-between">
                        <p className="cursor-pointer w-[15%] bg-black text-center p-2 m-1 rounded-md font-medium text-white"
                        onClick={handleStepsBackward}
                        >previous</p>
                        <Button 
                        type="submit"
                        className={`m-1 ${!loading? "bg-purple-800":" bg-purple-300"}`} 
                        >Post</Button>
                      </div>
                      </>
                      }
                      </form>
                      </Form>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
        </>
    );
}
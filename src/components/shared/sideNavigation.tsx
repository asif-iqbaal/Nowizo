"use client";

import React, { useState } from "react";
import {
  Calendar,
  Home,
  Inbox,
  LogOut,
  Search,
  Settings,
  PlusIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { CreatePostSchema } from "@/validation";
import {useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { PostContent } from "@/lib/action/createPost";

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
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: Settings,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

type PostFormValue = z.infer<typeof CreatePostSchema>

export function LeftNavigation() {
  const [openDialog, setOpenDialog] = useState(false);
  const [preview,setPreview] = useState("");
  const [step,setSteps] = useState<number>(1);
  const router = useRouter();

  const form = useForm<PostFormValue>({
    resolver: zodResolver(CreatePostSchema),
   defaultValues: {
  file: null,
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
        console.log("✅ Submit triggered");
        console.log("📷 Image file:", data.file);
        console.log("📝 Caption:", data.caption);
        let post  = await PostContent(data);

        console.log("post details",post);
      } catch (error:any) {
        throw(error);
      }
  }

  // if(preview){
  //   console.log(preview);
  // }
  return (
    <>
      <Sidebar className="bg-black">
        <SidebarHeader className="p-4 bg-black">
          <div className="flex bg-black">
            <i className="text-2xl font-bold text-white">Nowizo</i>
          </div>
        </SidebarHeader>

        <SidebarContent className="bg-black">
          <SidebarGroup>
            {items.map((item) => (
              <Button
                key={item.title}
                onClick={() => handleItemClick(item.title, item.url)}
                className="ml-1 mb-2 p-8 flex justify-start text-lg hover:bg-gray-800 cursor-pointer gap-2 text-white"
              >
                <item.icon size={20} />
                {item.title}
              </Button>
            ))}
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="bg-black">
          <Button variant={"destructive"} className="cursor-pointer">
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
            <DialogDescription>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                className="m-1 bg-purple-800 "
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

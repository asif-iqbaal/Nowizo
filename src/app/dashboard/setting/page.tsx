"use client"

import React,{useState,useEffect} from "react";
import { Button } from "@/components/ui/button";
import {useForm} from 'react-hook-form';
import
{
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger
} from "@/components/ui/dialog";
import 
{
 Sheet,
 SheetContent,
 SheetDescription,
 SheetFooter,
 SheetHeader,
 SheetTitle,
 SheetTrigger
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";;
import { Input } from "@/components/ui/input";
import 
{
 Form,
 FormItem,
 FormField,
 FormLabel,
 FormControl,
 FormMessage,

} from "@/components/ui/form";
import z from "zod";
import { ProfileUpdate } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoggedUserDetails, UpdateProfile } from "@/lib/action/auth";
import { User } from "lucide-react";
import { toast } from "sonner";
import Spinner from "@/components/ui/loader";


type updateProfileValue = z.infer<typeof ProfileUpdate>

export default function Setting(){
    const [user,setUser] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [previewImage,setPreviewImage] = useState("");
    const form = useForm<updateProfileValue>({
    resolver: zodResolver(ProfileUpdate),
    defaultValues: {
        file:undefined,
        username: "",
        displayName: "",
        bio:""
    }
    });

    const handleUpdateProfile = async (data:updateProfileValue) => {
        try {
            setLoading(true);
            const updateProfile = await UpdateProfile({
                username:data.username,
                file:data.file,
                displayName:data.displayName,
                bio:data.bio
            });
            console.log(updateProfile);
            if(updateProfile){
                toast("Profile Updated");
                setLoading(false);
            }
        } catch (error:any) {
            toast(error);
            setLoading(false);
        } finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        async function GETPROFILE(){
           const userDetails = await LoggedUserDetails();
            if(userDetails){
                setUser(userDetails);
            }
        }
        GETPROFILE();
    },[])

    return(
        <>
        <div className="w-full h-full">
            <div className="m-2 p-4 text-3xl text-white font-bold font-sans">Setting</div>
            <div className="w-full h-full flex flex-col items-center">
            <div className="w-[95%] flex flex-col items-center gap-4 ">
            <Dialog>
            <DialogTrigger asChild className="w-full"><Button className="w-full p-8 cursor-pointer flex justify-start text-xl">Change Password</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
                <DialogDescription>
                    You cannot direct change password if you doesn't remember the previous one.
                    <Label className="p-2 text-lg">New Password</Label>
                    <Input
                    className="p-1"
                    placeholder="enter new password"
                     />
                     <Button  className="mt-2 p-1 w-full">Save Change</Button>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
            </Dialog>

            <Sheet>
            <SheetTrigger asChild className="w-full"><Button className="w-full p-8 cursor-pointer flex justify-start text-xl">Edit Profile</Button></SheetTrigger>
            <SheetContent className="h-screen">
                <SheetHeader>
                <SheetTitle>Edit Profile</SheetTitle>
                <SheetDescription>
                    edit your profile and make up to date.
                </SheetDescription>
                </SheetHeader>
                <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleUpdateProfile)}>
                        <FormField 
                       control={form.control}
                       name="file"
                       render={({field})=>(
                       <FormItem className="p-2 m-2 flex items-center flex-col">
                            <FormLabel className="hover:underline">Profile Picture</FormLabel>
                            <div
                                className="cursor-pointer"
                            >
                                {user?.avatar || previewImage ? (
                                <img
                                    src={user.avatar || previewImage}
                                    alt="user-profile"
                                    className="h-[200px] w-[200px] rounded-full object-cover"
                                />
                                ) : (
                                <div className="h-[200px] w-[200px] rounded-full bg-gray-300 flex items-center justify-center">
                                    <User className="h-16 w-16 text-gray-600" />
                                </div>
                                )}
                            </div>
                            <FormControl>
                                <Input
                               type="file"
                            accept="image/*"
                           onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const previewURL = URL.createObjectURL(file);
                                setPreviewImage(previewURL);
                                form.setValue("file", file);
                            } else {
                                setPreviewImage("");
                                form.setValue("file", undefined);
                            }
                            }}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                       )}
                        />

                        <FormField 
                        control={form.control}
                        name="username"
                        render={(field)=>(
                            <FormItem className="p-2 m-2">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder={user.username} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />

                          <FormField 
                        control={form.control}
                        name="displayName"
                        render={(field)=>(
                            <FormItem className="p-2 m-2">
                                <FormLabel>Display Name</FormLabel>
                                <FormControl>
                                    <Input placeholder={user.displayName} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField 
                        control={form.control}
                        name="bio"
                        render={(field)=>(
                            <FormItem className="p-2 m-2">
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Input placeholder={user.bio} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />

                        <SheetFooter className="p-2 m-2 bottom-0" >
                            {loading? <Button><Spinner /></Button>:<Button  type="submit" className="bottom-0">Save Change</Button>}
                        </SheetFooter>
                    </form>
                </Form>
                </div>
            </SheetContent>
            </Sheet>

            <Button className="w-full p-8 flex justify-start text-xl cursor-pointer">Block Users</Button>
            <Button className="w-full p-8 flex justify-start text-xl cursor-pointer">Change Theme</Button>
            <Button className="w-full p-8 flex justify-start text-xl cursor-pointer">About us</Button>
            </div>
            </div>
        </div>
        </>
    )
}
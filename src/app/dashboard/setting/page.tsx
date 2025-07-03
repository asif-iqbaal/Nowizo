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
import { ChangePassword, LoggedUserDetails, UpdateProfile } from "@/lib/action/auth";
import { User } from "lucide-react";
import { toast } from "sonner";
import Spinner from "@/components/ui/loader";


type updateProfileValue = z.infer<typeof ProfileUpdate>

export default function Setting(){
    const [user,setUser] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [previewImage,setPreviewImage] = useState("");
    const [openConfirm,setOpenConfirm] = useState<boolean>(false);
    const [password,setPassword] = useState("");
const form = useForm<updateProfileValue>({
  resolver: zodResolver(ProfileUpdate),
  defaultValues: {
    username: '',
    displayName: '',
    bio: '',
    file: undefined,
  }
});

    const handlePasswordChange = async (password:string) => {
        try {
            if(password.length>0){
            const updatePassword = await ChangePassword(password)
            if(updatePassword){
                toast.message(updatePassword.message);
                setOpenConfirm(false);
                setPassword("");
            }
        }else{
            toast.error("Type new password")
        }
        } catch (error:any) {
            toast.error(error)
        }
    }


    const handleUpdateProfile = async (data:updateProfileValue) => {
        try {
            setLoading(true);
            console.log(data);
            const updateProfile = await UpdateProfile(data);
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

 useEffect(() => {
  async function GETPROFILE() {
    const userDetails = await LoggedUserDetails();
    if (userDetails) {
      setUser(userDetails);
    //   form.reset({
    //     username: userDetails.username ?? "",
    //     displayName: userDetails.displayName ?? "",
    //     bio: userDetails.bio ?? "",
    //     file: undefined,
    //   });
    }
  }
  GETPROFILE();
}, []);


    return(
        <>
        <div className="w-full h-full">
            <div className="m-2 p-4 text-3xl text-white font-bold font-sans">Setting</div>
            <div className="w-full h-full flex flex-col items-center">
            <div className="w-[95%] flex flex-col items-center gap-4 ">
            <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full p-8 cursor-pointer flex justify-start text-xl">
            Change Password
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription className="flex flex-col space-y-2">
              You cannot directly change password if you don't remember the previous one.
              <Label className="p-2 text-lg">New Password</Label>
              <Input className="p-1" placeholder="enter new password" onChange={(e) => setPassword(e.target.value)} />
              <Button
                className="mt-2 p-1 w-full"
                onClick={() => setOpenConfirm(true)}
              >
                Save Change
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to change your password?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => setOpenConfirm(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                handlePasswordChange(password)
              }}
            >
              Confirm
            </Button>
          </div>
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
                    <form onSubmit={form.handleSubmit(handleUpdateProfile)} >
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
                                    <Input placeholder="enter username"  
                                    onChange={(e) => {
                                        const username = e.target.value;
                                        form.setValue("username",username);
                                    }}/>
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
                                     <Input placeholder="enter display name"  
                                    onChange={(e) => {
                                        const displayName = e.target.value;
                                        form.setValue("displayName",displayName);
                                    }}/>
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
                                    <Input placeholder="enter username"  
                                    onChange={(e) => {
                                        const bio = e.target.value;
                                        form.setValue("bio",bio);
                                    }}/>
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
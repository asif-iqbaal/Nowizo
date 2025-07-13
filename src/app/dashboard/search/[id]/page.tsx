"use client"

import React,{ useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Grid3X3, Bookmark, Tag, MoreHorizontal, Heart,MessageCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from 'next/navigation'; 
import { SeachUserPosts, followUser, UnFollowUser } from "@/lib/action/searchUser"
import { toast } from "sonner"
import { IUserData, IUserPosts } from "@/context"
import Image from "next/image"

export default function UserProfile() {

  const params = useParams();
  const id = params.id as string;
  const [userData,setUserData] = useState<IUserData>();
  const [usersPosts,setUsersPosts] = useState<IUserPosts[]>([]);
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState("posts");
  const [refreshKey, setRefreshKey] = useState<number>(0);
  
  const handleFollow = async () => {
     
      try {
         await followUser(id);
         toast("follwed")
         setRefreshKey((prev) => prev + 1);
      } catch (error) {
         if (error instanceof Error) {
          toast(error.message);
        } else {
          toast("An unexpected error occurred");
        }
      }
  }

  const handleunFollow = async () => {
      try {
        await UnFollowUser(id);
        toast("unfollwed")
        setRefreshKey((prev) => prev + 1);
      } catch (error) {
        if (error instanceof Error) {
          toast(error.message);
        } else {
          toast("An unexpected error occurred");
        }
      }
  }

  useEffect(() => {
  const fetchUser = async () => {
    const rawUser = await SeachUserPosts(id);
    setUserData(rawUser);
    setUsersPosts(rawUser.userPosts);
    if(rawUser.isFollowed){
      setIsFollowing(true);
    }else{
      setIsFollowing(false);
    }
  };
  fetchUser();
}, [id,refreshKey]);

  return (
  <div className="w-full mx-auto bg-black text-white  overflow-hidden  p-2">
      {/* Header */}
      <div className="p-4 border-b bg-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard/search">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <h1 className="text-white font-bold text-lg">{userData?.username}</h1>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="h-20 w-20">
           { userData?.avatar?(<AvatarImage src={userData?.avatar || "/logo.png"} alt={userData?.username} />):(
            <AvatarFallback className="text-lg text-black font-semibold">{userData?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>)}
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-xl font-bold">{userData?.displayName}</h2>
            </div>

            <div className="flex items-center space-x-6 mb-3">
              <div className="text-center">
                <div className="font-bold text-lg">{userData?.posts}</div>
                <div className="text-gray-600 text-sm">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{userData?.followers?.toLocaleString()}</div>
                <div className="text-gray-600 text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{userData?.following?.toLocaleString()}</div>
                <div className="text-gray-600 text-sm">Following</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full justify-end">
        <div className="flex space-x-2 mb-6 w-[50vw] ">
          {isFollowing? <Button
           
              onClick={handleunFollow}
            className={`flex-1           
                 bg-gray-200 text-gray-800 hover:bg-gray-300
            }`}
          >
            Following
          </Button>:<Button
             onClick={handleFollow}
            className={`flex-1 
                 bg-purple-600 hover:bg-purple-700 text-white
            }`}
          >
           Follow
          </Button>}
          <Button variant="outline" className="flex-1 bg-gray-950">
            Message
          </Button>
        </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-none border-t">
          <TabsTrigger value="posts" className="flex items-center space-x-2">
            <Grid3X3 className="h-4 w-4" />
            <span className="hidden sm:inline">Posts</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center space-x-2">
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Saved</span>
          </TabsTrigger>
          <TabsTrigger value="tagged" className="flex items-center space-x-2">
            <Tag className="h-4 w-4" />
            <span className="hidden sm:inline">Tagged</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-0"> 
          <div className="grid grid-cols-3 gap-1">
            {usersPosts?.map((post) => (
              <div className="flex flex-col cursor-pointer" key={post._id}>
                <Image src={post.image} alt="images" className="h-[60%]" />
                <div className="text-sm font-thin font-serif p-1 ">{post.caption}</div>
                <div className="flex ">
                  <div className="p-1">
                    <Heart />
                    <p>{post.likes}</p>
                  </div>
                  <div className="p-1">
                    <MessageCircle />
                   <p>{post.comments}</p> 
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-0">
          <div className="p-8 text-center text-gray-500">
            <Bookmark className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No saved posts</p>
            <p className="text-sm">Posts you save will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="tagged" className="mt-0">
          <div className="p-8 text-center text-gray-500">
            <Tag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No tagged posts</p>
            <p className="text-sm">Posts where you&apos;re tagged will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import React,{ useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Verified, Grid3X3, Bookmark, Tag, MoreHorizontal, MapPin, LinkIcon, Calendar,Heart,MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from 'next/navigation'; 
import { GetUserById, SeachUserPosts } from "@/lib/action/searchUser"

// Mock user data - in real app, this would come from props or API
// const userData = {
//   id: 1,
//   username: "sarah_dev",
//   displayName: "Sarah Johnson",
//   avatar: "/placeholder.svg?height=150&width=150",
//   bio: "Full-stack developer | React enthusiast | Building amazing SaaS products 🚀",
//   followers: 1247,
//   following: 892,
//   posts: 156,
//   verified: true,
//   isFollowing: false,
//   location: "San Francisco, CA",
//   website: "sarahdev.com",
//   joinedDate: "March 2022",
// }

// Mock posts data

interface UserProfileProps {
  userId?: string
}

export default function UserProfile() {
    const params = useParams();
    const id = params.id as string;
   const [userData,setUserData] = useState<any>(null);
   const [usersPosts,setUsersPosts] = useState<any[]>([]);
  const [isFollowing, setIsFollowing] = useState(userData?.isFollowing)
  const [activeTab, setActiveTab] = useState("posts");

useEffect(() => {
  const fetchUser = async () => {
    const rawUser = await SeachUserPosts(id);
    //const safeUser = JSON.parse(JSON.stringify(rawUser));
    console.log(rawUser.userPosts);
    setUserData(rawUser);
    setUsersPosts(rawUser.userPosts);
  };
  fetchUser();
}, [id]);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
  }
console.log("post from user",usersPosts);
  return (
  <div className="w-full mx-auto bg-black text-white border overflow-hidden  p-2">
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

        {/* Bio */}
        {/* <div className="mb-4">
          <p className="text-sm leading-relaxed mb-3">{userData.bio}</p>

          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{userData.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <LinkIcon className="h-4 w-4" />
              <Link href="#" className="text-blue-600 hover:underline">
                {userData.website}
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Joined {userData.joinedDate}</span>
            </div>
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="flex w-full justify-end">
        <div className="flex space-x-2 mb-6 w-[50vw] ">
          <Button
            onClick={handleFollowToggle}
            className={`flex-1 ${
              isFollowing
                ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
          <Button variant="outline" className="flex-1 bg-gray-950">
            Message
          </Button>
        </div>
        </div>

        {/* Highlights/Stories */}
        {/* <div className="mb-6">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {["SaaS Tips", "Code", "Design", "Growth"].map((highlight, index) => (
              <div key={index} className="flex flex-col items-center space-y-1 min-w-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gray-200"></div>
                  </div>
                </div>
                <span className="text-xs text-gray-600 truncate w-16 text-center">{highlight}</span>
              </div>
            ))}
          </div>
        </div> */}
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
            {usersPosts.map((post) => (
              <div className="flex flex-col cursor-pointer">
                <img src={post.image} alt="images" className="h-[60%]" />
                <div className="text-sm font-thin font-serif p-1 ">{post.caption}</div>
                <div className="flex ">
                  <div className="p-1">
                    <Heart />
                    <p>{post.likes}</p>
                  </div>
                  <div className="p-1">
                    <MessageCircle />
                   <p>{post.commnets}</p> 
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
            <p className="text-sm">Posts where you're tagged will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

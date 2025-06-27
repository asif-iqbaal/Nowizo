"use client"

import React,{useEffect, useState} from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Verified } from "lucide-react"
import { userFeed } from "@/lib/action/feed"
import Spinner from "@/components/ui/loader"
import Image from "next/image"
import Link from "next/link"

const posts = [
  {
    id: 1,
    user: {
      username: "techstartup_co",
      displayName: "TechStartup Co.",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    image: "/placeholder.svg?height=400&width=400",
    likes: 1247,
    caption:
      "🚀 Just launched our new AI-powered analytics dashboard! The future of data visualization is here. What do you think?",
    comments: [
      { username: "sarah_dev", text: "This looks incredible! Can't wait to try it out 🔥" },
      { username: "mike_founder", text: "Amazing work team! The UI is so clean 👏" },
    ],
    timeAgo: "2h",
  },
  {
    id: 2,
    user: {
      username: "designstudio_hq",
      displayName: "Design Studio HQ",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    image: "/placeholder.svg?height=300&width=400",
    likes: 892,
    caption:
      "Behind the scenes of our latest SaaS redesign project. Clean interfaces that convert 💼✨ #SaaSDesign #UXDesign",
    comments: [
      { username: "alex_ux", text: "Love the minimalist approach! 🎨" },
      { username: "jenny_pm", text: "The color palette is perfect 💯" },
    ],
    timeAgo: "4h",
  },
  {
    id: 3,
    user: {
      username: "growth_hacker_pro",
      displayName: "Growth Hacker Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    image: "/placeholder.svg?height=350&width=400",
    likes: 2156,
    caption: "📈 Our SaaS grew 300% this quarter! Here's the growth strategy that made it happen. Swipe for insights ➡️",
    comments: [
      { username: "startup_sam", text: "Incredible growth! What was your main channel?" },
      { username: "marketing_mary", text: "Need to learn from you! 🙌" },
      { username: "founder_frank", text: "Inspiring stuff! 💪" },
    ],
    timeAgo: "6h",
  },
  {
    id: 4,
    user: {
      username: "saas_insights",
      displayName: "SaaS Insights",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    image: "/placeholder.svg?height=320&width=400",
    likes: 743,
    caption:
      "💡 5 SaaS metrics every founder should track daily. Save this post for later! Which metric do you prioritize?",
    comments: [
      { username: "data_dan", text: "MRR and churn rate are my top 2! 📊" },
      { username: "ceo_claire", text: "Customer acquisition cost is crucial too 💰" },
    ],
    timeAgo: "8h",
  },
]

export default function HomeFeed() {
  const [posts,setPosts] =useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect( () => {
    async function Feeds(){
      setIsLoading(true);
      const posts = await userFeed();
      console.log(posts);
      setPosts(posts);
      setIsLoading(false);
    }
    Feeds();
  },[]);

  if(isLoading){
    return(
      <div className="w-full h-full">
        <Spinner />
      </div>
    )
  }
  
  if(!posts){
    return(
      <div className="w-full h-full flex justify-center items-center italic">
        Follow people to see posts
      </div>
    )
  }
  return (
    <div className="flex justify-center  bg-black text-white overflow-x-hidden w-full">
    <div className=" w-[80%] border rounded-lg overflow-hidden h-screen  bg-black text-white ml-2 p-2 overflow-x-hidden">
      {/* Header */}
      

      {/* Feed */}
      <ScrollArea className="h-full">
        <div className="divide-y">
          {posts.map((post) => (
            <Card key={post._id} className="border-0 rounded-none shadow-none  bg-black text-white">
              {/* Post Header */}
              <CardHeader className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post?.user?.avatar || "/placeholder.svg"} alt={post?.user?.username} />
                      <AvatarFallback>{post?.user?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center space-x-1">
                      <Link href="#" className="font-semibold text-sm hover:underline">
                        {post?.user?.username}
                      </Link>
                      {/* {post.user.verified && <Verified className="h-4 w-4 text-blue-500 fill-current" />} */}
                    </div>
                    {/* <Badge variant="secondary" className="text-xs">
                      {post.timeAgo}
                    </Badge> */}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Post Image */}
              <CardContent className="p-0">
                <Image
                  src={post?.image || "/placeholder.svg"}
                  alt="Post content"
                  width={400}
                  height={400}
                  className="w-full object-cover"
                />
              </CardContent>

              {/* Post Actions & Content */}
              <CardFooter className="p-0">
                <div className="w-full">
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50">
                        <Heart className="h-5 w-5 hover:text-red-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageCircle className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bookmark className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Likes */}
                  <div className="px-3 pb-2">
                    <p className="font-semibold text-sm">{post?.likes?.toLocaleString()} likes</p>
                  </div>

                  {/* Caption */}
                  <div className="px-3 pb-2">
                    <p className="text-sm">
                      <Link href="#" className="font-semibold hover:underline">
                        {post?.user?.username}
                      </Link>{" "}
                      {post?.caption}
                    </p>
                  </div>

                  {/* Comments */}
                  <div className="px-3 pb-3 space-y-1">
                    {post?.comments?.length > 2 && (
                      <Button variant="ghost" className="h-auto p-0 text-gray-500 text-sm">
                        View all {post.comments.length + 5} comments
                      </Button>
                    )}
                    {post?.comments?.slice(0, 2).map((comment, index) => (
                      <p key={index} className="text-sm">
                        <Link href="#" className="font-semibold hover:underline">
                          {comment.username}
                        </Link>{" "}
                        {comment.text}
                      </p>
                    ))}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
    <div>
          <Card className="w-100 ml-3  mr-3 bg-black text-white">
             <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
          </Card>
    </div>
    </div>
  )
}

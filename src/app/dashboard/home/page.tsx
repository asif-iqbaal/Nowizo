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

export default function HomeFeed() {
  const [posts,setPosts] =useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect( () => {
    async function Feeds(){
      setIsLoading(true);
      const posts = await userFeed();
      if(posts){
      setPosts(posts);
      }
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
  
  if(posts.length === 0){
    return(
      <div className="w-full h-full flex justify-center items-center italic text-white">
        Follow people to see posts
      </div>
    )
  }
  return (
    <div className="w-full mx-auto bg-black text-white border overflow-hidden  p-2">
    <div className=" w-[100%] border rounded-lg overflow-hidden h-screen  bg-black text-white p-2 overflow-x-hidden">
      {/* Header */}
      

      {/* Feed */}
      <ScrollArea className="h-full ">
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
          <Card className="w-100 ml-3  mr-3 bg-black text-white hidden ">
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

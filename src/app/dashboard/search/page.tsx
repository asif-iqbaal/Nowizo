"use client"

import { useState, useMemo,useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import Link from "next/link"
import { GetUsers } from "@/lib/action/searchUser"
import { IUserData } from "@/context"

export default function UserSearch() {
  const [users,setUsers] = useState<IUserData[]>([]);
  useEffect(()=>{
    const AllUsers = async () => {
      const response = await GetUsers();
     if(Array.isArray(response)){
        setUsers(response);
     }else{
      console.log("error",response);
     }
      
    }
    AllUsers();
  },[])
  const [searchQuery, setSearchQuery] = useState("")
  // const [followingStates, setFollowingStates] = useState<Record<number, boolean>>(
  //    users.reduce((acc, user) => ({ ...acc, [user.id]: user.isFollowing }), {}),
  // )

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users

    return users.filter(
      (user) =>
        user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery,users])

  // const handleFollowToggle = (userId: number) => {
  //   setFollowingStates((prev) => ({
  //     ...prev,
  //     [userId]: !prev[userId],
  //   }))
  // }

  return (
    <div className="w-[80vw]  mx-auto bg-black text-white  rounded-lg overflow-hidden">
      {/* Header */}
      {/* <div className="p-4 border-b bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-white font-bold text-lg">Search Users</h1>
        </div>
      </div> */}

      {/* Search Input */}
      <div className="p-4 border-b ">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-950 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Search Results */}
      <div className="max-h-[500px] overflow-y-auto">
        {searchQuery.trim() === "" ? (
          <div className="p-8 text-center text-gray-500">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">Search for users</p>
            <p className="text-sm">Type a name or username to find people</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No users found</p>
            <p className="text-sm">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredUsers.map((user) => (
              <Card key={user._id} className="border-0 rounded-none shadow-none bg-gray-900 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between bg-gray-900 text-white">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                        <AvatarFallback className="bg-gray-700 text-white">{user.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1 mb-1">
                          <Link href={`/dashboard/search/${user._id}` }className="font-semibold text-sm hover:underline truncate">
                            {user.username}
                          </Link>
                        </div>

                        <p className="text-white text-sm truncate mb-1">{user?.displayName || "User"}</p>

                        <p className="text-white text-xs truncate mb-2">{user?.bio || "hey there i am using NoWiZo "}</p>

                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>
                            <span className="font-semibold text-white">{user.followers?.toLocaleString()}</span>{" "}
                            followers
                          </span>
                          <span>
                            <span className="font-semibold text-white">{user.following?.toLocaleString()}</span>{" "}
                            following
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 ml-3">
                      {/* <Button
                        size="sm"
                        variant={followingStates[user._id] ? "outline" : "default"}
                        onClick={() => handleFollowToggle(user._id)}
                        className={
                          followingStates[user._id]
                            ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                            : "bg-purple-600 hover:bg-purple-700 text-white"
                        }
                      >
                        {followingStates[user._id] ? "Following" : "Follow"}
                      </Button> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Search Stats */}
      {searchQuery.trim() !== "" && filteredUsers.length > 0 && (
        <div className="p-3 border-t bg-gray-900 text-center">
          <p className="text-xs text-white">
            Found {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}
            matching &apos;{searchQuery}&apos;
          </p>
        </div>
      )}
    </div>
  )
}

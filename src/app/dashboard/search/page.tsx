"use client"

import { useState, useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Verified, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock user data - replace with your API data
const users = [
  {
    id: 1,
    username: "sarah_dev",
    displayName: "Sarah Johnson",
    avatar: "/placeholder.svg?height=50&width=50",
    bio: "Full-stack developer | React enthusiast",
    followers: 1247,
    following: 892,
    verified: true,
    isFollowing: false,
  },
  {
    id: 2,
    username: "mike_founder",
    displayName: "Mike Chen",
    avatar: "/placeholder.svg?height=50&width=50",
    bio: "SaaS Founder | Building the future",
    followers: 5432,
    following: 234,
    verified: true,
    isFollowing: true,
  },
  {
    id: 3,
    username: "alex_ux",
    displayName: "Alex Rodriguez",
    avatar: "/placeholder.svg?height=50&width=50",
    bio: "UX Designer | Making apps beautiful",
    followers: 892,
    following: 445,
    verified: false,
    isFollowing: false,
  },
  {
    id: 4,
    username: "jenny_pm",
    displayName: "Jennifer Smith",
    avatar: "/placeholder.svg?height=50&width=50",
    bio: "Product Manager | Tech enthusiast",
    followers: 2156,
    following: 678,
    verified: false,
    isFollowing: false,
  },
  {
    id: 5,
    username: "techstartup_co",
    displayName: "TechStartup Co.",
    avatar: "/placeholder.svg?height=50&width=50",
    bio: "Building tomorrow's technology today",
    followers: 12500,
    following: 156,
    verified: true,
    isFollowing: true,
  },
  {
    id: 6,
    username: "data_dan",
    displayName: "Daniel Park",
    avatar: "/placeholder.svg?height=50&width=50",
    bio: "Data Scientist | AI/ML Expert",
    followers: 3421,
    following: 567,
    verified: false,
    isFollowing: false,
  },
  {
    id: 7,
    username: "marketing_mary",
    displayName: "Mary Williams",
    avatar: "/placeholder.svg?height=50&width=50",
    bio: "Growth Marketing | SaaS Specialist",
    followers: 1876,
    following: 432,
    verified: false,
    isFollowing: false,
  },
  {
    id: 8,
    username: "ceo_claire",
    displayName: "Claire Thompson",
    avatar: "/placeholder.svg?height=50&width=50",
    bio: "CEO & Entrepreneur | Scaling startups",
    followers: 8934,
    following: 289,
    verified: true,
    isFollowing: false,
  },
]

export default function UserSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [followingStates, setFollowingStates] = useState<Record<number, boolean>>(
    users.reduce((acc, user) => ({ ...acc, [user.id]: user.isFollowing }), {}),
  )

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users

    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  const handleFollowToggle = (userId: number) => {
    setFollowingStates((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }))
  }

  return (
    <div className="w-[80vw]  mx-auto bg-white border rounded-lg overflow-hidden">
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
      <div className="p-4 border-b bg-gray-50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-200 focus:border-purple-500 focus:ring-purple-500"
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
              <Card key={user.id} className="border-0 rounded-none shadow-none">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                        <AvatarFallback>{user.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1 mb-1">
                          <Link href="#" className="font-semibold text-sm hover:underline truncate">
                            {user.username}
                          </Link>
                          {user.verified && <Verified className="h-4 w-4 text-blue-500 fill-current flex-shrink-0" />}
                        </div>

                        <p className="text-gray-600 text-sm truncate mb-1">{user.displayName}</p>

                        <p className="text-gray-500 text-xs truncate mb-2">{user.bio}</p>

                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>
                            <span className="font-semibold text-black">{user.followers.toLocaleString()}</span>{" "}
                            followers
                          </span>
                          <span>
                            <span className="font-semibold text-black">{user.following.toLocaleString()}</span>{" "}
                            following
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 ml-3">
                      <Button
                        size="sm"
                        variant={followingStates[user.id] ? "outline" : "default"}
                        onClick={() => handleFollowToggle(user.id)}
                        className={
                          followingStates[user.id]
                            ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                            : "bg-purple-600 hover:bg-purple-700 text-white"
                        }
                      >
                        {followingStates[user.id] ? "Following" : "Follow"}
                      </Button>
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
        <div className="p-3 border-t bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            Found {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}
            matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  )
}

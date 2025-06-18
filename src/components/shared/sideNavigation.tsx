import { Calendar, Home, Inbox, LogOut, Search, Settings } from "lucide-react"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "feed",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]



export function LeftNavigation() {

    // const logOutUser = () => {

    // }
  return (
    <Sidebar>
      <SidebarHeader> 
        <div className="flex justify-center">
      <Image
      src="/logo.png" 
      alt="logo"
      width={100}      
      height={100}      
    />
    </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            {items.map((items) => 
               (
                <Button className="m-1 p-1 flex justify-start">
                    <items.icon size={20} />
                    {items.title}
                </Button>
            
            )
            )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <Button variant={"destructive"}> Logout</Button>
      </SidebarFooter>
    </Sidebar>
  )
}
  

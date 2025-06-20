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
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Profile",
    url: "#",
    icon: Settings,
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

    <Sidebar className="bg-black">
      <SidebarHeader className="p-4 bg-black"> 
        <div className="flex bg-black">
      {/* <Image
      src="/logo.png" 
      alt="logo"
      width={100}      
      height={100}      
    /> */}
    <i className="text-2xl font-stretch-80% font-bold text-white ">Nowizo</i>
    </div>
      </SidebarHeader>
      <SidebarContent className="bg-black">
        <SidebarGroup>
            {items.map((items) => 
               (
                <Button className="ml-1 mb-2 p-8 flex justify-start text-lg hover:bg-gray-800 cursor-pointer">
                    <items.icon size={20} />
                    {items.title}
                </Button>
            
            )
            )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-black">
          <Button variant={"destructive"} className="cursor-pointer"> Logout</Button>
      </SidebarFooter>
    </Sidebar>

  )
}
  

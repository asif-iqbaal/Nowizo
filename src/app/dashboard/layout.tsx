// app/(dashboard)/layout.tsx
import {Sidebar} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { getUser } from "@/lib/auth"; // implement logic to check user
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser(); // check cookie or session
  
  if (!user) {
    // redirect to login if not authenticated
    return redirect("/auth/login");
  }

  return (
    <div className="w-full h-screen flex flex-col md:flex-row font-inter">
      <Sidebar />
      <div className="max-h-screen overflow-auto flex-1 justify-center font-inter">
        {children}
        <Toaster />
      </div>
    </div>
  );
}

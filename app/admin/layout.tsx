import { cookies } from "next/headers"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar  className="border-2 border-slate-300 dark:border-slate-600 rounded-tl-lg rounded-bl-lg"/>
      <SidebarTrigger className="-ml-1" />
        {children}
    </SidebarProvider>
  )
}

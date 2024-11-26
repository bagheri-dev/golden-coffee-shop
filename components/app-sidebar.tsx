"use client"

import * as React from "react"
import {
    BookOpen,
    Bot,
    Frame,
    Layers3,
    LifeBuoy,
    Map,
    PackageSearch,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
    Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Logo from "./header/Logo"
import { title } from "process"

const data = {
    user: {
        name: "admin",
        email: "bagheri.develop@gmail.com",
        avatar: "/images/user.png",
    },
    navMain: [
        {
            title: "کاربران",
            url: "#",
            icon: Users,
            items: [
                {
                    title: "مدیریت کاربران",
                    url: "#",
                },
            ],
        },
        {
            title: "مدیریت محصولات",
            url: "/admin/product",
            icon: PackageSearch,
            isActive: true,
            items: [
                {
                    title : "کالا ها",
                    url : "#",

                },
                {
                    title: "موجودی و قیمت",
                    url: "#",
                },
                {
                    title: "سفارشات",
                    url: "#",
                },
            ],
        },
        {
            title: "مدیریت گروه ها",
            url: "#",
            icon: Layers3,
            items: [
                {
                    title: "همه گروه ها",
                    url: "#",
                },
                {
                    title: "همه زیر گروه ها",
                    url: "#",
                },
                {
                    title: "مدیریت گروه",
                    url: "#",
                },
                {
                    title: "مدیریت زیرگروه",
                    url: "#",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "پشتیبانی",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "ارسال نظرات",
            url: "#",
            icon: Send,
        },
    ],
    projects: [
        {
            name: "نمودار ها",
            url: "#",
            icon: PieChart,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar side="right" variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                                    <Logo />
                                </div>
                                <div className="grid text-right text-sm leading-tight">
                                    <span className="truncate font-semibold">پنل مدیریت سایت</span>
                                    <span className="truncate text-xs">دسترسی : ادمین</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}

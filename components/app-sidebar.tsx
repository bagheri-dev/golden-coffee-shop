"use client"

import * as React from "react"
import {
    Box,
    CircleUserRound,
    LifeBuoy,
    PackageSearch,
    ScanBarcode,
    Send,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
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
import Link from "next/link"

const data = {
    user: {
        name: "admin",
        email: "bagheri.develop@gmail.com",
        avatar: "/images/user.png",
    },
    navMain: [
        {
            title: "پنل",
            url: "/admin",
            icon: CircleUserRound,
            isActive: true,
        },
        {
            title: "مدیریت محصولات",
            url: "/admin/products",
            icon: Box,
            isActive: true,
        },
        {
            title: "موجودی و قیمت",
            url: "/admin/stock",
            icon: PackageSearch,
            isActive: true,
        },
        {
            title: "سفارشات",
            url: "/admin/orders",
            icon: ScanBarcode,
            isActive: true,
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
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar side="right" variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                                    <Logo />
                                </div>
                                <div className="grid text-right text-sm leading-tight">
                                    <span className="truncate font-semibold">پنل مدیریت سایت</span>
                                    <span className="truncate text-xs">دسترسی : ادمین</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}

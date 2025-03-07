"use client";
import React from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Download, Home, LogIn, Upload, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "UpLoad",
    url: "/uploadFiles",
    icon: Upload,
  },
  {
    title: "Files",
    url: "/files",
    icon: Download,
  },

  {
    title: "Login",
    url: "/login",
    icon: LogIn,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserRound,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup className="justify-between flex-row items-center pb-0 pr-4 pt-3">
            {/* app icon  */}
            <Link href={"/home"} onClick={() => toggleSidebar()}>
              <Image width={40} height={40} src={"/images/icon.ico"} alt="icon" />
            </Link>
            {/* dark light mode  */}
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url} onClick={() => toggleSidebar()}>
                      <SidebarMenuButton asChild isActive={pathname === item.url} className="text-xl">
                        <div>
                          <item.icon className="h-[19px] w-[19px]" />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}

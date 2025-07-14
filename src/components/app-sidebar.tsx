"use client";
import React from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Boxes, Download, Home, LogIn, LogOut, Upload } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import useToken from "@/hooks/useToken";
import { signOutFn } from "@/utility/signOut";

const openIn = ["files", "uploadFiles", "bundlers"];

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
    title: "Bundler",
    url: "/bundlers",
    icon: Boxes,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { toggleSidebar, isMobile } = useSidebar();
  const token = useToken();
  if (!openIn.includes(pathname.split("/")[1])) return <></>;
  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup className="justify-between flex-row items-center pb-0 pr-4 pt-3">
            {/* app icon  */}
            <Link href={"/"} onClick={() => isMobile && toggleSidebar()}>
              <Image width={40} height={40} src={"/images/icon.ico"} alt="icon" />
            </Link>
            {/* dark light mode  */}
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  if (token && item.title === "Login") return;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <Link href={item.url} onClick={() => isMobile && toggleSidebar()}>
                        <SidebarMenuButton asChild isActive={pathname === item.url} className="text-xl">
                          <div>
                            <item.icon className="h-[19px] w-[19px]" />
                            <span>{item.title}</span>
                          </div>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
                {token && (
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={signOutFn} className="text-xl">
                      <div className="flex items-center gap-2 text-red-600">
                        <LogOut className="h-[19px] w-[19px]" />
                        <span>SignOut</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}

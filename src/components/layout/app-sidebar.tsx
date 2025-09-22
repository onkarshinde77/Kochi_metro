"use client";

import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Map,
  ClipboardList,
  FlaskConical,
  BarChart,
  Train,
  Sliders,
  SortAsc,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/ranking",
    icon: SortAsc,
    label: "Train Ranking",
  },
  {
    href: "/depot",
    icon: Map,
    label: "Depot Map",
  },
  {
    href: "/job-cards",
    icon: ClipboardList,
    label: "Job Cards",
  },
  {
    href: "/simulations",
    icon: Sliders,
    label: "Simulations",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 [&>svg]:text-primary group-data-[collapsible=icon]:-ml-1">
             <Logo className="size-8 text-primary" />
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <h2 className="text-lg font-bold font-headline tracking-tight text-sidebar-foreground">
                Kochi TrainFlow
              </h2>
            </div>
          </div>
          <SidebarTrigger className="ml-auto group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                as={Link}
                href={item.href}
                isActive={pathname === item.href}
                tooltip={{
                  children: item.label,
                }}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
         <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://picsum.photos/seed/1/100/100" alt="@shadcn" data-ai-hint="man avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium text-sidebar-foreground">John Doe</span>
                <span className="text-xs text-muted-foreground">Fleet Manager</span>
            </div>
         </div>
      </SidebarFooter>
    </>
  );
}

// src/components/layout/app-sidebar.tsx
"use client";

import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Map,
  ClipboardList,
  Sliders,
  SortAsc,
  User,
  Settings,
  LogOut,
  Radar,
  PlusCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Train } from "@/lib/types";

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
  {
    href: "/tracking",
    icon: Radar,
    label: "Tracking",
  },
];

const statusOptions: Train['status'][] = ['Operational', 'Maintenance', 'Idle', 'Washing'];

function AddTrainForm({ onAddTrain, closeDialog }: { onAddTrain: (train: Train) => void; closeDialog: () => void; }) {
  const [newTrain, setNewTrain] = useState({
    id: "",
    status: "Idle" as Train['status'],
    currentTrack: "",
    mileage: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrain.id || !newTrain.currentTrack || !newTrain.mileage) {
        // Simple validation
        alert("Please fill all fields");
        return;
    }
    onAddTrain({
        ...newTrain,
        mileage: Number(newTrain.mileage),
        isElectric: true
    });
    closeDialog();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="id">Train ID</Label>
            <Input id="id" value={newTrain.id} onChange={(e) => setNewTrain({...newTrain, id: e.target.value})} placeholder="e.g., T-026" />
        </div>
         <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={newTrain.status} onValueChange={(value) => setNewTrain({...newTrain, status: value as Train['status']})}>
                <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                    {statusOptions.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentTrack">Current Location</Label>
            <Input id="currentTrack" value={newTrain.currentTrack} onChange={(e) => setNewTrain({...newTrain, currentTrack: e.target.value})} placeholder="e.g., SL4" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="mileage">Mileage (km)</Label>
            <Input id="mileage" type="number" value={newTrain.mileage} onChange={(e) => setNewTrain({...newTrain, mileage: e.target.value})} placeholder="e.g., 50000" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">Add Train</Button>
      </DialogFooter>
    </form>
  )
}

export function AppSidebar({ onAddTrain }: { onAddTrain: (train: Train) => void }) {
  const pathname = usePathname();
  const [isAddTrainOpen, setIsAddTrainOpen] = useState(false);

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
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                href={item.href}
                isActive={pathname.startsWith(item.href) && item.href !== '/'}
                tooltip={{
                  children: item.label,
                }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
            <SidebarMenuItem>
                 <Dialog open={isAddTrainOpen} onOpenChange={setIsAddTrainOpen}>
                    <DialogTrigger asChild>
                        <SidebarMenuButton variant="ghost" className="text-muted-foreground w-full justify-start">
                            <PlusCircle />
                            <span>Add Train</span>
                        </SidebarMenuButton>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Train</DialogTitle>
                        </DialogHeader>
                        <AddTrainForm onAddTrain={onAddTrain} closeDialog={() => setIsAddTrainOpen(false)} />
                    </DialogContent>
                </Dialog>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://picsum.photos/seed/1/100/100" alt="@shadcn" data-ai-hint="man avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium text-sidebar-foreground">John Doe</span>
                <span className="text-xs text-muted-foreground">Fleet Manager</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2 ml-2 border-sidebar-border bg-sidebar text-sidebar-foreground">
             <DropdownMenuLabel>Fleet Management</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-sidebar-border"/>
            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer hover:!bg-sidebar-accent">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="cursor-pointer hover:!bg-sidebar-accent">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-sidebar-border"/>
            <DropdownMenuItem className="cursor-pointer hover:!bg-sidebar-accent">
               <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </>
  );
}

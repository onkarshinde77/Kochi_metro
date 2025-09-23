// src/app/(app)/profile/page.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Pencil } from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: "John Doe",
    employeeId: "KMRL-1024",
    role: "Fleet Manager",
    email: "john.doe@kochi-trainflow.com",
    phone: "+91 98765 43210",
    avatarUrl: "https://picsum.photos/seed/1/200/200",
    avatarFallback: "JD"
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
        <Button variant="outline">
          <Pencil className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="man avatar" />
              <AvatarFallback>{user.avatarFallback}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.role}</p>
            <p className="text-sm text-muted-foreground mt-1">ID: {user.employeeId}</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Your registered contact details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <a href={`mailto:${user.email}`} className="text-sm text-primary hover:underline">
                  {user.email}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-foreground">{user.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

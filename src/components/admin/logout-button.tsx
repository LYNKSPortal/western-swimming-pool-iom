"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAdmin } from "@/lib/actions/admin-auth";

export function LogoutButton() {
  return (
    <form action={logoutAdmin}>
      <Button type="submit" variant="outline" size="sm">
        <LogOut /> Sign out
      </Button>
    </form>
  );
}

"use client";

import {LogOut} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";

import {useAdminI18n} from "@/components/admin/admin-locale-provider";
import {Button} from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {dictionary} = useAdminI18n();

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/admin/auth/logout", {
      method: "POST"
    });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout} disabled={loading}>
      <LogOut className="me-2 h-4 w-4" />
      {loading ? "..." : dictionary.logout.label}
    </Button>
  );
}

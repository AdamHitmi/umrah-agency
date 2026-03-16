"use client";

import {Trash2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";

import {useAdminI18n} from "@/components/admin/admin-locale-provider";
import {Button} from "@/components/ui/button";

type DeleteItemButtonProps = {
  endpoint: string;
  label?: string;
};

export function DeleteItemButton({
  endpoint,
  label = "Delete"
}: DeleteItemButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {dictionary} = useAdminI18n();

  const handleDelete = async () => {
    const confirmed = window.confirm(dictionary.deleteAction.confirm);

    if (!confirmed) {
      return;
    }

    setLoading(true);
    const response = await fetch(endpoint, {
      method: "DELETE"
    });

    if (response.ok) {
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <Button type="button" variant="ghost" size="sm" onClick={handleDelete} disabled={loading}>
      <Trash2 className="me-2 h-4 w-4" />
      {loading ? "..." : label === "Delete" ? dictionary.common.delete : label}
    </Button>
  );
}

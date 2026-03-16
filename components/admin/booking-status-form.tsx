"use client";

import {BookingStatus} from "@prisma/client";
import {useRouter} from "next/navigation";
import {useState} from "react";

import {useAdminI18n} from "@/components/admin/admin-locale-provider";
import {Select} from "@/components/ui/select";

type BookingStatusFormProps = {
  bookingId: string;
  status: BookingStatus;
};

export function BookingStatusForm({bookingId, status}: BookingStatusFormProps) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const {dictionary} = useAdminI18n();

  const updateStatus = async (nextStatus: BookingStatus) => {
    setValue(nextStatus);

    const response = await fetch(`/api/admin/bookings/${bookingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({status: nextStatus})
    });

    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <Select
      value={value}
      onChange={(event) => updateStatus(event.target.value as BookingStatus)}
      className="h-9"
    >
      {Object.values(BookingStatus).map((item) => (
        <option key={item} value={item}>
          {dictionary.bookingStatus[item]}
        </option>
      ))}
    </Select>
  );
}

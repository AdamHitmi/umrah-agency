import {BookingStatus} from "@prisma/client";
import {NextResponse} from "next/server";
import {z} from "zod";

import {requireAdminApiSession} from "@/lib/auth/api";
import {prisma} from "@/lib/db";

const bookingStatusSchema = z.object({
  status: z.nativeEnum(BookingStatus)
});

export async function PATCH(
  request: Request,
  {params}: {params: Promise<{id: string}>}
) {
  const auth = await requireAdminApiSession();

  if ("error" in auth) {
    return auth.error;
  }

  try {
    const {id} = await params;
    const payload = bookingStatusSchema.parse(await request.json());

    await prisma.bookingRequest.update({
      where: {id},
      data: {
        status: payload.status
      }
    });

    return NextResponse.json({success: true});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Unable to update booking"}, {status: 400});
  }
}

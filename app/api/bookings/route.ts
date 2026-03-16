import {NextResponse} from "next/server";

import {prisma} from "@/lib/db";
import {sendBookingNotification} from "@/lib/email";
import {formatDisplayRange} from "@/lib/format";
import {sanitizeNullableText, sanitizeText} from "@/lib/sanitize";
import {bookingRequestSchema} from "@/lib/validations/booking";

export async function POST(request: Request) {
  try {
    const payload = bookingRequestSchema.parse(await request.json());
    const packageId = sanitizeText(payload.packageId);
    const fullName = sanitizeText(payload.fullName);
    const phone = sanitizeText(payload.phone);
    const email = sanitizeText(payload.email);
    const city = sanitizeText(payload.city);
    const roomType = sanitizeText(payload.roomType);
    const notes = sanitizeNullableText(payload.notes);

    const packageExists = await prisma.package.findUnique({
      where: {
        id: packageId
      },
      select: {
        id: true,
        titleAr: true,
        startDate: true,
        endDate: true
      }
    });

    if (!packageExists) {
      return NextResponse.json({error: "Package not found"}, {status: 404});
    }

    await prisma.bookingRequest.create({
      data: {
        packageId: packageExists.id,
        fullName,
        phone,
        email,
        city,
        roomType,
        travelersCount: payload.travelersCount,
        notes
      }
    });

    try {
      await sendBookingNotification({
        packageTitle: packageExists.titleAr,
        packageDateRange: formatDisplayRange(packageExists.startDate, packageExists.endDate, "ar"),
        fullName,
        phone,
        email,
        city,
        roomType,
        travelersCount: payload.travelersCount,
        notes
      });
    } catch (emailError) {
      console.error("Booking notification email failed", emailError);
    }

    return NextResponse.json({success: true});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Unable to submit booking"}, {status: 400});
  }
}

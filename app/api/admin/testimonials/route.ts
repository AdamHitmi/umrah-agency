import {NextResponse} from "next/server";

import {requireAdminApiSession} from "@/lib/auth/api";
import {prisma} from "@/lib/db";
import {revalidateTestimonialContent} from "@/lib/data/revalidate";
import {sanitizeText} from "@/lib/sanitize";
import {testimonialSchema} from "@/lib/validations/testimonial";

export async function POST(request: Request) {
  const auth = await requireAdminApiSession();

  if ("error" in auth) {
    return auth.error;
  }

  try {
    const payload = testimonialSchema.parse(await request.json());
    const testimonial = await prisma.testimonial.create({
      data: {
        name: sanitizeText(payload.name),
        city: sanitizeText(payload.city),
        rating: payload.rating,
        contentAr: sanitizeText(payload.contentAr),
        contentFr: sanitizeText(payload.contentFr),
        active: payload.active,
        sortOrder: payload.sortOrder
      }
    });
    revalidateTestimonialContent();

    return NextResponse.json({success: true, id: testimonial.id});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Unable to create testimonial"}, {status: 400});
  }
}

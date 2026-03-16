import {NextResponse} from "next/server";

import {requireAdminApiSession} from "@/lib/auth/api";
import {prisma} from "@/lib/db";
import {revalidateTestimonialContent} from "@/lib/data/revalidate";
import {sanitizeText} from "@/lib/sanitize";
import {testimonialSchema} from "@/lib/validations/testimonial";

export async function PATCH(
  request: Request,
  {params}: {params: Promise<{id: string}>}
) {
  const auth = await requireAdminApiSession(request);

  if ("error" in auth) {
    return auth.error;
  }

  try {
    const {id} = await params;
    const payload = testimonialSchema.parse(await request.json());

    await prisma.testimonial.update({
      where: {id},
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

    return NextResponse.json({success: true});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Unable to update testimonial"}, {status: 400});
  }
}

export async function DELETE(
  request: Request,
  {params}: {params: Promise<{id: string}>}
) {
  const auth = await requireAdminApiSession(request);

  if ("error" in auth) {
    return auth.error;
  }

  try {
    const {id} = await params;
    await prisma.testimonial.delete({
      where: {id}
    });
    revalidateTestimonialContent();

    return NextResponse.json({success: true});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Unable to delete testimonial"}, {status: 400});
  }
}

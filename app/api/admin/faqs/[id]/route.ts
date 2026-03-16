import {NextResponse} from "next/server";

import {requireAdminApiSession} from "@/lib/auth/api";
import {prisma} from "@/lib/db";
import {revalidateFaqContent} from "@/lib/data/revalidate";
import {sanitizeText} from "@/lib/sanitize";
import {faqSchema} from "@/lib/validations/faq";

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
    const payload = faqSchema.parse(await request.json());

    await prisma.fAQ.update({
      where: {id},
      data: {
        questionAr: sanitizeText(payload.questionAr),
        questionFr: sanitizeText(payload.questionFr),
        answerAr: sanitizeText(payload.answerAr),
        answerFr: sanitizeText(payload.answerFr),
        sortOrder: payload.sortOrder,
        active: payload.active
      }
    });
    revalidateFaqContent();

    return NextResponse.json({success: true});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Unable to update FAQ"}, {status: 400});
  }
}

export async function DELETE(
  _request: Request,
  {params}: {params: Promise<{id: string}>}
) {
  const auth = await requireAdminApiSession();

  if ("error" in auth) {
    return auth.error;
  }

  try {
    const {id} = await params;
    await prisma.fAQ.delete({
      where: {id}
    });
    revalidateFaqContent();

    return NextResponse.json({success: true});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Unable to delete FAQ"}, {status: 400});
  }
}

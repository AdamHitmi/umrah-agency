import {NextResponse} from "next/server";

import {requireAdminApiSession} from "@/lib/auth/api";
import {prisma} from "@/lib/db";
import {revalidateFaqContent} from "@/lib/data/revalidate";
import {sanitizeText} from "@/lib/sanitize";
import {faqSchema} from "@/lib/validations/faq";

export async function POST(request: Request) {
  const auth = await requireAdminApiSession(request);

  if ("error" in auth) {
    return auth.error;
  }

  try {
    const payload = faqSchema.parse(await request.json());
    const faq = await prisma.fAQ.create({
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

    return NextResponse.json({success: true, id: faq.id});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Unable to create FAQ"}, {status: 400});
  }
}

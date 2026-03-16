import {NextResponse} from "next/server";

import {prisma} from "@/lib/db";
import {sendContactNotification} from "@/lib/email";
import {ensureTrustedOrigin} from "@/lib/security";
import {sanitizeText} from "@/lib/sanitize";
import {contactSubmissionSchema} from "@/lib/validations/contact";

export async function POST(request: Request) {
  const originError = ensureTrustedOrigin(request);

  if (originError) {
    return originError;
  }

  try {
    const payload = contactSubmissionSchema.parse(await request.json());
    const fullName = sanitizeText(payload.fullName);
    const phone = sanitizeText(payload.phone);
    const email = sanitizeText(payload.email);
    const subject = sanitizeText(payload.subject);
    const message = sanitizeText(payload.message);

    await prisma.contactSubmission.create({
      data: {
        fullName,
        phone,
        email,
        subject,
        message
      }
    });

    try {
      await sendContactNotification({
        fullName,
        phone,
        email,
        subject,
        message
      });
    } catch (emailError) {
      console.error("Contact notification email failed", emailError);
    }

    return NextResponse.json({success: true});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Unable to submit message"}, {status: 400});
  }
}

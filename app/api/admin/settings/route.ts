import {NextResponse} from "next/server";

import {requireAdminApiSession} from "@/lib/auth/api";
import {prisma} from "@/lib/db";
import {revalidateSiteSettingsContent} from "@/lib/data/revalidate";
import {sanitizeNullableText, sanitizeText} from "@/lib/sanitize";
import {siteSettingsSchema} from "@/lib/validations/settings";

export async function PATCH(request: Request) {
  const auth = await requireAdminApiSession();

  if ("error" in auth) {
    return auth.error;
  }

  try {
    const payload = siteSettingsSchema.parse(await request.json());
    const existing = await prisma.siteSetting.findFirst();

    const data = {
      agencyNameAr: sanitizeText(payload.agencyNameAr),
      agencyNameFr: sanitizeText(payload.agencyNameFr),
      email: sanitizeText(payload.email),
      phone: sanitizeText(payload.phone),
      whatsapp: sanitizeText(payload.whatsapp),
      cityAr: sanitizeText(payload.cityAr),
      cityFr: sanitizeText(payload.cityFr),
      addressAr: sanitizeText(payload.addressAr),
      addressFr: sanitizeText(payload.addressFr),
      officeHoursAr: sanitizeText(payload.officeHoursAr),
      officeHoursFr: sanitizeText(payload.officeHoursFr),
      facebookUrl: sanitizeNullableText(payload.facebookUrl),
      instagramUrl: sanitizeNullableText(payload.instagramUrl),
      tiktokUrl: sanitizeNullableText(payload.tiktokUrl),
      heroTitleAr: sanitizeText(payload.heroTitleAr),
      heroTitleFr: sanitizeText(payload.heroTitleFr),
      heroSubtitleAr: sanitizeText(payload.heroSubtitleAr),
      heroSubtitleFr: sanitizeText(payload.heroSubtitleFr),
      aboutIntroAr: sanitizeText(payload.aboutIntroAr),
      aboutIntroFr: sanitizeText(payload.aboutIntroFr),
      promiseAr: sanitizeText(payload.promiseAr),
      promiseFr: sanitizeText(payload.promiseFr),
      whyChooseTitleAr: sanitizeText(payload.whyChooseTitleAr),
      whyChooseTitleFr: sanitizeText(payload.whyChooseTitleFr),
      whyChooseTextAr: sanitizeText(payload.whyChooseTextAr),
      whyChooseTextFr: sanitizeText(payload.whyChooseTextFr)
    };

    if (existing) {
      await prisma.siteSetting.update({
        where: {
          id: existing.id
        },
        data
      });
    } else {
      await prisma.siteSetting.create({
        data
      });
    }
    revalidateSiteSettingsContent();

    return NextResponse.json({success: true});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Unable to update settings"}, {status: 400});
  }
}

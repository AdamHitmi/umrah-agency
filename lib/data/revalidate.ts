import {revalidatePath, revalidateTag} from "next/cache";

export const publicDataTags = {
  settings: "public-settings",
  packages: "public-packages",
  faqs: "public-faqs",
  testimonials: "public-testimonials"
} as const;

function revalidatePaths(paths: string[]) {
  for (const path of new Set(paths)) {
    revalidatePath(path);
  }
}

export function revalidatePackageContent(slug?: string) {
  revalidateTag(publicDataTags.packages);
  revalidatePaths(["/", "/fr", "/packages", "/fr/packages"]);

  if (!slug) {
    return;
  }

  revalidatePaths([`/packages/${slug}`, `/fr/packages/${slug}`]);
}

export function revalidateFaqContent() {
  revalidateTag(publicDataTags.faqs);
  revalidatePaths(["/", "/fr", "/faq", "/fr/faq"]);
}

export function revalidateSiteSettingsContent() {
  revalidateTag(publicDataTags.settings);
  revalidatePaths([
    "/",
    "/fr",
    "/about",
    "/fr/about",
    "/contact",
    "/fr/contact",
    "/faq",
    "/fr/faq",
    "/packages",
    "/fr/packages"
  ]);
}

export function revalidateTestimonialContent() {
  revalidateTag(publicDataTags.testimonials);
  revalidatePaths(["/", "/fr"]);
}

import {cookies} from "next/headers";

import {
  getAdminDictionary,
  normalizeAdminLocale
} from "@/lib/admin-i18n";
import {adminLocaleCookieName} from "@/lib/constants";

export async function getAdminLocale() {
  const cookieStore = await cookies();
  return normalizeAdminLocale(cookieStore.get(adminLocaleCookieName)?.value);
}

export async function getAdminI18n() {
  const locale = await getAdminLocale();

  return {
    locale,
    dir: locale === "ar" ? "rtl" : "ltr",
    dictionary: getAdminDictionary(locale)
  };
}

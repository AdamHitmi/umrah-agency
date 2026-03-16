import {SiteSettingsForm} from "@/components/admin/site-settings-form";
import {getAdminI18n} from "@/lib/admin-locale";
import {requireAdminSession} from "@/lib/auth/session";
import {getAdminSettings} from "@/lib/data/admin";

export default async function AdminSettingsPage() {
  await requireAdminSession();
  const {dictionary} = await getAdminI18n();
  const settings = await getAdminSettings();

  if (!settings) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="font-display text-3xl text-sand-50">{dictionary.settingsPage.title}</p>
        <p className="text-sm text-sand-100/60">{dictionary.settingsPage.subtitle}</p>
      </div>
      <SiteSettingsForm
        settings={{
          agencyNameAr: settings.agencyNameAr,
          agencyNameFr: settings.agencyNameFr,
          email: settings.email,
          phone: settings.phone,
          whatsapp: settings.whatsapp,
          cityAr: settings.cityAr,
          cityFr: settings.cityFr,
          addressAr: settings.addressAr,
          addressFr: settings.addressFr,
          officeHoursAr: settings.officeHoursAr,
          officeHoursFr: settings.officeHoursFr,
          facebookUrl: settings.facebookUrl ?? "",
          instagramUrl: settings.instagramUrl ?? "",
          tiktokUrl: settings.tiktokUrl ?? "",
          heroTitleAr: settings.heroTitleAr,
          heroTitleFr: settings.heroTitleFr,
          heroSubtitleAr: settings.heroSubtitleAr,
          heroSubtitleFr: settings.heroSubtitleFr,
          aboutIntroAr: settings.aboutIntroAr,
          aboutIntroFr: settings.aboutIntroFr,
          promiseAr: settings.promiseAr,
          promiseFr: settings.promiseFr,
          whyChooseTitleAr: settings.whyChooseTitleAr,
          whyChooseTitleFr: settings.whyChooseTitleFr,
          whyChooseTextAr: settings.whyChooseTextAr,
          whyChooseTextFr: settings.whyChooseTextFr
        }}
      />
    </div>
  );
}

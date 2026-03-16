"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {useAdminI18n} from "@/components/admin/admin-locale-provider";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {siteSettingsSchema} from "@/lib/validations/settings";

type SiteSettingsValues = z.infer<typeof siteSettingsSchema>;

export function SiteSettingsForm({settings}: {settings: SiteSettingsValues}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const {dictionary} = useAdminI18n();
  const form = useForm<SiteSettingsValues>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: settings
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    setServerMessage(null);

    const response = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    const payload = await response.json();

    if (!response.ok) {
      setServerError(payload.error || dictionary.settingsForm.unable);
      return;
    }

    setServerMessage(dictionary.settingsForm.success);
    router.refresh();
  });

  return (
    <Card>
      <CardContent className="space-y-5">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <Label htmlFor="agencyNameAr">{dictionary.settingsForm.agencyNameAr}</Label>
              <Input id="agencyNameAr" {...form.register("agencyNameAr")} />
            </div>
            <div>
              <Label htmlFor="agencyNameFr">{dictionary.settingsForm.agencyNameFr}</Label>
              <Input id="agencyNameFr" {...form.register("agencyNameFr")} />
            </div>
            <div>
              <Label htmlFor="email">{dictionary.settingsForm.email}</Label>
              <Input id="email" type="email" {...form.register("email")} />
            </div>
            <div>
              <Label htmlFor="phone">{dictionary.settingsForm.phone}</Label>
              <Input id="phone" {...form.register("phone")} />
            </div>
            <div>
              <Label htmlFor="whatsapp">{dictionary.settingsForm.whatsapp}</Label>
              <Input id="whatsapp" {...form.register("whatsapp")} />
            </div>
            <div>
              <Label htmlFor="cityAr">{dictionary.settingsForm.cityAr}</Label>
              <Input id="cityAr" {...form.register("cityAr")} />
            </div>
            <div>
              <Label htmlFor="cityFr">{dictionary.settingsForm.cityFr}</Label>
              <Input id="cityFr" {...form.register("cityFr")} />
            </div>
            <div>
              <Label htmlFor="facebookUrl">{dictionary.settingsForm.facebookUrl}</Label>
              <Input id="facebookUrl" {...form.register("facebookUrl")} />
            </div>
            <div>
              <Label htmlFor="instagramUrl">{dictionary.settingsForm.instagramUrl}</Label>
              <Input id="instagramUrl" {...form.register("instagramUrl")} />
            </div>
            <div>
              <Label htmlFor="tiktokUrl">{dictionary.settingsForm.tiktokUrl}</Label>
              <Input id="tiktokUrl" {...form.register("tiktokUrl")} />
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <Label htmlFor="addressAr">{dictionary.settingsForm.addressAr}</Label>
              <Textarea id="addressAr" {...form.register("addressAr")} />
            </div>
            <div>
              <Label htmlFor="addressFr">{dictionary.settingsForm.addressFr}</Label>
              <Textarea id="addressFr" {...form.register("addressFr")} />
            </div>
            <div>
              <Label htmlFor="officeHoursAr">{dictionary.settingsForm.officeHoursAr}</Label>
              <Input id="officeHoursAr" {...form.register("officeHoursAr")} />
            </div>
            <div>
              <Label htmlFor="officeHoursFr">{dictionary.settingsForm.officeHoursFr}</Label>
              <Input id="officeHoursFr" {...form.register("officeHoursFr")} />
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <Label htmlFor="heroTitleAr">{dictionary.settingsForm.heroTitleAr}</Label>
              <Input id="heroTitleAr" {...form.register("heroTitleAr")} />
            </div>
            <div>
              <Label htmlFor="heroTitleFr">{dictionary.settingsForm.heroTitleFr}</Label>
              <Input id="heroTitleFr" {...form.register("heroTitleFr")} />
            </div>
            <div>
              <Label htmlFor="heroSubtitleAr">{dictionary.settingsForm.heroSubtitleAr}</Label>
              <Textarea id="heroSubtitleAr" {...form.register("heroSubtitleAr")} />
            </div>
            <div>
              <Label htmlFor="heroSubtitleFr">{dictionary.settingsForm.heroSubtitleFr}</Label>
              <Textarea id="heroSubtitleFr" {...form.register("heroSubtitleFr")} />
            </div>
            <div>
              <Label htmlFor="aboutIntroAr">{dictionary.settingsForm.aboutIntroAr}</Label>
              <Textarea id="aboutIntroAr" {...form.register("aboutIntroAr")} />
            </div>
            <div>
              <Label htmlFor="aboutIntroFr">{dictionary.settingsForm.aboutIntroFr}</Label>
              <Textarea id="aboutIntroFr" {...form.register("aboutIntroFr")} />
            </div>
            <div>
              <Label htmlFor="promiseAr">{dictionary.settingsForm.promiseAr}</Label>
              <Textarea id="promiseAr" {...form.register("promiseAr")} />
            </div>
            <div>
              <Label htmlFor="promiseFr">{dictionary.settingsForm.promiseFr}</Label>
              <Textarea id="promiseFr" {...form.register("promiseFr")} />
            </div>
            <div>
              <Label htmlFor="whyChooseTitleAr">{dictionary.settingsForm.whyChooseTitleAr}</Label>
              <Input id="whyChooseTitleAr" {...form.register("whyChooseTitleAr")} />
            </div>
            <div>
              <Label htmlFor="whyChooseTitleFr">{dictionary.settingsForm.whyChooseTitleFr}</Label>
              <Input id="whyChooseTitleFr" {...form.register("whyChooseTitleFr")} />
            </div>
            <div>
              <Label htmlFor="whyChooseTextAr">{dictionary.settingsForm.whyChooseTextAr}</Label>
              <Textarea id="whyChooseTextAr" {...form.register("whyChooseTextAr")} />
            </div>
            <div>
              <Label htmlFor="whyChooseTextFr">{dictionary.settingsForm.whyChooseTextFr}</Label>
              <Textarea id="whyChooseTextFr" {...form.register("whyChooseTextFr")} />
            </div>
          </div>
          {serverError ? <p className="text-sm text-red-300">{serverError}</p> : null}
          {serverMessage ? <p className="text-sm text-gold-200">{serverMessage}</p> : null}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "..." : dictionary.settingsForm.save}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

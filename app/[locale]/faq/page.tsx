import type {Metadata} from "next";
import {getLocale, getTranslations} from "next-intl/server";

import {FaqList} from "@/components/sections/faq-list";
import {MotionSection} from "@/components/sections/motion-section";
import {PageBanner} from "@/components/sections/page-banner";
import {getAllFaqs} from "@/lib/data/public";
import {buildMetadata} from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "ar" | "fr";
  const t = await getTranslations({locale});

  return buildMetadata({
    locale,
    title: t("faq.title"),
    description: t("faq.subtitle"),
    path: "/faq"
  });
}

export default async function FaqPage() {
  const t = await getTranslations();
  const faqs = await getAllFaqs();

  return (
    <>
      <PageBanner eyebrow={t("nav.faq")} title={t("faq.title")} description={t("faq.subtitle")} />
      <section className="container pb-16">
        <MotionSection>
          <FaqList items={faqs} />
        </MotionSection>
      </section>
    </>
  );
}

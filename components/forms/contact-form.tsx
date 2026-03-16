"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {CircleCheckBig, LoaderCircle, MessageCircleHeart} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {readResponsePayload} from "@/lib/read-response-payload";
import {contactSubmissionSchema} from "@/lib/validations/contact";

type ContactFormValues = z.infer<typeof contactSubmissionSchema>;

export function ContactForm() {
  const t = useTranslations("forms");
  const locale = useLocale() as "ar" | "fr";
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSubmissionSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerMessage(null);
    setServerError(null);

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      const payload = await readResponsePayload<{error?: string}>(response);

      if (!response.ok) {
        setServerError(payload?.error || "Submission failed");
        return;
      }

      setServerMessage(t("successContact"));
      form.reset();
    } catch {
      setServerError(
        locale === "ar"
          ? "تعذر إرسال الرسالة حالياً. حاول مرة أخرى."
          : "Impossible d'envoyer le message pour le moment."
      );
    }
  });

  return (
    <Card>
      <CardContent className="space-y-5">
        <div className="rounded-[2rem] border border-gold-500/15 bg-gold-500/8 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-200">
              <MessageCircleHeart className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-sand-50">
                {locale === "ar"
                  ? "اكتب استفسارك وسيتواصل معك فريق الدار البيضاء بأقرب وقت."
                  : "Ecrivez votre demande et l'equipe de Casablanca vous recontactera rapidement."}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.24em] text-gold-200/65">
                {locale === "ar" ? "واتساب والهاتف متاحان كذلك" : "WhatsApp et telephone disponibles"}
              </p>
            </div>
          </div>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="contact-fullName">{t("fullName")}</Label>
              <Input id="contact-fullName" {...form.register("fullName")} />
              <p className="mt-1 text-xs text-red-300">{form.formState.errors.fullName?.message}</p>
            </div>
            <div>
              <Label htmlFor="contact-phone">{t("phone")}</Label>
              <Input id="contact-phone" {...form.register("phone")} />
              <p className="mt-1 text-xs text-red-300">{form.formState.errors.phone?.message}</p>
            </div>
            <div>
              <Label htmlFor="contact-email">{t("email")}</Label>
              <Input id="contact-email" type="email" {...form.register("email")} />
              <p className="mt-1 text-xs text-red-300">{form.formState.errors.email?.message}</p>
            </div>
            <div>
              <Label htmlFor="contact-subject">{t("subject")}</Label>
              <Input id="contact-subject" {...form.register("subject")} />
              <p className="mt-1 text-xs text-red-300">{form.formState.errors.subject?.message}</p>
            </div>
          </div>
          <div>
            <Label htmlFor="contact-message">{t("message")}</Label>
            <Textarea id="contact-message" {...form.register("message")} />
            <p className="mt-1 text-xs text-red-300">{form.formState.errors.message?.message}</p>
          </div>
          {serverError ? (
            <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {serverError}
            </p>
          ) : null}
          {serverMessage ? (
            <p className="rounded-2xl border border-gold-500/20 bg-gold-500/10 px-4 py-3 text-sm text-gold-100">
              <span className="inline-flex items-center gap-2">
                <CircleCheckBig className="h-4 w-4" />
                {serverMessage}
              </span>
            </p>
          ) : null}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircle className="me-2 h-4 w-4 animate-spin" />
                {locale === "ar" ? "جارٍ الإرسال" : "Envoi..."}
              </>
            ) : (
              t("submitContact")
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

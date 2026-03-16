"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {CircleCheckBig, LoaderCircle, Sparkles} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {readResponsePayload} from "@/lib/read-response-payload";
import {bookingRequestSchema} from "@/lib/validations/booking";

type BookingFormValues = z.infer<typeof bookingRequestSchema>;

type BookingFormProps = {
  packageId: string;
  roomTypes: Array<{roomTypeAr: string; roomTypeFr: string}>;
};

export function BookingForm({packageId, roomTypes}: BookingFormProps) {
  const t = useTranslations("forms");
  const locale = useLocale() as "ar" | "fr";
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingRequestSchema),
    defaultValues: {
      packageId,
      fullName: "",
      phone: "",
      email: "",
      city: "",
      roomType: roomTypes[0]
        ? locale === "ar"
          ? roomTypes[0].roomTypeAr
          : roomTypes[0].roomTypeFr
        : "",
      travelersCount: 1,
      notes: ""
    }
  });
  const selectedRoomType = form.watch("roomType");

  useEffect(() => {
    const handleRoomSelection = (event: Event) => {
      const roomType = (event as CustomEvent<{roomType?: string}>).detail?.roomType;

      if (!roomType) {
        return;
      }

      form.setValue("roomType", roomType, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
    };

    window.addEventListener("booking-room-type:selected", handleRoomSelection);

    return () => {
      window.removeEventListener("booking-room-type:selected", handleRoomSelection);
    };
  }, [form]);

  const onSubmit = form.handleSubmit(async (values) => {
    setServerMessage(null);
    setServerError(null);

    try {
      const response = await fetch("/api/bookings", {
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

      setServerMessage(t("successBooking"));
      form.reset({
        packageId,
        fullName: "",
        phone: "",
        email: "",
        city: "",
        roomType: values.roomType,
        travelersCount: 1,
        notes: ""
      });
    } catch {
      setServerError(
        locale === "ar"
          ? "تعذر إرسال الطلب حالياً. حاول مرة أخرى."
          : "Impossible d'envoyer la demande pour le moment."
      );
    }
  });

  return (
    <Card id="booking">
      <CardContent className="space-y-5">
        <div className="space-y-4">
          <h3 className="font-display text-3xl text-sand-50">{t("submitBooking")}</h3>
          <div className="grid gap-3 rounded-[2rem] border border-gold-500/15 bg-gold-500/8 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-200">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm text-sand-50">
                  {locale === "ar"
                    ? "يمكنك اختيار الغرفة من الأعلى وسنحتفظ بها في النموذج."
                    : "Choisissez la chambre plus haut, elle sera reprise ici."}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-gold-200/65">
                  {selectedRoomType || (locale === "ar" ? "لم يتم الاختيار بعد" : "Aucune selection")}
                </p>
              </div>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-gold-200/70">
              {locale === "ar" ? "رد سريع" : "Reponse rapide"}
            </div>
          </div>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <input type="hidden" {...form.register("packageId")} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="booking-fullName">{t("fullName")}</Label>
              <Input id="booking-fullName" {...form.register("fullName")} />
              <p className="mt-1 text-xs text-red-300">{form.formState.errors.fullName?.message}</p>
            </div>
            <div>
              <Label htmlFor="booking-phone">{t("phone")}</Label>
              <Input id="booking-phone" {...form.register("phone")} />
              <p className="mt-1 text-xs text-red-300">{form.formState.errors.phone?.message}</p>
            </div>
            <div>
              <Label htmlFor="booking-email">{t("email")}</Label>
              <Input id="booking-email" type="email" {...form.register("email")} />
              <p className="mt-1 text-xs text-red-300">{form.formState.errors.email?.message}</p>
            </div>
            <div>
              <Label htmlFor="booking-city">{t("city")}</Label>
              <Input id="booking-city" {...form.register("city")} />
              <p className="mt-1 text-xs text-red-300">{form.formState.errors.city?.message}</p>
            </div>
            <div>
              <Label htmlFor="booking-roomType">{t("roomType")}</Label>
              <Select id="booking-roomType" {...form.register("roomType")}>
                {roomTypes.map((roomType) => {
                  const label =
                    locale === "ar" ? roomType.roomTypeAr : roomType.roomTypeFr;

                  return (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div>
              <Label htmlFor="booking-travelers">{t("travelersCount")}</Label>
              <Input
                id="booking-travelers"
                type="number"
                min={1}
                {...form.register("travelersCount", {valueAsNumber: true})}
              />
              <p className="mt-1 text-xs text-red-300">
                {form.formState.errors.travelersCount?.message}
              </p>
            </div>
          </div>
          <div>
            <Label htmlFor="booking-notes">{t("notes")}</Label>
            <Textarea id="booking-notes" {...form.register("notes")} />
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
              t("submitBooking")
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

import {format} from "date-fns";
import {arMA, fr} from "date-fns/locale";

export function formatMadCurrency(amount: number, locale: "ar" | "fr") {
  return new Intl.NumberFormat(locale === "ar" ? "ar-MA" : "fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDisplayDate(value: Date | string, locale: "ar" | "fr") {
  const date = typeof value === "string" ? new Date(value) : value;
  return format(date, "d MMMM yyyy", {
    locale: locale === "ar" ? arMA : fr
  });
}

export function formatDisplayRange(
  startDate: Date | string,
  endDate: Date | string,
  locale: "ar" | "fr"
) {
  return `${formatDisplayDate(startDate, locale)} - ${formatDisplayDate(
    endDate,
    locale
  )}`;
}

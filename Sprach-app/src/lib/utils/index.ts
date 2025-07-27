import type { Locale } from "../types";

export function getDirection(locale: Locale) {
  if (locale === "ar") {
    return "rtl";
  }
  return "ltr";
}
export type Locale = "de" | "ar";

export type AllowedLocales = Locale[];

export type I18NConfig = {
  locales: string[];
  defaultLocale: string;
  prefixDefault: boolean;
};
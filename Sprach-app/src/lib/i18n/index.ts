export const defaultLocale = "de";

export const allowedLocales = [defaultLocale, "ar"];

const i18nConfig = {
  locales: allowedLocales,
  defaultLocale,
  prefixDefault: false, // avoids prefixing the default locale in URLs
};

export { i18nConfig };
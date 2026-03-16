"use client";

import {createContext, useContext} from "react";

import {
  adminDictionaries,
  type AdminDictionary,
  type AdminLocale
} from "@/lib/admin-i18n";

type AdminLocaleContextValue = {
  locale: AdminLocale;
  dir: "rtl" | "ltr";
  dictionary: AdminDictionary;
};

const AdminLocaleContext = createContext<AdminLocaleContextValue | null>(null);

export function AdminLocaleProvider({
  children,
  locale
}: {
  children: React.ReactNode;
  locale: AdminLocale;
}) {
  return (
    <AdminLocaleContext.Provider
      value={{
        locale,
        dir: locale === "ar" ? "rtl" : "ltr",
        dictionary: adminDictionaries[locale]
      }}
    >
      {children}
    </AdminLocaleContext.Provider>
  );
}

export function useAdminI18n() {
  const context = useContext(AdminLocaleContext);

  if (!context) {
    throw new Error("useAdminI18n must be used within AdminLocaleProvider");
  }

  return context;
}

import {redirect} from "next/navigation";

import {AdminLanguageSwitcher} from "@/components/admin/admin-language-switcher";
import {AdminLoginForm} from "@/components/admin/admin-login-form";
import {getAdminI18n} from "@/lib/admin-locale";
import {getAdminSession} from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  const {dictionary} = await getAdminI18n();

  if (session) {
    redirect("/admin");
  }

  return (
    <div className="container flex min-h-screen items-center justify-center py-16">
      <div className="w-full max-w-lg space-y-6 text-center">
        <div className="flex justify-center">
          <AdminLanguageSwitcher />
        </div>
        <div className="space-y-3">
          <p className="font-display text-5xl text-sand-50">{dictionary.login.title}</p>
          <p className="text-sm leading-7 text-sand-100/70">
            {dictionary.login.subtitle}
          </p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}

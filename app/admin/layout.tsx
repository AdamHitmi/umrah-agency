import {getAdminSession} from "@/lib/auth/session";
import {getAdminI18n} from "@/lib/admin-locale";
import {AdminLanguageSwitcher} from "@/components/admin/admin-language-switcher";
import {AdminLocaleProvider} from "@/components/admin/admin-locale-provider";
import {AdminSidebar} from "@/components/layout/admin-sidebar";
import {LogoutButton} from "@/components/admin/logout-button";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  const {locale, dir, dictionary} = await getAdminI18n();

  return (
    <AdminLocaleProvider locale={locale}>
      <div lang={locale} dir={dir} className="min-h-screen">
        {!session ? (
          children
        ) : (
          <div className="container py-6">
            <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-gold-500/15 bg-noir-900/70 px-6 py-5 shadow-panel sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-3xl text-sand-50">
                  {dictionary.shell.dashboardTitle}
                </p>
                <p className="text-sm text-sand-100/60">{session.email}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <AdminLanguageSwitcher />
                <LogoutButton />
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <AdminSidebar />
              <div className="min-w-0 flex-1">{children}</div>
            </div>
          </div>
        )}
      </div>
    </AdminLocaleProvider>
  );
}

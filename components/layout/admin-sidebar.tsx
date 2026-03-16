"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {
  LayoutDashboard,
  MessageSquareMore,
  Package2,
  Settings,
  Star,
  UserRoundSearch
} from "lucide-react";

import {useAdminI18n} from "@/components/admin/admin-locale-provider";
import {cn} from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  const {dictionary} = useAdminI18n();
  const links = [
    {href: "/admin", label: dictionary.nav.overview, icon: LayoutDashboard},
    {href: "/admin/packages", label: dictionary.nav.packages, icon: Package2},
    {href: "/admin/bookings", label: dictionary.nav.bookings, icon: UserRoundSearch},
    {href: "/admin/contacts", label: dictionary.nav.contacts, icon: MessageSquareMore},
    {href: "/admin/testimonials", label: dictionary.nav.testimonials, icon: Star},
    {href: "/admin/faqs", label: dictionary.nav.faqs, icon: MessageSquareMore},
    {href: "/admin/settings", label: dictionary.nav.settings, icon: Settings}
  ];

  return (
    <aside className="glass-panel flex w-full flex-col gap-2 rounded-3xl p-4 lg:sticky lg:top-6 lg:h-fit lg:w-72">
      <div className="px-3 py-4">
        <p className="font-display text-2xl text-sand-50">{dictionary.shell.sidebarTitle}</p>
        <p className="text-sm text-sand-100/55">{dictionary.shell.sidebarSubtitle}</p>
      </div>
      <div className="flex flex-col gap-1">
        {links.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-colors",
                active
                  ? "bg-gold-400/15 text-gold-100"
                  : "text-sand-100/70 hover:bg-white/5 hover:text-sand-50"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

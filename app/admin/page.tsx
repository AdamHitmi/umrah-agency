import {CalendarCheck2, MessageSquareMore, Package2, Star} from "lucide-react";

import {Card, CardContent} from "@/components/ui/card";
import {getAdminI18n} from "@/lib/admin-locale";
import {requireAdminSession} from "@/lib/auth/session";
import {getAdminDashboardData} from "@/lib/data/admin";

const iconMap = [Package2, CalendarCheck2, MessageSquareMore, Star];

export default async function AdminDashboardPage() {
  await requireAdminSession();
  const {locale, dictionary} = await getAdminI18n();
  const stats = await getAdminDashboardData();

  const cards = [
    {
      label: dictionary.dashboard.packages,
      value: stats.packageCount
    },
    {
      label: dictionary.dashboard.bookings,
      value: stats.bookingCount
    },
    {
      label: dictionary.dashboard.contacts,
      value: stats.contactCount
    },
    {
      label: dictionary.dashboard.pendingBookings,
      value: stats.pendingBookings
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = iconMap[index];

          return (
            <Card key={card.label}>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-sand-100/60">{card.label}</p>
                  <p className="mt-2 font-display text-4xl text-sand-50">{card.value}</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/12 text-gold-200">
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="space-y-3">
          <p className="font-display text-3xl text-sand-50">
            {dictionary.dashboard.featuredPackage}
          </p>
          <p className="text-sm text-sand-100/70">
            {stats.featuredPackage
              ? `${locale === "ar" ? stats.featuredPackage.titleAr : stats.featuredPackage.titleFr} (${stats.featuredPackage.slug})`
              : dictionary.dashboard.noFeaturedPackage}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

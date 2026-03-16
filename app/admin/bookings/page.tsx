import {BookingStatusForm} from "@/components/admin/booking-status-form";
import {Card, CardContent} from "@/components/ui/card";
import {Table, TableCell, TableHead} from "@/components/ui/table";
import {getAdminI18n} from "@/lib/admin-locale";
import {requireAdminSession} from "@/lib/auth/session";
import {getAdminBookings} from "@/lib/data/admin";

export default async function AdminBookingsPage() {
  await requireAdminSession();
  const {locale, dictionary} = await getAdminI18n();
  const bookings = await getAdminBookings();

  return (
    <Card>
      <CardContent className="space-y-5">
        <div>
          <p className="font-display text-3xl text-sand-50">{dictionary.bookingsPage.title}</p>
          <p className="text-sm text-sand-100/60">{dictionary.bookingsPage.subtitle}</p>
        </div>
        <Table>
          <thead>
            <tr>
              <TableHead>{dictionary.bookingsPage.nameColumn}</TableHead>
              <TableHead>{dictionary.bookingsPage.packageColumn}</TableHead>
              <TableHead>{dictionary.bookingsPage.phoneColumn}</TableHead>
              <TableHead>{dictionary.bookingsPage.travelersColumn}</TableHead>
              <TableHead>{dictionary.bookingsPage.statusColumn}</TableHead>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-sand-50">{booking.fullName}</p>
                    <p className="text-xs text-sand-100/55">{booking.email}</p>
                  </div>
                </TableCell>
                <TableCell>{locale === "ar" ? booking.package.titleAr : booking.package.titleFr}</TableCell>
                <TableCell>{booking.phone}</TableCell>
                <TableCell>{booking.travelersCount}</TableCell>
                <TableCell>
                  <BookingStatusForm bookingId={booking.id} status={booking.status} />
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardContent>
    </Card>
  );
}

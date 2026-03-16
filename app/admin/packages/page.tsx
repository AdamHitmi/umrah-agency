import Link from "next/link";

import {DeleteItemButton} from "@/components/admin/delete-item-button";
import {buttonVariants} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Table, TableCell, TableHead} from "@/components/ui/table";
import {getAdminI18n} from "@/lib/admin-locale";
import {requireAdminSession} from "@/lib/auth/session";
import {getAdminPackages} from "@/lib/data/admin";
import {getPackageStartingPrice} from "@/lib/data/package-helpers";
import {formatDisplayRange, formatMadCurrency} from "@/lib/format";

export default async function AdminPackagesPage() {
  await requireAdminSession();
  const {locale, dictionary} = await getAdminI18n();
  const packages = await getAdminPackages();

  return (
    <Card>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-3xl text-sand-50">{dictionary.packagesPage.title}</p>
            <p className="text-sm text-sand-100/60">{dictionary.packagesPage.subtitle}</p>
          </div>
          <Link href="/admin/packages/new" className={buttonVariants({variant: "default"})}>
            {dictionary.packagesPage.newPackage}
          </Link>
        </div>

        <Table>
          <thead>
            <tr>
              <TableHead>{dictionary.packagesPage.titleColumn}</TableHead>
              <TableHead>{dictionary.packagesPage.datesColumn}</TableHead>
              <TableHead>{dictionary.packagesPage.priceColumn}</TableHead>
              <TableHead>{dictionary.packagesPage.statusColumn}</TableHead>
              <TableHead>{dictionary.packagesPage.actionsColumn}</TableHead>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-sand-50">
                      {locale === "ar" ? pkg.titleAr : pkg.titleFr}
                    </p>
                    <p className="text-xs text-sand-100/55">{pkg.slug}</p>
                  </div>
                </TableCell>
                <TableCell>{formatDisplayRange(pkg.startDate, pkg.endDate, locale)}</TableCell>
                <TableCell>{formatMadCurrency(getPackageStartingPrice(pkg), locale)}</TableCell>
                <TableCell>
                  {pkg.active ? dictionary.common.active : dictionary.common.inactive}
                  {pkg.featured ? ` / ${dictionary.common.featured}` : ""}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/packages/${pkg.id}/edit`}
                      className={buttonVariants({variant: "secondary", size: "sm"})}
                    >
                      {dictionary.packagesPage.edit}
                    </Link>
                    <DeleteItemButton
                      endpoint={`/api/admin/packages/${pkg.id}`}
                      label={dictionary.common.delete}
                    />
                  </div>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardContent>
    </Card>
  );
}

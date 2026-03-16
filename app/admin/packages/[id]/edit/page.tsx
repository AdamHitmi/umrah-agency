import {notFound} from "next/navigation";

import {PackageForm} from "@/components/admin/package-form";
import {Card, CardContent} from "@/components/ui/card";
import {requireAdminSession} from "@/lib/auth/session";
import {getAdminPackageFormData} from "@/lib/data/admin";

export default async function EditPackagePage({
  params
}: {
  params: Promise<{id: string}>;
}) {
  await requireAdminSession();
  const {id} = await params;
  const initialValues = await getAdminPackageFormData(id);

  if (!initialValues) {
    notFound();
  }

  return (
    <Card>
      <CardContent>
        <PackageForm mode="edit" packageId={id} initialValues={initialValues} />
      </CardContent>
    </Card>
  );
}

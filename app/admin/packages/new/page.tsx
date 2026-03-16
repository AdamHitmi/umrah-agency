import {PackageForm} from "@/components/admin/package-form";
import {Card, CardContent} from "@/components/ui/card";
import {requireAdminSession} from "@/lib/auth/session";
import {getAdminPackageFormData} from "@/lib/data/admin";

export default async function NewPackagePage() {
  await requireAdminSession();
  const initialValues = await getAdminPackageFormData();

  return (
    <Card>
      <CardContent>
        <PackageForm mode="create" initialValues={initialValues} />
      </CardContent>
    </Card>
  );
}

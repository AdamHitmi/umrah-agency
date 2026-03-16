import {NextResponse} from "next/server";

import {requireAdminApiSession} from "@/lib/auth/api";
import {prisma} from "@/lib/db";
import {
  buildPackageWriteData,
  toPackageUpdateInput
} from "@/lib/data/package-helpers";
import {revalidatePackageContent} from "@/lib/data/revalidate";

export async function PATCH(
  request: Request,
  {params}: {params: Promise<{id: string}>}
) {
  const auth = await requireAdminApiSession(request);

  if ("error" in auth) {
    return auth.error;
  }

  try {
    const {id} = await params;
    const payload = buildPackageWriteData(await request.json());
    const existing = await prisma.package.findUnique({
      where: {id},
      select: {
        slug: true
      }
    });
    const updated = await prisma.package.update({
      where: {id},
      data: toPackageUpdateInput(payload),
      select: {
        slug: true
      }
    });
    revalidatePackageContent(existing?.slug);
    revalidatePackageContent(updated.slug);

    return NextResponse.json({success: true});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Unable to update package"}, {status: 400});
  }
}

export async function DELETE(
  request: Request,
  {params}: {params: Promise<{id: string}>}
) {
  const auth = await requireAdminApiSession(request);

  if ("error" in auth) {
    return auth.error;
  }

  try {
    const {id} = await params;
    const existing = await prisma.package.findUnique({
      where: {id},
      select: {
        slug: true
      }
    });
    await prisma.package.delete({
      where: {id}
    });
    revalidatePackageContent(existing?.slug);

    return NextResponse.json({success: true});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Unable to delete package"}, {status: 400});
  }
}

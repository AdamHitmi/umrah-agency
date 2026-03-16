import {NextResponse} from "next/server";

import {requireAdminApiSession} from "@/lib/auth/api";
import {prisma} from "@/lib/db";
import {
  buildPackageWriteData,
  toPackageCreateInput
} from "@/lib/data/package-helpers";
import {revalidatePackageContent} from "@/lib/data/revalidate";

export async function POST(request: Request) {
  const auth = await requireAdminApiSession();

  if ("error" in auth) {
    return auth.error;
  }

  try {
    const payload = buildPackageWriteData(await request.json());
    const created = await prisma.package.create({
      data: toPackageCreateInput(payload)
    });
    revalidatePackageContent(created.slug);

    return NextResponse.json({success: true, id: created.id});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Unable to create package"}, {status: 400});
  }
}

import {BookingStatus} from "@prisma/client";
import {unstable_noStore as noStore} from "next/cache";

import {prisma} from "@/lib/db";
import {
  getEmptyPackageFormValues,
  serializePackageForForm,
  packageWithRelations
} from "@/lib/data/package-helpers";

export async function getAdminDashboardData() {
  noStore();
  const [packageCount, bookingCount, contactCount, featuredPackage, pendingBookings] =
    await Promise.all([
      prisma.package.count(),
      prisma.bookingRequest.count(),
      prisma.contactSubmission.count(),
      prisma.package.findFirst({
        where: {
          featured: true
        }
      }),
      prisma.bookingRequest.count({
        where: {
          status: BookingStatus.PENDING
        }
      })
    ]);

  return {
    packageCount,
    bookingCount,
    contactCount,
    featuredPackage,
    pendingBookings
  };
}

export async function getAdminPackages() {
  noStore();
  return prisma.package.findMany({
    orderBy: [{featured: "desc"}, {createdAt: "desc"}],
    ...packageWithRelations
  });
}

export async function getAdminPackageFormData(): Promise<
  ReturnType<typeof getEmptyPackageFormValues>
>;
export async function getAdminPackageFormData(
  id: string
): Promise<ReturnType<typeof serializePackageForForm> | null>;
export async function getAdminPackageFormData(id?: string) {
  noStore();
  if (!id) {
    return getEmptyPackageFormValues();
  }

  const pkg = await prisma.package.findUnique({
    where: {
      id
    },
    ...packageWithRelations
  });

  if (!pkg) {
    return null;
  }

  return serializePackageForForm(pkg);
}

export async function getAdminBookings() {
  noStore();
  return prisma.bookingRequest.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      package: {
        select: {
          titleAr: true,
          titleFr: true
        }
      }
    }
  });
}

export async function getAdminContacts() {
  noStore();
  return prisma.contactSubmission.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
}

export async function getAdminFaqs() {
  noStore();
  return prisma.fAQ.findMany({
    orderBy: {
      sortOrder: "asc"
    }
  });
}

export async function getAdminTestimonials() {
  noStore();
  return prisma.testimonial.findMany({
    orderBy: {
      sortOrder: "asc"
    }
  });
}

export async function getAdminSettings() {
  noStore();
  return prisma.siteSetting.findFirst();
}

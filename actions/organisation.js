"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getOrganisation(slug) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) {
    throw new Error("user not found");
  }

  const organisation = await clerkClient().organizations.getOrganization({
    slug,
  });
   
  if(!organisation){
    return null
  }

  const {data: membership} = await clerkClient().organizations.getOrganizationMembershipList({
    organizationId: organisation.id,
  });
  const userMembership = membership.find(
    (member) => member.publicUserData.userId == userId
  )

  if(!userMembership){
    return null;
  }
  return organisation;
}

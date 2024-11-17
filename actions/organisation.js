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

export async function getOrganizationUsers(orgId) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const organizationMemberships =
    await clerkClient().organizations.getOrganizationMembershipList({
      organizationId: orgId,
    });

  const userIds = organizationMemberships.data.map(
    (membership) => membership.publicUserData.userId
  );

  const users = await db.user.findMany({
    where: {
      clerkUserId: {
        in: userIds,
      },
    },
  });

  return users;
}


export async function getUserIssues(userId) {
  const { orgId } = auth();

  if (!userId || !orgId) {
    throw new Error("No user id or organization id found");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const issues = await db.issue.findMany({
    where: {
      OR: [{ assigneeId: user.id }, { reporterId: user.id }],
      project: {
        organizationId: orgId,
      },
    },
    include: {
      project: true,
      assignee: true,
      reporter: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return issues;
}
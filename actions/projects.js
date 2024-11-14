import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createProject(data) {
  const { userId, orgId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!orgId) {
    throw new Error("NO Organization Selected");
  }

  const { data: membership } =
    await clerkClient().organizations.getOrganizationMembershipList({
      organizationId: organisation.id,
    });
  const userMembership = membership.find(
    (member) => member.publicUserData.userId == userId
  );

  if (!userMembership || userMembership.role !== "org:admin") {
    throw new Error("Only organisation admin can create projects");
  }

  try {
    const project = await db.project.create({
      data: {
        name: data.name,
        key: data.key,
        description: data.description,
        organizationId: orgId,
      },
    });
    return project;
  } catch (error) {
    throw new Error("Error creating project: " + error.message);
  }
}

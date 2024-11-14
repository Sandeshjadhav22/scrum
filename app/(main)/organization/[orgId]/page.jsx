import { getOrganisation } from "@/actions/organisation";
import OrgSwitcher from "@/components/org-switcher";
import React from "react";

const Organization = async ({ params }) => {
  const { orgId } = params;
  const organization = await getOrganisation(orgId);

  if (!organization) {
    return <div>Organisation not found</div>;
  }
  return (
    <div className="container mx-auto">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start">
        <h1 className="text-5xl font-bold gradient-title pb-2">{organization.name}&rsquo;s Projects</h1>

        {/* org switcher */}
        <OrgSwitcher/>
      </div>
      <div className="mb-4">Show org projects</div>
      <div className="mt-8">Show user assigned and reported issues here</div>
    </div>
  );
};

export default Organization;

import { getProject } from "@/actions/projects";
import { notFound } from "next/navigation";
import React from "react";
import SprintCreationForm from "../_components/create-sprints";

const ProjectPage = async ({ params }) => {
  const { projectId } = params;
  const project = await getProject(projectId);

  if (!project) {
    notFound();
  }
  return (
    <div className="container mx-auto">
      {/*  Sprint Creation */}
      <SprintCreationForm
      projectTitle={project.name}
      projectId={projectId}
      projectKey={project.key}
      sprintKey={project.sprints?.length + 1}
      />

      {/* Sprint Board */}
      {project.length > 0 ? (
        <></>
      ) : (
        <div> Create a sprent from above button</div>
      )}
    </div>
  );
};

export default ProjectPage;

import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "./Card.css";
interface ProjectCardProps {
  projectName: string;
  projectDescription: string;
  projectMemberNumber: number;
  projectRecentRelease: string;
  projectCreateDate: string;
}
function ProjectCard({
  projectName,
  projectDescription,
  projectMemberNumber,
  projectRecentRelease,
  projectCreateDate,
}: ProjectCardProps): ReactElement {
  return (
    <div className="card text-white bg-secondary mb-3 card-shape">
      <div className="card-header d-flex justify-content-between">
        <span>
          <h5 className="card-title">{projectName}</h5>
        </span>
        <span className="member-number">{projectMemberNumber}</span>
      </div>
      <div className="card-body bg-light text-black">
        <p className="card-text">
          {projectDescription}
        </p>
        <p className="d-flex justify-content-between">최신 릴리즈 버전  <span className="release-number">{projectRecentRelease}</span></p>
        <p className="card-dashboard">Dashboard 바로가기</p>
        <p className="createdate">{projectCreateDate}</p>
        <div className="position-absolute bottom-0 end-0 mb-3 me-3">
          <a href="/login">
            <FontAwesomeIcon icon={faCog} />{" "}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;

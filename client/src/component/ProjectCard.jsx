import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className='col-md-4'>
      <Card className='mb-3 p-2'>
        <div className='d-flex justify-content-between align-items-center'>
          <Card.Title>{project.name}</Card.Title>
          <Link to={`/projects/${project.id}`} className="btn btn-light">
            View
          </Link>
        </div>
        <p className='small'>
          Status: <strong>{project.status}</strong>
        </p>
      </Card>
    </div>
  );
};

export default ProjectCard;

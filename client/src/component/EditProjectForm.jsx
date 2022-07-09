import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { Button, Form, FormGroup } from "react-bootstrap";
import { UPDATE_PROJECT } from "../mutations/projectsMutations";

const EditProjectForm = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("new");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });
  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert("Please enter all fields");
    }

    updateProject(name, description, status);
  };

  return (
    <div className='mt-5'>
      <h3>Update Project Details</h3>
      <Form onSubmit={onSubmit}>
        <FormGroup className='mb-2'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter Name'
          />
        </FormGroup>
        <FormGroup className='mb-2'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Enter Description'
          />
        </FormGroup>
        <FormGroup className='mb-2'>
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value='new'>Not Started</option>
            <option value='progress'>In Progress</option>
            <option value='completed'>Completed</option>
          </Form.Select>
        </FormGroup>

        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  );
};

export default EditProjectForm;

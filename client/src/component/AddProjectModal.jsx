import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";

import { Modal, Button, Form, FormGroup } from "react-bootstrap";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectsMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

const AddClientModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  // Get Clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    refetchQueries: [{ query: GET_PROJECTS }],
    // update(cache, { data: addProject }) {
    //   const { projects } = cache.readQuery({ query: GET_PROJECTS });

    //   cache.writeQuery({4
    //     query: GET_PROJECTS,
    //     // data: { projects: projects.concat([addProject]) },
    //     data: { projects: projects.concat([...projects, addProject]) },
    //   });
    // },
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmitProject = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "" || clientId === "") {
      return alert("Please enter all the values");
    }

    addProject(name, description, status, clientId);

    setName("");
    setDescription("");
    setStatus("new");
    setClientId('');
    // handleClose();
  };

  if (loading) return null;
  if (error) return "Something went wrong";

  return (
    <>
      {!loading && !error && (
        <>
          <Button className='mb-3' variant='primary' onClick={handleShow}>
            <div className='d-flex align-items-center'>
              <FaList className='me-2' />
              <div>New Project</div>
            </div>
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
              <FormGroup className='mb-2'>
                <Form.Label>Client</Form.Label>
                <Form.Select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                >
                  <option value=''>Select Client</option>
                  {data.clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </Form.Select>
              </FormGroup>
              <Button
                type='submit'
                onClick={handleSubmitProject}
                data-bs-dismiss='modal'
                className='mb-2'
              >
                Submit
              </Button>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default AddClientModal;

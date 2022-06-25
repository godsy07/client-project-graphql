import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";

import { ADD_CLIENT } from "../mutations/clientsMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

import { Modal, Button, Form, FormGroup } from "react-bootstrap";

const AddClientModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: addClient }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        // data: { clients: clients.concat([addClient]) },
        data: { clients: clients.concat([...clients, addClient]) },
      });
    },
  });

  const handleSubmitClient = (e) => {
    e.preventDefault();
    console.log(name, email, phone);
    if (name === "" || email === "" || phone === "") {
      return alert("Please enter all the values");
    }

    addClient(name, email, phone);

    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
      <Button variant='secondary' onClick={handleShow}>
        <div className='d-flex align-items-center'>
          <FaUser className='me-2' />
          <div>Add Client</div>
        </div>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Client</Modal.Title>
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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Email'
            />
          </FormGroup>
          <FormGroup className='mb-2'>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type='text'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder='Enter Phone'
            />
          </FormGroup>
          <Button
            type='submit'
            onClick={handleSubmitClient}
            data-bs-dismiss='modal'
            className='mb-2'
          >
            Submit
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddClientModal;

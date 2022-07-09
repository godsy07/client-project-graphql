import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { DELETE_PROJECT } from '../mutations/projectsMutations';
import { Button } from 'react-bootstrap';

const DeleteProjectButton = ({ projectId }) => {
    const navigate = useNavigate();

    const [deleteProject] = useMutation(DELETE_PROJECT,{
        variables: { id: projectId },
        onCompleted: () => navigate('/'),
        refetchQueries: [{ query: GET_PROJECTS }],
    })

  return (
    <div className='d-flex mt-5 ms-auto'>
        <Button variant="danger" onClick={deleteProject}>
            <FaTrash className='icon'/> Delete Project
        </Button>
    </div>
  )
}

export default DeleteProjectButton
import React from "react";

import Clients from "../component/Clients";
import AddClientModal from "../component/AddClientModal";
import AddProjectModal from "../component/AddProjectModal";
import Projects from "../component/Projects";

const HomePage = () => {
  return (
    <>
      <div className='d-flex gap-3 mb-4'>
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <hr/>
      <Clients />
    </>
  );
};

export default HomePage;

import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          <div className='d-flex align-items-center'>
            <img src={logo} alt='logo' className='me-2' style={{ width: "40px" }} />
            <div>Project Management</div>
          </div>
        </Link>
        {/* <a href="/" className="navbar-brand">
                <div className="d-flex">
                    <img src="" alt='logo' className='mr-2' />
                    <div>Project Management</div>
                </div>
            </a> */}
      </div>
    </nav>
  );
};

export default Header;

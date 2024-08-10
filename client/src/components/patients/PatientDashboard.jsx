import React, { useContext, useState } from "react";
import UpdateProfile from "../common/UpdateProfile/UpdateProfile";
export default function PatientDashboard() {
  return (
<div className="container-xxl position-relative bg-white d-flex p-0">
        {/* Sidebar Start */}
        <div className="sidebar pe-4 pb-3">
          <nav className="navbar bg-light navbar-light">
            <a href="index.html" className="navbar-brand mx-4 mb-3">
              <h3 className="text-primary"><i className="fa fa-hashtag me-2" />DASHMIN</h3>
            </a>
            <div className="d-flex align-items-center ms-4 mb-4">
              <div className="position-relative">
                <img className="rounded-circle" src="img/user.jpg" alt="" style={{width: '40px', height: '40px'}} />
                <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
              </div>
              <div className="ms-3">
                <h6 className="mb-0">Jhon Doe</h6>
                <span>Admin</span>
              </div>
            </div>
            <div className="navbar-nav w-100">
              <a className="nav-item nav-link"><i className="fa fa-table me-2" />Appointments</a>
              <a className="nav-item nav-link"><i className="fa fa-chart-bar me-2" />Doctors</a>
              <a className="nav-item nav-link"><i className="fa fa-table me-2" />Chats</a>
              <a className="nav-item nav-link"><i className="fa fa-chart-bar me-2" />Profile</a>
            </div>
          </nav>
        </div>
        <div className="content">
      <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
        <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
          <h2 className="text-primary mb-0"><i className="fa fa-hashtag" /></h2>
        </a>
        <a href="#" className="sidebar-toggler flex-shrink-0">
          <i className="fa fa-bars" />
        </a>
        <form className="d-none d-md-flex ms-4">
          <input className="form-control border-0" type="search" placeholder="Search" />
        </form>
        <div className="navbar-nav align-items-center ms-auto">
          <div className="nav-item dropdown">
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <img className="rounded-circle me-lg-2" src="img/user.jpg" alt="" style={{width: '40px', height: '40px'}} />
              <span className="d-none d-lg-inline-flex">John Doe</span>
            </a>
            <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
              <a href="#" className="dropdown-item">My Profile</a>
              <a href="#" className="dropdown-item">Settings</a>
              <a href="#" className="dropdown-item">Log Out</a>
            </div>
          </div>
        </div>
      </nav>
      <div><UpdateProfile /></div>
    </div>
      </div>
  );
}

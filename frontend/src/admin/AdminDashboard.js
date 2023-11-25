import React from "react";
import AdminMenu from "../../components/adminMenu/AdminMenu";
// import Layout from "./../../components/Layout/Layout";
// import { useAuth } from "../../context/auth";
const AdminDashboard = () => {
  //   const [auth] = useAuth();
  return (
    <>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3> Admin Name : </h3>
              <h3> Admin Email : </h3>
              <h3> Admin Contact : </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

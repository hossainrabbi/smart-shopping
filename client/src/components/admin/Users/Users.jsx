import React from 'react';
import { Table } from 'react-bootstrap';

const Users = () => {
  return (
    <div className="section__area p-3">
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Created Date</th>
            <th>Roles</th>
            <th>Manage Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>hossain</td>
            <td>1/5/2002</td>
            <td>Admin, User</td>
            <td>Remove Admin</td>
            <td>X</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Users;

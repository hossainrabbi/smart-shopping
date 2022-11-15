import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import {
  getUsers,
  makeAdmin,
  removeUser,
} from '../../../redux/action/users.action';
import Loading from '../../common/Loading';
import './Users.scss';

const Users = () => {
  const {
    getLoading,
    getError,
    users,
    removeLoading,
    removeError,
    isRemove,
    updateLoading,
    updateError,
  } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getError) {
      toast.error(getError);
    }
  }, [getError]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
    }
  }, [updateError]);

  useEffect(() => {
    if (isRemove) {
      toast.success('User Remove Successfully');
    } else if (removeError) {
      toast.error(removeError);
    }
  }, [isRemove, removeError]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleRemoveUser = (userId) => {
    dispatch(removeUser(userId));
  };

  const handleMakeOrRemoveAdmin = (userId) => {
    dispatch(makeAdmin(userId));
  };

  if (getLoading) {
    return <Loading />;
  }

  return (
    <div className="section__area user__table p-3">
      {users?.length > 0 ? (
        <div className="table-responsive-sm">
          <Table striped bordered hover className="text-center">
            <thead className="align-middle">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Created Date</th>
                <th>Roles</th>
                <th>Manage Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {users.map((user, index) => (
                <tr key={user._id} className="user__item">
                  <td>{index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center gap-3 h-100">
                      <img
                        className="rounded-circle"
                        src={user.avatar}
                        alt={user.username}
                      />
                      <span>{user.username}</span>
                    </div>
                  </td>
                  <td>{moment(user?.createdAt).format('Do MMM YYYY')}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-3 h-100">
                      {user?.roles?.map((role) => (
                        <span key={role}>{role}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    {user?.roles?.includes('ADMIN') ? (
                      <Button
                        variant="danger"
                        onClick={() => handleMakeOrRemoveAdmin(user?._id)}
                        disabled={updateLoading}
                      >
                        Remove Admin
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() => handleMakeOrRemoveAdmin(user?._id)}
                        disabled={updateLoading}
                      >
                        Make Admin
                      </Button>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn border-0 p-0"
                      style={{ color: '#DC3545', fontSize: 20 }}
                      onClick={() => handleRemoveUser(user?._id)}
                      disabled={removeLoading}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="text-center">Users Not Found</div>
      )}
    </div>
  );
};

export default Users;

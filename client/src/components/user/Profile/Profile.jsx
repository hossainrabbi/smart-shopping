import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FaCamera } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProfile,
  updateProfile,
} from '../../../redux/action/profile.action';
import { convertBase64 } from '../../../utils/convertBase64';
import Loading from '../../common/Loading';
import NoData from '../../common/NoData/NoData';
import './Profile.scss';

const Profile = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [profileValue, setProfileValue] = useState({
    avatar: '',
    name: '',
    username: '',
  });
  const { profile, getError, getLoading, updateLoading, updateError } =
    useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    setProfileValue({
      avatar: profile?.avatar || '',
      name: profile?.name || '',
      username: profile?.username || '',
    });
  }, [profile]);

  // input value change handler
  const handleChangeProfile = (e) => {
    setProfileValue({
      ...profileValue,
      [e.target.name]: e.target.value,
    });
  };

  // avatar upload change handler
  const handleAvatarUpload = async (e) => {
    try {
      const file = await convertBase64(e.target.files[0]);

      setProfileValue({
        ...profileValue,
        avatar: file,
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log({ updateError });

  /**
   * profile update submit handler
   * @param {Event} e
   */
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileValue));
  };

  return (
    <Container>
      {getLoading ? (
        <Loading />
      ) : getError ? (
        <NoData title={getError} />
      ) : (
        <form onSubmit={handleUpdateProfile}>
          <div>
            <h2 className="text-center mt-5 mb-4">Update your profile</h2>
            <div style={{ textAlign: 'right' }}>
              {isUpdate && (
                <Button type="submit" disabled={updateLoading}>
                  {updateLoading ? 'Profile Updating...' : 'Update Profile'}
                </Button>
              )}

              {!isUpdate && (
                <Button type="button" onClick={() => setIsUpdate(true)}>
                  Edit
                </Button>
              )}
            </div>
          </div>
          <Row className="align-items-center gap-4 gap-md-0">
            <Col className="text-center" md={4}>
              <div className="profile__image d-flex justify-content-center w-100">
                {updateLoading || profileValue?.avatar === '' ? (
                  <label className="d-flex justify-content-center align-items-center">
                    <Loading />
                  </label>
                ) : isUpdate ? (
                  <label
                    htmlFor="avatar"
                    className="cursor-pointer position-relative"
                  >
                    <img
                      src={profileValue?.avatar}
                      alt={profileValue?.username}
                    />
                    <span className="position-absolute avatar__icon text-white">
                      <FaCamera />
                    </span>
                    <input
                      className="d-none"
                      type="file"
                      name="avatar"
                      onChange={handleAvatarUpload}
                      id="avatar"
                    />
                  </label>
                ) : (
                  <label htmlFor="avatarDefault">
                    <img
                      id="avatarDefault"
                      src={profileValue?.avatar}
                      alt={profileValue?.username}
                    />
                  </label>
                )}
              </div>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="productName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={isUpdate ? 'Enter Full Name' : ''}
                  name="name"
                  onChange={handleChangeProfile}
                  disabled={!isUpdate}
                  value={profileValue?.name}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={isUpdate ? 'Enter User Name' : ''}
                  name="username"
                  onChange={handleChangeProfile}
                  disabled={!isUpdate}
                  value={profileValue?.username}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productName">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  className="user-select-none"
                  type="email"
                  disabled
                  defaultValue={profile?.email}
                />
              </Form.Group>
            </Col>
          </Row>
        </form>
      )}
    </Container>
  );
};

export default Profile;

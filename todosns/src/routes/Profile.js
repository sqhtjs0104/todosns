import authService from 'fbase';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = memo(() => {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  }

  return (
    <>
      <button onClick={onLogOutClick}>Sign Out</button>
    </>
  );
});

export default Profile;
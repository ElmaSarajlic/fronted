import React from 'react';
import NavBar from '../components/NavBar';
import UserInfo from '../components/UserInfo';
import Container from '@mui/material/Container';
import '../App.css'

const UserProfilePage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Container maxWidth="md" style={{ marginTop: '100px' }}>
        <UserInfo />
      </Container>
    </div>
  );
};

export default UserProfilePage;

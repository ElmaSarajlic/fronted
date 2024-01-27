import React from 'react';
import UserCardList from '../components/UserCardList';
import NavBar from '../components/NavBar';
import { Container } from 'react-bootstrap';
import '../App.css'


const UserListPage: React.FC = () => {
    return (
        
          <><NavBar />
          <Container style={{ marginTop: '100px' }}>
            <UserCardList />
        </Container></>
      );
  };

export default UserListPage;

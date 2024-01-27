import React from 'react';
import NavBar from '../components/NavBar'; 
import AdList from '../components/AdList'; 
import Container from '@mui/material/Container';
import '../App.css'

const HomePage: React.FC = () => {
  return (
    <div >
      <NavBar />
      <Container style={{ marginTop: '100px' }}>
        <AdList />
      </Container>
    </div>
  );
};


export default HomePage;
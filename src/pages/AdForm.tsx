import React from 'react';
import NavBar from '../components/NavBar'; 
import AdForm from '../components/AdForm';
import Container from '@mui/material/Container';
import '../App.css'


const AdFormPage: React.FC = () => {


  return (
    <div>
      <NavBar />
      <Container maxWidth="md" style={{ marginTop: '100px' }}>
      <AdForm/>
      </Container>
    </div>
  );
};

export default AdFormPage;

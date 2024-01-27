import React from 'react';
import NavBar from '../components/NavBar';
import AddSubcategoryForm from '../components/AddSubcategoryForm';
import Container from '@mui/material/Container';
import '../App.css'


const AddSubcategoryPage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Container maxWidth="md" style={{ marginTop: '120px', padding: '20px' }}>
        <AddSubcategoryForm />
      </Container>
    </div>
  );
};

export default AddSubcategoryPage;

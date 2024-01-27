import React from 'react';
import NavBar from '../components/NavBar';
import Container from '@mui/material/Container';
import '../App.css'
import CreateCategoryForm from '../components/CategoryForm/CreateCategoryForm';


const CreateCategoryPage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Container maxWidth="md" style={{ marginTop: '120px', padding: '20px' }}>
        <CreateCategoryForm />
      </Container>
    </div>
  );
};

export default CreateCategoryPage;

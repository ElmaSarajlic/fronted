import React from 'react';
import CategoryList from '../components/CategoryList';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar';
import '../App.css'


const CategoryPage: React.FC = () => {

  return (
    <div>
      <NavBar />
      <Container style={{ marginTop: '100px' }}>
        <CategoryList />
      </Container>
    </div>
  );
};

export default CategoryPage;

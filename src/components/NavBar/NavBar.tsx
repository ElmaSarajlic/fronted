import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppBar, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';


const AppNavbar: React.FC = () => {
  const { userToken } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();


  const handleUserInfoClick = () => {
    navigate('/userinfo');
  };

  return (
    <AppBar position="static" sx={{ width: '100%', position: 'absolute', top: 0, left: 0, bgcolor: "black" }}>
      <Navbar expand="lg" variant="dark" style={{ backgroundColor: 'yourColorHere' }}> 
        <Navbar.Brand href="/home" style={{ color: 'white' }}>AdMe</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home" style={{ color: 'white' }}>Home</Nav.Link>
            <Nav.Link href="/AdForm" style={{ color: 'white' }}>Add ad</Nav.Link>
            <Nav.Link href="/Categories" style={{ color: 'white' }}>Categories</Nav.Link>
          </Nav>
          <Nav>
          {!userToken ? (
              <>
                <Nav.Link href="/login" style={{ color: 'white' }}>Log In</Nav.Link>
                <Nav.Link href="/register" style={{ color: 'white' }}>Register</Nav.Link>
              </>
            ) : (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleUserInfoClick}
                  style={{ color: 'white', marginRight: '15px' }}
                >
                  <AccountCircleIcon />
                </IconButton>
              
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </AppBar>
  );
};

export default AppNavbar;
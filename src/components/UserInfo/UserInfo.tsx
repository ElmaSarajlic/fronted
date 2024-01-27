import { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useUser } from '../../hooks';
import { logout } from '../../store/authSlice';
import { Box, Card } from '@mui/material';

const UserInfo = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const userType = useSelector((state: RootState) => state.auth.userType);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Current userId:', userId);
  }, [userId]);

  if (!userId) {
    return <div>No user ID found</div>;
  }

  const { data: user, isLoading, isError, error } = useUser(userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.error('Error loading user:', error);
    }
    if (user) {
      console.log('Loaded user data:', user);
    }
  }, [user, isError, error]);

  const handleEditClick = () => {
    navigate('/EditUser');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };

  const handleUsersClick = () => {
    navigate('/userList');
  };

  const handleSubcategoryClick = () => {
    navigate('/AdSubcategory');
  };

  const handleCategoryClick = () => {
    navigate('/createcategories');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message || 'Failed to load user data'}</div>;
  }

  const handlePasswordClick  = () => {
    navigate('/ChangePassword');
  };


  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', padding: '20px' }}>
      <Card sx={{  boxShadow: 3, borderRadius: 2, padding: 2 }}>
      {user && (
        <>
          <Avatar
            sx={{ width: 80, height: 80, margin: '0 auto' }}
            alt={user.username}
            src={user.imgUrl}
          />
          <Typography variant="h5" sx={{ marginTop: '20px' }}>
            {user.username}
          </Typography>
          <Typography variant="body2">
            {user.email}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: '20px' }}>
            <Button size="medium" variant="outlined" onClick={handleLogout}>
              Log out
            </Button>
            <Button size="medium" variant="outlined" onClick={handleEditClick}>
              Edit personal information
            </Button>
            {/* Conditional rendering based on userType */}
            {userType === 'ADMIN' && (
                <>
                  <Button size="medium" variant="outlined" onClick={handleCategoryClick}>
                    Add new Category
                  </Button>
                  <Button size="medium" variant="outlined" onClick={handleSubcategoryClick}>
                    Add new Subcategory
                  </Button>
                  <Button size="medium" variant="outlined" onClick={handleUsersClick}>
                    Users
                  </Button>
                </>
              )}
              
              <Button size="medium" variant="outlined" onClick={handlePasswordClick}>
                Change Password
              </Button>
          </Box>
        </>
      )}
      </Card>
    </Container>
  );
};

export default UserInfo;

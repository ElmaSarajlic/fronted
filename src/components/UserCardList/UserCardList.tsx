import React from 'react';
import { Grid } from '@mui/material';
import UserCard from '../UserCard/UserCard'; 
import useGetUsers from '../../hooks/useGetUsers';
import { User } from '../../utils/types';



const UserList: React.FC = () => {
    const { data: users, error } = useGetUsers();
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    if (!users) {
      return <div>Loading...</div>;
    }
  
    return (
      <Grid container spacing={2} direction="column" alignItems="stretch"> 
        {users.map((user: User) => (
          <Grid item key={user.id} xs={12}> 
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    );
  };
  
  export default UserList;

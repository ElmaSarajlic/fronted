import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { User } from '../../utils/types';
import useUpdateUser from '../../hooks/useUpdateUser';

interface ChangeUserInfoCardProps {
  open: boolean;
  handleClose: () => void;
  user: User;
  setUser: any;
}

const ChangeUserInfoCard = ({
  handleClose,
  user,
  setUser,
}: ChangeUserInfoCardProps) => {
  const [imgUrl, setImgUrl] = useState(user.imgUrl);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);


  const updateUserMutation = useUpdateUser(); 
  const handleSave = () => {
    const updatedUser = { ...user, imgUrl, username, email };
    updateUserMutation.mutate({ id: user.id, user: updatedUser }, {
      onSuccess: () => {
        setUser(updatedUser);
        handleClose(); 
      }
    });
  };

  console.log(imgUrl);

  
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Edit User Information
        </Typography>
        <TextField
          margin="dense"
          fullWidth
          label="Image Url"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
        <TextField
          margin="dense"
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button
            variant="contained"
            onClick={handleSave}
            color="primary"
            style={{ marginRight: '8px' }}
          >
            Save Changes
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChangeUserInfoCard;

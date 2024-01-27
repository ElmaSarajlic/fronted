import { Button, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useUpdateUserPassword from "../hooks/useUpdateUserPassword";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

type Props = {
};

const PasswordCard = ({ }: Props) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Use Redux useSelector to access the userId from Redux state
  const userId = useSelector((state: RootState) => state.auth.userId);

  const updateUserPassword = useUpdateUserPassword();

  const handleChangePassword = async () => {
    if (oldPassword && newPassword) {
      try {
        if (userId) {
        await updateUserPassword.mutateAsync({ 
          id: userId, 
          password: {
              oldPassword, newPassword,
              userId: undefined
          } 
          
        });
        setIsPasswordChanged(true);
        setError(''); 
        navigate("/userinfo"); 
    } else {
        setError("User ID is not defined.");
      }
    } catch (error) {
        setIsPasswordChanged(false);
        setError(error instanceof Error ? error.message : String(error));
      }
    }
  };

  return (
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Change Your Password
      </Typography>
      <TextField
        margin="dense"
        fullWidth
        label="Old Password"
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <TextField
        margin="dense"
        fullWidth
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={handleChangePassword}
        sx={{ float: 'right', mt: 2 }}
      >
        Change Password
      </Button>
      {isPasswordChanged && (
        <Typography variant="body2" sx={{ color: 'green', marginTop: 2 }}>
          Password changed successfully!
        </Typography>
      )}
      {error && (
        <Typography variant="body2" sx={{ color: 'red', marginTop: 2 }}>
          Error changing password: {error}
        </Typography>
      )}
    </CardContent>
  );
};

export default PasswordCard;

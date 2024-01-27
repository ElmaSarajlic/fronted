import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../store/authSlice";
import { AppDispatch, RootState } from '../store';
import { Paper, Box, Typography, TextField, Button, Link, Grid, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export type RegisterFormData = {
    username: string;
    email: string;
    password: string;
    // userType: string; // Uncomment this if you use userType in your logic
}

const schema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters")
}).required();

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: yupResolver(schema)
    });
    const { loading, userToken, error, success } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (success) navigate('/login');
        if (userToken) navigate('/');
    }, [navigate, userToken, success]);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: any) => event.preventDefault();

    const onSubmit = (data: RegisterFormData) => {
      const userData = {
          ...data,
          userType: "REGISTERED" // setting default user type to Registered
      };
      dispatch(registerUser(userData));
  }

    return (
        <Paper elevation={3} sx={{ maxWidth: "360px", padding: 3, mx: "auto", mt: 10 }}>
            {error && (
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Unable to render data!</h4>
                    <p>{error}</p>
                    <hr />
                    <p className="mb-0">Something went wrong, please try again.</p>
                </div>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Sign Up</Typography>
                <Box component="form" sx={{ mt: "5px", width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Username"
                        autoComplete="username"
                        {...register("username")}
                        error={!!errors.username}
                        helperText={errors.username ? errors.username.message : ""}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ""}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#7c4e79' }}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Register'}
                    </Button>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Link variant="body2" href="/login">
                                Already have an account? Login
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Paper>
    );
}

export default Register;

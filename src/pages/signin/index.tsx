"use client";
import React, { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import axios from "axios";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
// ** Icons Imports

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box, { BoxProps } from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";

import MuiLink from "@mui/material/Link";
import Link from "next/link";

const schema = yup.object().shape({
  fullname: yup.string().required("Username is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      password: "",
      email:"",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:4001/user/signup`, {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      });

      toast.success("You are logged into your account!", {
        position: "top-center",
      });

      reset();
      router.push('/login')
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (
      !!JSON.parse(window.sessionStorage.getItem("user") as string) &&
      !!JSON.parse(window.sessionStorage.getItem("token") as string)
    ) {
      router.push("/home");
    }
  }, [router]);
  if (!isClient) {
    return null; // Render nothing on the server
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        width:'100%',
      
        }}
      >
        <Box sx={{ p: 2, boxShadow: 2, gap: 5 ,maxWidth: '500px'}}>
          <Typography
            variant="h5"
            color="primary.main"
            sx={{ textAlign: "center", mb: 2 }}
          >
        
            KHariid-o-faroKHt{" "}
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name="fullname"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    label="FullName"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.fullname)}
                    placeholder="John Doe"
                  />
                )}
              />
              {errors.fullname && (
                <FormHelperText
                  sx={{
                    color: "error.main",
                    textTransform: "capitalize",
                    fontSize: 10,
                  }}
                >
                  {errors.fullname.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    label="Email"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder="John Doe"
                  />
                )}
              />
              {errors.email && (
                <FormHelperText
                  sx={{
                    color: "error.main",
                    textTransform: "capitalize",
                    fontSize: 10,
                  }}
                >
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="auth-login-v2-password"
                error={Boolean(errors.password)}
              >
                Password
              </InputLabel>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    value={value}
                    onBlur={onBlur}
                    label="Password"
                    onChange={onChange}
                    id="auth-login-v2-password"
                    error={Boolean(errors.password)}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.password && (
                <FormHelperText sx={{ color: "error.main" }} id="">
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>
         
            <Button
              disabled={loading ? true : false}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ mb: 4,mt:4 }}
            >
              {loading ? (
                <CircularProgress size={25} color={"warning"} />
              ) : (
                "Sign Up"
              )}
            </Button>
            <Box sx={{
                 
                 display:'flex',
                 alignItems:'center',
                 flexWrap:'wrap',
                 justifyContent:'flex-start'
              }}>
<Typography variant="body1">Already have an account?<span  ><Link href='/login' style={{color:"#405D72",fontWeight:'bold'}}>{' '} Log In</Link></span></Typography>
              </Box>
          </form>
        </Box>
      </Box>
    );
  }
};

export default SignIn;

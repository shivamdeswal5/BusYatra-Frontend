'use client'

import { loginUser, requestOtp } from '@/store/slice/auth-slice'
import { fetchBuses } from '@/store/slice/bus-slice'
import { AppDispatch, RootState } from '@/store/store'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from "yup"

const schema = yup
    .object({
        email: yup.string().email("Invalid Email Format").required("Email is required"),
        password: yup.string().required().min(6),
    })
    .required()

interface LoginFormInputs {
  email: string
  password: string
  otp?: string
}

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => state.auth)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormInputs>({
        resolver: yupResolver(schema),
    })

  const onSubmit = async (data: LoginFormInputs) => {
    console.log("Login Data: ", data);
    const result = await dispatch(loginUser(data));
    console.log("Login Result (user Data) : ",result.payload.user);
    console.log("UserID: ",result.payload.user.userId);
    dispatch(fetchBuses(result.payload.user.userId));
    const role = result.payload.user.role

    if (loginUser.fulfilled.match(result)) {
      toast.success(result.payload.message || 'Logged in successfully');
      if(role == 'owner'){
        redirect('/owner')
      }else{
        redirect('/passenger');
      }
    } else {
      toast.error(result.payload as string)
    }
    
  }

  const handleRequestOtp = async () => {
    const email = getValues('email')
    if (!email) {
      toast.error('Please enter your email to request OTP')
      return
    }
    const result = await dispatch(requestOtp(email));
    if (requestOtp.fulfilled.match(result)) {
      toast.success('OTP sent to your email!')
    } else {
      toast.error(result.payload as string)
    }
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" mb={3}>Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          fullWidth
          label="OTP (if not verified)"
          margin="normal"
          {...register('otp')}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        <Button
          variant="text"
          color="primary"
          onClick={handleRequestOtp}
          fullWidth
          sx={{ mt: 1 }}
        >
          Request OTP Again
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account? <Link href="/signup">Sign up</Link>
        </Typography>
    </Box>
  )
}

export default LoginForm

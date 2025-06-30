'use client';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { toast } from 'react-toastify';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import api from '@/lib/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface GroupFormProps {
  onSuccess: () => void;
}

interface BusRegistrationInputs {
  registrationNumber: string,
  availableSeats: number,
  busType: string,
  color: string,
}

const schema = yup
  .object({
    registrationNumber: yup.string().required("Registration Number is required"),
    availableSeats: yup.number().required("Provide Available Seats"),
    color: yup.string().required("Enter Color"),
    busType: yup.string().required("Select atleast one BusType")
  })
  .required()

export default function BusRegistrationForm({ onSuccess }: GroupFormProps) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BusRegistrationInputs>({
    resolver: yupResolver(schema),
  })

  const currentUserId = useSelector(
    (state: RootState) => state.auth.user.userId
  );


  const onSubmit = async (data: BusRegistrationInputs) => {
    try {
      const res = await api.post('/bus/register-bus', { ...data, userId:currentUserId});
      console.log("Response in Bus Registration Form: ", res);
      toast.success('Bus Registered successfully');
      reset();
      onSuccess();
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Bus registration failed';
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        label="Registration Number"
        {...register('registrationNumber', { required: 'Registration Number is required' })}
        margin="normal"
        error={!!errors.registrationNumber}
        helperText={errors.registrationNumber?.message}
      />

      <TextField
        fullWidth
        label="Available Seats"
        {...register('availableSeats', { required: 'Available Seats" is required' })}
        margin="normal"
        error={!!errors.availableSeats}
        helperText={errors.availableSeats?.message}
      />

      <TextField
        fullWidth
        label="Bus Color"
        {...register('color', {
          required: 'Color is required',
        })}
        margin="normal"
        error={!!errors.color}
        helperText={errors.color?.message}
      />

      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="ac" control={<Radio {...register('busType')} />} label="AC" />
        <FormControlLabel value="non-ac" control={<Radio {...register('busType')} />} label="Non-Ac" />
        <FormControlLabel value="volvo" control={<Radio {...register('busType')} />} label="Volvo" />
      </RadioGroup>

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>
    </form>
  );
}
'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/slice/auth-slice';

export default function LogoutButton() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout =  () => {
    try {
      dispatch(logoutUser());
      toast.success('Logged out successfully');
      router.push('/login'); 
    } catch (err) {
      console.log("Error are: ",err);
      toast.error('Logout failed');
    }
  };

  return (
    <Button color="error" variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
}
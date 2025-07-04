'use client';

import LogoutButton from '@/components/auth/logout-button';
import { RootState } from '../../store/store';
import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Typography
} from '@mui/material';
import Link from 'next/link';
import { useSelector } from 'react-redux';


export default function Navbar() {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    
    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography
                    variant="h6"
                    component={Link}
                    href="/"
                    sx={{ color: 'white', textDecoration: 'none' }}
                >
                    Bus Yatra

                </Typography>

                {isAuthenticated ? (
                    <LogoutButton />
                ) : (
                    <>
                        <Box>
                            <Button color="inherit" component={Link} href="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} href="/signup">
                                Signup
                            </Button>
                        </Box>
                    </>
                )}


            </Toolbar>
        </AppBar>
    );
}
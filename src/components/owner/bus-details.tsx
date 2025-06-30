'use client'
import { Box } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusDetails } from '@/store/slice/bus-slice';
import { AppDispatch, RootState } from '@/store/store';

interface Props {
    busId: string;
}

export default function BusDetails({ busId }: Props) {

    console.log("Bus Id is: ",busId);

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchBusDetails(busId))
        
    }, [busId, dispatch]);

    const payload = useSelector((state: RootState) => state.bus);
    const bus = payload.bus;
    console.log("Bus data payload data: ",bus)


    return (
        <>
            <Box>

               <Box>
                 Bus Color: {bus.color}
               </Box>

               <Box>
                 Bus Type: {bus.busType}
               </Box>

               <Box>
                 Registration Number: {bus.registrationNumber}
               </Box>
               
               <Box>
                 {
                    bus.rides
                 }
               </Box>



            </Box>
        </>
    )
}

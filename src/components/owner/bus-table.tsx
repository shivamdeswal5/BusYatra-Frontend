'use client';

import { RootState } from '@/store/store';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function BusTable() {

    const router = useRouter();

    const buses = useSelector((state: RootState) => state.bus);
    const busOwner = buses.user.user.busOwner;

    const handleRowClick = (busId: string) => {
        router.push(`/buses/${busId}`);
    };

    console.log("Buses Data in User ", buses);
    console.log("Buse Owner ", busOwner);

    return (
        <Paper sx={{ width: '90%', overflow: 'hidden', margin: '0 auto' }}>
            <>
                <TableContainer >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Sn.</TableCell>
                                <TableCell>Registration Number</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>Available Seat</TableCell>
                                <TableCell>Bus Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {busOwner.map((bus: any, index: number) => (
                                <TableRow
                                    key={bus.id}
                                    hover
                                    onClick={() => handleRowClick(bus.id)}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {bus.registrationNumber}
                                    </TableCell>
                                    <TableCell>
                                        {bus.color}
                                    </TableCell>

                                    <TableCell>
                                        {bus.availableSeats}
                                    </TableCell>
                                    <TableCell>{bus.busType}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        </Paper>
    );
}
import { Box } from '@mui/material'
import React from 'react'
import BusRegistrationModal from '../../components/owner/register-bus-modal'
import BusTable from '@/components/owner/bus-table'

export default function page() {
  return (
    <Box p={2}>
      <BusRegistrationModal/>
      <Box mt={4}>
        <BusTable/>
      </Box>
    </Box>
  )
}

import React from 'react'

import Typography from '@mui/material/Typography';


import NavBar from '@/components/navbar';
import { Box } from '@mui/material';
import withAuth from '@/utils/WithAuth';

const Home = () => {
  return (
    <NavBar>
<Box>
  <Typography>
    Home
  </Typography>
</Box>
  </NavBar>
  )
}

export default withAuth(Home)
import React from 'react';
import { Grid } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Box from '../components/Box';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
const Inbox = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const history = useHistory();

  if (!isLogin) {
    history.push('/');
  }
  return (
    <Grid
      container
      sx={{
        width: '98%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px',
      }}
    >
      <Grid item sx={{ width: '100%' }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Inbox;

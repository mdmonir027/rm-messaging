import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Box from '../components/Box';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAllConversations } from '../store/acton/conversationAction';

const Inbox = ({ fetchAllConversations, isLogin }) => {
  const history = useHistory();

  useEffect(() => {
    if (isLogin) {
      fetchAllConversations();
    }
  }, [fetchAllConversations , isLogin]);

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

const mapStateToProps = (state) => ({
  isLogin: state.auth.isLogin,
});

export default connect(mapStateToProps, { fetchAllConversations })(Inbox);

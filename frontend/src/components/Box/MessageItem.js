import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { connect } from 'react-redux';
import moment from 'moment';
const MessageItem = ({ userId, sender, text, date }) => {
  const [condition, setCondition] = useState(false);

  useEffect(() => {
    setCondition(sender === userId);
  }, [sender, userId]);

  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: condition ? 'flex-end' : 'flex-start',
        mb: '15px',
        cursor: 'pointer',
      }}
      container
      spacing={2}
    >
      <Grid item xs={11} sm={8} md={6}>
        <Typography
          variant='p'
          component='p'
          gutterBottom
          sx={{
            textAlign: condition ? 'right' : 'left',
            bgcolor: condition ? '#dadada' : '#1976d2b8',
            p: '5px 10px',
            borderRadius: '5px',
            minHeight: '30px',
          }}
        >
          {text}
        </Typography>
        <Typography
          variant='p'
          component='p'
          gutterBottom
          sx={{
            textAlign: condition ? 'right' : 'left',
          }}
        >
          {moment(date).fromNow()}
        </Typography>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  userId: state.auth.user._id,
});

export default connect(mapStateToProps)(MessageItem);

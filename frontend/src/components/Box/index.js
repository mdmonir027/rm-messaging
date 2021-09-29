import React, { useEffect } from 'react';
import { CssBaseline, Typography, Paper, Avatar, Grid } from '@mui/material';
import SendMessage from './SendMessage';

import { connect } from 'react-redux';
import { fetchAllMessage } from '../../store/acton/messageAction';
import MessageItem from './MessageItem';

const InboxBox = ({ fetchAllMessage, selected, messages }) => {
  useEffect(() => fetchAllMessage(selected), [selected, fetchAllMessage]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '2px' }} className='sidebar__root'>
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: '10px 15px',
            backgroundColor: '#dadada',
            mb: '10px',
          }}
        >
          <Grid sx={{ mr: '15px' }}>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
          </Grid>
          <Grid>
            <Typography variant='h5' gutterBottom component='p'>
              Md Monirul Islam
            </Typography>
          </Grid>
        </Grid>

        <Grid
          sx={{
            mb: 2,
            height: '70vh',
            overflowY: 'scroll',
            p: '0 10px 2px 10px',
            alignItems: 'end',
          }}
          className='scrollBar'
          container
        >
          <Grid item xs={12}>
            {messages.map((message) => (
              <MessageItem
                sender={message.sender}
                text={message.text}
                date={message.createdAt}
                key={message._id}
              />
            ))}
          </Grid>
        </Grid>
      </Paper>
      <SendMessage />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  selected: state.conversation.selected,
  messages: state.conversation.messages,
});

export default connect(mapStateToProps, { fetchAllMessage })(InboxBox);

import React, { useState } from 'react';
import { AppBar, Toolbar, Grid, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { connect } from 'react-redux';

import { addMessage } from '../../store/acton/messageAction';

const SendMessage = ({ addMessage, selected }) => {
  const [text, setText] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    addMessage({ text, conversationId: selected });
    setText('');
  };
  return (
    <div>
      <AppBar
        position='relative'
        sx={{ top: 'auto', bottom: 0, bgcolor: '#dadada' }}
      >
        <form onSubmit={handleSubmit}>
          <Toolbar>
            <Grid container justifyContent='space-between' alignItems='center'>
              <Grid item sx={{ flex: '1' }}>
                <TextField
                  variant='standard'
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Button type='submit'>
                  <SendIcon
                    sx={{ width: '30px', ml: '10px', color: '#357ae8' }}
                  />
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </form>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selected: state.conversation.selected,
});

export default connect(mapStateToProps, { addMessage })(SendMessage);

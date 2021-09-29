import * as React from 'react';
import {
  Modal,
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';

import './Sidebar.css';
import SearchBox from './SearchBox';
import { sliceString } from '../../utils/helper';
import {
  fetchAllConversations,
  setSelectConversation,
} from '../../store/acton/conversationAction';
import { connect } from 'react-redux';

const Sidebar = ({
  conversations,
  fetchAllConversations,
  selected,
  setSelectConversation,
}) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => fetchAllConversations(), [fetchAllConversations]);

  const handleClose = () => setOpen(false);
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '2px' }} className='sidebar__root'>
        <Typography
          variant='h5'
          gutterBottom
          component='div'
          sx={{ p: 2, textAlign: 'center', bgcolor: 'red' }}
        >
          Conversations
        </Typography>
        <List
          sx={{ mb: 2, height: '70vh', overflowY: 'scroll' }}
          className='scrollBar'
        >
          {conversations?.map((conversation) => (
            <React.Fragment key={conversation._id}>
              <ListItem
                onClick={() => setSelectConversation(conversation._id)}
                sx={{
                  alignItems: 'start',
                  mb: '5px',
                  mt: '5px',
                  fontWeight: 'bold',
                  background:
                    conversation._id === selected
                      ? 'rgb(218 218 218)'
                      : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={conversation?.receiver?.name || ''}
                    src={conversation?.receiver?.name || ''}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={conversation?.receiver?.name}
                  secondary={sliceString('hello world', 35)}
                  sx={{ margin: 0 }}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <AppBar
        position='relative'
        color='primary'
        sx={{ top: 'auto', bottom: 0 }}
      >
        <Toolbar>
          <IconButton color='inherit' aria-label='open drawer'>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color='inherit' onClick={() => setOpen(true)}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <SearchBox setOpen={setOpen} />
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  conversations: state.conversation.all,
  selected: state.conversation.selected,
});

export default connect(mapStateToProps, {
  fetchAllConversations,
  setSelectConversation,
})(Sidebar);

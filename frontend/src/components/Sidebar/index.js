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

const messages = [
  {
    id: 1,
    username: 'Brunch this week?',
    lastMessage: "I'll be in the neighbourhood ",
  },
  {
    id: 2,
    username: 'Summer BBQ',
    lastMessage: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
  },
];

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);

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
          {messages.map(({ id, username, lastMessage }) => (
            <React.Fragment key={id}>
              <ListItem
                button
                sx={{
                  alignItems: 'start',
                  mb: '5px',
                  mt: '5px',
                  fontWeight: 'bold',
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={username} src={username} />
                </ListItemAvatar>
                <ListItemText
                  primary={username}
                  secondary={sliceString(lastMessage, 35)}
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
        <SearchBox />
      </Modal>
    </React.Fragment>
  );
};
export default Sidebar;

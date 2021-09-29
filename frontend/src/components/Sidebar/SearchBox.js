import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography, Autocomplete, TextField } from '@mui/material';
import { connect } from 'react-redux';
import { fetchDisconnectedUser } from '../../store/acton/userAction';
import { addConversation } from '../../store/acton/conversationAction';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const SearchBox = ({
  options,
  fetchDisconnectedUser,
  setOpen: modalSetFunction,
  addConversation,
}) => {
  React.useEffect(() => {
    fetchDisconnectedUser();
  }, [fetchDisconnectedUser]);

  const [selectedUser, setSelectedUser] = React.useState('');

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open && selectedUser) {
      addConversation(selectedUser, modalSetFunction);
    }
  }, [open, selectedUser, addConversation, modalSetFunction]);

  return (
    <div>
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Search User
        </Typography>
        <Autocomplete
          id='asynchronous-demo'
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          fullWidth
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => {
            setSelectedUser(value._id);

            return option.name === value.name;
          }}
          getOptionLabel={(option) => option?.name}
          options={options}
          renderInput={(params) => (
            <TextField
              fullWidth
              {...params}
              variant='standard'
              InputProps={{
                ...params.InputProps,
                endAdornment: params.InputProps.endAdornment,
              }}
            />
          )}
        />
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => ({
  options: state.user.disconnected || [],
});

export default connect(mapStateToProps, {
  fetchDisconnectedUser,
  addConversation,
})(SearchBox);

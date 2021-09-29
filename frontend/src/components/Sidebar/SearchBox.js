import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography, Autocomplete, TextField } from '@mui/material';
import { connect } from 'react-redux';
import {
  fetchDisconnectedUser,
  connectNewUser,
} from '../../store/acton/userAction';

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
  connectNewUser,
  setOpen: modalSetFunction,
}) => {
  React.useEffect(() => {
    fetchDisconnectedUser();
  }, [fetchDisconnectedUser]);

  const [open, setOpen] = React.useState(false);

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
            connectNewUser(value._id);
            modalSetFunction(false);
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
  connectNewUser,
})(SearchBox);

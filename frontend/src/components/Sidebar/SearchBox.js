import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography, Autocomplete, TextField } from '@mui/material';
import { connect } from 'react-redux';
import { fetchDisconnectedUser } from '../../store/acton/userAction';

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

const SearchBox = ({ options, loading }) => {
  React.useEffect(() => {
    fetchDisconnectedUser();
  }, []);

  return (
    <div>
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Search User
        </Typography>
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Movie' />}
        />
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => ({
  options: state.user.disconnected,
});

export default connect(mapStateToProps, { fetchDisconnectedUser })(SearchBox);

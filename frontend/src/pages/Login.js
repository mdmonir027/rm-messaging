import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { userLogin } from '../store/acton/userAction';

import {} from 'react-router-dom';
import { connect } from 'react-redux';

const Login = ({ isLogin, errors, userLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    userLogin({ username, password }, history);
  };

  if (isLogin) {
    history.push('/inbox');
  }

  return (
    <div>
      <div>
        <Grid container spacing={0} justifyContent='center' alignItems='center'>
          <Grid
            item
            xs={8}
            sm={5}
            md={3}
            sx={{ position: 'relative', height: '100vh', width: '100vw' }}
          >
            <Paper
              variant='elevation'
              elevation={2}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50% , -50%)',
                minHeight: '30vh',
                padding: '50px',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Typography
                component='h1'
                variant='h4'
                sx={{ textAlign: 'center', marginBottom: '20px' }}
              >
                Sign in
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <TextField
                      type='text'
                      placeholder='Username'
                      fullWidth
                      name='username'
                      variant='outlined'
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      required
                      autoFocus
                      error={!!errors?.username}
                      helperText={errors?.username && errors.username}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type='password'
                      placeholder='Password'
                      fullWidth
                      variant='outlined'
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      error={!!errors?.password}
                      helperText={errors?.password && errors.password}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      sx={{ width: '100%', marginBottom: '20px' }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <div style={{ textAlign: 'center' }}>
                <Link
                  href='#'
                  variant='body2'
                  sx={{ display: 'inline-block', textAlign: 'center' }}
                >
                  Forgot Password?
                </Link>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLogin: state.auth.isLogin,
  errors: state.auth.error === 'login' ? state.auth.errors : {},
});

export default connect(mapStateToProps, { userLogin })(Login);

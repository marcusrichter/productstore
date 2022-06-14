import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { Alert, Box } from '@mui/material';

const useStyles = makeStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `0 auto`
    },
    loginBtn: {
      marginTop: 2,
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: 10
    }
  }
);

interface Props {
  authorize: (username: string, password: string) => Promise<boolean|null>;
}

const Login = ({ authorize }: Props) => {
  const classes = useStyles();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    if (data.username.trim() === '' || data.password.trim() === '') {
      return;
    }
    setMessage(null);
    setLoading(true);

    const result = await authorize(data.username, data.password);
    if (result === false) {
      setMessage('Ungültiger Name oder Passwort');
    }
    if (result === null) {
      setMessage('Es ist ein Fehler aufegetreten');
    }

    setLoading(false);
  };

  return (
    <form
      className={classes.container}
      noValidate autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Login" />
        <CardContent>
          {message && <Box mb={2}>
            <Alert severity="error">{message}</Alert>
          </Box>
          }
          <div>
            <TextField
              fullWidth
              id="username"
              label="Username"
              placeholder="Username"
              margin="normal"
              required={true}
              {...register('username')}
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              required={true}
              {...register('password')}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            type="submit"
            className={classes.loginBtn}
            disabled={loading}>
            Login
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default Login;
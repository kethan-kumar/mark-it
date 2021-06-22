import './App.css';
import React from 'react';
import { Grid, TextField, Card, Button, FormControlLabel, Checkbox, Link } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function App() {
  const cardStyle = { padding: 50, height: 'auto', width: 280, margin: "112px auto" }
  const avatarStyle = { backgroundColor: '#000000' }
  const classes = useStyles();

  const [username, setusername] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const [validPassword, setvalidPassword] = useState(true);
  const [validUsername, setvalidUsername] = useState(true);
  const [validFirstname, setvalidFirstname] = useState(true);
  const [validLastname, setvalidLastname] = useState(true);
  const [validConfPwd, setvalidConfPwd] = useState(true);
  const [validEmail, setvalidEmail] = useState(true);
  const [validTnC, setvalidTnC] = useState(true);
  const [tnc, settnc] = useState(false);

  const [isRegister, setisRegister] = useState(false);

  const handleInput = (event) => {
    if (event.target.name === "username") {
      setusername(event.target.value);
      handleUsername(event.target.id, event.target.value);
    }
    if (event.target.name === "firstname") {
      setfirstname(event.target.value);
      handleUsername(event.target.id, event.target.value);
    }
    if (event.target.name === "lastname") {
      setlastname(event.target.value);
      handleUsername(event.target.id, event.target.value);
    }
    if (event.target.name === "password") {
      setpassword(event.target.value);
      handlePassword(event.target.value);
    }
    if (event.target.name === "email") {
      setemail(event.target.value);
      handleEmail(event.target.value);
    }
    if (event.target.name === "confirmPassword") {
      setconfirmPassword(event.target.value);
      handleConfirmPassword(event.target.value);
    }
    if (event.target.name === "tnc") {
      settnc(event.target.checked);
      handleTnC(event.target.checked);
    }
  }

  const handleUsername = (nameValue, userName) => {
    let boolName = false;
    const regex = /^\w+$/;
    if (userName !== null && userName !== '') {
      boolName = regex.test(userName);
    }
    if (nameValue === "username") {
      setvalidUsername(boolName);
    }
    if (nameValue === "firstname") {
      setvalidFirstname(boolName);
    }
    if (nameValue === "lastname") {
      setvalidLastname(boolName);
    }
  }

  const handlePassword = (passWord) => {
    if (passWord !== null || passWord !== '') {
      const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[%$&!*@?])[A-Za-z\d@$!%*?&]{8,}$/;
      setvalidPassword(regex.test(passWord));
    }
  }

  const handleConfirmPassword = (passWord) => {
    if (passWord !== null && passWord !== '') {
      if (password === passWord)
        setvalidConfPwd(true);
      else
        setvalidConfPwd(false);
    } else {
      setvalidConfPwd(false);
    }
  }

  const handleEmail = (emailID) => {
    if (emailID !== null || emailID !== '') {
      const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
      setvalidEmail(regex.test(emailID));
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUsername("firstname", firstname);
    handleUsername("lastname", lastname);
    if (!isRegister)
      handleUsername("username", username);
    handlePassword(password);
    handleConfirmPassword(confirmPassword);
    handleEmail(email);
    handleTnC(tnc);
  }

  const handleRegistration = () => {
    setisRegister(true);
  }

  const handleLogin = () => {
    setisRegister(false);
  }

  const handleTnC = (tncValue) => {
    settnc(tncValue);
    setvalidTnC(tncValue);
  }

  if (!isRegister) {
    return (
      <div className="App">

        <Grid container spacing={3}>
          <Grid item lg={3} md={3}></Grid>
          <Grid item xs={12} lg={6} md={6}>
            <Card style={cardStyle}>
              <Grid align='center'>
                <Avatar style={avatarStyle}></Avatar>
                <h2>MARK-IT</h2>
              </Grid>

              <form>
                <div>
                  <TextField label='Username' placeholder='Enter username' fullWidth variant="outlined"
                    margin="normal" name="username" id="username"
                    error={!validUsername}
                    helperText={validUsername ? '' : 'Only alpha numeric characters are allowed!'}
                    onChange={handleInput}></TextField>
                </div>
                <div>
                  <TextField label='Pasword' type='password' fullWidth placeholder='Enter password'
                    name="password" id="password" variant="outlined" margin="normal"
                    error={!validPassword}
                    helperText={validPassword ? '' : 'Minimum 8 characters with one uppercase, one lowercase, one number and a special character!'}
                    onChange={handleInput}></TextField>
                </div>
                <FormControlLabel
                  control={
                    <Checkbox name="tnc" checked={tnc}
                      onChange={handleInput} color="primary"></Checkbox>
                  }
                  label="Agree to T&C."
                />
                <p className={validTnC ? "hidden" : "text-danger p-tag-alert"} style={{ 'color': 'red', 'font-size': 'x-small' }}> Agree to the terms and conditions to login!</p>
                <div>
                  <Link variant="body2" href="https://3912.cupe.ca/documents/collective-agreements/">Learn more.</Link>
                </div>

                <div>
                  <Grid align='center'>
                    <Button type='submit' color='primary' variant="outlined" onClick={handleSubmit} className={classes.margin}>Sign in</Button>
                  </Grid>
                </div>

                <div>
                  New user?
                  <Link onClick={handleRegistration} href="#">
                    <span> Sign up!</span>
                  </Link>
                </div>
              </form>
            </Card>
          </Grid>

          <Grid item lg={3} md={3}></Grid>
        </Grid>
      </div >
    );
  } else {
    return (
      <div className="App">

        <Grid container spacing={3}>
          <Grid item lg={3} md={3}></Grid>
          <Grid item xs={12} lg={6} md={6}>
            <Card style={cardStyle}>
              <Grid align='center'>
                <Avatar style={avatarStyle}></Avatar>
                <h2>MARK-IT</h2>
              </Grid>

              <form>
                <div>
                  <TextField label='Firstname' placeholder='Enter first name' fullWidth variant="outlined"
                    margin="normal" name="firstname" id="firstname"
                    error={!validFirstname}
                    helperText={validFirstname ? '' : 'Only alpha numeric characters are allowed!'}
                    onChange={handleInput}></TextField>
                </div>
                <div>
                  <TextField label='Lastname' placeholder='Enter last name' fullWidth variant="outlined"
                    margin="normal" name="lastname" id="lastname"
                    error={!validLastname}
                    helperText={validLastname ? '' : 'Only alpha numeric characters are allowed!'}
                    onChange={handleInput}></TextField>
                </div>
                <div>
                  <TextField label='Email' placeholder='Email address' fullWidth variant="outlined"
                    margin="normal" name="email" id="email"
                    error={!validEmail}
                    helperText={validEmail ? '' : 'Enter a valid email address.'}
                    onChange={handleInput}></TextField>
                </div>
                <div>
                  <TextField label='Pasword' type='password' fullWidth placeholder='Enter password'
                    name="password" id="password" variant="outlined" margin="normal"
                    error={!validPassword}
                    helperText={validPassword ? '' : 'Minimum 8 characters with one uppercase, one lowercase, one number and a special character!'}
                    onChange={handleInput}></TextField>
                </div>
                <div>
                  <TextField label='Confirm Password' type='password' fullWidth placeholder='Enter password'
                    name="confirmPassword" id="confirmPassword" variant="outlined" margin="normal"
                    error={!validConfPwd}
                    helperText={validConfPwd ? '' : 'Passwords do not match!'}
                    onChange={handleInput}></TextField>
                </div>
                <FormControlLabel
                  control={
                    <Checkbox name="tnc" checked={tnc}
                      onChange={handleInput} color="primary"></Checkbox>
                  }
                  label="Agree to T&C."
                />
                <p className={validTnC ? "hidden" : "text-danger p-tag-alert"} style={{ 'color': 'red', 'font-size': 'x-small' }}>Agree to the terms and conditions to register!</p>
                <div>
                  <Link variant="body2" href="https://3912.cupe.ca/documents/collective-agreements/">Learn more.</Link>
                </div>

                <div>
                  <Grid align='center'>
                    <Button type='submit' color='primary' variant="outlined" onClick={handleSubmit} className={classes.margin}>Sign up</Button>
                  </Grid>
                </div>
                <div>
                  Existing user?
                  <Link onClick={handleLogin} href="#">
                    <span> Sign in!</span>
                  </Link>
                </div>

              </form>
            </Card>
          </Grid>

          <Grid item lg={3} md={3}></Grid>
        </Grid>
      </div >
    );
  }

}

export default App;

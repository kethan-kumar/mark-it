import React from "react";
import {
    Grid,
    TextField,
    Card,
    Button,
    Checkbox,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useState } from "react";
import axios from 'axios';
import markit_logo from "../images/markit_logo.png";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

function Profile() {
    const cardStyle = {
        padding: 50,
        height: "auto",
        width: 400,
        margin: "60px auto",
    };
    const avatarStyle = { backgroundColor: "#000000" };
    const classes = useStyles();

    const [username, setusername] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const [validPassword, setvalidPassword] = useState(true);
    const [validUsername, setvalidUsername] = useState(true);
    const [validFirstname, setvalidFirstname] = useState(true);
    const [validLastname, setvalidLastname] = useState(true);
    const [validConfPwd, setvalidConfPwd] = useState(true);
    const [validEmail, setvalidEmail] = useState(true);
    const [validTnC, setvalidTnC] = useState(true);
    const [tnc, settnc] = useState(false);

    const [isRegister, setisRegister] = useState(false);
    const [userExists, setuserExists] = useState(false);
    const user_profile_api = "/api/profile/user-details";

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
    };

    const handleUsername = (nameValue, userName) => {
        let boolName = false;
        const regex = /^\w+$/;
        if (userName !== null && userName !== "") {
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
    };

    const handlePassword = (passWord) => {
        if (passWord !== null || passWord !== "") {
            const regex =
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[%$&!*@?])[A-Za-z\d@$!%*?&]{8,}$/;
            setvalidPassword(regex.test(passWord));
        }
    };

    const handleConfirmPassword = (passWord) => {
        if (passWord !== null && passWord !== "") {
            if (password === passWord) setvalidConfPwd(true);
            else setvalidConfPwd(false);
        } else {
            setvalidConfPwd(false);
        }
    };

    const handleEmail = (emailID) => {
        if (emailID !== null || emailID !== "") {
            const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
            setvalidEmail(regex.test(emailID));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUsername("firstname", firstname);
        handleUsername("lastname", lastname);
        handlePassword(password);
        handleConfirmPassword(confirmPassword);
        handleEmail(email);
        handleTnC(tnc);

        console.log("Register");
        async function authenticateUser() {
            await axios.post(user_profile_api,
                { 'email': email })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        console.log('Profile retrival successful!');
                        setisRegister(true);
                    } else if (response.status === 404) {
                        console.log('Profile not found');
                        setuserExists(true);
                    }
                }).catch((error) => {
                    console.log(error);
                });
        }
        authenticateUser();
    };

    // const handleRegistration = () => {
    //   setisRegister(true);
    // };

    // const handleLogin = () => {
    //   setisRegister(false);
    // };

    const handleTnC = (tncValue) => {
        settnc(tncValue);
        setvalidTnC(tncValue);
    };
    return (
        <div className="App">
            <Grid container spacing={3}>
                <Grid item lg={3} md={3} sm={2}></Grid>
                <Grid item xs={12} lg={6} md={6}>
                    <Card style={cardStyle}>
                        <Grid align="center">
                            <Avatar alt="" src={markit_logo} style={avatarStyle} className={classes.large}></Avatar>
                            <Typography variant="body1" gutterBottom >
                                <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="h5.fontSize" m={1}>
                                    MARKIT PROFILE
                                </Box>
                            </Typography>
                        </Grid>
                        <form>
                            <div align="left">
                                <Box component="span" visibility="visible" bgcolor="background.paper">
                                    <Typography variant="body1" gutterBottom >
                                        <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="h6.fontSize" m={1}>
                                            NAME:
                                            <Box component="span" visibility="visible" bgcolor="background.paper">
                                                <TextField
                                                    label="Firstname"
                                                    placeholder="Enter first name"
                                                    fullWidth
                                                    variant="standard"
                                                    margin="normal"
                                                    name="firstname"
                                                    id="firstname"
                                                    error={!validFirstname}
                                                    helperText={
                                                        validFirstname
                                                            ? ""
                                                            : "Only alpha numeric characters are allowed!"
                                                    }
                                                    onChange={handleInput}
                                                ></TextField>
                                            </Box>
                                        </Box>
                                    </Typography>
                                </Box>
                            </div>
                            <div>
                                <TextField
                                    label="Lastname"
                                    placeholder="Enter last name"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    name="lastname"
                                    id="lastname"
                                    error={!validLastname}
                                    helperText={
                                        validLastname
                                            ? ""
                                            : "Only alpha numeric characters are allowed!"
                                    }
                                    onChange={handleInput}
                                ></TextField>
                            </div>
                            <div>
                                <TextField
                                    label="Email"
                                    placeholder="Email address"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    name="email"
                                    id="email"
                                    error={!validEmail}
                                    helperText={validEmail ? "" : "Enter a valid email address."}
                                    onChange={handleInput}
                                ></TextField>
                            </div>
                            <div>
                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    placeholder="Enter password"
                                    name="password"
                                    id="password"
                                    variant="outlined"
                                    margin="normal"
                                    error={!validPassword}
                                    helperText={
                                        validPassword
                                            ? ""
                                            : "Minimum 8 characters with one uppercase, one lowercase, one number and a special character!"
                                    }
                                    onChange={handleInput}
                                ></TextField>
                            </div>
                            <div>
                                <TextField
                                    label="Confirm Password"
                                    type="password"
                                    fullWidth
                                    placeholder="Enter password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    variant="outlined"
                                    margin="normal"
                                    error={!validConfPwd}
                                    helperText={validConfPwd ? "" : "Passwords do not match!"}
                                    onChange={handleInput}
                                ></TextField>
                            </div>
                            <div>
                                <Grid align="center">
                                    <Box fontSize={12} m={1}>
                                        <Checkbox
                                            name="tnc"
                                            checked={tnc}
                                            onChange={handleInput}
                                            color="primary"
                                        ></Checkbox>
                                        <Link href="https://3912.cupe.ca/documents/collective-agreements/">
                                            Agree to Terms and Conditions.
                                        </Link>
                                    </Box>
                                </Grid>
                            </div>
                            <p
                                className={validTnC ? "hidden" : "text-danger p-tag-alert"}
                                style={{ color: "red", "font-size": "x-small" }}
                            >
                                Agree to the terms and conditions to register!
                            </p>
                            <div>
                                <Grid align="center">
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        onClick={handleSubmit}
                                        className={classes.margin}
                                        endIcon={<Icon>send</Icon>}
                                    >
                                        Sign up
                                    </Button>
                                </Grid>
                            </div>
                            <div>
                                Existing user?
                                <Link to="/login">
                                    <span> Sign in!</span>
                                </Link>
                            </div>
                        </form>
                    </Card>
                </Grid>

                <Grid item lg={3} md={3}></Grid>
            </Grid>
        </div>
    );
}

export default Profile;

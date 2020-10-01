/* eslint-disable */

import React from "react";
import { connect } from 'react-redux';

// Store
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router'
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardFooter from "components/Card/CardFooter";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from "assets/jss/views/loginPageStyle";
import FormLabel from "@material-ui/core/FormLabel";

import { login, sendLinkToUserEmail } from 'store/actions/AdminActions/loginActions';
import { TextField } from "@material-ui/core";

// const useStyles = makeStyles(styles);

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      userDetails: {
        user_email: "",
        user_name: "",
        user_password: "",
      },
      openEditDialog: false,
      openCodeDialog: false,
      showUpdatePassword: false,

      // error: "",
      cardAnimaton: "cardHidden",
      // email: '',
      // password: '',  
      // firstname: '',
    };
  }


  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn == false) {
      this.setState({ showUpdatePassword: true });
    }
    return null;
  }

  submitForm = (e) => {
    e.preventDefault();
    const { userDetails } = this.state;
    userDetails["request_from"] = 'admin'
    this.props.login(userDetails);
    // this.props.history.push('/admin/dashboard');
  };
  handleOnFocue = () => {
    this.props.resetMessage();
  }

  handleChange = async (event, typeName) => {
    let obj = this.state.userDetails
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({ ...this.state, userDetails: { ...obj, [name]: value } });
  };
  /**
    * Open dialog handler
    */
  handleClickOpen = async () => {
    // await this.setState({ ...this.state, openEditDialog: true });
    await this.setState({ ...this.state, openCodeDialog: true });
  };

  handleCloseCode = async () => {
    await this.setState({ ...this.state, openCodeDialog: false });
  };

  /**
   * Send code to user email.
   * Do API call here.
   */
  sendCodeToEmail(e) {
    e.preventDefault();
    let { userDetails } = this.state;
    this.setState({ ...this.state, openCodeDialog: false })
    userDetails["user_role"] = [1, 4];
    this.props.sendLinkToUserEmail(userDetails);
  }

  render() {
    const { classes, isLoading, isErrorMessage, showForgotPass } = this.props;
    const { userDetails, openCodeDialog, openEditDialog, showUpdatePassword } = this.state;

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={(e) => this.submitForm(e)}>
              <Card login className={classes[this.state.cardAnimaton]}>

                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>Log in</h4>
                  <div className={classes.socialLine}>
                  </div>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      name: "user_email",
                      type: "email",
                      value: userDetails.user_email || '',
                      onChange: (e) => { this.handleChange(e, "user_email") },
                      onFocus: () => this.handleOnFocue(),
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    name="password"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                        </Icon>
                        </InputAdornment>
                      ),
                      onChange: (e) => { this.handleChange(e, "user_password") },
                      onFocus: () => this.handleOnFocue(),
                      name: "user_password",
                      type: "password",
                      value: userDetails.user_password,
                      autoComplete: "off"
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  {isLoading ? <FacebookProgress /> : <Button type="submit" color="rose" simple size="lg" block>
                    Let{"'"}s Go
                  </Button>}
                </CardFooter>
                <h5 style={{ margin: "0px auto 8px auto", color: "red" }} className={classes.justifyContentCenter} color="rose">{isErrorMessage && isErrorMessage.length > 0 ? isErrorMessage : ""}</h5>
              </Card>
            </form>
            <br />
            {showForgotPass ?
              <Button onClick={(e) => this.handleClickOpen(e)} type="button" color="white" simple size="lg" block>Forgot password ? </Button>
              : ""}
          </GridItem>
          {/* Dialog for sending link to email Start  */}
          <Dialog fullWidth={true} maxWidth={'sm'} open={openCodeDialog} onClose={this.handleCloseCode} aria-labelledby="form-dialog-email">
            <DialogTitle id="form-dialog-email">Reset Password</DialogTitle>
            <DialogContent>
              <form onSubmit={(e) => this.sendCodeToEmail(e)}>
                <GridContainer>
                  <GridItem sm={12} md={12} lg={12} style={{ marginBottom: '35px' }}>
                    <p style={{ marginBottom: '25px' }}>Enter your Email address to receive a passoword reset link to recover your password</p>
                    <TextField
                      fullWidth
                      required
                      label="Email..."
                      id="email"
                      inputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        name: "user_email",
                        type: "email",
                        value: userDetails.user_email || '',
                        onChange: (e) => { this.handleChange(e, "user_email") },
                        onFocus: () => this.handleOnFocue(),
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <DialogActions>
                  <Button onClick={this.handleCloseCode} color="transparent"> Cancel   </Button>
                  <Button type="submit" color="rose">Submit </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </GridContainer>
      </div >
    );
  }
};

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.AdminLoginReducers.user,
  showForgotPass: state.AdminLoginReducers.showForgotPass,
  isLoggedIn: state.AdminLoginReducers.isLoggedIn,
  isLoading: state.AdminLoginReducers.isLoggedIn,
  isErrorMessage: state.AdminLoginReducers.loginError
});
// const mapDispatchToProps = (dispatch) => bindActionCreators({ login }, dispatch)
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ sendLinkToUserEmail, login, resetMessage: () => ({ type: "LOGIN_FAILURE", message: "" }) }, dispatch)
}
// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

const w = withStyles(styles)(LoginPage);
export default connect(mapStateToProps, mapDispatchToProps)(w);


const useStylesFacebook = makeStyles({
  root: {
    position: "relative"
  },
  top: {
    color: "#eef3fd"
  },
  bottom: {
    color: "#6798e5",
    animationDuration: "550ms",
    position: "absolute",
    left: 0
  }
});

function FacebookProgress(props) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        value={100}
        className={classes.top}
        size={24}
        thickness={4}
        {...props}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={24}
        thickness={4}
        {...props}
      />
    </div>
  );
}
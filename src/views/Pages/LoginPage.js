/* eslint-disable */

import React from "react";

// Store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router'
import { login } from 'store/actions/AdminActions/loginActions';
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";

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

import styles from "assets/jss/views/loginPageStyle";

// const useStyles = makeStyles(styles);

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      email: '',
      password: '',
      firstname: '',
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

  submitForm = (e) => {
    e.preventDefault();
    // console.log(`Email: ${this.state.email},password: ${this.state.password}, firstname: ${this.state.firstname}`)
    this.props.login('saif');
    // this.props.history.push('/admin/dashboard');
    // this.props.changePage()
  };
  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value,
    });
  };


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={(e) => this.submitForm(e)}>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader color="rose">
                  <h4 className={classes.cardTitle}>Log in</h4>
                </CardHeader>
                <CardBody>
                  {/* <CustomInput
                    onChange={(e) => { this.handleChange(e) }}
                    labelText="First Name.."
                    id="firstname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Face className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      name: "firstname",
                      onChange: (e) => { this.handleChange(e) }
                    }}
                  /> */}
                  <CustomInput

                    labelText="Email..."
                    id="email"
                    name="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      name: "email",
                      onChange: (e) => { this.handleChange(e) }

                    }}
                  />
                  <CustomInput
                    // 

                    labelText="Password"
                    id="password"
                    name="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                        </Icon>
                        </InputAdornment>
                      ),
                      onChange: (e) => { this.handleChange(e) },
                      name: "password",
                      type: "password",
                      autoComplete: "off"
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button type="submit" color="rose" simple size="lg" block>
                    Let{"'"}s Go
                </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
};

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.AdminLoginReducers.user,
  isLoggedIn: state.AdminLoginReducers.isLoggedIn,
});
// const mapDispatchToProps = (dispatch) => bindActionCreators({ login }, dispatch)
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ login }, dispatch)
}
// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

const w = withStyles(styles)(LoginPage);
export default connect(mapStateToProps, mapDispatchToProps)(w);
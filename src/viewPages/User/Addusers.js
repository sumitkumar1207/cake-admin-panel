/* eslint-disable */
import React, { Component } from 'react';
// Store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import Snackbar from "components/Snackbar/Snackbar";
import stylesOne from "assets/jss/views/regularFormsStyle";
import stylesTwo from "assets/jss/views/extendedFormsStyle";
/**
 * Validate inputData
 */
import { validateAddUserInput } from 'validation/addUser';
/**
 * APIs call actions
 */
import { getUserRoles, insertUser } from 'store/actions/AdminActions/userActions';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

let styles = {
  ...stylesTwo,
  ...stylesOne,
}
class Addusers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      simpleSelect: "",
      selectedRoles: [],
      selectedGender: null,
      users: {
        role_id: null,
        user_name: null,
        user_email: null,
        user_mobile: null,
        user_password: null,
        user_gender: null,
        user_address: null,
        request_from: "admin"
      },
      place: "br",
      color: "danger",
      message: "",
      open: false,
    };
  };

  componentDidMount() {
    this.props.getUserRoles();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { insertSuccess } = nextProps;

    if (insertSuccess) {
      nextProps.resetSuccess();
      return {
        simpleSelect: "",
        clear_role: true,
        selectedRoles: [],
        selectedGender: null,
        users: {
          role_id: null,
          user_name: null,
          user_email: null,
          user_mobile: null,
          user_password: null,
          user_gender: null,
          user_address: null,
        }
      };
    }
    return null;
  }

  handleSimple = async event => {
    let { users } = this.state;
    // await this.setState({ ...this.state, simpleSelect: event.target.value });
    await this.setState({ ...this.state, users: { ...users, role_id: event.target.value }, simpleSelect: event.target.value });
  };

  handleChange = async (event, name) => {
    // let obj = this.state.userDetails
    let { users } = this.state;
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    users[name] = value;
    await this.setState({ ...this.state, users: { ...users } });
  };

  handleFinalSubmit = async (e) => {
    e.preventDefault();
    const { users, selectedRoles, selectedGender } = this.state;
    users['role_id'] = selectedRoles && selectedRoles["role_id"]
    users['user_gender'] = selectedGender
    const { errors, isValid } = validateAddUserInput(users);
    // Check Validation 
    if (!isValid) {
      let { user_name, user_email, user_password, role_id, user_mobile, user_gender, user_address } = errors
      let message = user_name || user_email || user_password || role_id || user_mobile || user_gender || user_address
      this.showCustomSnackbar(message)
    } else {
      this.props.insertUser(users)
    }
  };

  showCustomSnackbar = (message) => {
    this.setState({ ...this.state, open: true, message })
    setTimeout(() => {
      this.setState({ ...this.state, open: false })
    }, 3000);
  }

  handleOnSelectComponet = async (event, value, name, r) => {
    if (name === "role_id") {
      let { selectedRoles } = this.state
      selectedRoles = value
      await this.setState({ ...this.state, selectedRoles })
    } else if (name === "user_gender") {
      let { selectedGender } = this.state
      selectedGender = value
      await this.setState({ ...this.state, selectedGender })
    }
  }

  render() {
    const { classes } = this.props;
    const { users, clear_role } = this.state;
    const { userRoleList } = this.props;
    const userGenderList = ["male", "female", "other"]
    return (
      <React.Fragment>
        <Snackbar
          place={this.state.place}
          color={this.state.color}
          message={this.state.message}
          open={this.state.open}
          closeNotification={() => this.setState({ ...this.state, open: false })}
          close
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="rose" >
                <h4 style={{ color: "#FFFFFF" }} className={classes.cardTitle}>Add User</h4>
              </CardHeader>
              <CardBody>
                <form onSubmit={(e) => this.handleFinalSubmit(e)}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6} lg={6} style={{ 'marginBottom': '25px' }}>
                      <TextField
                        fullWidth
                        label="User Name"
                        id="user_name"
                        required
                        inputProps={{
                          value: users.user_name || '',
                          onChange: (e) => { this.handleChange(e, "user_name") },
                          type: "text",
                          name: "user_name",
                          autoComplete: "off",
                          placeholder: "Enter Name"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={6} style={{ 'marginBottom': '25px' }}>
                      <TextField
                        fullWidth
                        label="User Email"
                        id="user_email"
                        required
                        inputProps={{
                          value: users.user_email || '',
                          onChange: (e) => { this.handleChange(e, "user_email") },
                          type: "email",
                          name: "user_email",
                          autoComplete: "off",
                          placeholder: "Enter Email"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={6} style={{ 'marginBottom': '25px' }}>
                      <TextField
                        fullWidth
                        label="User Password"
                        id="pass"
                        required
                        inputProps={{
                          value: users.user_password || '',
                          onChange: (e) => { this.handleChange(e, "user_password") },
                          type: "password",
                          name: "user_password",
                          autoComplete: "off",
                          placeholder: "Enter Password"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={6} style={{ 'marginBottom': '25px' }}>
                      <Autocomplete
                        key={clear_role}
                        id="user_role"
                        options={userRoleList}
                        getOptionLabel={(option) => option.role_name}
                        onChange={(e, value, r) => this.handleOnSelectComponet(e, value, "role_id", r)}
                        renderInput={(params) => (
                          <TextField {...params} label="User Role" placeholder="Select Role" />
                        )}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={6} style={{ 'marginBottom': '25px' }}>
                      <TextField
                        fullWidth
                        label="User Mobile"
                        id="user_mobile"
                        required
                        inputProps={{
                          value: users.user_mobile || '',
                          onChange: (e) => { this.handleChange(e, "user_mobile") },
                          type: "tel",
                          name: "user_mobile",
                          autoComplete: "off",
                          placeholder: "Enter Mobile"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={6} style={{ 'marginBottom': '25px' }}>
                      <Autocomplete
                        key={clear_role}
                        id="user_gender"
                        options={userGenderList}
                        getOptionLabel={(option) => option}
                        onChange={(e, value, r) => this.handleOnSelectComponet(e, value, "user_gender", r)}
                        renderInput={(params) => (
                          <TextField {...params} label="User Gender" placeholder="Select Gender" />
                        )}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} lg={12} style={{ 'marginBottom': '25px' }}>
                      <TextField
                        fullWidth
                        label="User Address"
                        id="user_address"
                        required
                        inputProps={{
                          value: users.user_address || '',
                          onChange: (e) => { this.handleChange(e, "user_address") },
                          type: "tel",
                          name: "user_address",
                          autoComplete: "off",
                          placeholder: "Enter Address"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} lg={12} style={{ "textAlign": "center" }} >
                      <Button type="submit" style={{ margin: "auto 0" }} color="rose">Submit</Button>
                    </GridItem>
                  </GridContainer>
                </form>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </React.Fragment>
    )
  };
};
const mapStateToProps = (state) => ({
  userRoleList: state.AdminUserReducers.userRoleList,
  responseMessage: state.AdminUserReducers.responseMessage,
  insertSuccess: state.AdminUserReducers.insertSuccess,
  insertMessage: state.AdminUserReducers.insertMessage
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getUserRoles,
    insertUser,
    resetSuccess: () => ({ type: "REST_RESPONSE_MESSAGE" }),
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Addusers));

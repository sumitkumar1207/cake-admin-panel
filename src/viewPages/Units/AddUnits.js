/* eslint-disable */
import React, { Component } from "react";
// Store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router'
import PropTypes from "prop-types";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import Snackbar from "components/Snackbar/Snackbar";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardText from "components/Card/CardText";
import CardIcon from "components/Card/CardIcon";
import CardBody from "components/Card/CardBody";
import styles from "assets/jss/views/regularFormsStyle";
import { TextField } from "@material-ui/core";
/**
 * APIs
*/
import { AddUnit } from 'store/actions/AdminActions/unitActions';

class AddUnits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [
        {
          unit_name: null,
          unit_value: null,
        }
      ],
      place: "br",
      color: "danger",
      message: "",
      open: false
    };
  };

  componentDidMount() { };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { insertSuccess } = nextProps;
    // console.log('nextProps, prevState :', nextProps, prevState);
    if (insertSuccess) {
      nextProps.resetSuccessFlag()
      setTimeout(() => {
        nextProps.resetSuccess()
      }, 2000);
      return {
        ...prevState,
        units: [
          {
            unit_name: null,
            unit_value: null,
          }
        ],
        message: "",
        open: false
      };
    }
    return null;
  };


  componentWillUnmount() {
    this.props.resetSuccessFlag()
    this.props.resetSuccess()
  }

  handleChange = async (event, index, name) => {
    // let obj = this.state.userDetails
    let { units } = this.state;
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    units[index][name] = value;
    await this.setState({ ...this.state, units: [...units] });
  };

  handleAddMoreUnit = async (e) => {
    let { units } = this.state;
    let add = {
      unit_name: null,
      unit_value: null,
    };
    await this.setState({ ...this.state, units: [...units, add] });
  };

  handleRemoveUnit = async (e, index) => {
    let { units } = this.state;
    if (units.length > 1) {
      units.splice(index, 1);
      await this.setState({ ...this.state, units: [...units] });
    }
  };

  handleFinalSubmit = async (e) => {
    let _errors = []
    e.preventDefault();
    const { units } = this.state;
    units.map(unit => {
      if (unit.unit_name == null || unit.unit_name == '') {
        _errors.push("Name can not be empty")
      }
      if (unit.unit_value == null || unit.unit_value == '') {
        _errors.push("Value can not be empty")
      }
    })

    if (_errors.length > 0) {
      this.showCustomSnackbar(_errors)
    } else {

      this.props.AddUnit({ units: units })
    }
  };

  showCustomSnackbar = (message) => {

    this.setState({ ...this.state, open: true, message })

    setTimeout(() => {
      this.setState({ ...this.state, open: false })
    }, 2000);
  }


  render() {
    const { classes, responseMessage } = this.props;
    const { units, place, color, message, open } = this.state;
    return (
      <React.Fragment>
        {<Snackbar
          place={responseMessage.place}
          color={responseMessage.color}
          message={responseMessage.message}
          open={responseMessage.status}
          closeNotification={() => this.props.resetSuccess()}
          close
        />}
        {<Snackbar
          place={place}
          color={color}
          message={message}
          open={open}
          closeNotification={() => this.setState({ ...this.state, open: false })}
          close
        />}
        <Card>
          <CardHeader color="rose" >
            <h4 className={classes.cardTitle}>Add Units</h4>
          </CardHeader>
          <CardBody>
            <form onSubmit={(e) => this.handleFinalSubmit(e)}>
              <GridContainer>
                {units.map((unit, index) =>
                  (<React.Fragment key={index}>
                    <GridItem sm={4} md={4} lg={4} style={{ 'marginBottom': '25px' }}>
                      <TextField
                        fullWidth
                        id="unit_name"
                        label="Unit Name"
                        required={true}
                        inputProps={{
                          onChange: (e) => { this.handleChange(e, index, "unit_name") },
                          autoComplete: "off",
                          value: unit.unit_name || '',
                          placeholder: "Enter Unit Name Ex. Gram, KG"

                        }}
                      />
                    </GridItem>

                    <GridItem sm={6} md={6} lg={6} style={{ 'marginBottom': '25px' }}>
                      <TextField
                        fullWidth
                        label="Unit Value"
                        id="unit_value"
                        required={true}
                        inputProps={{
                          onChange: (e) => { this.handleChange(e, index, "unit_value") },
                          autoComplete: "off",
                          value: unit.unit_value || '',
                          placeholder: "Enter Unit Value Ex. 500,100"
                        }}
                      />
                    </GridItem>

                    <GridItem sm={1} md={1} lg={1} style={{ 'marginBottom': '25px', 'textAlign': 'center' }}>
                      {index === 0 ?
                        <IconButton onClick={(e) => this.handleAddMoreUnit(e)}>
                          <AddIcon />
                        </IconButton> : undefined}
                    </GridItem>

                    <GridItem sm={1} md={1} lg={1} style={{ 'marginBottom': '25px', 'textAlign': 'center' }}>
                      <IconButton onClick={(e) => this.handleRemoveUnit(e, index)}>
                        <DeleteIcon />
                      </IconButton>
                    </GridItem>
                  </React.Fragment>)
                )}
                <GridItem sm={12} md={12} lg={12} style={{ 'textAlign': 'center' }}>
                  <Button type="submit" color="rose">Submit</Button>
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
        </Card >

      </React.Fragment >
    );
  }
};
const mapStateToProps = (state) => ({
  insertSuccess: state.AdminUnitReducers.insertSuccess,
  insertMessage: state.AdminUnitReducers.insertMessage,
  responseMessage: state.AdminUnitReducers.responseMessage,
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    AddUnit,
    resetSuccess: () => ({ type: "REST_RESPONSE_MESSAGE" }),
    resetSuccessFlag: () => ({ type: "RESET_SUCCESS_FLAG" }),
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddUnits))
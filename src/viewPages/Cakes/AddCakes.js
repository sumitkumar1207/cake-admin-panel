/* eslint-disable */
import React, { Component } from "react";
// Store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Snackbar from "components/Snackbar/Snackbar";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
/**
 * Validate inputData
 */
import { validateAddCakeInput } from 'validation/addCake';
/**
 * Api
*/
import { AddCake } from 'store/actions/AdminActions/cakeActions';
import { uploadImage } from 'store/actions/uploadMediaActions/uploadMediaActions';
import { getUnitList } from 'store/actions/AdminActions/unitActions';

import styles from "assets/jss/views/regularFormsStyle";
import { red } from "@material-ui/core/colors";

class AddCakes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clear_unit: true,
      tempSelected: {
        unit_id: null
      },
      uploadedUrls: [],
      selectedFiles: "",
      cake: {
        unit_id: null,
        cake_image: '',
        cake_name: null,
        cake_description: null,
        cake_price: null,
      },
      place: 'br',
      color: 'danger',
      message: '',
      status: false
    };

  };
  componentDidMount() {
    this.props.getUnitList()
  };
  componentDidUpdate(prevProps, prevState) { };
  // componentWillReceiveProps(nextProps) {};

  /**
   * Reset the form after submit the data.
   * Reset the input type file.
   * Get the uploaded urls from props.
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const { insertSuccess, uploadSuccess } = nextProps;
    // console.log('nextProps :>> ', nextProps);
    if (insertSuccess) {
      document.getElementById("cake_image").value = "";
      nextProps.resetSuccessFlag()
      setTimeout(() => {
        nextProps.resetSuccess()
      }, 2000);
      return {
        ...prevState,
        clear_unit: false,
        tempSelected: {
          unit_id: null
        },
        selectedFiles: "",
        uploadedUrls: [],
        cake: {
          unit_id: null,
          cake_image: "",
          cake_name: null,
          cake_description: null,
          cake_price: null,
        }
      };
    }

    if (uploadSuccess) {
      return {
        ...prevState,
        uploadedUrls: nextProps.uploadedUrls
      }
    }

    return null;
  }

  componentWillUnmount() {
    this.props.resetSuccessFlag()
    this.props.resetSuccess()
  }
  /**
   * Handle the change of the input type text.
   */
  handleChange = async (event, name) => {
    // let obj = this.state
    // const { target } = event;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    // const { name } = target;
    // await this.setState({ ...obj, [name]: value });
    let { cake } = this.state;
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    cake[name] = value;
    await this.setState({ ...this.state, cake });
  };

  /**
   * Onchange of the file
   */
  fileOnChange = async (event, name) => {
    const formData = new FormData();
    formData.append('image', event.target.files[0])

    let mediaPath = '/uploads/cakes/'
    formData.append('mediaPath', mediaPath)

    const config = { headers: { 'content-type': 'multipart/form-data' } }

    let payload = { formData, config, mediaPath }

    setTimeout(() => {
      this.props.uploadImage(payload)
    }, 1000);

    // await this.setState({ ...this.state, selectedFiles: event.target.files });
  }

  /**
   * Submit the final data
   */
  submitForm = async (event) => {
    event.preventDefault();
    this.state.cake_image = this.state.uploadedUrls.length > 0 ? this.state.uploadedUrls[0].path : ""
    this.state.cake.cake_image = this.state.uploadedUrls.length > 0 ? this.state.uploadedUrls[0].path : ""

    const { errors, isValid } = validateAddCakeInput(this.state.cake);
    // Check Validation 
    if (!isValid) {
      let { cake_name, cake_description, cake_price } = errors
      // console.log('errors :>> ', errors);
      let message = cake_name || cake_description || cake_price

      this.showCustomSnackbar(message)
    } else {
      /**
       * Do API Call
      */
      // console.log('this.state :>> ', this.state);
      this.props.AddCake(this.state.cake)
    }
  };

  capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

  async closeSnackbar() {
    await this.setState({ ...this.state, status: false })
  }

  /**
   * Audo hide snackbar
   */
  showCustomSnackbar = (message) => {
    this.setState({ ...this.state, status: true, message, })
    setTimeout(() => {
      this.setState({ ...this.state, status: false })
    }, 3000);
  }

  handleOnSelectComponet = async (event, value, name) => {
    let { cake, tempSelected } = this.state;
    cake[name] = value !== null ? cake[name] = value[name] : cake[name] = null;
    tempSelected[name] = value !== null ? tempSelected[name] = value : tempSelected[name] = null;
    await this.setState({ ...this.state, cake, tempSelected });
  };

  render() {
    const { classes, responseMessage, unitList } = this.props;
    const { clear_unit, tempSelected, cake } = this.state;

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
          place={this.state.place}
          color={this.state.color}
          message={this.state.message}
          open={this.state.status}
          closeNotification={() => this.closeSnackbar()}
          close
        />}
        <Card>
          <CardHeader color="rose">
            <h4 className={classes.cardTitle}>Add Cake</h4>
          </CardHeader>
          <CardBody>
            <form onSubmit={(e) => this.submitForm(e)}>
              <GridContainer spacing={3} >
                <GridItem sm={12} md={6} lg={6} style={{ 'marginBottom': '25px' }}>
                  <Autocomplete
                    key={clear_unit}
                    blurOnSelect={true}
                    options={unitList}
                    value={tempSelected.unit_id}
                    getOptionLabel={(option) => `${option.unit_value} ${option.unit_name}`}
                    onChange={(e, value) => this.handleOnSelectComponet(e, value, "unit_id")}
                    renderInput={(params) => <TextField style={{ width: '100%' }} {...params} label="Select Unit" variant="standard" />}
                  />
                </GridItem>

                <GridItem xs={12} sm={6} md={6} lg={6} style={{ marginBottom: '25px' }} >
                  <TextField
                    fullWidth
                    label="Cake Image"
                    id="cake_image"
                    accept="image/*"
                    className={classes.input}
                    required={true}
                    inputProps={{
                      onChange: (e) => { this.fileOnChange(e, "cake_image") },
                      type: "file",
                      name: "image",
                      autoComplete: "off",
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={6} md={6} lg={6} style={{ marginBottom: '25px' }} >
                  <TextField
                    fullWidth
                    label="Name"
                    id="CakeName"
                    required={true}
                    inputProps={{
                      onChange: (e) => { this.handleChange(e, "cake_name") },
                      type: "text",
                      name: "cake_name",
                      autoComplete: "off",
                      value: cake.cake_name || '',
                      placeholder: "Enter Name"
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={6} md={6} lg={6} style={{ marginBottom: '25px' }}>
                  <TextField
                    fullWidth
                    label="Description"
                    id="cakeDescription"
                    required={true}
                    inputProps={{
                      type: "text",
                      autoComplete: "off",
                      onChange: (e) => { this.handleChange(e, "cake_description") },
                      name: "cake_description",
                      value: cake.cake_description || '',
                      placeholder: 'Enter Description'
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={6} md={6} lg={6} style={{ marginBottom: '25px' }}>
                  <TextField
                    fullWidth
                    label="Price"
                    id="price"
                    required={true}
                    inputProps={{
                      type: "number",
                      min: 1,
                      autoComplete: "off",
                      step: "any",
                      onChange: (e) => { this.handleChange(e, "cake_price") },
                      name: "cake_price",
                      value: cake.cake_price || '',
                      placeholder: 'Enter Price'
                    }}
                  />
                </GridItem>

                <GridItem sm={12} md={12} lg={12} style={{ textAlign: 'center' }} >
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

const mapStateToProps = state => ({
  insertSuccess: state.AdminCakeReducers.insertSuccess,
  insertMessage: state.AdminCakeReducers.insertMessage,
  responseMessage: state.AdminCakeReducers.responseMessage,
  uploadedUrls: state.UploadMediaReducers.uploadedUrls,
  uploadSuccess: state.UploadMediaReducers.uploadSuccess,
  unitList: state.AdminUnitReducers.unitList
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    AddCake,
    uploadImage,
    getUnitList,
    resetSuccess: () => ({ type: "REST_RESPONSE_MESSAGE" }),
    resetSuccessFlag: () => ({ type: "RESET_SUCCESS_FLAG" }),
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddCakes))
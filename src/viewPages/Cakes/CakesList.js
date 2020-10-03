/* eslint-disable */
import React, { Component } from 'react'
import ReactTable from "react-table";
// Store
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";

import { cardTitle } from "assets/jss/material-dashboard-pro-react";
import { makeFilterPlaceholder, customFilterMethod } from "helpers/collection";
//Base Url
import { BASEURL } from "config/index";
/**
 * APIs call actions
 */
import { getCakeList, updateCake, deleteCake } from 'store/actions/AdminActions/cakeActions';
import { uploadImage } from 'store/actions/uploadMediaActions/uploadMediaActions';
import { TextField } from '@material-ui/core';

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class Cakes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEditDialog: false,
      selectedCake: {
        cake_id: null,
        cake_image: '',
        cake_name: null,
        cake_description: null,
        cake_price: null
      },
      uploadedUrls: [],
      existing_icon: "",
    };
  };

  componentDidMount() {
    this.props.getCakeList();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.uploadSuccess) {
      this.setState(prevState => ({
        ...prevState,
        uploadedUrls: nextProps.uploadedUrls
      }))
    }
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

  handleOnClickTableRow = async (e, rowItem) => {
    alert(
      "You've clicked EDIT button on Name: " +
      rowItem.cake_name
    );
  };

  handleOnEditTableRow = async (e, rowItem) => {
    await this.handleClickOpen();
    let { selectedCake } = this.state;
    this.existing_icon = rowItem.cake_image;

    // console.log('rowItem', rowItem)
    selectedCake.cake_id = rowItem.cake_id;
    selectedCake.cake_image = rowItem.cake_image;
    selectedCake.cake_name = rowItem.cake_name;
    selectedCake.cake_description = rowItem.cake_description;
    selectedCake.cake_price = rowItem.cake_price;
    await this.setState({ ...this.state, selectedCake });
  };

  handleOnDeleteTableRow = async (e, rowItem) => {
    this.props.deleteCake(rowItem)
  };
  handleClickOpen = async () => {
    await this.setState({ ...this.state, openEditDialog: true });
  };
  handleFinalSubmit = async (e) => {
    e.preventDefault();
    await this.handleClose();
    const { selectedCake, existing_icon, uploadedUrls } = this.state;
    selectedCake.cake_image = uploadedUrls.length > 0 ? uploadedUrls[0].path : existing_icon

    this.props.updateCake(selectedCake)
  };

  extractHostname(url) {
    return BASEURL + url
  }

  handleClose = async () => {
    await this.setState({ ...this.state, openEditDialog: false });
  };

  handleChange = async (event, name) => {
    // let obj = this.state.userDetails
    let { selectedCake } = this.state;
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    selectedCake[name] = value;
    await this.setState({ ...this.state, selectedCake });
  };

  render() {
    const { classes, cakeList } = this.props;
    const { openEditDialog, selectedCake: { cake_id, cake_image, cake_name, cake_description, cake_price } } = this.state;

    return (
      <React.Fragment>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="rose"  >
                <h4 className={classes.cardTitle}>Cakes</h4>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={cakeList}
                  filterable
                  columns={[
                    {
                      Header: "Image",
                      sortable: false,
                      filterable: false,
                      Cell: props => <Avatar alt={props.original.cake_url} src={(props.original.cake_url)} />
                    },
                    {
                      Header: "Cake Name",
                      accessor: "cake_name",
                      filterMethod: customFilterMethod,
                      Filter: (params) => makeFilterPlaceholder(params, "Cake")
                    },
                    {
                      Header: "Cake Description",
                      accessor: "cake_description",
                      filterMethod: customFilterMethod,
                      Filter: (params) => makeFilterPlaceholder(params, "Cake Description")
                    },
                    {
                      Header: "Cake Price",
                      accessor: "cake_price",
                      filterMethod: customFilterMethod,
                      Filter: (params) => makeFilterPlaceholder(params, "Cake Price")
                    },
                    {
                      Header: () => (
                        <div className="actions-right" style={{ paddingRight: '15px' }}> Actions  </div>
                      ),
                      sortable: false,
                      filterable: false,
                      Cell: props => {
                        return (
                          <div className="actions-right">
                            <Button
                              justIcon
                              round
                              simple
                              onClick={(e) => {
                                this.handleOnEditTableRow(e, props.original);
                              }}
                              color="rose"
                              className="edit"
                            >
                              <Edit />
                            </Button>
                            <Button
                              justIcon
                              round
                              simple
                              onClick={(e) => {
                                this.handleOnDeleteTableRow(e, props.original);
                              }}
                              color="danger"
                              className="edit"
                            >
                              <Close />
                            </Button>
                          </div>
                        )
                      }
                    }
                  ]}
                  defaultPageSize={10}
                  showPaginationTop={false}
                  showPaginationBottom={true}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <Dialog fullWidth={true} maxWidth={'md'} open={openEditDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update Cake</DialogTitle>
          <DialogContent>
            <form onSubmit={(e) => this.handleFinalSubmit(e)}>
              <GridContainer>
                <GridItem sm={12} md={12} lg={12} style={{ marginBottom: '15px' }}>
                  <p>Current Image</p>
                  <Avatar alt={cake_image} src={this.extractHostname(cake_image)} />
                </GridItem>

                <GridItem sm={12} md={6} lg={6} style={{ marginBottom: '25px' }}>
                  <TextField
                    fullWidth
                    label="Update Image"
                    id="cake_image"
                    accept="image/*"
                    className={classes.input}
                    inputProps={{
                      onChange: (e) => { this.fileOnChange(e, "cake_image") },
                      type: "file",
                      name: "image",
                      autoComplete: "off"
                    }}
                  />
                </GridItem>

                <GridItem sm={12} md={6} lg={6} style={{ marginBottom: '25px' }}>
                  <TextField
                    fullWidth
                    label="Cake Name"
                    id="cake_name"
                    required={true}
                    inputProps={{
                      onChange: (e) => { this.handleChange(e, "cake_name") },
                      autoComplete: "off",
                      value: cake_name || '',
                      type: "text",
                      name: "cake_name",
                      placeholder: "Enter Name"
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={6} lg={6} style={{ marginBottom: '25px' }}>
                  <TextField
                    fullWidth
                    label="Cake description"
                    id="cake_description"
                    inputProps={{
                      onChange: (e) => { this.handleChange(e, "cake_description") },
                      autoComplete: "off",
                      value: cake_description || '',
                      type: "text",
                      name: "cake_description",
                      placeholder: 'Enter Description'
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={6} lg={6} style={{ marginBottom: '25px' }}>
                  <TextField
                    fullWidth
                    label="Cake Price"
                    id="cake_price"
                    required={true}
                    inputProps={{
                      type: "number",
                      min: 1,
                      step: "any",
                      onChange: (e) => { this.handleChange(e, "cake_price") },
                      autoComplete: "off",
                      name: "cake_price",
                      value: cake_price || '',
                      placeholder: 'Enter Price'
                    }}
                  />
                </GridItem>
              </GridContainer>
              <DialogActions>
                <Button onClick={this.handleClose} color="transparent">Cancel</Button>
                <Button type="submit" color="rose">Update</Button>
              </DialogActions>
            </form>

          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  };
};
const mapStateToProps = state => ({
  cakeList: state.AdminCakeReducers.cakeList,
  uploadedUrls: state.UploadMediaReducers.uploadedUrls,
  uploadSuccess: state.UploadMediaReducers.uploadSuccess,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCakeList,
      updateCake,
      deleteCake,
      uploadImage,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cakes));

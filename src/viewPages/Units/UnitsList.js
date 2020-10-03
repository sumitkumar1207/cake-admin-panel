/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
// Store
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux';
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
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
/**
 * APIs
*/
import { updateUnit, deleteUnit, getUnitList } from 'store/actions/AdminActions/unitActions';

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class UnitsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEditDialog: false,
      selectedUnit: {
        unit_id: null,
        unit_name: null,
        unit_value: null,
      }
    };
  }
  componentDidMount() {
    this.props.getUnitList();
  };
  componentWillReceiveProps(nextProps) { };

  handleOnClickTableRow = async (e, rowItem) => {
    alert(
      "You've clicked EDIT button on Name: " +
      rowItem.unit_name
    );
  };

  handleOnEditTableRow = async (e, rowItem) => {
    await this.handleClickOpen();
    let { selectedUnit } = this.state;
    selectedUnit.unit_id = rowItem.unit_id;
    selectedUnit.unit_name = rowItem.unit_name;
    selectedUnit.unit_value = rowItem.unit_value;
    await this.setState({ ...this.state, selectedUnit });
  };

  handleOnDeleteTableRow = async (e, rowItem) => {
    this.props.deleteUnit(rowItem)
  };

  handleClickOpen = async () => {
    await this.setState({ ...this.state, openEditDialog: true });
  };

  handleClose = async () => {
    await this.setState({ ...this.state, openEditDialog: false });
  };


  handleChange = async (event, name) => {
    // let obj = this.state.userDetails
    let { selectedUnit } = this.state;
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    selectedUnit[name] = value;
    await this.setState({ ...this.state, selectedUnit });
  };

  handleFinalSubmit = async (e) => {
    e.preventDefault();
    await this.handleClose()
    let { selectedUnit } = this.state;
    this.props.updateUnit(selectedUnit);
  };


  render() {
    const { classes, unitList } = this.props;
    const { openEditDialog, selectedUnit: { unit_name, unit_value } } = this.state;

    return (
      <React.Fragment>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="rose"  >
                <h4 className={classes.cardTitle}>Units</h4>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={unitList}
                  filterable
                  columns={[
                    {
                      Header: "Unit Name",
                      accessor: "unit_name",
                      filterMethod: customFilterMethod,
                      Filter: (params) => makeFilterPlaceholder(params, "unit Name")
                    },
                    {
                      Header: "Unit Value",
                      accessor: "unit_value",
                      filterMethod: customFilterMethod,
                      Filter: (params) => makeFilterPlaceholder(params, "unit value")
                    },
                    {
                      Header: "Unit Created Date",
                      accessor: "createdAt",
                      filterMethod: customFilterMethod,
                      Filter: (params) => makeFilterPlaceholder(params, "unit date")
                    },
                    {
                      Header: "Unit Created Time",
                      accessor: "createdTime",
                      filterMethod: customFilterMethod,
                      Filter: (params) => makeFilterPlaceholder(params, "unit time")
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
                  defaultPageSize={25}
                  showPaginationTop={false}
                  showPaginationBottom={true}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>


        <Dialog
          maxWidth={'md'}
          fullWidth={true}
          open={openEditDialog}
          onClose={this.handleClose}>

          <DialogTitle id="form-dialog-title">Update Unit</DialogTitle>
          <form onSubmit={(e) => this.handleFinalSubmit(e)}>
            <DialogContent>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6} lg={6} style={{ 'marginBottom': '25px' }}>
                  <TextField
                    fullWidth
                    label="Unit Name"
                    id="unit_name"
                    required={true}
                    inputProps={{
                      onChange: (e) => { this.handleChange(e, "unit_name") },
                      autoComplete: "off",
                      value: unit_name || '',
                      placeholder: "Enter Unit Name Ex. Gram, KG"
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={6} lg={6} style={{ 'marginBottom': '25px' }}>
                  <TextField
                    fullWidth
                    id="unit_value"
                    label="Unit Value"
                    required={true}
                    inputProps={{
                      onChange: (e) => { this.handleChange(e, "unit_value") },
                      autoComplete: "off",
                      value: unit_value || '',
                      placeholder: "Enter Unit Value Ex. 500,100"
                    }}
                  />
                </GridItem>
              </GridContainer>
            </DialogContent>

            <DialogActions style={{ 'padding': '10px 25px' }}>
              <Button onClick={this.handleClose} color="transparent">Cancel  </Button>
              <Button type="submit" color="rose">Update</Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  unitList: state.AdminUnitReducers.unitList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUnitList,
      deleteUnit,
      updateUnit,
      goToLogin: () => push('/admin/login')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UnitsList))
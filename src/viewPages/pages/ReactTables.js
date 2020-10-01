import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import PropTypes from 'prop-types';

// Store
import { connect } from 'react-redux';
import { getUsers } from 'store/actions/AdminActions/userActions';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux';

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardIcon from "components/Card/CardIcon";
import CardHeader from "components/Card/CardHeader";

import { dataTable } from "variables/general";

import { cardTitle } from "assets/jss/material-dashboard-pro-react";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class ReactTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // usersList: [],
      item: [],

      data: dataTable.dataRows.map((prop, key) => {
        return {
          id: key,
          name: prop[0],
          position: prop[1],
          office: prop[2],
          age: prop[3],
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a like kind of action */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  let obj = this.state.data.find(o => o.id === key);
                  alert(
                    "You've clicked LIKE button on \n{ \nName: " +
                    obj.name +
                    ", \nposition: " +
                    obj.position +
                    ", \noffice: " +
                    obj.office +
                    ", \nage: " +
                    obj.age +
                    "\n}."
                  );
                }}
                color="info"
                className="like"
              >
                <Favorite />
              </Button>{" "}
              {/* use this button to add a edit kind of action */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  let obj = this.state.data.find(o => o.id === key);
                  alert(
                    "You've clicked EDIT button on \n{ \nName: " +
                    obj.name +
                    ", \nposition: " +
                    obj.position +
                    ", \noffice: " +
                    obj.office +
                    ", \nage: " +
                    obj.age +
                    "\n}."
                  );
                }}
                color="warning"
                className="edit"
              >
                <Dvr />
              </Button>{" "}
              {/* use this button to remove the data row */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  var data = this.state.data;
                  data.find((o, i) => {
                    if (o.id === key) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
                      data.splice(i, 1);
                      return true;
                    }
                    return false;
                  });
                  this.setState({ data: data });
                }}
                color="danger"
                className="remove"
              >
                <Close />
              </Button>{" "}
            </div>
          )
        };
      })
    };
  }
  componentDidMount() {
    this.props.getUsers();
  };
  componentWillReceiveProps(nextProps) {
    // this.setState({ usersList: nextProps.usersList });
  }
  sendtologin() {
    // this.props.goToLogin()
    this.props.history.push('/admin/dashboard');
    // 

  }
  render() {
    const { classes } = this.props;
    // const { userList } = this.props;
    const { item } = this.state;
    // console.log('this.props :', this.props);
    // console.log('usersList :', userList);
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Button
            justIcon
            round
            simple
            onClick={() => {
              this.props.goToLogin()
            }}
            color="danger"
            className="remove"
          >GO TO LOGIN</Button>

          <Button
            justIcon
            round
            simple
            onClick={() => {
              this.sendtologin();
            }}
            color="danger"
            className="remove"
          >GO TO LOGIN:1111111</Button>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>React Table</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={[]}
                filterable
                columns={[
                  {
                    Header: "Name",
                    accessor: "email"
                  },
                  {
                    Header: "password",
                    accessor: "pass"
                  },
                  {
                    Header: "Actions",
                    sortable: false,
                    filterable: false,
                    Cell: props => {
                      return (
                        <Button
                          justIcon
                          round
                          simple
                          onClick={() => {
                            let obj = props.original;
                            alert(
                              "You've clicked EDIT button on Name: " +
                              obj.email
                            );
                          }}
                          color="warning"
                          className="edit"
                        >
                          <Dvr />
                        </Button>
                      )
                    }
                  }
                ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

ReactTables.propTypes = {
  getUsers: PropTypes.func.isRequired,
  userList: PropTypes.array.isRequired,
  // changePage: propTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userList: state.AdminUserReducers.userList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUsers,
      goToLogin: () => push('/admin/login')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReactTables))
/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
// Store
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux';
import moment from "moment";
// @material-ui/core
import { withStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import Avatar from '@material-ui/core/Avatar';

import { cardTitle } from "assets/jss/material-dashboard-pro-react";
import { BASEURL } from "config/index";
import { makeFilterPlaceholder, customFilterMethod } from "helpers/collection";
/**
 * APIs Actions
 */
import { GetDashboardUsersList } from 'store/actions/AdminActions/userActions';
const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class DashboardUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.props.GetDashboardUsersList();
  };
  componentWillReceiveProps(nextProps) {
  }
  handleOnClickTableRow = async (e, rowItem) => {
    alert(
      "You've clicked EDIT button on Name: " +
      rowItem.user_id
    );
  }
  extractHostname(url) {
    return BASEURL + url
  }


  render() {
    const { classes } = this.props;
    const { userDashoardList } = this.props;

    return (
      <React.Fragment>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="rose">
                <h4 className={classes.cardTitle}>Dashboard Users</h4>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={userDashoardList}
                  filterable
                  columns={[
                    {
                      Header: "Profile",
                      sortable: false,
                      filterable: false,
                      Cell: props => <Avatar alt={props.original.user_name} src={this.extractHostname(props.original.user_pic)} />
                    },
                    {
                      Header: "User Name",
                      accessor: "user_name",
                      filterMethod: customFilterMethod,
                      Filter: (params) => makeFilterPlaceholder(params, "User name")
                    },
                    {
                      Header: "User Email",
                      accessor: "user_email",
                      filterMethod: customFilterMethod,
                      Filter: (params) => makeFilterPlaceholder(params, "Email")
                    },
                    {
                      Header: "User Mobile",
                      accessor: "user_mobile",
                      filterMethod: customFilterMethod,
                      Filter: (params) => makeFilterPlaceholder(params, "Mobile")
                    },
                    {
                      Header: "Created Date",
                      accessor: "created_date",
                      filterMethod: customFilterMethod,
                      sortable: false,
                      filterable: false,
                      // Cell: props => moment(props.original.created_date).format('DD-MM-YYYY') ? moment(props.original.created_date).format('DD-MM-YYYY') : moment(props.original.created_date, "DD-MM-YYYY", false).format('DD-MM-YYYY')
                      Cell: props => moment(props.original.created_date).format('DD-MM-YYYY')
                    },
                    {
                      Header: "Edited",
                      accessor: "modified_date",
                      filterMethod: customFilterMethod,
                      sortable: false,
                      filterable: false,
                      Cell: props => moment(props.original.modified_date).format('DD-MM-YYYY')
                    },
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

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userDashoardList: state.AdminUserReducers.userDashoardList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      GetDashboardUsersList,
      goToLogin: () => push('/admin/login')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashboardUserList))
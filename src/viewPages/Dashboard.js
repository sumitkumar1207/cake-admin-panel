/* eslint-disable */
import React, { Component } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import { Bar, Polar } from 'react-chartjs-2';

// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// Store
// import { getGraphAppUsers, getGraphHospitalCases, getGraphActiveCases } from 'store/actions/AdminActions/graphActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router'
import PropTypes from "prop-types";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";

// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Table from "components/Table/Table";
import Button from "components/CustomButtons/Button";
import Danger from "components/Typography/Danger";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { dailySalesChart, emailsSubscriptionChart, completedTasksChart } from "variables/charts";
import styles from "assets/jss/views/dashboardStyle";

import priceImage1 from "assets/img/card-2.jpeg";
import priceImage2 from "assets/img/card-3.jpeg";
import priceImage3 from "assets/img/card-1.jpeg";

const us_flag = require("assets/img/flags/US.png");
const de_flag = require("assets/img/flags/DE.png");
const au_flag = require("assets/img/flags/AU.png");
const gb_flag = require("assets/img/flags/GB.png");
const ro_flag = require("assets/img/flags/RO.png");
const br_flag = require("assets/img/flags/BR.png");

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };

  componentDidMount() { };

  componentDidUpdate(prevProps, prevState) { };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <GridContainer>
          <GridItem xs={12}>
            <Card chart className={classes.cardHover}>
              <CardBody>
                <h4 className={classes.cardTitle}>Welcome to dashboard!</h4>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => ({
  // userInfo: state.AppReducers.userInfo,
  // AppUsers: state.AdminGraphReducers.AppUsers,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    // getGraphAppUsers,
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))
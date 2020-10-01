/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
// Store
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux';
import history from 'store/history';
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { cardTitle } from "assets/jss/material-dashboard-pro-react";
//icons
import Dvr from "@material-ui/icons/Dvr";
//App Base url
import { BASEURL } from "config/index";
import { makeFilterPlaceholder, customFilterMethod } from "helpers/collection";
/**
 * APIs call actions
 */
import { getUsers, setUserObject } from 'store/actions/AdminActions/userActions';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openShowDialog: false,
      uploaded_files: [],
      uploadedUrlsWithObj: []
    };
  }
  componentDidMount() {
    this.props.getUsers();
  };
  componentWillReceiveProps(nextProps) {
  }

  handleOnViewMedicalProfile = async (e, rowItem) => {
    history.push(`/admin/medical-profiles/${rowItem.user_id}`)
    this.props.setUserObject(rowItem); // Not working(Not in use).
  }
  handleOnViewTableRow = async (e, rowItem) => {
    if (rowItem && rowItem.uploaded_files && rowItem.uploaded_files.length > 0) {
      let _uploaded_files = []
      rowItem.uploaded_files.map(x => {
        if (x !== '' && x !== ',') {
          if (x.match(/\/videos\//g)) {
            _uploaded_files.push({ type: "video", url: `${BASEURL}${x}` })
          } else {
            _uploaded_files.push({ type: "image", url: `${BASEURL}${x}` })
          }
        }
      })
      this.setState({ ...this.state, openShowDialog: true, uploaded_files: _uploaded_files, uploadedUrlsWithObj: rowItem.uploadedUrlsWithObj })
    } else {
      this.setState({ ...this.state, uploaded_files: rowItem.uploaded_files, openShowDialog: true, uploadedUrlsWithObj: rowItem.uploadedUrlsWithObj })
    }
  }
  extractHostname(url) {
    return BASEURL + url
  }

  handleClose = async () => {
    await this.setState({ ...this.state, openShowDialog: false });
  };


  render() {
    const { classes } = this.props;
    const { userList } = this.props;
    const { openShowDialog, uploaded_files, uploadedUrlsWithObj } = this.state;

    return (
      <React.Fragment>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="rose">
                <h4 className={classes.cardTitle}>App Users</h4>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={userList}
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
                                this.handleOnViewMedicalProfile(e, props.original);
                              }}
                              color="rose"
                              className="edit"
                            >
                              <Dvr />
                            </Button>
                          </div>
                        )
                      }
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
        {/* show uplopaded media Start */}
        <Dialog fullWidth={true} maxWidth={'md'} open={openShowDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title"> User uplopaded Report</DialogTitle>
          {
            uploadedUrlsWithObj && uploadedUrlsWithObj.length > 0 ?
              <div className={styles.root} style={{ margin: '2px', padding: '2px' }} >
                <GridList cellHeight={160} className={styles.gridList} cols={3}>
                  {uploadedUrlsWithObj.map((tile, i) => (
                    <div key={i}>
                      <a href={`${BASEURL}${tile.uploaded_url}`} target="_blank" rel="noopener noreferrer">{`${BASEURL}${tile.uploaded_url}`}</a>
                      <p>{tile.body_part_name}</p>
                    </div>
                  ))}
                </GridList>
              </div>
              :
              <p style={{ textAlign: 'center', fontSize: '25px', fontWeight: 400 }}>
                No Report found
              </p>
          }
          <DialogContent>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="rose">OK</Button>
          </DialogActions>
        </Dialog>
        {/* show uplopaded media END */}
      </React.Fragment>
    );
  }
}

UserList.propTypes = {
};

const mapStateToProps = state => ({
  userList: state.AdminUserReducers.userList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserObject,
      getUsers,
      goToLogin: () => push('/admin/login')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserList))
/* eslint-disable */

import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import routes from "routes";
import store from "store/store";
import history from 'store/history';
// Store
import { logOut } from 'store/actions/appActions';


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


// "@material-ui/core": "4.3.2",
// "@material-ui/icons": "4.2.1",
// "@material-ui/lab": "^4.0.0-alpha.47",

// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";

// core components
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";

import styles from "assets/jss/components/adminNavbarLinksStyle";

const useStyles = makeStyles(styles);


const top100Films = routes
// [
//   { title: 'The Shawshank Redemption', year: 1994 },
//   { title: 'The Godfather', year: 1972 },
//   { title: 'The Godfather: Part II', year: 1974 },
//   { title: 'The Dark Knight', year: 2008 },
//   { title: '12 Angry Men', year: 1957 },
//   { title: "Schindler's List", year: 1993 },
//   { title: 'Pulp Fiction', year: 1994 },
//   { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
//   { title: 'The Good, the Bad and the Ugly', year: 1966 },
//   { title: 'Fight Club', year: 1999 },
//   { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
//   { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
//   { title: 'Forrest Gump', year: 1994 },
// ]
import { push } from 'connected-react-router'

function HeaderLinks(props) {
  const options = top100Films.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
  const [openNotification, setOpenNotification] = React.useState(null);
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
    store.dispatch(logOut())
  };
  const classes = useStyles();
  const { rtlActive } = props;
  const searchButton =
    classes.top +
    " " +
    classes.searchButton +
    " " +
    classNames({
      [classes.searchRTL]: rtlActive
    });
  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover, {
    [classes.dropdownItemRTL]: rtlActive
  });
  const wrapper = classNames({
    [classes.wrapperRTL]: rtlActive
  });
  const managerClasses = classNames({
    [classes.managerClasses]: true
  });
  const handleOnSelectComponet = async (event, value) => {
    if (value && value.length > 0) {
      let path = routes.filter(({ name }) => name === value)
      path && path.length > 0 ? history.push('/admin' + path[0].path) : undefined;
    }
  };
  return (
    <div className={wrapper} style={{ display: 'flex' }}>
      {/* <Autocomplete
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.name}
        onInputChange={handleOnSelectComponet}
        style={{ width: 300 }}
        size="medium"
        blurOnSelect={true}
        renderInput={(params) => <TextField style={{ width: '100%' }} {...params} label="Search..." variant="standard" />}
      /> */}
      {/* <CustomInput
        rtlActive={rtlActive}
        formControlProps={{
          className: classes.top + " " + classes.search
        }}
        inputProps={{
          placeholder: rtlActive ? "بحث" : "Search",
          inputProps: {
            "aria-label": rtlActive ? "بحث" : "Search",
            className: classes.searchInput
          }
        }}
      />
      <Button
        color="white"
        aria-label="edit"
        justIcon
        round
        className={searchButton}
      >
        <Search className={classes.headerLinksSvg + " " + classes.searchIcon} />
      </Button>
      <Button
        color="transparent"
        simple
        aria-label="Dashboard"
        justIcon
        className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
        muiClasses={{
          label: rtlActive ? classes.labelRTL : ""
        }}
      >

        <Dashboard
          className={
            classes.headerLinksSvg +
            " " +
            (rtlActive ? classes.links + " " + classes.linksRTL : classes.links)
          }
        />
        <Hidden mdUp implementation="css">
          <span className={classes.linkText}>
            {rtlActive ? "لوحة القيادة" : "Dashboard"}
          </span>
        </Hidden>
      </Button> */}
      {/* <div className={managerClasses}>
        <Button
          color="transparent"
          justIcon
          aria-label="Notifications"
          aria-owns={openNotification ? "notification-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
        >
          <Notifications
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          <span className={classes.notifications}>5</span>
          <Hidden mdUp implementation="css">
            <span
              onClick={handleClickNotification}
              className={classes.linkText}
            >
              {rtlActive ? "إعلام" : "Notification"}
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openNotification,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={dropdownItem}
                    >
                      {rtlActive
                        ? "إجلاء أوزار الأسيوي حين بل, كما"
                        : "Mike John responded to your email"}
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={dropdownItem}
                    >
                      {rtlActive
                        ? "شعار إعلان الأرضية قد ذلك"
                        : "You have 5 new tasks"}
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={dropdownItem}
                    >
                      {rtlActive
                        ? "ثمّة الخاصّة و على. مع جيما"
                        : "You're now friend with Andrew"}
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={dropdownItem}
                    >
                      {rtlActive ? "قد علاقة" : "Another Notification"}
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={dropdownItem}
                    >
                      {rtlActive ? "قد فاتّبع" : "Another One"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div> */}

      <div className={managerClasses}>
        {/* <Button
          color="transparent"
          aria-label="Person"
          justIcon
          aria-owns={openProfile ? "profile-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
        >
          <Person
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          <Hidden mdUp implementation="css">
            <span onClick={handleClickProfile} className={classes.linkText}>
              {rtlActive ? "الملف الشخصي" : "Profile"}
            </span>
          </Hidden>
        </Button> */}
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openProfile,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    {/* <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      {rtlActive ? "الملف الشخصي" : "Profile"}
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      {rtlActive ? "الإعدادات" : "Settings"}
                    </MenuItem>
                    <Divider light /> */}
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      {rtlActive ? "الخروج" : "Log out"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

HeaderLinks.propTypes = {
  rtlActive: PropTypes.bool
};
export default HeaderLinks
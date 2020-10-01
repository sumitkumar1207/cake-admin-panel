/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import styles from "assets/jss/components/footerStyle";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { fluid, white, rtlActive } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white
    });
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white
  });
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="/" className={block}>
                {"Home"}
              </a>
            </ListItem>
            {/* <ListItem className={classes.inlineBlock}>
              <a href="#company" className={block}>
                {rtlActive ? "شركة" : "Company"}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#portfolio" className={block}>
                {rtlActive ? "بعدسة" : "Portfolio"}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#blog" className={block}>
                {rtlActive ? "مدونة" : "Blog"}
              </a>
            </ListItem> */}
          </List>
        </div>
        <p className={classes.right}>
          Copyright &copy; {1900 + new Date().getYear()}{" "}
          <a
            className={anchor}
          >
            {"Cake Shop Admin Panel"}
          </a>
          {/* {rtlActive
            ? ", مصنوعة مع الحب لشبكة الإنترنت أفضل"
            : ", made with love for a better web"} */}
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};

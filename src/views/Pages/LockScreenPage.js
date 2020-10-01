import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Button from "components/CustomButtons/Button";
import CustomInput from "components/CustomInput/CustomInput";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardAvatar from "components/Card/CardAvatar";
import CardFooter from "components/Card/CardFooter";

import avatar from "assets/img/faces/avatar.jpg";

import styles from "assets/jss/views/lockScreenPageStyle";

const useStyles = makeStyles(styles);

export default function LockScreenPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <form>
        <Card
          profile
          className={classes.customCardClass + " " + classes[cardAnimaton]}
        >
          <CardAvatar profile className={classes.cardAvatar}>
            <a href="#pablo" onClick={e => e.preventDefault()}>
              <img src={avatar} alt="..." />
            </a>
          </CardAvatar>
          <CardBody profile>
            <h4 className={classes.cardTitle}>Tania Andrew</h4>
            <CustomInput
              labelText="Enter Password"
              id="company-disabled"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "password",
                autoComplete: "off"
              }}
            />
          </CardBody>
          <CardFooter className={classes.justifyContentCenter}>
            <Button color="rose" round>
              Unlock
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

import React from "react";

// core components
import Wizard from "components/Wizard/Wizard";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import Step1 from "./WizardSteps/Step1";
import Step2 from "./WizardSteps/Step2";
import Step3 from "./WizardSteps/Step3";

export default function WizardView() {
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        <Wizard
          validate
          steps={[
            { stepName: "About", stepComponent: Step1, stepId: "about" },
            { stepName: "Account", stepComponent: Step2, stepId: "account" },
            { stepName: "Address", stepComponent: Step3, stepId: "address" }
          ]}
          title="Build Your Profile"
          subtitle="This information will let us know more about you."
          finishButtonClick={e => alert(e)}
        />
      </GridItem>
    </GridContainer>
  );
}

import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import PersonIcon from "@material-ui/icons/Person";
import ListAltIcon from "@material-ui/icons/ListAlt";
import StepConnector from "@material-ui/core/StepConnector";
// import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { Button, Card, Col } from "reactstrap";

import FormCadastro from "../cadastrar/cadastrar.component";

import "./steps.styles.scss";
import { Redirect } from "react-router-dom";

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
          <div className={classes.circle} />
        )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  },
  completed: {
    backgroundImage: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PersonIcon />,
    2: <PersonIcon />,
    3: <ListAltIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Dados do Cliente", "Dados do Prestador", "Dados do Serviço"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <FormCadastro active={0} />;
    case 1:
      return <FormCadastro active={1} />;
    case 2:
      return <FormCadastro active={2} />;
    default:
      return "Unknown step";
  }
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [redirect, setRedirect] = React.useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };



  if (redirect) {
    return <Redirect to="/admin/servicos/dashboard" />
  } else {

    return (
      <div className="content row-cadastrar row justify-content-center">
        <Col md="12">
          <Card>
            <div className={classes.root}>
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      <FormCadastro active={3} />
                    </Typography>

                    <Button
                      onClick={() => {

                        localStorage.removeItem("idOcioso");
                        localStorage.removeItem("ocioso");
                        setRedirect(true)
                      }}
                      className={classes.button}
                      color="warning"
                    >
                      Cancelar
                  </Button>

                    <Button
                      onClick={handleReset}
                      className={classes.button}
                      color="warning"
                    >
                      Inicio
                  </Button>




                  </div>
                ) : (
                    <div>
                      <Typography className={classes.instructions}>
                        {getStepContent(activeStep)}
                      </Typography>
                      <div>
                        <Button
                          onClick={() => {

                            localStorage.removeItem("idOcioso");
                            localStorage.removeItem("ocioso");
                            setRedirect(true)
                          }}
                          className={classes.button}
                          color="warning"
                        >
                          Cancelar
                  </Button>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                          color="warning"
                        >
                          Voltar
                    </Button>
                        <Button
                          variant="contained"
                          color="info"
                          onClick={handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1
                            ? "Finalizar"
                            : "Proximo"}
                        </Button>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </Card>
        </Col>
      </div>
    );
  }
}

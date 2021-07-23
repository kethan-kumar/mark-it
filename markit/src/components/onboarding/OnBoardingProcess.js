import React, { Component, useState } from 'react'
import { makeStyles,withStyles } from "@material-ui/core/styles"
import { Stepper, Step,  StepLabel } from "@material-ui/core"
import SIN from './SIN';
import Bank from './Bank';
import Payroll from './Payroll';
import EmployeeInformation from './EmployeeInformation'
import Acknowledgement from './Acknowledgement';
import './style-css/StepStyles.css';


const OnBoadingProcess = () => {


  const setStyles = makeStyles({
    onboard: {
      width: "50%",
      margin: "6rem auto",
      border: "1px solid #999",
      "& .MuiStepIcon-root.MuiStepIcon-completed": {
        color: "rgb(255,200,0)"
      },
      "& .MuiStepIcon-root.MuiStepIcon-active": {
        color: "#999"
      }
    }
  })

  const [currentStep, setCurrentStep] = useState(0);

  const nextFunction = () => {
    setCurrentStep(prevCurrentStep => prevCurrentStep + 1)
  }

  const backFunction = () => {
    setCurrentStep(prevCurrentStep => prevCurrentStep - 1)
  };

  const steps = ["Employee Information", "Social Insurance Number", "Banking Information", "Payroll Setup", "Acknowledgment"];
 

  const [mainValues,setMainValues] = useState({
          firstname: '',
          lastname:'',
          email:'',    
          phone:'',
          address:'',
          country: 'Canada', 
          province: '',

          sinNumber:'',

          
  })

  


  function getSteps(index) {
    switch (index) {
      case 0:
        return <EmployeeInformation
          nextFunction={nextFunction}
          backFunction={backFunction}
          currentStep={currentStep}
          steps={steps}
          mainValues={mainValues}
        />
      case 1:
        return <SIN
          nextFunction={nextFunction}
          backFunction={backFunction}
          currentStep={currentStep}
          steps={steps}
          mainValues={mainValues}
           />
      case 2:
        return <Bank
          nextFunction={nextFunction}
          backFunction={backFunction}
          currentStep={currentStep}
          steps={steps} 
          mainValues={mainValues}
          />
      case 3:
        return <Payroll
          nextFunction={nextFunction}
          backFunction={backFunction}
          currentStep={currentStep}
          steps={steps} 
          mainValues={mainValues}
          />
      case 4:
        return <Acknowledgement
          nextFunction={nextFunction}
          backFunction={backFunction}
          currentStep={currentStep}
          mainValues={mainValues}
          steps={steps} />
      default:
        return "Invalid"
    }


  }

  

  const classes = setStyles();
  return (
    <section style= {{"display":"flex","justifyContent": "center", "width":"100%", "backgroundColor": "darkslategray"}}>
    <div className={classes.onboard} style = {{"backgroundColor":"white"}}>

      <h2 class="stepheader" >
          <br />
           ONBOARDING PROCESS
           <br /> <br />
      </h2><br />
      
      <Stepper alternativeLabel activeStep={currentStep} >
        {steps.map((label,index) => (
          <Step key={label}   > 
            <StepLabel >
              {label}
              
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {currentStep === steps.length ?
       <div class="container">
          <br /><br />
          <div class="alert alert-success" role="alert" style={{ width: '100%' }}>
            <h4 class="alert-heading">Onboarding completed!!!</h4>
            <p>All the information provided will be validated by the FCS coordinator and the payroll details will be verified by the payroll department. If all the details provided are valid, the employement portal will be updated in two weeks.</p>

            <p class="mb-0">Incase of any queries, please send an email to markit@dal.ca</p>

          </div>
        </div>
        : (
          <>
            {getSteps(currentStep)}

          </>
        )}
    </div></section>
  );
}

export default OnBoadingProcess;
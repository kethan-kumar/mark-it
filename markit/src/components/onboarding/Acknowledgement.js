import React from 'react';
import { Typography, TextField, Button } from "@material-ui/core"
import './style-css/StepStyles.css';


export default class Acknowledgement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            acknowledged: false
        };
    }

    fnValidateCheck = (event) => {
        let value = event.target.checked;
        this.setState({ acknowledged: value });
    }


    render() {

        return (

            <div class="stepDiv">
                <br /><br />
                <b>
                    <Typography className="stepTypos" variant="h5">
                        Acknowledgement
                    </Typography>
                </b>
                <br />
                <form className="stepForm">
                <p><input type="checkbox" onClick={this.fnValidateCheck}></input> &nbsp;
                        I hereby declare, that all of the information I have provided is complete and true to the best of my knowledge * 
                </p>

                <br /><br /><br/>

                
                <div class="row">
                <div class="col-6 stepButtonClass" >

                    <input type="button"  class="btn "                       
                        style={{"width": '80%',"background-color":"black" ,"color":"white"  }}                                                                        
                        onClick={this.props.backFunction} 
                        value={"Go Back "} 
                     />

                </div>
                <div class="col-6 stepButtonClass"> 

                <input type="button"

                    class={this.props.currentStep === this.props.steps.length - 1 ? "btn btn-success" : "btn btn-primary"}
                    style={{ width: '80%' }}
                    disabled={(!this.state.acknowledged)}
                    onClick={this.props.nextFunction} value={this.props.currentStep === this.props.steps.length - 1 ? "Submit" : "Go to Next Step "}
                />

                <br/><br/>

                </div></div>
            
            </form>
            </div>
        );
    }

}


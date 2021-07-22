import {React, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from 'react-bootstrap/Button';

import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
    root: {
      width: '30%',
      backgroundColor: '#e7ecf3',
      
    },
   
    buttonStyle:{
        borderRadius: 3,
        border: 0,
        height: 40,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
    },
    cardSpacing:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
  
  });

const JobApplication = () => {
    const classes = useStyles();
    const [jobsApplied, setJobsApplied] = useState([{courseName:'Advanced Web Services', position:'Teaching Assistant', applicationId:1024, status:'Under Review'},
    {courseName:'Advanced Software Development', position:'Marker', applicationId:1025, status:'Interview Scheduled'}]);
    const [visibility,setVisibility]=useState({});
    const handleClick = (event) => {console.log(event.target.dataset.index)
    setVisibility({...visibility,[event.target.dataset.index]:true})
    };

    return (
        <section>
            {jobsApplied.length>0 &&
            <div className= {classes.cardSpacing}>
                 {jobsApplied.map((job,index)=>
                  <Card className={classes.root} key={index}>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h6">
                            Application: {job.applicationId}
                        </Typography>
                        <Typography  variant="body" component="p">
                            <Box fontWeight="fontWeightMedium" m={1}>
                                Course:
                                <Box fontWeight="fontWeightLight" >
                                {job.courseName}
                                </Box>
                             </Box>
                             <Box fontWeight="fontWeightMedium" m={1}>
                             Position:
                                <Box fontWeight="fontWeightLight" >
                                {job.position}
                                </Box>
                             </Box>
                             {visibility[index] &&
                                <Box fontWeight="fontWeightMedium" m={1}>
                                Status: 
                                    <Box>
                                        <Button  variant={getStatusColor(job.status)}>{job.status}</Button> 
                                    </Box>
                                </Box>
                            }
                        </Typography>
                        
                    </CardContent>
                
                <CardActions style={{justifyContent: 'center'}}>
                    
                    <Button    className={classes.buttonStyle} variant="dark" onClick={handleClick} data-index={index}>
                        Track Status
                    </Button>
                    
                </CardActions>
                </Card>
             )} 
            </div>}
            
                 {jobsApplied.length===0 &&
                    <Box fontWeight="fontWeightMedium" m={1}>
                     No Jobs Applied
                    </Box>
                }
                       
        </section>
    )

    function getStatusColor(status){  
        if(status === 'Under Review'){
            return "warning";
        }
        else if(status === 'Interview Scheduled'){
            return "primary"
        }
        else if(status === 'Accepted'){
            return "success"
        }
        else if(status === 'Rejected'){
            return "danger"
        }
        else return "dark"
       
    }
   
}

export default JobApplication

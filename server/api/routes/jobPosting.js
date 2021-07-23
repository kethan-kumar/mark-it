const express = require('express');
const router = express.Router();
const JobPostingModel = require('../models/jobPostingSchema');

router.post('/addJob', (req, res) => {
    try{
        const jobPosting = new JobPostingModel({
        
            course: req.body.course,
            position:req.body.position,
            hourlyRate: req.body.hourlyRate,
            duties:req.body.duties
                
            });
            jobPosting.save()
                .then((results) => {
                    res.status(200).json({
                        message: 'Invitation sucessful',
                        result: results
                    });
                }).catch((err) => {
                    res.status(500).json({
                        message: 'Internal Server Error',
                        result: results
                    });
          
                    })
    }
    catch(error){
        return res.status(500).json(
          {
            success: false,
            message:"Internal Server Error occurred while adding new job"
          })
      }

   
})
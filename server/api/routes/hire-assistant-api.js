const express = require('express');
const bodyParser = require('body-parser');
const jobOffersSchema = require('../models/jobOffersSchema');
const user = require('../models/userDetailsSchema');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post('/hire-assistant', (req, res) => {
    jobOffersSchema.find({
        email: req.body.email,
        course: req.body.course,
        jobPosition: req.body.jobPosition,
        hirerId: req.body.hirerId,
        status: req.body.status
    })
        .then((results) => {
            console.log(results.length);
            if (results.length == 0) {
                const jobOffer = new jobOffersSchema(req.body);
                jobOffer.save()
                    .then((results) => {
                        res.status(200).json({
                            message: 'Invitation sucessful',
                            result: results
                        });
                    }).catch((err) => {
                        console.log(err);
                        res.status(500).json({
                            message: 'Internal Server Error',
                            result: results
                        });
                    });
            } else {
                res.status(400).json({ message: 'Hire request already sent.' });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error',
                result: results
            });
        });
});

router.get('/check-user', (req, res) => {
    const filter = {
        email: req.query.email
    }
    user.find(filter)
        .then((results) => {
            console.log(results);
            if (results && results.length > 0) {
                return res.status(200).json(
                    {
                        success: true,
                        message: "User Found",
                        applicants: results
                    })
            } else {
                res.status(404).json({
                    success: true,
                    message: "No user found with email specified.",
                    applicants: []
                });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error',
                result: []
            });
        });
});
module.exports = router;
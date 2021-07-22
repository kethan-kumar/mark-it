/* Packages */
import { React, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css';

/* Images */
import hire from './../images/Hiring-Staff.jpg'

function HireAnAssistant() {
    const [hireAssistantState, sethireAssistantState] = useState(false);
    const [validAssistantEmail, setvalidAssistantEmail] = useState(false);
    const [assistantEmailExists, setassistantEmailExists] = useState(false);
    const [hirerId, sethirerId] = useState("test")
    const [assistantEmail, setassistantEmail] = useState("", null);
    const [hireAssistantEmailAlertMsg, sethireAssistantEmailAlertMsg] = useState("", null);
    const [assistantCourse, setassistantCourse] = useState("", null);
    const [hireCourseState, sethireCourseState] = useState(false);
    const [position, setposition] = useState("TA45", null)
    const [inviteSuccess, setinviteSuccess] = useState(false)
    const [coursesLoading, setcoursesLoading] = useState(true)
    const [coursesList, setcoursesList] = useState([])

    const hire_assistant_api = "/api/hiring-management/hire-assistant";
    const check_user_api = "/api/hiring-management/check-user";

    useEffect(() => {
        let items = []
        async function getcourses() {
            await axios.get("/api/course").then((response) => {
                // console.log(response.data.courses);
                items.push(<option>{""}</option>);
                for (let i = 0; i < response.data.courses.length; i++) {
                    // console.log(response.data.courses[i].courseId)
                    items.push(<option>{response.data.courses[i].courseId}</option>);
                }
                setcoursesList(items)
                setcoursesLoading(false)
            });
        }
        getcourses()
    }, []);

    const hireAssistant = event => {
        event.preventDefault();
        sethireAssistantState(true);
        // console.log(hireAssistantState);
        // console.log(assistantEmail)

        if (assistantCourse === "") {
            sethireCourseState(false);
            sethireAssistantEmailAlertMsg("Please select a course.");
        }
        else {
            sethireCourseState(true);
            if (!(/\S+@\S+\.\S+/.test(assistantEmail))) {
                setvalidAssistantEmail(false);
                // console.log("invalid mail")
                sethireAssistantEmailAlertMsg("Invalid email.");
            }
            else {
                //hire-assistant
                setvalidAssistantEmail(true);
                async function checkForUser() {
                    await axios.get(check_user_api,
                        {
                            params: {
                                'email': assistantEmail
                            }
                        })
                        .then((response) => {
                            if (response.status === 200) {
                                // console.log(' successful!');
                                setassistantEmailExists(true);
                                async function sendInvite() {
                                    await axios.post(hire_assistant_api,
                                        {
                                            'course': assistantCourse,
                                            'hirerId': hirerId,
                                            'applicantEmail': assistantEmail,
                                            'jobPosition': position,
                                            'status': 'Under Review'
                                        })
                                        .then((response) => {
                                            if (response.status === 200) {
                                                // console.log(' successful!');
                                                setinviteSuccess(true)
                                                sethireAssistantEmailAlertMsg(response.data.message);
                                            }
                                        }).catch((error) => {
                                            sethireAssistantEmailAlertMsg(error.response.data.message);
                                            setinviteSuccess(false)
                                        });
                                }
                                sendInvite();
                            }
                        }).catch((error) => {
                            setassistantEmailExists(false);
                            sethireAssistantEmailAlertMsg(error.response.data.message);
                        });
                }
                checkForUser();
            }
        }
    }

    return (
        <Card >
            <Card.Img variant="top" src={hire} />
            <Card.Body>
                <Card.Title>Hire an Assistant</Card.Title>
                <Form onSubmit={hireAssistant}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Already found the assistant you are looking for? <br />
                            Go ahead and add them directly with a simple click!</Form.Label>
                        <Container fluid>
                            <Row>
                                <Col>
                                    <Form.Control as="select" onChange={event => setassistantCourse(event.target.value)}>
                                        {
                                            coursesLoading ? <option>Loading...</option> : coursesList
                                        }
                                    </Form.Control>
                                    <Form.Text className="text-muted">
                                        Select the course for which you want to hire.
                                    </Form.Text>
                                </Col>
                                <Col>
                                    <Form.Control as="select" onChange={event => setposition(event.target.value)}>
                                        <option>TA45</option>
                                        <option>Marker</option>
                                    </Form.Control>
                                    <Form.Text className="text-muted">
                                        Select the job position.
                                    </Form.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Control type="email" placeholder="example@mail.com" onChange={event => setassistantEmail(event.target.value)} required />
                                    <Form.Text className="text-muted">
                                        Enter the email address of the assistant you want to hire.
                                    </Form.Text>
                                </Col>
                            </Row>
                        </Container>
                    </Form.Group>
                    {
                        hireAssistantState ?
                            assistantEmailExists && validAssistantEmail && hireCourseState && inviteSuccess?
                                <Alert variant="success">
                                    {hireAssistantEmailAlertMsg}
                                </Alert>
                                :
                                <Alert variant="danger">
                                    {hireAssistantEmailAlertMsg}
                                </Alert>
                            :
                            null
                    }
                    <Button variant="primary" type="submit" >Hire</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default HireAnAssistant
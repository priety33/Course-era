import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb,
         Button, Modal, ModalBody, ModalHeader, Label, Col, Row } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors } from 'react-redux-form';

        function RenderDish({dish}) {
                return(
                    <div  className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                          <CardTitle>{dish.name}</CardTitle>
                          <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                    </div>
                );
        }

        const maxLength= (len) => (val) => !(val) || (val.length <= len);
        const minLength= (len) => (val) => (val) && (val.length >= len);

        class CommentForm extends Component {
            
            constructor(props) {
                super(props);

                this.state= {
                    isModalOpen : false
                };
                this.toggleModal= this.toggleModal.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
            }

            toggleModal () {
                this.setState({
                    isModalOpen : !this.state.isModalOpen
                });
            }

            handleSubmit (values) {
                console.log('Current State is: ' + JSON.stringify(values));
                alert('Current State is: ' + JSON.stringify(values));
            }

            render () {
                return(
                    <div>
                        <Button outline onClick={this.toggleModal} color="info">Submit Comment</Button>

                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                            <ModalBody>
                                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                        <Row className="form-group">
                                            <Label htmlFor="rating" md={10}>Rating</Label>
                                            <Col md={10}>
                                                <Control.select model=".rating" id="rating" name="rating"
                                                    className="form-control">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                </Control.select>
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Label htmlFor="name" md={10}>Your name</Label>
                                            <Col md={10}>
                                                <Control.text model=".name" id="name" placeholder="Your name"
                                                    className="form-control"
                                                    validators={{
                                                       minLength: minLength(3), maxLength: maxLength(15)
                                                    }}
                                                />
                                                <Errors
                                                   className="text-danger"
                                                   model=".name"
                                                   show="touched"
                                                   messages={{
                                                       minLength : 'The author name should at least be three characters long',
                                                       maxLength : 'The author name should be less than or equal to 15 characters.'
                                                   }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Label htmlFor="comment" md={10}>Comment</Label>
                                            <Col md={10}>
                                                <Control.textarea model=".comment" id=".comment" name=".message"
                                                     className= "form-control"
                                                     rows= "6"
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Col md={{size:10, offset: 2}}>
                                                <Button type="submit" color="primary">
                                                 Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </LocalForm>
                            </ModalBody>
                        </Modal>
                    </div>
                );
            }
        }
    
        function RenderComments({comments}) {
                const comment_list = comments.map ((comment) => {
                    return (
                        <div key= {comment.id}>
                            <>
                            <li>{comment.comment}</li>
                            <li>--{comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </li>
                            </>
                        </div>
                    );
                });

                return(
                    <div  className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className= "list-unstyled">
                            {comment_list}
                            <CommentForm />
                        </ul>
                    </div>
                );
            }        

        const DishDetail= (props) => {
            if( props.dish != null) {
                return (
                   <div className="contianer">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                        <div className="row">
                            <RenderDish dish= {props.dish} />
                            <RenderComments comments= {props.comments} />
                        </div>
                   </div>
                );
            }
            else {
                return (
                    <div></div>
                );
            }
        }


export default DishDetail;


import React from 'react';
import {Col, Image, Row} from "react-bootstrap";

const LowerCarousel = () => {
    return (
        <div>
         <Row className="mx-1 my-2 flex-nowrap overflow-scroll" style={{maxWidth:"1000px"}}>
             <Col xs lg="2 ">
                 <Image rounded fluid src={"https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80"}/>
             </Col>
             <Col xs lg="2">
                 <Image rounded fluid src={"https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80"}/>
             </Col>
             <Col xs lg="2">
                 <Image rounded fluid src={"https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80"}/>
             </Col>
             <Col xs lg="2">
                 <Image rounded fluid src={"https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80"}/>
             </Col>
             <Col xs lg="2">
                 <Image rounded fluid src={"https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80"}/>
             </Col>  <Col xs lg="2">
                 <Image rounded fluid src={"https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80"}/>
             </Col>  <Col xs lg="2">
                 <Image rounded fluid src={"https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80"}/>
             </Col>
         </Row>
        </div>
    );
};

export default LowerCarousel;

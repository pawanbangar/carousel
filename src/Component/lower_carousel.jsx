import React from 'react';
import {Col, Image, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {selectCarouselData} from "../redux/carousel/carousel.selectors";

const LowerCarousel = ({carousels}) => {
    return (
        <div>

         <Row className="mx-1 my-2 flex-nowrap overflow-scroll" style={{maxWidth:"1000px"}}>

             {
                 carousels.map((single,index)=>
                     <Col xs lg="2 " key={single.id+index}>
                         <Image rounded fluid src={single.urls.raw}/>
                     </Col>
                 )
             }
         </Row>
        </div>
    );
};
const mapStateToProps=state=>({
    carousels:selectCarouselData(state)
});
export default connect(mapStateToProps)(LowerCarousel);
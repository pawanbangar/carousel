import {Col} from "react-bootstrap";
import React from "react";
import LowerCarousel from "../Component/lower_carousel";
import MainCarousel from "../Component/main_carousel";

const RightSection=(props)=>{
    return (<Col xs lg="9">
        <MainCarousel/>
        <LowerCarousel/>
    </Col>);
}
export default RightSection;
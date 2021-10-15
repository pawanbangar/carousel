import {Col} from "react-bootstrap";
import Categories from "../Component/Categories";
import React from "react";
import LowerCarousel from "../Component/lower_carousel";
import MainCarousel from "../Component/main_carousel";

const RightSection=()=>{
    return (<Col xs lg="9">
        <MainCarousel/>
<LowerCarousel/>
    </Col>);
}
export default RightSection;
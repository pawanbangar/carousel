import {Col} from "react-bootstrap";
import React from "react";
import Categories from "../Component/Categories";
import Files from "../Component/Files";

const LeftSection=()=>{
    return (<Col xs lg="3">
       <Categories/>
        <Files/>
    </Col>);
}
export default LeftSection;
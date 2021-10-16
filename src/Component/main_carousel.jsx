import React,{useState} from 'react';
import {Carousel,Image} from 'react-bootstrap';
import {selectCarouselData} from "../redux/carousel/carousel.selectors";
import {connect} from "react-redux";
const MainCarousel = ({carousels}) => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect} slide={false} indicators={false}>
            {
                carousels.map((single,index)=>
                    <Carousel.Item key={single.id+index+1000}>
                        <Image
                            height={"440px"}
                            className="d-block w-100"
                            src={single.urls.raw}
                            alt="First slide"
                        />
                    </Carousel.Item>
                )
            }

        </Carousel>
    );
};
const mapStateToProps=state=>({
    carousels:selectCarouselData(state)
});
export default connect(mapStateToProps)(MainCarousel);

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

            <Carousel.Item>
                <Image
                    height={"440px"}
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1634022104045-e0e21b3e0bc0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    height={"440px"}
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};
const mapStateToProps=state=>({
    carousels:selectCarouselData(state)
});
export default connect(mapStateToProps)(MainCarousel);

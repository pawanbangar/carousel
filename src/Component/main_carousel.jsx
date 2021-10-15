import React,{useState} from 'react';
import {Carousel,Image} from 'react-bootstrap';
const MainCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect} slide={false} indicators={false}>
            <Carousel.Item>
                <Image
                    height={"440px"}
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1634022104045-e0e21b3e0bc0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
                    alt="First slide"
                />
            </Carousel.Item>
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

export default MainCarousel;
